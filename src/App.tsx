import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import {Menu} from './Menu';
import { RegisterUser } from './Authentication/RegisterUser';
import { LoginUser } from './Authentication/LoginUser';
import { getLoginStatus } from './Authentication/AuthenticationService';


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
