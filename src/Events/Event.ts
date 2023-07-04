import { Review } from "./Review";
import * as yup from 'yup';

export class EventDTO {

    constructor(
    public name: string,
    public venue: string,
    public date: Date,
    public organizerId: string,
    public description: string,
    public ticketPrice: number,
    public reviews: Review[],
    public photo?: URL,
    ){}
}

export class Event {

    name: string;
    venue: string;
    date: Date;
    organizerId: string;
    description: string;
    ticketPrice: number;
    reviews: Review[];//TODO create reviews
    photo?: URL

    constructor(
        name: string,
        venue: string,
        date: Date,
        organizerId: string,
        description: string,
        ticketPrice: number,
        reviews: Review[],
        photo?: URL
    ){
        this.name = name
        this.venue = venue
        this.date = date
        this.organizerId = organizerId
        this.description = description
        this.ticketPrice = ticketPrice
        this.reviews = reviews
        this.photo = photo
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
        reviews: Review[],
        photo?: URL
    ){
        super(name,venue,date,organizerId,description,ticketPrice,reviews,photo)
        this._id = _id
    }
}


export const eventDtoSchema = yup.object({
    name: yup.string().required(),
    venue: yup.string().required(),
    date: yup.date().required(),
    description: yup.string().required(),
    ticketPrice: yup.number().required(),
  });

export const eventSchema = yup.object({
    name: yup.string().required(),
    venue: yup.string().required(),
    date: yup.date().required(),
    organizerId: yup.string().required(),
    description: yup.string().required(),
    ticketPrice: yup.number().required(),
    reviews: yup.array().of(
      yup.object({
        authorId: yup.string().required(),
        stars: yup.number().required(),
        text: yup.string().required(),
      })
    ),
    photo: yup.string().url().optional()
  });