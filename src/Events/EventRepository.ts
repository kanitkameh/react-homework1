import { IdentifiableEvent, Event, EventDTO } from "./Event";
import { Review, ReviewDTO } from "./Review";

class EventRepository {
    backendServerPath = "http://localhost:2704";

    async addEvent(event: EventDTO){
        fetch(this.backendServerPath+'/events', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            mode: "cors",
            body: JSON.stringify(event)
        })
    }
    async getAllEvents(){
        let response = await fetch(this.backendServerPath+'/events', {
            method: 'GET',
        })
        let json: IdentifiableEvent[] = await response.json()
        return json
    }

    async getEvent(eventId: string){
        let response = await fetch(this.backendServerPath+'/events/'+eventId, {
            method: 'GET',
        })
        let json: IdentifiableEvent = await response.json()
        return json
    }
    async updateEvent(event: IdentifiableEvent) {
        fetch(this.backendServerPath+'/events/'+event._id, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            mode: "cors",
            body: JSON.stringify(event)
        })
    }
    async deleteEvent(event: IdentifiableEvent) {
        fetch(this.backendServerPath+'/events/'+event._id, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            mode: "cors",
        })
    }
    async reviewEvent(eventId: string, review: ReviewDTO){
        fetch(this.backendServerPath+'/events/:id/review', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            mode: "cors",
        })
    }
}

export let eventRepository = new EventRepository()