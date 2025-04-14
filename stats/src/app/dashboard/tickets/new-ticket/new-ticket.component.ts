import { Component, ElementRef, output, viewChild, ViewChild, ViewChildren } from '@angular/core';
import { ButtonComponent } from '../../../shared/button/button.component';
import { ControlComponent } from "../../../shared/control/control.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-ticket',
  standalone: true,
  imports: [ButtonComponent, ControlComponent, FormsModule],
  templateUrl: './new-ticket.component.html',
  styleUrl: './new-ticket.component.css'
})
export class NewTicketComponent {
  @ViewChild('form') form?:ElementRef<HTMLFormElement>;
  @ViewChildren(ButtonComponent) buttons?: ButtonComponent;
  add = output<{title:string; text:string}>();
  //signals vs decorations
  private newForm=viewChild('form');


  onSubmit(title: string, request: string) {
    this.add.emit({title: title, text: request })
    console.log('submit!!!');
    console.log('title:  '+ title + '\n request: ' + request);
    this.form?.nativeElement.reset();
  }

}
