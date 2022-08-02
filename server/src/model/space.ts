import { DEFAULT_LIMITATION, Limitation } from "./limitation";
import { v4 as uuidv4 } from "uuid";
import { Configration, DEFAULT_CONFIG } from "./configuration";
import { Namespace } from "socket.io";

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
  getRoom(): string;
  joinRoom(id: string, roomId: string): void;
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
  private rooms: string[] = [];
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
        const messageToSend = {
          text: message,
          date: Date(),
          username: socket.id,
          displayName: socket.data.name ? socket.data.name : socket.id,
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
      rooms: this.rooms.map((room) => room),
    };
  }

  createRoom(): string {
    const newRoomId = uuidv4();
    this.rooms.push(newRoomId);
    return newRoomId;
  }

  deleteRoom(roomId: string): void {
    this.namespace.in(roomId).disconnectSockets(true);
  }

  getRoom(): string {
    return "";
  }

  joinRoom(id: string, roomId: string): void {
    this.namespace.in(id).socketsJoin(roomId);
  }

  getSpaceConfiguration(): Configration {
    return this.configuration;
  }

  updateSpaceConfiguration(configuration: Configration): void {
    this.configuration = Object.assign(this.configuration, configuration);
  }
}
