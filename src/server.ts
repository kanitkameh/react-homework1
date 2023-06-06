import express from 'express';
import { userDatabaseRepository } from './Users/UserDatabaseRepository';
import { User } from './Users/User';
import { ObjectId } from 'mongodb';

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 2704

app.route("/users").get( async (req, res) => {
    const username = req.query.username
    if (username){
        const users = await userDatabaseRepository.getUserByUsername(username as string);
        res.json(users)
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
        res.json(user)
    } else {
        res.sendStatus(404)
    }
}).put(async (req, res) => {
    const result = await userDatabaseRepository.updateUser(req.body)
    if (result.modifiedCount === 0) {
        res.sendStatus(404)
    } else {
        res.json(result)
    }
    res.json(result)
}).delete(async (req, res) => {
    const result = await userDatabaseRepository.deleteUser(new ObjectId(req.params.userId))
    if(result.deletedCount === 0){
        res.sendStatus(404)
    } else {
        res.json(result)
    }
})


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})