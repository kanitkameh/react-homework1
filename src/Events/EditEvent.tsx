import React, { useState, ChangeEvent, FormEvent } from 'react';
import { EventDTO, IdentifiableEvent } from './Event';
import { useLoaderData } from 'react-router-dom';
import { eventRepository } from './EventRepository';

interface EventFormProps {
  onSubmit: (event: Event) => void;
}

interface Event {
  name: string;
  venue: string;
  date: Date;
  organizerId: string;
  description: string;
  ticketPrice: number;
  photo?: URL;
}

export const EditEventForm = () => {

const { event: identifialbeEvent, userId } = useLoaderData() as { event: IdentifiableEvent , userId: string};

  const [eventData, setEventData] = useState<Event>({
    name: identifialbeEvent.name,
    venue: identifialbeEvent.venue,
    date: identifialbeEvent.date,
    organizerId: identifialbeEvent.organizerId,
    description: identifialbeEvent.description,
    ticketPrice: identifialbeEvent.ticketPrice,
    photo: identifialbeEvent.photo,
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setEventData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, valueAsDate } = event.target;
    setEventData((prevData) => ({
      ...prevData,
      [name]: valueAsDate,
    }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    let newEvent = new IdentifiableEvent(
      identifialbeEvent._id,
      eventData.name,
      eventData.venue,
      eventData.date,
      eventData.organizerId,
      eventData.description,
      eventData.ticketPrice,
      [], //TODO maybe it should be better to create these without the review array
      eventData.photo,
    )

    eventRepository.updateEvent(newEvent)
    // Clear the form after submission
    setEventData({
      name: '',
      venue: '',
      date: new Date(),
      organizerId: '',
      description: '',
      ticketPrice: 0,
      photo: undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" name="name" value={eventData.name} onChange={handleInputChange} required />

      <label htmlFor="venue">Venue:</label>
      <input type="text" id="venue" name="venue" value={eventData.venue} onChange={handleInputChange} required />

      <label htmlFor="date">Date:</label>
      <input type="date" id="date" name="date" value={eventData.date.toISOString().substr(0, 10)} onChange={handleDateChange} required />

      <label htmlFor="organizerId">Organizer ID:</label>
      <input type="text" id="organizerId" name="organizerId" value={eventData.organizerId} onChange={handleInputChange} required />

      <label htmlFor="description">Description:</label>
      <textarea id="description" name="description" value={eventData.description} onChange={handleInputChange} required />

      <label htmlFor="ticketPrice">Ticket Price:</label>
      <input type="number" id="ticketPrice" name="ticketPrice" value={eventData.ticketPrice.toString()} onChange={handleInputChange} required />

      <label htmlFor="photo">Photo:</label>
      <input type="url" id="photo" name="photo" value={eventData.photo?.toString() ?? ''} onChange={handleInputChange} />

      <button type="submit">Create Event</button>
    </form>
  );
};
