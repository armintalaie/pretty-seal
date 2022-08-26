import { useContext } from "react";
import { HomePage } from "../../pages/home/home";
import { SpaceContext } from "../../setup/spaceContext";
import Block from "../common/block";
import SpaceSetup from "./spaceSetup/spaceSetup";

export default function Spaces() {
  const space = useContext(SpaceContext);

  const mainContent = () => {
    if (!space.spaceInfo) {
      return <SpaceSetup />;
    } else {
      return <></>;
    }
  };

  return (
    <Block>
      <>
        <nav>
          <img src={`${process.env.PUBLIC_URL}/assets/seal.png`} alt="Chatty Seal logo" />
          <h1>Chatty Seal</h1>
        </nav>
        {mainContent()}
        {/* <div className="top-bar">
          <HomePage />
        </div> */}
      </>
    </Block>
  );
}
