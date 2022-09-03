import SpaceView from "./space";
import Spaces from "../components/spaces";
import "./index.scss";

import { Route, Routes } from "react-router-dom";
import HomePage from "./homepage";

export default function Home() {
  return (
    <div className={"main-page"}>
      <Routes>
        <Route path="/" element={<Spaces />} />
        <Route path="/arctic" element={<HomePage />} />
        <Route path="/spaces/:id/*" element={<SpaceView />} />
      </Routes>
    </div>
  );
}
