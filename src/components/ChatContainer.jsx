import { PiUsersThreeBold } from "react-icons/pi";
import { IoCloseSharp } from "react-icons/io5";
import { useConversation } from "../context/ConversationContext";

import SendInput from "./SendInput";

import Message from "./Message";
import { useFullImage } from "../context/FullScreenImageContext";
import HintBox from "./HintBox";
import { useState } from "react";

const ChatContainer = ({ setOpenBar, openBar }) => {
  const { currentConversation, userInfo } = useConversation();
  const { setShowFullScreenImage, setImageSrc } = useFullImage();
  const [hintOff, setHintOff] = useState(false)


  return (
    <div className="chatContainer">
      <div className="chatHeader">
        <div className="chatUser">
          {userInfo && (
            <img
              src={userInfo?.photoURL}
              alt=""
              onClick={(_) => {
                setShowFullScreenImage(true);
                setImageSrc(userInfo?.photoURL);
              }}
            />
          )}
          <h5>{userInfo?.displayName}</h5>
        </div>
        <button onClick={(_) => { setOpenBar(!openBar); setHintOff(true) }}>
          <HintBox dir={"L"} hintOff={hintOff} hint={'open side bar'}>
            {openBar ? <IoCloseSharp /> : <PiUsersThreeBold />}
          </HintBox>
        </button>
      </div>
      {userInfo ? (
        <>
          <div className="chatBox">
            {currentConversation?.map((m, i) => (
              <Message key={i} m={m} />
            ))}
          </div>
          <SendInput />
        </>
      ) : (
        <div className="starting-tip">
          <p>
            To begin using the application, you need to search for an existing user
            in the search box. If you want to test the application, you can create
            another account and search for it.
          </p>
        </div>
      )}
    </div>
  );
};

export default ChatContainer;
