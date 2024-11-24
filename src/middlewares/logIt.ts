import { NextFunction, Request, Response } from "express";
import { writeAccessLog } from "../utils/helpers";

export async function logIt(req: Request, res: Response, next: NextFunction) {    
    writeAccessLog(`New ${req.method} to: ${req.url}`);
    next();
}