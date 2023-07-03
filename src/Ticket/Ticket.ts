export class Ticket {
    userId: string
    eventId: string
    barcode: string
    constructor(
        userId: string,
        eventId: string,
        barcode: string
    ){
        this.userId = userId
        this.eventId = eventId
        this.barcode = barcode
    }
}

export class IdentifiableTicket extends Ticket {
    _id: string
    constructor(
        _id: string,
        userId: string,
        eventId: string,
        barcode: string
    ){
        super(userId, eventId, barcode)
        this._id = _id
    }

}