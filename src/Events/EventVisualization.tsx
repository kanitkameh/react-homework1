import React, { useEffect, useState } from 'react';
import { Event, IdentifiableEvent } from './Event';
import './EventComponent.css';
import { ticketsRepository } from '../Ticket/TicketsRepository';
import { userRepository } from '../Users/UserRepository';
import { RequireAuthentication } from '../Authentication/RequireAuthentication';
import { getLoginStatus } from '../Authentication/AuthenticationService';

interface EventProps {
  event: IdentifiableEvent;
}

export const EventVisualization: React.FC<EventProps> = ({ event }) => {
    const [userId, setUserId] = useState("")
    useEffect(() => {
        userRepository.getCurrentUser().then(user => setUserId(user._id))
    },[])
  return (
    <div className="event-card">
      <h2>{event.name}</h2>
      <p>Venue: {event.venue}</p>
      <p>Date: {event.date.toString()}</p>
      <p>Organizer ID: {event.organizerId}</p>
      <p>Description: {event.description}</p>
      <p>Ticket Price: ${event.ticketPrice}</p>
      {event.reviews && event.reviews.length > 0 && (
        <div>
          <h3>Reviews:</h3>
          {event.reviews.map((review, index) => (
            <div key={index}>
              <p>Author ID: {review.authorId}</p>
              <p>Stars: {review.stars}</p>
              <p>Text: {review.text}</p>
            </div>
          ))}
        </div>
      )}
      {event.photo && <img src={event.photo.toString()} alt="Event" />}
      { getLoginStatus() != null &&
        <div className="button-group">
          <button className="purchase-button" onClick={() => ticketsRepository.purchaseTicket(event._id)}>Purchase Ticket</button>
          <button className="leave-review">Review</button>
          { (event.organizerId == userId) && <button className="edit-button">Edit</button>}
        </div>
       }
    </div>
  );
};