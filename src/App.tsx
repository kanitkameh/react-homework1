import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import {Menu} from './Menu';
import { RegisterUser } from './Authentication/RegisterUser';
import { LoginUser } from './Authentication/LoginUser';
import { getLoginStatus } from './Authentication/AuthenticationService';
import { UsersComponent } from './Users/UsersComponent';
import { EditUserComponent } from './Users/EditUserComponent';
import { userRepository } from './Users/UserRepository';
import { RecipesComponent } from './Recipes/RecipesComponent';
import { AddRecipeForm } from './Recipes/AddRecipe';


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
                        element: <EditUserComponent />,
                        loader: ({params}) => userRepository.getUser(params.userId ?? "")
                    }
                ],
            },
            {
                path: "recipes",
                element: <RecipesComponent/>,
                children: [
                    /*
                    {
                        path: ":recipeId",
                        element: <EditRecipeComponent />,
                        loader: ({params}) => userRepository.getUser(params.userId ?? "")
                    }
                    */
                ]
            },
            {
                path: "add-recipe",
                element: <AddRecipeForm/>,
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
