import express from "express";
import cors from "cors";
import catchAll from "./middlewares/catch-all";
import routeNotFound from "./middlewares/route-not-found";
import vacationController from "./controllers/vacation-controller";
import config from "./utils/Config";
import expressFileUpload from "express-fileupload";
import authController from "./controllers/auth-controller";
import imagesController from "./controllers/images-controller";

// Create server object: 
const server = express();
server.use(cors());
// Tell express to read the body json object:
server.use(express.json());
// Handle files: 
server.use(expressFileUpload());

// Route any request to the server into our controller:
server.use("/", vacationController);
server.use("/", authController);
server.use("/", imagesController);
server.use("*", routeNotFound);
server.use(catchAll);

server.listen(config.port, () => console.log("Listening on http://localhost:" + config.port));