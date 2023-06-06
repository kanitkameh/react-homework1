import { IdentifiableRecipe, Recipe } from "./Recipe";
import { Db, MongoClient, ObjectId } from 'mongodb';

const dbUrl = 'mongodb://localhost:27017/';

const dbName = 'cooking'
const collection = 'recipes'

let db: Db;

class RecipeDatabaseRepository {

    constructor(){
        this.connect()
    }

    async connect(): Promise<void>{
        const con = await MongoClient.connect(dbUrl);
        db = con.db(dbName);
    }

    async addRecipe(recipe: Recipe){
        const res = await db.collection(collection).insertOne(recipe);
        return res.insertedId
    }
    async getAllRecipes(): Promise<IdentifiableRecipe[]>{
        const recipes = await db.collection(collection).find<IdentifiableRecipe>({}).toArray();
        return recipes;
    }

    async getRecipe(recipeId: ObjectId){
        const recipe = await db.collection(collection)
            .findOne<IdentifiableRecipe>({ _id: recipeId });
        return recipe;
    }
    async deleteRecipe(recipeId: ObjectId){
        const recipe = await db.collection(collection)
            .deleteOne({ _id: recipeId });
        return recipe;
    }
    async updateRecipe(recipe: IdentifiableRecipe) {
        const result = await db.collection(collection).replaceOne({ _id: new ObjectId(recipe._id) }, recipe);
        return result;
    }

}

export let recipeDatabaseRepository = new RecipeDatabaseRepository()