import express from 'express';
import { userDatabaseRepository } from '../Users/UserDatabaseRepository';
import { userSchema, User, userDtoSchema, IdentifiableUser, Role } from '../Users/User';
import { Admin, ObjectId } from 'mongodb';
import { bodySchemaValidationMiddleware } from './SchemaValidation';
import { CustomSession, authenticateUser } from './Authentication';


const authorizeUser = async (req: any, res: any, next: any) => {
    const session = req.session as CustomSession
    const user: IdentifiableUser = session.user!

    const userId = req.params.userId;

    if(userId == user._id || user.role ==  Role.Admin){
        next()
    } else {
        res.status(403).json({ error: 'Unauthorized: You are trying to modify an account which is not yours.' });
    }
}
// User routes
export const userRouter = express.Router()

userRouter.get("/users/current", authenticateUser, (req, res) => {
    const session = req.session as CustomSession
    res.status(200)
    res.json(session.user)
})
userRouter.route("/users").get( async (req, res) => {
    const username = req.query.username
    if (username){
        const user = await userDatabaseRepository.getUserByUsername(username as string);
        console.log("Getting user by username: ");
        console.log(user);
        res.json(user)
    } else {
        //TODO it is unsafe to return whole users which have field `password`
        const users = await userDatabaseRepository.getAllUsers(); 
        res.json(users)
    }
}).post(bodySchemaValidationMiddleware(userDtoSchema), async (req, res) => {
    req.body.registrationTime = Date(); 
    req.body.modificatinTime = Date(); 

    const user = req.body as User;
    const newId = await userDatabaseRepository.addUser(user)
    res.status(201)
    res.json(newId)
})

userRouter.route("/users/:userId").get(async (req, res) => {
    const user = await userDatabaseRepository.getUser(new ObjectId(req.params.userId))
    if(user){
        console.log("Getting user by _id: ");
        console.log(user);
        res.json(user)
    } else {
        res.sendStatus(404)
    }
}).put(bodySchemaValidationMiddleware(userSchema), authenticateUser, authorizeUser, async (req, res) => {
    console.log("Updating user: ")
    const id = req.params.userId;
    // The id converts to string when send/receiving requests so we want to convert it back to ObjectId
    const result = await userDatabaseRepository.updateUser({ ...req.body, _id: new ObjectId(id) })
    if (result.modifiedCount === 0) {
        res.status(404)
    }
    res.json(result)
}).delete(bodySchemaValidationMiddleware(userSchema), authenticateUser, authorizeUser, async (req, res) => {
    const result = await userDatabaseRepository.deleteUser(new ObjectId(req.params.userId))
    if(result.deletedCount === 0){
        res.status(404)
    } 
    res.json(result)
})