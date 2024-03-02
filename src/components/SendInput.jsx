import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { useConversation } from "../context/ConversationContext";

const SendInput = () => {
  const { chatId, userInfo } = useConversation();
  const { currentUser } = useAuth();
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const handleSend = async (_) => {
    try {
      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [chatId + ".date"]: serverTimestamp(),
        [chatId + ".lastMessage"]: text,
      });
      await updateDoc(doc(db, "userChats", userInfo.uid), {
        [chatId + ".userInfo"]: {
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
          uid: currentUser.uid,
        },
        [chatId + ".date"]: serverTimestamp(),
        [chatId + ".lastMessage"]: text,
      });
    } catch {}
  };
  return (
    <div className="sendFiled">
      <button>
        <AiOutlineSend />
      </button>
      <button>
        <AiOutlineSend />
      </button>
      <input
        type="text"
        placeholder="Type a message"
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleSend}>
        <AiOutlineSend />
      </button>
    </div>
  );
};

export default SendInput;
