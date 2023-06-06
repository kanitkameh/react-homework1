import { IdentifiableRecipe, Recipe } from "./Recipe";

class RecipeRepository {
    backendServerPath = "http://localhost:2704";

    async addRecipe(recipe: Recipe){
        fetch(this.backendServerPath+'/recipes', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(recipe)
        })
    }
    async getAllRecipes(){
        let response = await fetch(this.backendServerPath+'/recipes', {
            method: 'GET',
        })
        let json: IdentifiableRecipe[] = await response.json()
        return json
    }

    async getRecipe(recipeId: string){
        let response = await fetch(this.backendServerPath+'/recipes/'+recipeId, {
            method: 'GET',
        })
        let json: IdentifiableRecipe = await response.json()
        return json
    }
    async updateRecipe(recipe: IdentifiableRecipe) {
        fetch(this.backendServerPath+'/recipes/'+recipe._id, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(recipe)
        })
    }
    async deleteRecipe(recipe: IdentifiableRecipe) {
        fetch(this.backendServerPath+'/recipes/'+recipe._id, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
            }
        })
    }
}

export let recipeRepository = new RecipeRepository()