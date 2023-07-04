import React from 'react';
import { Event } from './Event';
import './EventComponent.css';

interface EventProps {
  event: Event;
}

export const EventVisualization: React.FC<EventProps> = ({ event }) => {
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
      <div className="button-group">
        <button className="purchase-button">Purchase Ticket</button>
        <button className="edit-button">Edit</button>
      </div>
    </div>
  );
};