import { PiUsersThreeBold } from "react-icons/pi";
import { IoCloseSharp } from "react-icons/io5";
import { useConversation } from "../context/ConversationContext";

import SendInput from "./SendInput";

import Message from "./Message";
import { useFullImage } from "../context/FullScreenImageContext";

const ChatContainer = ({ setOpenBar, openBar }) => {
  const { currentConversation, userInfo } = useConversation();
  const {setShowFullScreenImage, setImageSrc} = useFullImage()

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
        <button onClick={(_) => setOpenBar(!openBar)}>
          {openBar ? <IoCloseSharp /> : <PiUsersThreeBold />}
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
        <div>chose conversation</div>
      )}
    </div>
  );
};

export default ChatContainer;
