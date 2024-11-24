import UserModel from "../models/user-model";
import jwt from "jsonwebtoken";
import config from "./Config";
import { AppExcption, UnauthorizedError } from "../models/exceptions";


export function verifyToken(token: string, adminRequired: boolean = false) {
    if (!token){
        throw new UnauthorizedError("Missing Credentials!")
    }
    try {        
        const res = jwt.verify(token, config.jwtSecrete) as {userWithoutPassword: UserModel};
        if (adminRequired && !res.userWithoutPassword.roleId){
            throw new UnauthorizedError("Only admin user has access!");
        }
        return res.userWithoutPassword

    } catch (error) {
        if (error instanceof AppExcption){
            throw error;
        }        
        throw new UnauthorizedError("ERROR: Wrong Credentials!");
    }
}

export function createToken(user: UserModel): string {
    const userWithoutPassword = {...user};
    delete userWithoutPassword.password;

    // const options = {expiresIn: "3h"};
    const options = {};
    const token = jwt.sign({userWithoutPassword}, config.jwtSecrete, options)

    return token;
}

