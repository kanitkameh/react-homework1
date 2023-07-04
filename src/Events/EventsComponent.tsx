import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { IdentifiableEvent } from './Event';
import { eventRepository } from './EventRepository';
import { EventVisualization } from './EventVisualization';
import './EventComponent.css'

export function EventsComponent() {
    const [events, setEvents] = useState<IdentifiableEvent[]>();
    useEffect(() => {
        eventRepository.getAllEvents().then(events => {
            setEvents(events)
        })
    }, []);
    return (<div>
        <div>Sort by 
            <button onClick={() => {
                setEvents(oldRecipes => [...oldRecipes!].sort((a, b) => a.ticketPrice>b.ticketPrice?1:-1))
                }}>Ticket Price</button>
            <button onClick={() => {
                setEvents(oldRecipes => [...oldRecipes!].sort((a, b) => a.ticketPrice<b.ticketPrice?1:-1))
                }}>Ticket Price Descending</button>
        </div>
        <div>Sort by 
            <button onClick={() => {
                setEvents(oldRecipes => [...oldRecipes!].sort((a, b) => a.date>b.date?1:-1))
                }}>Date</button>
            <button onClick={() => {
                setEvents(oldRecipes => [...oldRecipes!].sort((a, b) => a.date<b.date?1:-1))
                }}>Date Descending</button>
        </div>
        <div>Sort by 
            <button onClick={() => {
                setEvents(oldRecipes => [...oldRecipes!].sort((a, b) => 
                a.reviews.map(x => x.stars).reduce((x,y) => x + y , 0)/a.reviews.length >
                b.reviews.map(x => x.stars).reduce((x,y) => x + y , 0)/b.reviews.length?1:-1))
                }}>Review Stars</button>
            <button onClick={() => {
                setEvents(oldRecipes => [...oldRecipes!].sort((a, b) => 
                a.reviews.map(x => x.stars).reduce((x,y) => x + y , 0)/a.reviews.length <
                b.reviews.map(x => x.stars).reduce((x,y) => x + y , 0)/b.reviews.length?1:-1))
                }}>Review Stars Descending</button>
        </div>

        {events?.map( event => 
            <EventVisualization event={event}></EventVisualization>
        )}
        <Outlet/>
    </div>)
}