import express, { NextFunction } from 'express';
import { userDatabaseRepository } from './Users/UserDatabaseRepository';
import userSchema, { User } from './Users/User';
import { ObjectId } from 'mongodb';
import { recipeDatabaseRepository } from './Recipes/RecipeDatabaseRepository';
import { Recipe, validateRecipe } from './Recipes/Recipe';
import { ObjectSchema, ValidationError } from 'yup';
import session, { Session } from 'express-session';

const app = express()

const port = 2704

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Additional middleware which will set headers that we need on each request.
app.use(function (req, res, next) {
    // Set permissive CORS header - this allows this server to be used only as
    // an API server in conjunction with something like webpack-dev-server.
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader(`Access-Control-Allow-Methods`, `GET, POST, PUT, DELETE, OPTIONS`);
    res.setHeader('Access-Control-Max-Age', 3600); // 1 hour
    // Disable caching so we'll always get the latest posts.
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

const bodySchemaValidationMiddleware = (schema: ObjectSchema<any>) => {
  return async (req: any , res: any , next: NextFunction) => {
    try {
      const userData = req.body;
      await schema.validate(userData, { abortEarly: false });
      next();
    } catch (error) {
      const validationErrors: { [key: string]: string } = {};
      if (error instanceof ValidationError) {
        error.inner.forEach((err) => {
          validationErrors[err.path ?? 'unknown'] = err.message;
        });
      }
      res.status(400).json({ errors: validationErrors });
    }
  };
};

// User routes
interface CustomSession extends Session {
  user?: User;
}
// Configure session middleware
app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: false,
        secure: false  //TODO only for debugging purposes
    }
  })
);

// Custom middleware to check if the user is authenticated
const authenticateUser = (req: any, res: any, next: NextFunction) => {
    if (req.session && req.session.user) {
        // User is authenticated, proceed to the next middleware or route
        next();
    } else {
        // User is not authenticated, redirect to the login page or send an error response
        res.status(401).json({ error: 'Unauthorized' });
    }
};

// Example login endpoint
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    const user = await userDatabaseRepository.getUserByUsername(username as string);
    const isValidCredentials = user?.username === username && user?.password === password
  
    if (isValidCredentials) {
        const session = req.session as CustomSession;
        // Set the authenticated user in the session
        session.user = user!;
      res.json({ message: 'Login successful' });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  });

// Example logout endpoint
app.post('/logout', authenticateUser, (req, res) => {
  // Destroy the session and logout the user
  req.session.destroy(() => {
    res.json({ message: 'Logout successful' });
  });
});

app.route("/users").get( async (req, res) => {
    const username = req.query.username
    if (username){
        const user = await userDatabaseRepository.getUserByUsername(username as string);
        console.log("Getting user by username: ");
        console.log(user);
        res.json(user)
    } else {
        const users = await userDatabaseRepository.getAllUsers();
        res.json(users)
    }
}).post(bodySchemaValidationMiddleware(userSchema), async (req, res) => {
    const user = req.body as User;
    const newId = await userDatabaseRepository.addUser(user)
    res.status(201)
    res.json(newId)
})

app.route("/users/:userId").get(async (req, res) => {
    const user = await userDatabaseRepository.getUser(new ObjectId(req.params.userId))
    if(user){
        console.log("Getting user by _id: ");
        console.log(user);
        res.json(user)
    } else {
        res.sendStatus(404)
    }
}).put(bodySchemaValidationMiddleware(userSchema), async (req, res) => {
    console.log("Updating user: ")
    const id = req.body._id;
    // The id converts to string when send/receiving requests so we want to convert it back to ObjectId
    const result = await userDatabaseRepository.updateUser({ ...req.body, _id: new ObjectId(id) })
    if (result.modifiedCount === 0) {
        res.status(404)
    }
    res.json(result)
}).delete(async (req, res) => {
    const result = await userDatabaseRepository.deleteUser(new ObjectId(req.params.userId))
    if(result.deletedCount === 0){
        res.status(404)
    } 
    res.json(result)
})

//recipe routes
app.route("/recipes").get( async (req, res) => {
    const recipes = await recipeDatabaseRepository.getAllRecipes();
    res.json(recipes)
}).post(authenticateUser,async (req, res) => {
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

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})