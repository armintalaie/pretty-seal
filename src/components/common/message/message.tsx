export interface Message {
  text: string;
  date: string;
  username: string;
  displayName: string;
  sync: Date;
}

export default function MessageBubble(message: Message) {
  const user = "me";

  const messageStatus = () => {
    if (message.date > message.sync.toString()) return true;
    else return false;
  };

  const date = new Date(message.date);

  return (
    <div className={message.displayName === user ? "message right" : "message left"}>
      <div className={`message-wrapper`}>
        {message.displayName !== user && <h6>{message.displayName}</h6>}
        {message.displayName === user && <h6>{user}</h6>}
        <div className={`message-text ${messageStatus() ? "unsent" : "sent"}`}>
          <p>{message.text}</p>
        </div>
        <h6>{date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</h6>
      </div>
    </div>
  );
}
