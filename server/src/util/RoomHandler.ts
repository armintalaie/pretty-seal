import { v4 as uuidv4 } from "uuid";
import { Socket, Server } from "socket.io";
import { RoomRequest, User } from "./ChatServer";

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
  createRoom(socket: Socket, roomRequest: RoomRequest): string;
}

interface UserDirectory {
  [userId: string]: User;
}

export class RoomHandler implements RoomHandlerI {
  private readonly MAX_ROOM_MEMBERS = 3;
  private readonly server: Server;
  private users: UserDirectory = {};

  constructor(server: Server) {
    this.server = server;
  }

  roomExists(roomId: string): boolean {
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

  createRoom(socket: Socket, roomRequest: RoomRequest): string {
    const newRoomId = uuidv4();
    const newRoom = { ...roomRequest, roomId: newRoomId };
    this.joinRoom(socket, newRoom);
    return newRoomId;
  }

  sendMessageInRoom(roomId: string, socket: Socket, message: string): void {
    if (!this.users[socket.id]) {
      return;
    }
    const username: string = this.users[socket.id]
      ? this.users[socket.id].displayName
      : socket.id;

    if (this.roomExists(roomId)) {
      const messageToSend: Message = {
        text: message,
        date: Date(),
        username: username,
        displayName: socket.data.name ? socket.data.name : socket.id,
      };
      socket.to(roomId).emit("message", messageToSend);
    }
  }

  joinRoom(socket: Socket, roomRequest: RoomRequest): void {
    if (
      this.server.sockets.adapter.rooms.get(roomRequest.roomId!)?.size ===
      this.MAX_ROOM_MEMBERS
    ) {
      return;
    }
    socket.join(roomRequest.roomId!);
    this.users[socket.id] = {
      userId: socket.id,
      displayName: roomRequest.displayName
        ? roomRequest.displayName
        : socket.id,
    };
    this.server.to(socket.id).emit("room:post", roomRequest.roomId);
  }

  leaveRoom(socket: Socket, roomId: string): void {
    socket.leave(roomId);
    if (this.server.sockets.adapter.rooms.get(roomId)?.size === 1) {
      this.deleteRoom(roomId);
    }
  }
}
