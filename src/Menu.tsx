import React from 'react';
import { Outlet, useLoaderData } from 'react-router-dom';
import { logout } from './Authentication/AuthenticationService';
import './menu.css'

export function Menu() {
    const loggedUserId = useLoaderData()
    if (loggedUserId == null) {
        return (<div>
            <div className='navbar'>
                <span className='menu-item'><a href='/login'>Login</a></span>
                <span className='menu-item'><a href='/register'>Register</a></span>
            </div>
            <Outlet />
        </div>)
    } else {
        return (<div>
            <div className='navbar'>
                <span className='menu-item'><a href='/recipes'>Recipes</a></span>
                <span className='menu-item'><a href='/add-recipe'>Add Recipe</a></span>
                <span className='menu-item'><a href='/users'>Edit Users</a></span>
                <span className='menu-item'><button onClick={logout}>Logout</button></span>
            </div>
            <Outlet />
        </div>)
    };
}

