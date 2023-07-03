import { Review } from "./Review";

export class Event {

    name: string;
    venue: string;
    date: Date;
    organizerId: string;
    description: string;
    ticketPrice: number;
    reviewIds: Review[];//TODO create reviews

    constructor(
        name: string,
        venue: string,
        date: Date,
        organizerId: string,
        description: string,
        ticketPrice: number,
        reviewIds: Review[]
    ){
        this.name = name
        this.venue = venue
        this.date = date
        this.organizerId = organizerId
        this.description = description
        this.ticketPrice = ticketPrice
        this.reviewIds = reviewIds
    }
}

export class IdentifiableEvent extends Event {
    _id: string;

    constructor(
        _id: string,
        name: string,
        venue: string,
        date: Date,
        organizerId: string,
        description: string,
        ticketPrice: number,
        reviewIds: Review[]
    ){
        super(name,venue,date,organizerId,description,ticketPrice,reviewIds)
        this._id = _id
    }
}