import app from "./app.js";
import "./database.js";


import { createServer } from 'http';
import sockets from './sockets.js';
import { Server as WebSocketServer } from "socket.io";

const server = createServer(app);
const httpServer = server.listen(app.get("port"));
const io = new WebSocketServer(httpServer);

console.log("Server on port", app.get("port"));
console.log("Environment:", process.env.NODE_ENV);
sockets(io);


export default io;





 






