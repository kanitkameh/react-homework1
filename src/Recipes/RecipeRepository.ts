import { IdentifiableRecipe, Recipe } from "./Recipe";

class RecipeRepository {
    jsonServerPath = "http://localhost:3001";
    async addRecipe(recipe: Recipe){
        fetch(this.jsonServerPath+'/recipes', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(recipe)
        })
    }
    async getAllRecipes(){
        let response = await fetch(this.jsonServerPath+'/recipes', {
            method: 'GET',
        })
        let json: [IdentifiableRecipe] = await response.json()
        return json
    }

    async getRecipe(recipeId: string){
        let response = await fetch(this.jsonServerPath+'/recipes/'+recipeId, {
            method: 'GET',
        })
        let json: IdentifiableRecipe = await response.json()
        return json
    }
    async updateRecipe(recipe: IdentifiableRecipe) {
        fetch(this.jsonServerPath+'/recipes/'+recipe.id, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(recipe)
        })
    }
}

export let recipeRepository = new RecipeRepository()