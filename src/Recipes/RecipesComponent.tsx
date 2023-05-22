
import React, { useEffect, useState } from 'react';
import { IdentifiableRecipe } from "./Recipe";
import { Outlet } from 'react-router-dom';
import { recipeRepository } from './RecipeRepository';

export function RecipesComponent() {
    const [recipes, setRecipes] = useState<[IdentifiableRecipe]>();
    useEffect(() => {
        recipeRepository.getAllRecipes().then(recipes => {
            setRecipes(recipes)
        })
    }, []);
    return (<div>
        {recipes?.map(
            recipe => (<div>{recipe.name} <a href={"/recipes/" + recipe.id}>Edit</a></div>)
        )}
        <Outlet/>
    </div>)
}