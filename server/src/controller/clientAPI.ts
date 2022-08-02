import express from "express";
import { Configration } from "../model/configuration";
import { spaceManager } from "../index";
import { IUser } from "../model/roomHandler";

const router = express.Router();

router.post("/", (req, res) => {
  const domainId: string = req.body.domainId;
  const spaceInfo = spaceManager.createSpace(domainId);
  res.send(spaceInfo);
});

router.get("/:id", (req, res) => {
  const domainId: string = req.params.id;
  const spaceInfo = spaceManager.getSpace(domainId);
  res.send(spaceInfo);
});

router.delete("/:id", (req, res) => {
  const domainId: string = req.params.id;
  spaceManager.deleteSpace(domainId);
  res.sendStatus(200);
});

router.get("/:id/configuration", (req, res) => {
  const domainId: string = req.params.id;
  const configuration: Configration =
    spaceManager.getSpaceConfiguration(domainId);
  res.send(configuration);
});

router.put("/:id/configuration", (req, res) => {
  const domainId: string = req.params.id;
  const newConfiguration = req.body.configuration;
  spaceManager.updateSpaceConfiguration(domainId, newConfiguration);
  res.sendStatus(200);
});

router.post("/:id/rooms", (req, res) => {
  const domainId: string = req.params.id;
  const roomId = spaceManager.getSpace(domainId).createRoom();
  const user: IUser = { ...req.body };
  spaceManager.getSpace(domainId).joinRoom(user, roomId);
  res.send({ room: roomId });
});

router.get("/:spaceid/rooms/:roomid", (req, res) => {
  const domainId: string = req.params.spaceid;
  const roomId: string = req.params.roomid;
  res.send(roomId);
});

router.post("/:spaceid/rooms/:roomid/users", (req, res) => {
  const domainId: string = req.params.spaceid;
  const roomId: string = req.params.roomid;
  const user: IUser = { ...req.body };
  console.log(user);
  spaceManager.getSpace(domainId).joinRoom(user, roomId);
  res.send({ room: roomId });
});

export { router };
