import { IdentifiableTicket, Ticket } from "./Ticket";
import { Db, MongoClient, ObjectId } from 'mongodb';

const dbUrl = 'mongodb://localhost:27017/';
const dbName = 'tickets';
const collection = 'tickets';

let db: Db;

export class TicketDatabaseRepository {
  constructor() {
    this.connect();
  }

  async connect(): Promise<void> {
    const client = await MongoClient.connect(dbUrl);
    db = client.db(dbName);
  }

  async addTicket(ticket: Ticket): Promise<ObjectId> {
    const res = await db.collection(collection).insertOne(ticket);
    return res.insertedId as ObjectId;
  }

  async getAllTickets(): Promise<IdentifiableTicket[]> {
    const tickets = await db.collection(collection).find<IdentifiableTicket>({}).toArray();
    return tickets;
  }

  async getTicket(ticketId: ObjectId): Promise<IdentifiableTicket | null> {
    const ticket = await db.collection(collection).findOne<IdentifiableTicket>({ _id: ticketId });
    return ticket;
  }

  async deleteTicket(ticketId: ObjectId): Promise<boolean> {
    const result = await db.collection(collection).deleteOne({ _id: ticketId });
    return result.deletedCount === 1;
  }

  async updateTicket(ticket: IdentifiableTicket): Promise<boolean> {
    const result = await db.collection(collection).replaceOne({ _id: new ObjectId(ticket._id) }, ticket);
    return result.modifiedCount === 1;
  }
  async getTicketsForUser(userId: string): Promise<IdentifiableTicket[]> {
    const tickets = await db.collection(collection).find<IdentifiableTicket>({ userId }).toArray();
    return tickets;
  }
}

export let ticketDatabaseRepository = new TicketDatabaseRepository();
