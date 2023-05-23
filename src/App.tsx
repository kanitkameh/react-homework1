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
import { EditRecipeForm } from './Recipes/EditRecipe';
import { recipeRepository } from './Recipes/RecipeRepository';
import { RequireAuthentication } from './Authentication/RequireAuthentication';


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
                        loader: ({params}) => userRepository.getUser(params.userId ?? "")
                    }
                ],
            },
            {
                path: "recipes",
                element: 
                    <RequireAuthentication>
                        <RecipesComponent />
                    </RequireAuthentication>,
                children: [
                    {
                        path: ":recipeId",
                        element: 
                            <RequireAuthentication>
                                <EditRecipeForm />
                            </RequireAuthentication>,
                        loader: async ({ params }) => { 
                            const recipe = await recipeRepository.getRecipe(params.recipeId ?? ""); 
                            return { recipe: recipe, userId: getLoginStatus() };
                        }
                    }
                ]
            },
            {
                path: "add-recipe",
                element: <AddRecipeForm/>,
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
