import { Component, input } from '@angular/core';

@Component({
  // attribute selector (extend existing element) vs element selector
  selector: 'button[appButton], a[appButton]',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {

  btnText = input.required<string>();
  // icon = input.required<string>();

}
