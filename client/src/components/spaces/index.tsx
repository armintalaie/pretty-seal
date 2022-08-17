import { useState } from "react";
import SpaceSetup from "./spaceSetup/spaceSetup";

export default function Spaces() {
  const [showSpaceSetup, setShowSpaceSetup] = useState(true);

  const mainContent = () => {
    if (showSpaceSetup) {
      return (
        <SpaceSetup
          handleClose={() => {
            setShowSpaceSetup((prev) => !prev);
          }}
        />
      );
    } else {
      return (
        <>
          <div className="info">
            <h6>MULTI-SPACE SUPPORT IN PROGRESS </h6>
          </div>
        </>
      );
    }
  };

  return (
    <div className="block">
      <nav>
        <img
          src={`${process.env.PUBLIC_URL}/assets/seal.png`}
          alt="Chatty Seal logo"
        />
        <h1>Chatty Seal </h1>
      </nav>

      {mainContent()}
    </div>
  );
}
