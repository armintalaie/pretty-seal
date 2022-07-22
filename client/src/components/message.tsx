export interface Message {
  text: string;
  date: string;
  username: string;
  displayName: string;
}

export default function MessageBubble(message: Message) {
  const user = "me";
  return (
    <div
      className={
        message.displayName === user ? "message blue" : "message green"
      }
    >
      <div className="message-text">
        <h6>{message.displayName}</h6>
        <p>{message.text}</p>
      </div>
    </div>
  );
}
