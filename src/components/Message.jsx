import React, { useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { useConversation } from "../context/ConversationContext";
import { useFullImage } from "../context/FullScreenImageContext";

const Message = ({ m }) => {
  const { currentUser } = useAuth();
  const { userInfo, currentConversation } = useConversation();
  const ref = useRef();
  const { setImageSrc, setShowFullScreenImage } = useFullImage();

  const unixTimestampToDate = (timestamp) => {
    const date = new Date(timestamp * 1000);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hour = String(date.getHours()).padStart(2, "0");
    const minute = String(date.getMinutes()).padStart(2, "0");
    const amPm = hour > 12 ? "PM" : "AM";

    const formattedDate = `${year}-${month}-${day} ${
      hour > 12 ? hour - 12 : hour == 0 ? 12 : hour
    }:${minute} ${amPm}`;

    return formattedDate;
  };

  useEffect(() => {}, ref.current?.scrollIntoView({ behavior: "smooth" }), [
    currentConversation,
  ]);
  return (
    <div
      ref={ref}
      className={`chatMessage ${m.senderId == currentUser.uid && "owner"} `}
    >
      <div className="chatImg">
        <img
          src={
            m.senderId == currentUser.uid
              ? currentUser?.photoURL
              : userInfo?.photoURL
          }
          alt=""
        />
      </div>
      <div className="chatContent">
        {m.imageUrl && (
          <img
            src={m.imageUrl}
            alt=""
            onClick={(_) => {
              setShowFullScreenImage(true);
              setImageSrc(m.imageUrl);
            }}
          />
        )}
        <p>{m.text}</p>
      </div>
      <div className="chatTime">
        <span>{unixTimestampToDate(m.date.seconds)}</span>
        {console.log(m.date)}
      </div>
    </div>
  );
};

export default Message;
