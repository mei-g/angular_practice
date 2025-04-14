import { Component } from '@angular/core';
import { NewTicketComponent } from "./new-ticket/new-ticket.component";
import { Ticket } from './ticket.model';
import { TicketComponent } from "./ticket/ticket.component";

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [NewTicketComponent, TicketComponent],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.css'
})
export class TicketsComponent {

  tickets: Ticket[] = [];
  onAdd(ticketDatae: {title:string; text: string}) {
    this.tickets.push({
      id : "t" + this.tickets.length + 1,
      title: ticketDatae.title,
      request: ticketDatae.text,
      status: 'open'

   })
 }
 onCloseTicket(id:string) {
  this.tickets = this.tickets.map((ticket) => {
      if(ticket.id === id) {
        return {...ticket, status: 'closed'};
      }
      return ticket;
  } );
 }
}
