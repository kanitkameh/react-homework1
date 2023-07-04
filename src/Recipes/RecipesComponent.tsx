
import React, { useEffect, useState } from 'react';
import { IdentifiableRecipe } from "./Recipe";
import { Outlet } from 'react-router-dom';
import { recipeRepository } from './RecipeRepository';
import { RecipeVisualization } from './RecipeVisualization';

export function EventsComponent() {
    const [recipes, setRecipes] = useState<IdentifiableRecipe[]>();
    useEffect(() => {
        recipeRepository.getAllRecipes().then(recipes => {
            setRecipes(recipes)
        })
    }, []);
    return (<div>
        <div>Sort by 
            <button onClick={() => {
                setRecipes(oldRecipes => [...oldRecipes!].sort((a, b) => a.shareTime>b.shareTime?1:-1))
                }}>Share Time</button>
            <button onClick={() => {
                setRecipes(oldRecipes => [...oldRecipes!].sort((a, b) => a.shareTime<b.shareTime?1:-1))
                }}>Share Time Descending</button>
        </div>
        <div>Sort by 
            <button onClick={() => {
                setRecipes(oldRecipes => [...oldRecipes!].sort((a, b) => a.preparationTimeInMinutes>b.preparationTimeInMinutes?1:-1))
                }}>Preparation Time</button>
            <button onClick={() => {
                setRecipes(oldRecipes => [...oldRecipes!].sort((a, b) => a.preparationTimeInMinutes<b.preparationTimeInMinutes?1:-1))
                }}>Preparation Time Descending</button>
        </div>
        <div>Sort by 
            <button onClick={() => {
                setRecipes(oldRecipes => [...oldRecipes!].sort((a, b) => a.modificationTime>b.modificationTime?1:-1))
                }}>Modification Time</button>
            <button onClick={() => {
                setRecipes(oldRecipes => [...oldRecipes!].sort((a, b) => a.modificationTime<b.modificationTime?1:-1))
                }}>Modification Time Descending</button>
        </div>

        {recipes?.map( recipe => 
            <RecipeVisualization recipe={recipe}></RecipeVisualization>
        )}
        <Outlet/>
    </div>)
}