import { IdentifiableTicket } from "./Ticket";


class TicketsRepository {
    backendServerPath = "http://localhost:2704";

    async purchaseTicket(eventId: string){
        fetch(this.backendServerPath+'/events/' + eventId + '/ticket-purchase', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            mode: "cors",
        })
    }
    async getMyTickets(){
        let response = await fetch(this.backendServerPath+'/tickets', {
            method: 'GET',
            credentials: "include",
            mode: "cors",
        })
        let json: IdentifiableTicket[] = await response.json()
        return json
    }
}

export let ticketsRepository = new TicketsRepository()