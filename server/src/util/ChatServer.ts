import { RoomHandlerI, RoomHandler } from "./RoomHandler";
import { Server, Socket } from "socket.io";

export interface ChatServerInterface {
  handleMessageRequest(roomId: string, socket: Socket, message: string): void;
  handleRoomRequest(
    socket: Socket,
    method: string,
    roomRequest: RoomRequest
  ): void;
  run(): void;
}

export enum EVENTS {
  ROOM = "room:post",
  MESSAGE = "message",
}

export interface Message {
  text: string;
  date: string;
  username: string;
  displayName: string;
}

export interface User {
  userId: string;
  displayName: string;
}

export interface RoomRequest {
  roomId?: string;
  displayName?: string;
  roomToken: number;
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
      socket.on("room:post", (roomRequest: RoomRequest) =>
        this.handleRoomRequest(socket, "post", roomRequest)
      );
      socket.on("room:leave", (roomId) =>
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

  handleRoomRequest(socket: Socket, method: string, roomRequest: RoomRequest) {
    if (method === "delete") {
      roomRequest.roomId &&
        this.roomHandler.leaveRoom(socket, roomRequest.roomId);
    } else {
      if (!roomRequest.roomId) {
        return this.roomHandler.createRoom(socket, roomRequest);
      }
      if (this.roomHandler.roomExists(roomRequest.roomId)) {
        return this.roomHandler.joinRoom(socket, roomRequest);
      }
    }
  }
}
