import { v4 as uuidv4 } from "uuid";
import { Socket, Server } from "socket.io";

export interface Message {
  text: string;
  date: string;
  username: string;
  displayName: string;
}
/**
 * Handles room-related events
 */
export interface RoomHandlerI {
  roomExists(roomId: string): boolean;
  deleteRoom(roomId: string): void;
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

  async deleteRoom(roomId: string): Promise<void> {
    const userSockets = await this.server.fetchSockets();
    this.server.sockets.adapter.rooms.get(roomId)?.forEach((id) => {
      const userSocket = userSockets.find(
        (socket) => socket.id.toString() === id
      );
      userSocket?.leave(roomId);
    });
  }

  createRoom(socket: Socket): string {
    const newRoomId = uuidv4();
    this.joinRoom(socket, newRoomId);
    return newRoomId;
  }

  sendMessageInRoom(roomId: string, socket: Socket, message: string): void {
    if (this.roomExists(roomId)) {
      const messageToSend: Message = {
        text: message,
        date: Date(),
        username: socket.id,
        displayName: socket.data.name ? socket.data.name : socket.id,
      };
      socket.to(roomId).emit("message", messageToSend);
    }
  }

  joinRoom(socket: Socket, roomId: string): void {
    socket.join(roomId);
    this.server.to(socket.id).emit("room:post", roomId);
  }

  leaveRoom(socket: Socket, roomId: string): void {
    socket.leave(roomId);
    if (this.server.sockets.adapter.rooms.get(roomId)?.size == 1) {
      this.deleteRoom(roomId);
    }
  }
}
