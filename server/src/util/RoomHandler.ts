import { v4 as uuidv4 } from "uuid";
import { Socket, Server } from "socket.io";

/**
 * Handles room-related events
 */
export interface RoomHandlerI {
  roomExists(roomId: string): boolean;
  deleteRoom(roomId: string): boolean;
  createRoom(socket: Socket): string;
}

export class RoomHandler implements RoomHandlerI {
  private readonly server: Server;

  constructor(server: Server) {
    this.server = server;
  }

  roomExists(roomId: string): boolean {
    console.log(this.server.sockets.adapter.rooms.has(roomId));
    return this.server.sockets.adapter.rooms.has(roomId);
  }

  deleteRoom(roomId: string): boolean {
    throw new Error("Method not implemented.");
  }

  createRoom(socket: Socket): string {
    const newRoomId = uuidv4();
    console.log(newRoomId + "  a");
    this.joinRoom(socket, newRoomId);
    return newRoomId;
  }

  sendMessageInRoom(roomId: string, socket: Socket, message: string): void {
    if (this.roomExists(roomId)) {
      socket.to(roomId).emit("message", message);
    }
  }

  joinRoom(socket: Socket, roomId: string): void {
    socket.join(roomId);
    this.server.to(socket.id).emit("room:post", roomId);
  }

  leaveRoom(socket: Socket, roomId: string): void {
    socket.leave(roomId);
  }
}
