import { PiUsersThreeBold } from "react-icons/pi";
import { IoCloseSharp } from "react-icons/io5";
import { useConversation } from "../context/ConversationContext";

import SendInput from "./SendInput";

import Message from "./Message";

const ChatContainer = ({ setOpenBar, openBar }) => {
  const { currentConversation, userInfo } = useConversation();


  return (
    <div className="chatContainer">
      <div className="chatHeader">
        <div className="chatUser">
          <img src={userInfo?.photoURL} alt="" />
          <h5>{userInfo?.displayName}</h5>
          <button onClick={(_) => setOpenBar(!openBar)}>
            {openBar ? <IoCloseSharp /> : <PiUsersThreeBold />}
          </button>
        </div>
      </div>
      {userInfo ? (
        <>
          <div className="chatBox">
            {currentConversation?.map((m, i) => (
              <Message key={i} m={m}/>
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
