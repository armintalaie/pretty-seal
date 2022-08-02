import { v4 as uuidv4 } from "uuid";
import { BroadcastOperator, Event } from "socket.io";

export class Room {
  private users: User[] = [];
  private name: string = "Room";
  id: string;
  room: BroadcastOperator<Event, any>;

  constructor(roomId: string, room: BroadcastOperator<Event, any>) {
    this.id = roomId;
    this.room = room;
  }

  public getUser(userId: string) {
    return this.users.find((user) => user.id === userId);
  }
  public deleteUser(userId: string) {
    this.users = this.users.filter((user) => user.id !== userId);
  }

  public getRoomInfo(): string {
    return this.name;
  }

  public addUser(user: IUser) {
    const newUser = new User();
    newUser.id = user.id;
    newUser.name = user.name;
    this.users.push(newUser);
  }

  public getUsers() {
    return this.users;
  }
}

class User {
  id: string = "";
  name: string = "";
}

export interface IUser {
  name: string;
  id: string;
}
