import express, { Request, Response } from 'express';
import { CustomSession, authenticateUser } from "./Authentication";
import { ticketDatabaseRepository } from "../Ticket/TicketDatabaseRepository";
import { IdentifiableUser } from "../Users/User";

export const ticketRouter = express.Router()

ticketRouter.get('/tickets', authenticateUser, async (req: Request, res: Response) => {
    const session = req.session as CustomSession
    const user: IdentifiableUser = session.user!


    const tickets = await ticketDatabaseRepository.getTicketsForUser(user._id);
    res.status(200).json(tickets);
});