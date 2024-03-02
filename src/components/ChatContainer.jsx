import React, { useEffect, useRef } from "react";
import avatar from "../assets/avatar.webp";
import bg from "../assets/bg.jpg";
import { AiOutlineSend } from "react-icons/ai";
import { PiUsersThreeBold } from "react-icons/pi";
import { IoCloseSharp } from "react-icons/io5";
import { useConversation } from "../context/ConversationContext";
import { useAuth } from "../context/AuthContext";
import SendInput from "./SendInput";

const ChatContainer = ({ setOpenBar, openBar }) => {
  const { currentConversation, userInfo } = useConversation();
  const { currentUser } = useAuth();
  const ref = useRef();

  useEffect(() => {}, ref.current?.scrollIntoView({ behavior: "smooth" }), [
    currentConversation,
  ]);
  return (
    <div className="chatContainer">
      {userInfo ? (
        <>
          <div className="chatHeader">
            <div className="chatUser">
              <img src={userInfo?.photoURL} alt="" />
              <h3>{userInfo?.displayName}</h3>
              <button onClick={(_) => setOpenBar(!openBar)}>
                {openBar ? <IoCloseSharp /> : <PiUsersThreeBold />}
              </button>
            </div>
          </div>
          <div className="chatBox">
            {currentConversation?.map((m, i) => (
              <div
                ref={ref}
                key={i}
                className={`chatMessage ${
                  m.senderId == currentUser.uid && "owner"
                } `}
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
                  <p>{m.text}</p>
                  {m.image && <img src={m.image} alt="" />}
                </div>
              </div>
            ))}
          </div>
          <SendInput />
        </>
      ) : (
        <div>chose conversation</div>
      )}
    </div>
  );
};

export default ChatContainer;
