import { Component, input, signal, output } from '@angular/core';
import { Ticket } from '../ticket.model';

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css'
})
export class TicketComponent {
  data = input.required<Ticket>();
  close = output<string>();
  
  datailsVisable = signal(false);

  onToggleDetails() {
    // this.datailsVisable.set(!this.datailsVisable());
    this.datailsVisable.update((wasVisble)=> !wasVisble);
  }

  onClick(){
    this.close.emit(this.data().id);
  }
}
