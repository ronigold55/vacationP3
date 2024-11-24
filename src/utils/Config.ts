import path from "path";

class Config {
    public port = 3001;
    // readonly port : number = 4000;
    // readonly routePrefix = "/api/v1";
    public mysqlHost = "localhost";
    public mysqlUser = "root";
    public mysqlPassword = "";
    public mysqlDatabase = "vacation";
    public imagesFolder = path.resolve(__dirname, "..", "assets", "images");
    readonly errorLogFile = path.resolve(__dirname, "..", "logs", "error.log");
    readonly accessLogFile = __dirname + "\\..\\logs\\access.log";
    readonly prodcutsImagesPrefix = path.resolve(__dirname, "..", "assets", "images");
    readonly jwtSecrete = "";



}

const config = new Config();

export default config;