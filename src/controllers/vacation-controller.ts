import express, { NextFunction, Request,  Response } from "express";
import auth from "../utils/auth";
import config from "../utils/Config";
import verifyAdmin from "../middlewares/verify-admin";
import verifyLoggedIn from "../middlewares/verify-logged-in";
import FollowerModel from "../models/follower-model";
import VacationModel from "../models/vacation-model";
import vacationService from "../services/vacationService";


const router = express.Router();

// GET http://localhost:3001/api/vacations
router.get("/api/vacations", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const authHeader = request.header("authorization");
        const vacations = await vacationService.getAllVacations(authHeader);
        response.json(vacations); // status: 200 - OK
    }
    catch (err: any) {
        next(err); // Jumping to catchAll middleware.
    }
});

// GET http://localhost:3001/api/vacations/:vacationId
router.get("/api/vacations/:vacationId", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacationId = +request.params.vacationId;
        const vacation = await vacationService.getOneVacation(vacationId);
        response.json(vacation); // status: 200 - OK
    }
    catch (err: any) {
        next(err); // Jumping to catchAll middleware.
    }
});

// POST http://localhost:3001/api/vacations/:vacationId/follow
router.post("/api/vacations/:vacationId/follow", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const authHeader = request.header("authorization");
        const userId = auth.getUserIdFromToken(authHeader);
        const vacationId = +request.params.vacationId;
        const follow = new FollowerModel(userId, vacationId);
        const addedFollow = await vacationService.addFollow(follow);
        response.status(201).json(addedFollow); // status: 201 - Created
    }
    catch (err: any) {
        next(err); // Jumping to catchAll middleware.
    }
});

// DELETE http://localhost:3001/api/vacations/:vacationId/unfollow
router.delete("/api/vacations/:vacationId/unfollow", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const authHeader = request.header("authorization");
        const userId = auth.getUserIdFromToken(authHeader);
        const vacationId = +request.params.vacationId;
        const deleteFollow = new FollowerModel(userId, vacationId);
        await vacationService.deleteFollow(deleteFollow);
        response.sendStatus(204); // status: 204 - No Content
    }
    catch (err: any) {
        next(err); // Jumping to catchAll middleware.
    }
});

// PUT http://localhost:3001/api/vacations/:vacationId
router.put("/api/vacations/:vacationId", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.image = request.files?.image; // Here are the files given from the front.
        const vacationId = +request.params.vacationId;
        request.body.vacationId = vacationId;  // Set the route vacationId into the body
        const vacation = new VacationModel(request.body);
        const updatedVacation = await vacationService.updateVacation(vacation);
        response.json(updatedVacation); // status: 200 - OK
    }
    catch (err: any) {
        next(err); // Jumping to catchAll middleware.
    }
});

// POST http://localhost:3001/api/vacations
router.post("/api/vacations", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.image = request.files?.image; // Here are the files given from the front.
        const vacation = new VacationModel(request.body);
        const addedVacation = await vacationService.addVacation(vacation);
        response.status(201).json(addedVacation); // status: 201 - Created
    }
    catch (err: any) {
        next(err); // Jumping to catchAll middleware.
    }
});

// DELETE http://localhost:3001/api/vacations/:vacationId
router.delete("/api/vacations/:vacationId", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacationId = +request.params.vacationId;
        await vacationService.deleteVacation(vacationId);
        response.sendStatus(204); // status: 204 - No Content
    }
    catch (err: any) {
        next(err); // Jumping to catchAll middleware.
    }
});

export default router;