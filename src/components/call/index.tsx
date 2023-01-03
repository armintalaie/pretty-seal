import { useContext, useEffect, useRef, useState } from "react";
import { SocketContext } from "../../context/socketContext";
import "./index.scss";

export default function CallSection({
  roomId,
  buttonAccess,
}: {
  roomId: string;
  buttonAccess: Function;
}) {
  const servers = {
    iceServers: [
      {
        urls: ["stun:stun.l.google.com:19302"],
      },
    ],
  };
  //   const [peerConnection, setPc] = useState(new RTCPeerConnection(servers));
  const ref = useRef<HTMLVideoElement>(null);
  const ref2 = useRef<HTMLVideoElement>(null);
  const socket = useContext(SocketContext);

  const btns = (
    <div className="buttons">
      {/* <button onClick={() => createOffer()}>start</button> */}
      {/* <button onClick={() => start()}>join</button> */}
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="9" y="3" width="6" height="10" rx="3" stroke="black" strokeWidth="2" />
        <path
          d="M6 10V10.5V10.5C6 13.5376 8.46243 16 11.5 16H12.5C15.5376 16 18 13.5376 18 10.5V10.5V10"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path d="M12 17V21M12 21H7M12 21H17" stroke="black" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_489_191266)">
          <path
            d="M3 10.238C3 8.95583 3 8.31475 3.28305 7.84095C3.45274 7.55691 3.69024 7.31941 3.97428 7.14972C4.44809 6.86667 5.08916 6.86667 6.37131 6.86667H7.00955C7.08973 6.86667 7.12982 6.86667 7.1677 6.86523C7.77187 6.84232 8.33324 6.54733 8.69482 6.06276C8.7175 6.03237 8.74024 5.99936 8.78571 5.93333V5.93333C8.83119 5.86731 8.85393 5.83429 8.87661 5.80391C9.23819 5.31934 9.79956 5.02435 10.4037 5.00144C10.4416 5 10.4817 5 10.5619 5H13.4381C13.5183 5 13.5584 5 13.5963 5.00144C14.2004 5.02435 14.7618 5.31934 15.1234 5.80391C15.1461 5.83429 15.1688 5.86731 15.2143 5.93333V5.93333C15.2598 5.99936 15.2825 6.03237 15.3052 6.06276C15.6668 6.54733 16.2281 6.84232 16.8323 6.86523C16.8702 6.86667 16.9103 6.86667 16.9904 6.86667H17.6287C18.9108 6.86667 19.5519 6.86667 20.0257 7.14972C20.3098 7.31941 20.5473 7.55691 20.7169 7.84095C21 8.31475 21 8.95583 21 10.238V15C21 16.8856 21 17.8284 20.4142 18.4142C19.8284 19 18.8856 19 17 19H7C5.11438 19 4.17157 19 3.58579 18.4142C3 17.8284 3 16.8856 3 15V10.238Z"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M15.1428 12.5713C15.1428 14.3071 13.7357 15.7142 12 15.7142C10.2642 15.7142 8.85712 14.3071 8.85712 12.5713C8.85712 10.8356 10.2642 9.42847 12 9.42847C13.7357 9.42847 15.1428 10.8356 15.1428 12.5713Z"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M16.5714 9.9999C16.5714 9.6843 16.8272 9.42847 17.1428 9.42847C17.4584 9.42847 17.7143 9.6843 17.7143 9.9999C17.7143 10.3155 17.4584 10.5713 17.1428 10.5713C16.8272 10.5713 16.5714 10.3155 16.5714 9.9999Z"
            fill="black"
          />
        </g>
        <defs>
          <clipPath id="clip0_489_191266">
            <rect width="24" height="24" fill="black" />
          </clipPath>
        </defs>
      </svg>

      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_1_907)">
          <circle cx="12" cy="12" r="9" stroke="black" strokeWidth="2" strokeLinecap="round" />
          <path
            d="M9 9L15 15M15 9L9 15"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_1_907">
            <rect width="24" height="24" fill="black" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );

  //   peerConnection.ontrack = (event) => {
  //     if (ref2.current) {
  //       const remoteStream2 = new MediaStream();
  //       event.streams[0].getTracks().forEach((track) => {
  //         remoteStream2.addTrack(track);
  //       });
  //       //   ref2.current.srcObject = remoteStream2;
  //       // Create video element
  //     }
  //   };

  useEffect(() => {
    buttonAccess(btns);
  }, []);

  // useEffect(() => {
  //     navigator.mediaDevices.getUserMedia({ audio: false, video: true }).then((stream) => {
  //       if (ref.current) {
  //         ref.current.srcObject = stream;
  //         ref.current.onloadedmetadata = function (e) {
  //           if (ref.current) {
  //             ref.current.play();
  //           }
  //         };
  //         console.log(stream);

  //         stream.getTracks().forEach((track) => {
  //           peerConnection.addTrack(track, stream);
  //         });
  //       }
  //     });

  //     socket.on("answer", (answer) => {
  //       console.log("Received answer:", answer);
  //       peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
  //     });

  //     socket.on("offer", (offer) => {
  //       console.log("Received offer:", offer);
  //       peerConnection.setRemoteDescription(new RTCSessionDescription(offer));

  //       // Create an answer
  //       peerConnection
  //         .createAnswer()
  //         .then((answer) => peerConnection.setLocalDescription(answer))
  //         .then(() => {
  //           const answer = {
  //             type: "answer",
  //             sdp: peerConnection.localDescription!.sdp,
  //           };
  //           // Send the answer to the other client
  //           socket.emit("answer", answer, roomId);
  //         });
  //     });

  //     socket.on("ice-candidate", (candidate) => {
  //       console.log("Received ICE candidate:", candidate);
  //       // Add the ICE candidate to the connection
  //       peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
  //     });
  //   }, []);

  const createOffer = async () => {
    // let offer = await peerConnection.createOffer();
    // await peerConnection.setLocalDescription(offer);
    // const offerMsg = {
    //   type: "offer",
    //   sdp: peerConnection.localDescription!.sdp,
    // };
    // socket.emit("offer", offerMsg, roomId);
  };

  return (
    <div id="call">
      <div className="video-list">
        <div className="video-container">
          <video ref={ref} id="video1" autoPlay muted={true} />
        </div>
        <div className="video-container">
          <video ref={ref2} id="video2" autoPlay muted={true} />
        </div>
      </div>
    </div>
  );
}
