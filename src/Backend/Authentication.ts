import express, { NextFunction } from 'express';
import { userDatabaseRepository } from '../Users/UserDatabaseRepository';
import { IdentifiableUser, User } from '../Users/User';
import session, { Session } from 'express-session';

export interface CustomSession extends Session {
  user?: IdentifiableUser;
}

export const authenticationRouter = express.Router()
// Configure session middleware
authenticationRouter.use(
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
export const authenticateUser = (req: any, res: any, next: NextFunction) => {
    if (req.session && req.session.user) {
        // User is authenticated, proceed to the next middleware or route
        next();
    } else {
        // User is not authenticated, redirect to the login page or send an error response
        res.status(401).json({ error: 'Unauthorized' });
    }
};

authenticationRouter.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    const user = await userDatabaseRepository.getUserByUsername(username as string);
    const isValidCredentials = user?.username === username && user?.password === password
  
    if (isValidCredentials) {
        const session = req.session as CustomSession;
        session.user = user!;

        res.location("localhost:3000/")
        res.json({ message: 'Login successful' });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
});

authenticationRouter.post('/logout', authenticateUser, (req, res) => {
  req.session.destroy(() => {
      res.clearCookie("connect.sid")
      res.location("/")
      res.json({ message: 'Logout successful' });
  });
});