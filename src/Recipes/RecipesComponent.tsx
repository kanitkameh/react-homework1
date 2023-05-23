
import React, { useEffect, useState } from 'react';
import { IdentifiableRecipe } from "./Recipe";
import { Outlet } from 'react-router-dom';
import { recipeRepository } from './RecipeRepository';
import { RecipeVisualization } from './RecipeVisualization';

export function RecipesComponent() {
    const [recipes, setRecipes] = useState<[IdentifiableRecipe]>();
    useEffect(() => {
        recipeRepository.getAllRecipes().then(recipes => {
            setRecipes(recipes)
        })
    }, []);
    return (<div>
        {recipes?.map( recipe => 
            <RecipeVisualization recipe={recipe}></RecipeVisualization>
        )}
        <Outlet/>
    </div>)
}