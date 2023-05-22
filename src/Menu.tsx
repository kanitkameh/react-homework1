import React from 'react';
import { Outlet, useLoaderData } from 'react-router-dom';
import { logout } from './Authentication/AuthenticationService';
export function Menu() {
    const loggedUserId = useLoaderData()
    if (loggedUserId == null) {
        return (<div>
            <h1><a href='/login'>Login</a></h1>
            <h1><a href='/register'>Register</a></h1>
            <Outlet/>
        </div>)
    } else {
        return (<div>
            <h1><a href='/recipes'>Recipes</a></h1>
            <h1><a href='/add-recipe'>Add Recipe</a></h1>
            <h1><a href='/users'>Edit Users</a></h1>
            <h1><button onClick={logout}>Logout</button></h1>
            <Outlet/>
        </div>)
    };
}

