import { useState } from "react";
import Invite from "../../invites/invite";

export interface RoomProps {
  roomname?: string;
  roomId: string;
  leaveRoom: Function;
  name: { displayName: string; setDisplayName: Function };
}

export default function RoomSettings(props: RoomProps) {
  const [name, setName] = useState("");
  return (
    <div>
      <h2>Room Settings</h2>
      <div className="intro">
        <div className="start">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              props.name.setDisplayName(name);
            }}
          >
            <h6>current username: {props.name.displayName}</h6>
            <input
              type="text"
              name="display"
              placeholder="display name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button
              onClick={() => {
                props.name.setDisplayName(name);
              }}
            >
              Save
            </button>
          </form>
        </div>
      </div>
      <Invite roomId={"roomId"} />
    </div>
  );
}
