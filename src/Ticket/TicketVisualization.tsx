import React from 'react';
import { IdentifiableTicket } from './Ticket';

interface IdentifiableTicketProps {
  ticket: IdentifiableTicket;
}

export const IdentifiableTicketComponent: React.FC<IdentifiableTicketProps> = ({ ticket }) => {
  return (
    <div className="ticket-card">
      <h2>Ticket ID: {ticket._id}</h2>
      <p>User ID: {ticket.userId}</p>
      <p>Event ID: {ticket.eventId}</p>
      <p>Barcode: {ticket.barcode}</p>
    </div>
  );
};