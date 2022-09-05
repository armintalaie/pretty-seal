import { useContext } from "react";
import { SpaceContext } from "../../context/spaceContext";
import Block from "../common/block";
import SpaceSetup from "../../pages/space/setup/spaceSetup";
import { Navigate } from "react-router-dom";

export default function Spaces() {
  const space = useContext(SpaceContext);
  if (space.spaceInfo && space.spaceInfo.clientSecret) {
    return <Navigate to={`/spaces/${space.spaceInfo.domainId}`} />;
  }

  const mainContent = () => {
    return <SpaceSetup />;
  };

  return (
    <Block>
      <>
        <nav>
          <img src={`${process.env.PUBLIC_URL}/assets/seal.png`} alt="Chatty Seal logo" />
          <h1>Chatty Seal</h1>
        </nav>
        {mainContent()}
      </>
    </Block>
  );
}
