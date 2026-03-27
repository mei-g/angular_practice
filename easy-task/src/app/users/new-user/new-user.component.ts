import {Component, output, ElementRef, ViewChild} from '@angular/core';
import {FormControl, ReactiveFormsModule, FormsModule} from '@angular/forms';
import { UploadComponent } from '../upload/upload.component';
import { HttpClient, HttpClientModule, HttpEvent } from '@angular/common/http';

@Component({
  selector: 'app-new-user',
  standalone: true,
  imports: [ReactiveFormsModule, UploadComponent, FormsModule, HttpClientModule],  
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.css'
})
export class NewUserComponent {
  newUserCancel = output();
  newUserAdd = output();
  
  nameControl = new FormControl('');
  ageControl = new FormControl('');
  colorControl = new FormControl('');

  onCancel(){
     this.newUserCancel.emit();
  }
  onSubmit(){
     this.newUserAdd.emit();
  }

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('dialogElem') dialogElem!: ElementRef<HTMLDialogElement>;
  @ViewChild('fallbackModal') fallbackModal!: ElementRef<HTMLDivElement>;

  pendingFile: File | null = null;
  proposedName = '';
  previewDataUrl: string | null = null;

  private previouslyFocused: HTMLElement | null = null;
  private isNativeDialog = false;
  private focusTrapHandler: ((e: KeyboardEvent) => void) | null = null;

  constructor(private http: HttpClient, private host: ElementRef) {}

  ngAfterViewInit(): void {
    this.isNativeDialog =
      typeof HTMLDialogElement === 'function' && typeof this.dialogElem?.nativeElement?.showModal === 'function';
    if (this.isNativeDialog) {
      // prevent native cancel from doing unexpected behavior; handle close centrally
      this.dialogElem.nativeElement.addEventListener('cancel', (ev) => {
        ev.preventDefault();
        this.cancelRename();
      });
    }
  }

  ngOnDestroy(): void {
    this.removeFocusTrap();
  }

  onFileSelected(event: Event) {
    console.log('file selected');
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;
    const file = input.files[0];
    this.pendingFile = file;
    this.proposedName = this.extractBaseAndKeepExt(file.name);
    this.loadPreviewIfImage(file);
    this.openModal();
  }

  private extractBaseAndKeepExt(fullName: string): string {
    // Keep extension; allow user to edit whole string or customize to edit base only.
    return fullName;
  }

  private loadPreviewIfImage(file: File) {
    this.previewDataUrl = null;
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = () => {
      this.previewDataUrl = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  openModal() {
    this.previouslyFocused = document.activeElement as HTMLElement | null;
    if (this.isNativeDialog) {
      try {
        this.dialogElem.nativeElement.showModal();
      } catch {
        this.dialogElem.nativeElement.show();
      }
      // Focus input inside dialog (wait a tick)
      setTimeout(() => {
        const input = this.dialogElem.nativeElement.querySelector('input') as HTMLElement | null;
        input?.focus();
      });
      this.addFocusTrap(this.dialogElem.nativeElement);
    } else {
      this.fallbackModal.nativeElement.hidden = false;
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        const fbInput = this.fallbackModal.nativeElement.querySelector('input') as HTMLElement | null;
        fbInput?.focus();
      });
      this.addFocusTrap(this.fallbackModal.nativeElement);
    }
  }

  // Called when native dialog emits close (hook for symmetry)
  onDialogClose() {
    this.clearAndRestore();
  }

  confirmRename() {
    console.log('confirm name');
    if (!this.pendingFile) return;
    const safeName = this.sanitizeFilename(this.proposedName) || this.pendingFile.name;
    const renamed = new File([this.pendingFile], safeName, {
      type: this.pendingFile.type,
      lastModified: this.pendingFile.lastModified,
    });
    console.log('renamed' + renamed);
    // this.uploadFile(renamed).subscribe({
    //   next: (ev: HttpEvent<any>) => {},
    //   error: (err) => console.error('Upload failed', err),
    //   complete: () => this.closeModal(),
    // });
  }

  cancelRename() {
    this.closeModal();
    this.clearPending();
  }

  private closeModal() {
    if (this.isNativeDialog) {
      try {
        this.dialogElem.nativeElement.close();
      } catch {
        /* ignore */
      }
    } else {
      this.fallbackModal.nativeElement.hidden = true;
      document.body.style.overflow = '';
    }
    this.removeFocusTrap();
    // restore focus
    this.previouslyFocused?.focus();
  }

  private clearPending() {
    this.pendingFile = null;
    this.proposedName = '';
    this.previewDataUrl = null;
    // reset file input so same file can be re-selected later
    if (this.fileInput?.nativeElement) this.fileInput.nativeElement.value = '';
  }

  private sanitizeFilename(name: string): string {
    if (!name) return '';
    // remove slashes and null bytes; trim whitespace
    return name.replace(/[/\\\0]+/g, '').trim();
  }

  private uploadFile(file: File) {
    const form = new FormData();
    form.append('file', file, file.name);
    return this.http.post('/api/upload', form, {
      reportProgress: true,
      observe: 'events',
    });
  }

  // Focus trap: keep tab focus within the container while it's open.
  private addFocusTrap(container: HTMLElement) {
    const focusableSelector = 'a[href], button:not([disabled]), textarea, input:not([disabled]), select, [tabindex]:not([tabindex="-1"])';
    const nodes = () => Array.from(container.querySelectorAll<HTMLElement>(focusableSelector)).filter((el) => el.offsetParent !== null);

    this.focusTrapHandler = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const list = nodes();
      if (list.length === 0) return;
      const first = list[0];
      const last = list[list.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', this.focusTrapHandler);
    // Also block background elements from receiving pointer events (fallback handled via hidden/overflow)
  }

  private removeFocusTrap() {
    if (this.focusTrapHandler) {
      document.removeEventListener('keydown', this.focusTrapHandler);
      this.focusTrapHandler = null;
    }
  }

  private clearAndRestore() {
    // Called when dialog closes via native event; cleanup and restore focus
    this.removeFocusTrap();
    this.previouslyFocused?.focus();
    this.clearPending();
  }

}
