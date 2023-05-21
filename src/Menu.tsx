import React from 'react';
import { Outlet, useLoaderData } from 'react-router-dom';
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
            <h1>Recipes</h1>
            <h1>Add Recipe</h1>
        </div>)
    };
}

