import { DEFAULT_LIMITATION, Limitation } from "./limitation";
import { v4 as uuidv4 } from "uuid";
import { Configration, DEFAULT_CONFIG } from "./configuration";
import { Namespace } from "socket.io";
import { IUser, Room } from "./roomHandler";

export interface SpaceInfo {
  domainId: string;
  name: string;
  clientSecret: string;
  configuration: Configration;
  limitation: Limitation;
  rooms: string[];
}

export interface SpaceI {
  domainId: string;
  createRoom(): string;
  getRoom(roomId: string): Room;
  joinRoom(user: IUser, roomId: string): void;
  deleteRoom(roomId: string): void;
  getSpaceConfiguration(): Configration;
  updateSpaceConfiguration(configuration: Configration): void;
  getSpaceInfo(): SpaceInfo;
}

export class Space implements SpaceI {
  private namespace: Namespace;
  domainId: string;
  private name: string;
  private clientSecret: string;
  private configuration: Configration;
  private limitation: Limitation;
  private rooms: Room[] = [];
  private MAIN_ROOM = "MAIN_ROOM";

  constructor(name: string, namespace: Namespace) {
    this.name = name;
    this.domainId = uuidv4();
    this.clientSecret = uuidv4();
    this.configuration = DEFAULT_CONFIG;
    this.limitation = DEFAULT_LIMITATION;
    this.namespace = namespace;
    this.handleSpaceConnections();
  }

  handleSpaceConnections() {
    this.namespace.on("connection", async (socket) => {
      socket.join(this.MAIN_ROOM);
      socket.on("message", (roomId, message) => {
        console.log(this.getRoom(roomId).getUsers());
        const messageToSend = {
          text: message,
          date: Date(),
          username: socket.id,
          displayName: this.getRoom(roomId).getUser(socket.id)?.name,
        };
        socket.in(roomId).emit("message", messageToSend);
      });
    });
  }

  getSpaceInfo(): SpaceInfo {
    return {
      domainId: this.domainId,
      name: this.name,
      clientSecret: this.clientSecret,
      configuration: this.configuration,
      limitation: this.limitation,
      rooms: this.rooms.map((room) => room.getRoomInfo()),
    };
  }

  createRoom(): string {
    const roomId = uuidv4();
    const newRoom = new Room(roomId, this.namespace.in(roomId));
    this.rooms.push(newRoom);
    return newRoom.id;
  }

  deleteRoom(roomId: string): void {
    this.namespace.in(roomId).disconnectSockets(true);
  }

  getRoom(roomId: string): Room {
    return this.rooms.find((room) => room.id === roomId)!;
  }

  joinRoom(user: IUser, roomId: string): void {
    this.namespace.in(user.id).socketsJoin(roomId);
    const room = this.rooms.find((room) => room.id === roomId)!;
    console.log(user);
    room.addUser(user);
  }

  getSpaceConfiguration(): Configration {
    return this.configuration;
  }

  updateSpaceConfiguration(configuration: Configration): void {
    this.configuration = Object.assign(this.configuration, configuration);
  }
}
