import { Ticket } from "./Ticket";


class TicketsRepository {
    backendServerPath = "http://localhost:2704";

    async purchaseTicket(eventId: string){
        fetch(this.backendServerPath+'/events/' + eventId + '/ticket-purchase', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            }
        })
    }
    async getMyTickets(){
        let response = await fetch(this.backendServerPath+'/tickets', {
            method: 'GET',
        })
        let json: Ticket[] = await response.json()
        return json
    }
}

export let ticketsRepository = new TicketsRepository()