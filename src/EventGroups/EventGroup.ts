export class EventGroup {
    name: string
    ownerId: string
    eventIds: string[]
    constructor(
        name: string,
        ownerId: string,
        eventIds: string[]
    ){
        this.name = name
        this.ownerId = ownerId
        this.eventIds = eventIds
    }
}
export class IdentifiableEventGroup extends EventGroup {
    _id: string
    constructor(
        _id: string,
        name: string,
        ownerId: string,
        eventIds: string[]
    ){
        super(name, ownerId, eventIds)
        this._id = _id
    }
}