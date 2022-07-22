import { RoomHandlerI, RoomHandler } from "./RoomHandler";
import { Server, Socket } from "socket.io";

export interface ChatServerInterface {
  handleMessageRequest(roomId: string, socket: Socket, message: string): void;
  handleRoomRequest(socket: Socket, method: string, roomId?: string): void;
  run(): void;
}

export enum EVENTS {
  ROOM = "room:post",
  MESSAGE = "message",
}

export class ChatServer implements ChatServerInterface {
  private readonly io: Server;
  private roomHandler: RoomHandler;

  constructor(io: Server) {
    this.io = io;
    this.roomHandler = new RoomHandler(io);
  }

  run() {
    this.io.on("connection", (socket) => {
      socket.on("room:post", (roomId) =>
        this.handleRoomRequest(socket, "post", roomId)
      );
      socket.on("room:delete", (roomId) =>
        this.handleRoomRequest(socket, "delete", roomId)
      );
      socket.on("message", (roomId, message) =>
        this.handleMessageRequest(roomId, socket, message)
      );
    });
  }

  handleMessageRequest(roomId: string, socket: Socket, message: string) {
    this.roomHandler.sendMessageInRoom(roomId, socket, message);
  }

  handleRoomRequest(socket: Socket, method: string, roomId?: string) {
    if (method === "delete") {
      roomId && this.roomHandler.leaveRoom(socket, roomId);
    } else {
      if (!roomId) {
        return this.roomHandler.createRoom(socket);
      }
      if (this.roomHandler.roomExists(roomId)) {
        return this.roomHandler.joinRoom(socket, roomId);
      }
    }
  }
}
