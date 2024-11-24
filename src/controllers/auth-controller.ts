import express, { NextFunction, Request, Response } from "express";
import CredentialsModel from "../models/credentials-model";
import UserModel from "../models/user-model";
import authService from "../services/authService";
import { logIt } from "../middlewares/logIt";

const router = express.Router();

// POST http://localhost:3001/api/auth/register
router.post("/api/auth/register", async (request: Request, response: Response, next: NextFunction) => {
    try {
       const user = new UserModel(request.body);
       const token = await authService.register(user);
       response.status(201).json(token);
    }
    catch (err: any) {
        next(err); // Jumping to catchAll middleware.
    }
});

// POST http://localhost:3001/api/auth/login
router.post("/api/auth/login", async (request: Request, response: Response, next: NextFunction) => {
    try {
       const credentials = new CredentialsModel(request.body);
       const token = await authService.login(credentials);
       response.json(token);
    }
    catch (err: any) {
        next(err); // Jumping to catchAll middleware.
    }
});

// GET http://localhost:3001/api/auth/:username
router.get("/api/auth/:username", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const exists = await authService.usernameExists(request.params.username);
        response.json(exists);
    }
    catch (err: any) {
        next(err); // Jumping to catchAll middleware.
    }
});


export default router;