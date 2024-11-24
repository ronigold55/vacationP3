import { NextFunction, Request, Response } from "express";
import { AppExcption } from "../models/exceptions";
import { StatusCode } from "../models/statusEnum";
import { writeErrorLog } from "../utils/helpers";


function catchAll(err: any, request: Request, response: Response, next: NextFunction): void {

    // Log error to console:
    console.log(err);

    // TODO: add to msg more info, as date-time and ip etc...
    writeErrorLog(err.message);

    if (err instanceof AppExcption){
        response.status(err.status).send(err.message);
        return
    }

    // log error to log file...

    // Get status code: 
    const statusCode = err.status ? err.status : 500;

    // Return error to frontend: 
    response.status(StatusCode.ServerError).send("Internal Server Error")            
}

export default catchAll;


