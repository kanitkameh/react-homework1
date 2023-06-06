import express from 'express';
import { userDatabaseRepository } from './Users/UserDatabaseRepository';
import { User } from './Users/User';
import { ObjectId } from 'mongodb';

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

// User routes
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
}).post(async (req, res) => {
    const user = req.body as User;
    //TODO validate userData
    const newId = await userDatabaseRepository.addUser(user)
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
}).put(async (req, res) => {
    console.log("Updating user: ")
    const id = req.body._id;
    // The id converts to string when send/receiving requests so we want to convert it back to ObjectId
    const result = await userDatabaseRepository.updateUser({...req.body, _id: new ObjectId(id)})
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

//TODO recipe routes

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})