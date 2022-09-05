import Spaces from "../components/spaces";
import "./index.scss";
import { Route, Routes } from "react-router-dom";
import HomePage from "./homepage";
import View from "../components/View";

export default function Home() {
  return (
    <div className={"main-page"}>
      <Routes>
        <Route path="/arctic" element={<HomePage />} />
        <Route path="/spaces/:id/*" element={<View />} />
        <Route path="/*" element={<Spaces />} />
      </Routes>
    </div>
  );
}
