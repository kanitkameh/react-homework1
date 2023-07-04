import express, { Request, Response } from 'express';
import { IdentifiableEvent, eventDtoSchema } from '../Events/Event';
import { Review } from '../Events/Review';
import { bodySchemaValidationMiddleware } from './SchemaValidation';
import { eventDatabaseRepository } from '../Events/EventDatabaseRepository';
import { ObjectId } from 'mongodb';
import { CustomSession, authenticateUser } from './Authentication';
import { IdentifiableUser } from '../Users/User';

export const eventRouter = express.Router();
eventRouter.use(express.json());

// Helper function to generate a unique ID
function generateUniqueId(): string {
    // TODO: Implement your unique ID generation logic here
    // Example implementation using a random number
    return Math.random().toString(36).substr(2, 9);
}

const authorizeUser = async (req: Request, res: Response, next: any) => {
    const session = req.session as CustomSession
    const user: IdentifiableUser = session.user!

    const eventId = req.params.id;

    const event = await eventDatabaseRepository.getEvent(new ObjectId(eventId));

    if (!event) {
        res.status(404).json({ error: 'Event not found' });
    } else if (event.organizerId !== user._id) {
        res.status(403).json({ error: 'Unauthorized' });
    } else {
        next()
    }
}

// Create event endpoint
eventRouter.post('/events', authenticateUser, bodySchemaValidationMiddleware(eventDtoSchema), (req: Request, res: Response) => {
    const session = req.session as CustomSession
    const user: IdentifiableUser = session.user!

    const {
        name,
        venue,
        date,
        description,
        ticketPrice,
    } = req.body;

    const event = new IdentifiableEvent(
        generateUniqueId(),
        name,
        venue,
        new Date(date),
        user._id,
        description,
        ticketPrice,
        []
    );

    // Save event to the database
    const eventId = eventDatabaseRepository.addEvent(event);

    res.status(201).json({ message: 'Event created successfully', eventId });
});

// Update event endpoint
eventRouter.put('/events/:id', authenticateUser, authorizeUser, bodySchemaValidationMiddleware(eventDtoSchema), async (req: Request, res: Response) => {
    const session = req.session as CustomSession
    const user: IdentifiableUser = session.user!

    const eventId = req.params.id;
    const {
        name,
        venue,
        date,
        description,
        ticketPrice,
    } = req.body;

    const event = await eventDatabaseRepository.getEvent(new ObjectId(eventId));
    if (event) {
        event.name = name
        event.venue = venue
        event.date = date
        event.description = description
        event.ticketPrice = ticketPrice


        // Update event in the database
        const updated = await eventDatabaseRepository.updateEvent(event);

        if (updated) {
            res.status(200).json({ message: 'Event updated successfully' });
        } else {
            res.status(404).json({ error: 'Event not found' });
        }
    } else {
        res.status(404).json({ error: 'Event not found' });
    }

});

// Delete event endpoint
eventRouter.delete('/events/:id', authenticateUser, authorizeUser, async (req: Request, res: Response) => {
    const eventId = req.params.id;

    // Delete event from the database
    // TODO new ObjectId with bad sized eventId causes exceptions and app crashes
    // Wrap all object id objects in try catch or migrate to express 5 which has default handler 
    // for async functions throwing exceptions
    const deleted = await eventDatabaseRepository.deleteEvent(new ObjectId(eventId));

    if (deleted) {
        res.status(200).json({ message: 'Event deleted successfully' });
    } else {
        res.status(404).json({ error: 'Event not found' });
    }
});

// Get event by ID endpoint
eventRouter.get('/events/:id', async (req: Request, res: Response) => {
    const eventId = req.params.id;

    // Get event from the database
    const event = await eventDatabaseRepository.getEvent(new ObjectId(eventId));

    if (event) {
        res.status(200).json(event);
    } else {
        res.status(404).json({ error: 'Event not found' });
    }
});

eventRouter.get('/events', async (req: Request, res: Response) => {
    const events = await eventDatabaseRepository.getAllEvents();
    res.status(200).json(events);
});