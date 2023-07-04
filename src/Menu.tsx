import React, { useState } from 'react';
import { Link, Outlet, useLoaderData } from 'react-router-dom';
import { logout } from './Authentication/AuthenticationService';
import './menu.css'

export function Menu() {
    const loggedUserId = useLoaderData()
    const [userLoggedIn, setUserLoggedIn] = useState(false)
    if (loggedUserId == null) {
        return (<div>
            <div className='navbar'>
                <span className='menu-item'><Link to='/login'>Login</Link></span>
                <span className='menu-item'><Link to='/register'>Register</Link></span>
                <span className='menu-item'><Link to='/events'>Events</Link></span>
            </div>
            <Outlet context={{userLoggedIn, setUserLoggedIn}}/>
        </div>)
    } else {
        return (<div>
            <div className='navbar'>
                <span className='menu-item'><Link to='/events'>Events</Link></span>
                <span className='menu-item'><Link to='/add-event'>Add Event</Link></span>
                <span className='menu-item'><Link to='/users'>Users</Link></span>
                <span className='menu-item'><Link to='/my-tickets'>My Tickets</Link></span>
                {/* <span className='menu-item'><Link to='/event-groups'>Event Groups</Link></span> */}
                <span className='menu-item'><button onClick={logout}>Logout</button></span>
            </div>
            <Outlet />
        </div>)
    };
}

