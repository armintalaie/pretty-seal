import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import { ConfigurationContextProvider } from "../../context/configurationContext";
import { SocketContextProvider } from "../../context/socketContext";
import RoomView from "../../pages/room";
import SpaceView from "../../pages/space";

export default function View() {
  let { id } = useParams();
  const navigate = useNavigate();

  if (!id) {
    navigate("/");
    return <></>;
  }

  return (
    <SocketContextProvider domain={id}>
      <ConfigurationContextProvider domain={id}>
        <Routes>
          <Route path="/rooms/:roomId" element={<RoomView />} />
          <Route path="/" element={<SpaceView />} />
        </Routes>
      </ConfigurationContextProvider>
    </SocketContextProvider>
  );
}
