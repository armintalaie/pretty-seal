import { io, Socket } from "socket.io-client";

class Client {
  private url: string;
  private socket: Socket;

  constructor(url: string) {
    this.url = url;
    this.socket = io(this.url);
  }

  public sendMessage(message: String) {
    this.socket.emit("ev", message);
  }

  public createRoom(message: String) {
    this.socket.emit("room", "room");
    this.socket.on("room", (arg, callback) => {
      console.log("akakakak");
      console.log(arg);
    });
  }

  public joinRoom(message: String) {
    this.socket.emit("ev", message);
  }

  public inviteToRoom(message: String) {
    this.socket.emit("ev", message);
  }

  public leaveRoom(message: String) {
    this.socket.emit("ev", message);
  }
}

const client = new Client("http://localhost:8080");

//client.sendMessage("He");
client.createRoom("room");
