import { IdentifiableEvent, Event } from "./Event";
import { Db, MongoClient, ObjectId } from 'mongodb';

const dbUrl = 'mongodb://localhost:27017/';
const dbName = 'event';
const collection = 'events';

let db: Db;

export class EventDatabaseRepository {
  constructor() {
    this.connect();
  }

  async connect(): Promise<void> {
    const client = await MongoClient.connect(dbUrl);
    db = client.db(dbName);
  }

  async addEvent(event: Event): Promise<ObjectId> {
    const res = await db.collection(collection).insertOne(event);
    return res.insertedId;
  }

  async getAllEvents(): Promise<IdentifiableEvent[]> {
    const events = await db.collection(collection).find<IdentifiableEvent>({}).toArray();
    return events;
  }

  async getEvent(eventId: ObjectId) {
    const event = await db.collection(collection).findOne<IdentifiableEvent>({ _id: eventId });
    return event;
  }

  async deleteEvent(eventId: ObjectId): Promise<boolean> {
    const result = await db.collection(collection).deleteOne({ _id: eventId });
    return result.deletedCount === 1;
  }

  async updateEvent(event: IdentifiableEvent): Promise<boolean> {
    const result = await db
      .collection(collection)
      .replaceOne({ _id: new ObjectId(event._id) }, event);
    return result.modifiedCount === 1;
  }
}

export let eventDatabaseRepository = new EventDatabaseRepository();
