import { useEffect, useState } from 'react';
import './ticket.css';
import { IdentifiableTicket } from './Ticket';
import { ticketsRepository } from './TicketsRepository';
import { TicketVisualization } from './TicketVisualization';

export function TicketsComponent() {
    const [tickets, setTickets] = useState<IdentifiableTicket[]>([]);
    useEffect(() => {
        ticketsRepository.getMyTickets().then(tickets => {
            // alert("tickets: "+JSON.stringify(tickets))
            setTickets(tickets)
        }).catch(err => {   
            alert("error "+err)
            // setTickets([])
        })
    }, []);
    return (<div>
        {tickets?.map(
            ticket => ( <TicketVisualization ticket={ticket}></TicketVisualization>)
        )}
    </div>)
}