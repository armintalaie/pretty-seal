import { useContext } from "react";
import QRCode from "react-qr-code";
import { SpaceContext } from "../../context/spaceContext";
import { API_BASE_URL } from "../../services/apiHandler";
import Info from "../common/info/info";
import "./index.css";

export default function Invite({ roomId }: { roomId: string }) {
  const { spaceInfo } = useContext(SpaceContext);
  return (
    <div>
      <h2>Invite</h2>
      <section className="invite-code">
        <div>
          <QRCode
            size={150}
            value={`https://chatty-seal-ui.herokuapp.com/spaces/${spaceInfo?.domainId}/rooms/${roomId}`}
          />
        </div>
      </section>
      <Info>
        <div>
          <h4>You can share the QR code that will prompt others to join this room</h4>
          <h6>{roomId}</h6>
        </div>
      </Info>
    </div>
  );
}
