import QRCode from "react-qr-code";
import { API_BASE_URL } from "../../services/apiHandler";
import "./index.css";

export default function Invite({ roomId }: { roomId: string }) {
  return (
    <div>
      <h1>Invite</h1>
      <div className="info">{roomId}</div>

      <section className="invite-code">
        <h4>
          You can share the QR code that will prompt others to join this room
        </h4>
        <div>
          <QRCode value={`${API_BASE_URL}/roomId?${roomId}`} />
        </div>
      </section>
    </div>
  );
}
