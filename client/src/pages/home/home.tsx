import { useContext } from "react";
import SpaceView from "../spaceView";
import Spaces from "../../components/spaces";
import "./index.scss";
import "../index.scss";
import { Manager } from "socket.io-client";
import { SpaceContext } from "../../setup/spaceContext";
const SERVER = "http://localhost:8080";
export const manager = new Manager(SERVER);

export default function Home() {
  const currentspace = useContext(SpaceContext);

  return (
    <div className="main-page">
      {currentspace.spaceInfo ? (
        <SpaceView spaceInfromation={currentspace.spaceInfo} />
      ) : (
        <Spaces />
      )}
    </div>
  );
}
