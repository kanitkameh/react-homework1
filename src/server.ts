import express, { NextFunction } from 'express';
import { User } from './Users/User';
import { ObjectId } from 'mongodb';
import { recipeDatabaseRepository } from './Recipes/RecipeDatabaseRepository';
import { Recipe, validateRecipe } from './Recipes/Recipe';
import { authenticateUser, authenticationRouter, CustomSession } from './Backend/Authentication';
import { userRouter } from './Backend/UserRoutes';
import { eventRouter } from './Backend/EventRoutes';
import { ticketRouter } from './Backend/TicketRoutes';

const app = express()

const port = 2704

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Additional middleware which will set headers that we need on each request.
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Cookie, Host, Origin');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
    res.setHeader('Access-Control-Max-Age', 3600); // 1 hour
    // Disable caching so we'll always get the latest posts.
    res.setHeader('Cache-Control', 'no-cache');
    next();
});


//recipe routes
app.route("/recipes").get( async (req, res) => {
    const recipes = await recipeDatabaseRepository.getAllRecipes();
    res.json(recipes)
}).post(async (req, res) => {
    // Access the authenticated user from the session
    const session = req.session as CustomSession
    const user: User = session.user!; //should be fine since we 
    console.log("Authenticated "+ user.username + " is adding recipe")

    const recipe = req.body;
    let problems = validateRecipe(recipe)
    if(problems.length === 0){
        const newId = await recipeDatabaseRepository.addRecipe(recipe as Recipe)
        res.status(201)
        res.json(newId)
    } else{
        res.status(400)
        res.json(problems)
    }

})

app.route("/recipes/:recipeId").get(async (req, res) => {
    const recipe = await recipeDatabaseRepository.getRecipe(new ObjectId(req.params.recipeId))
    if(recipe){
        console.log("Getting recipe by _id: ");
        console.log(recipe);
        res.json(recipe)
    } else {
        res.sendStatus(404)
    }
}).put(async (req, res) => {
    console.log("Updating recipe: ")
    let problems = validateRecipe(req.body)
    if(problems.length === 0){
        const id = req.body._id;
        // The id converts to string when send/receiving requests so we want to convert it back to ObjectId
        const result = await recipeDatabaseRepository.updateRecipe({ ...req.body, _id: new ObjectId(id) })
        if (result.modifiedCount === 0) {
            res.status(404)
        }
        res.json(result)
    } else {
        res.status(400)
        res.json(problems)
    }
}).delete(async (req, res) => {
    const result = await recipeDatabaseRepository.deleteRecipe(new ObjectId(req.params.recipeId))
    if(result.deletedCount === 0){
        res.status(404)
    } 
    res.json(result)
})

app.use('/', authenticationRouter)
app.use('/', userRouter)
app.use('/', eventRouter)
app.use('/', ticketRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})