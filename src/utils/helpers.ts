import runQuery from "../db/dal";
import { promises as fs } from "fs";
import config from "./Config";
import { UploadedFile } from "express-fileupload";
import { v4 as uuid } from "uuid";
import path from "path";

export async function isDbServerUp() {    
    try {
        await runQuery("select id from product where id=0;");
        return true;
    } catch (error) {
        return false;        
    }
}

async function writeToFile(filepath: string, content: string) {
    await fs.appendFile(filepath, content + "\n");
}

export async function writeErrorLog(errMsg: string) {    
    writeToFile(config.errorLogFile, errMsg);
}

export async function writeAccessLog(msg: string) {
    writeToFile(config.accessLogFile, msg);
}

export async function saveImage(image: UploadedFile) {    
    const extension = image.name.substring( image.name.lastIndexOf("."))
    const filename = uuid() + extension;
    const fullpath = path.join(config.prodcutsImagesPrefix, filename);
    await image.mv(fullpath);
    return filename;
}