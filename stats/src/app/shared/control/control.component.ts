import { Component, ContentChild, ElementRef, input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-control',
  standalone: true,
  imports: [],
  templateUrl: './control.component.html',
  styleUrl: './control.component.css',
  encapsulation: ViewEncapsulation.None
})
export class ControlComponent {
  //projected content : control -> new-ticket html
  @ContentChild('input') private control?:ElementRef<HTMLInputElement|HTMLTextAreaElement>;

  label = input.required<string>();

  onClick(){
    console.log('app control onclick');
    console.log(this.control?.nativeElement.value);
  }

}
