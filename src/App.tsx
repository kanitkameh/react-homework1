import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import {Menu} from './Menu';
import { RegisterUser } from './Authentication/RegisterUser';
import { LoginUser } from './Authentication/LoginUser';
import { getLoginStatus } from './Authentication/AuthenticationService';
import { UsersComponent } from './Users/UsersComponent';
import { EditUserComponent } from './Users/EditUserComponent';
import { userRepository } from './Users/UserRepository';
import { RequireAuthentication } from './Authentication/RequireAuthentication';
import { EditEventForm } from './Events/EditEvent';
import { eventRepository } from './Events/EventRepository';
import { AddEventForm } from './Events/AddEvent';
import { EventsComponent } from './Events/EventsComponent';
import { TicketsComponent } from './Ticket/TicketsComponent';


const router = createBrowserRouter([
    {
        path: "/", 
        element: <Menu/>,
        loader:  getLoginStatus,
        children: [
            {
                path: "register",
                element: <RegisterUser></RegisterUser>
            },
            {
                path: "login",
                element: <LoginUser></LoginUser>
            },
            {
                path: "users",
                element: <UsersComponent/>,
                children: [
                    { 
                        path: ":userId",
                        element: 
                            <RequireAuthentication>
                                <EditUserComponent />
                            </RequireAuthentication>,
                        loader: async ({params}) => await userRepository.getUser(params.userId ?? "")
                    }
                ],
            },
            {
                path: "events",
                element: 
                    <RequireAuthentication>
                        <EventsComponent />
                    </RequireAuthentication>,
                children: [
                    {
                        path: ":eventId",
                        element: 
                            <RequireAuthentication>
                                <EditEventForm />
                            </RequireAuthentication>,
                        loader: async ({ params }) => { 
                            const event = await eventRepository.getEvent(params.eventId ?? ""); 
                            return { event: event, userId: getLoginStatus() };
                        }
                    }
                ]
            },
            {
                path: "my-tickets",
                element: <TicketsComponent></TicketsComponent>,
            },
            {
                path: "add-event",
                element: <AddEventForm/>,
                loader:  getLoginStatus
            }
        ]
    }
]);

function App() {
    return (
        <RouterProvider router={router}></RouterProvider>
    );
}

export default App;
