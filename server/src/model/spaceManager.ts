import { SocketUtil } from "../util/socketUtil";
import { Configration } from "./configuration";
import { Server } from "socket.io";
import { Space, SpaceI, SpaceInfo } from "./space";

export interface ISpaceManager {
  createSpace(domainId: string): SpaceInfo;
  deleteSpace(domainId: string): void;
  getSpace(domainId: string): SpaceI;
  getSpaceConfiguration(domainId: string): Configration;
  updateSpaceConfiguration(
    domainId: string,
    newConfiguration: Configration
  ): Configration;
}

export class SpaceManager implements ISpaceManager {
  private spaces: SpaceI[] = [];
  private readonly MAIN_SPACE = "MAIN_SPACE";
  private socketUtil: SocketUtil;
  private readonly server: Server;

  constructor(server: Server) {
    this.server = server;
    this.socketUtil = new SocketUtil(server);
    this.createSpace(this.MAIN_SPACE);
  }

  public createSpace(domainname: string) {
    if (this.spaces.find((space) => space.domainId === domainname)) {
      throw new Error("Space with domain name already exists");
    }

    const space: SpaceI = new Space(
      domainname,
      this.server.of(`/${domainname}`)
    );
    this.spaces.push(space);
    return space.getSpaceInfo(space.getSpaceSecret());
  }

  public deleteSpace(domainId: string) {
    this.spaces = this.spaces.filter((space) => space.domainId !== domainId);
  }

  getSpace(domainId: string): SpaceI {
    const space: SpaceI | undefined = this.spaces.find(
      (space) => space.domainId === domainId
    );
    if (space) {
      return space;
    } else {
      return this.spaces[0];
    }
  }

  private getAdminSpace(domainId: string) {
    const space: SpaceI | undefined = this.spaces.find(
      (space) => space.domainId === domainId
    );
    if (space) {
      return space;
    } else {
      throw new Error();
    }
  }

  public getSpaceConfiguration(domainId: string): Configration {
    return this.getSpace(domainId).getSpaceConfiguration();
  }

  public updateSpaceConfiguration(
    domainId: string,
    newConfiguration: Configration
  ): Configration {
    this.getAdminSpace(domainId).updateSpaceConfiguration(newConfiguration);
    return this.getSpace(domainId).getSpaceConfiguration();
  }
}
