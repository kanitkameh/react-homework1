import React from 'react';
import { Link, Outlet, useLoaderData } from 'react-router-dom';
import { logout } from './Authentication/AuthenticationService';
import './menu.css'

export function Menu() {
    const loggedUserId = useLoaderData()
    if (loggedUserId == null) {
        return (<div>
            <div className='navbar'>
                <span className='menu-item'><Link to='/login'>Login</Link></span>
                <span className='menu-item'><Link to='/register'>Register</Link></span>
            </div>
            <Outlet />
        </div>)
    } else {
        return (<div>
            <div className='navbar'>
                <span className='menu-item'><Link to='/recipes'>Recipes</Link></span>
                <span className='menu-item'><Link to='/add-recipe'>Add Recipe</Link></span>
                <span className='menu-item'><Link to='/users'>Edit Users</Link></span>
                <span className='menu-item'><button onClick={logout}>Logout</button></span>
            </div>
            <Outlet />
        </div>)
    };
}

