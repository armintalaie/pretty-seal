import QRCode from "react-qr-code";
import { API_BASE_URL } from "../../services/apiHandler";
import Info from "../common/info/info";
import "./index.css";

export default function Invite({ roomId }: { roomId: string }) {
  return (
    <div>
      <h2>Invite</h2>
      <section className="invite-code">
        {/* <div>
          <QRCode size={150} value={`${API_BASE_URL}/roomId?${roomId}`} />
        </div> */}
      </section>
      <Info>
        <div>
          <h4>You can share the QR code that will prompt others to join this room</h4>
          <h5>{roomId}</h5>
        </div>
      </Info>
    </div>
  );
}
