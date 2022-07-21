import express from "express";
import http from "http";
import { Server } from "socket.io";
import { ChatServer, ChatServerInterface } from "./util/ChatServer";
const app = express();
const port = 8080;

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

const chatServer: ChatServerInterface = new ChatServer(io);
chatServer.run();

// start the express server
server.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});

export { io };
