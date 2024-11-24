import { NextFunction, Request, Response } from "express";
import auth from "../utils/auth";
import { UnauthorizeError } from "../models/client-errors";
import { logIt } from "./logIt";
import { writeAccessLog } from "../utils/helpers";


async function verifyLoggedIn(request: Request, response: Response, next: NextFunction): Promise<void> {
    logIt
    writeAccessLog

    // Extract authorization header's value (suppose to be "Bearer token");
    const authHeader = request.header("authorization");

    // Verify token: 
    const isValid = await auth.verifyToken(authHeader);

    // If token is not valid:
    if (!isValid) {
        next(new UnauthorizeError("You are not logged-in !")); // Catch all middleware.
        return;
    }

    // All ok:
    next();// Continue to next middleware or to desired route.
}

export default verifyLoggedIn;