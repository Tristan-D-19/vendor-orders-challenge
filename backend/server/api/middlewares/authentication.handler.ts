import { Request, Response, NextFunction } from 'express';
import DescopeClient from '@descope/node-sdk';

let descopeClient: any;
const descopeProjectId = process.env.DESCOPE_PROJECT_ID ? process.env.DESCOPE_PROJECT_ID: ""
try {
    descopeClient = DescopeClient({ projectId:descopeProjectId });
} catch (error) {
    console.log("failed to initialize: " + error);
}

const validateUserSession = async (req: Request, res: Response, next: NextFunction) => {
    const sessionToken = getTokenFromHeaders(req);

    if (!sessionToken) {
        return res.status(401).send('Authorization header missing.');
    }

    try {
        const authInfo = await descopeClient.validateSession(sessionToken);
        if(authInfo){
            console.log("Successfully validated user session:");

        }
      

       return next(); 
    } catch (error) {
        console.log("Could not validate user session: " + error);
        res.status(401).send('Invalid user session.');
    }
};


function getTokenFromHeaders(req: Request) {
    const authHeader = req.headers.authorization;
  
    if (authHeader && authHeader.startsWith('Bearer ')) {
      return authHeader.split(' ')[1]; // This will return the token without the "Bearer" part
    }
    return null;
  }
export default validateUserSession;