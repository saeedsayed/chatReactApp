import {
  Timestamp,
  arrayUnion,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { db, storage } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { useConversation } from "../context/ConversationContext";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { IoMicOutline } from "react-icons/io5";
import { useFullImage } from "../context/FullScreenImageContext";

const SendInput = () => {
  const { chatId, userInfo } = useConversation();
  const { currentUser } = useAuth();
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const { setImageSrc, setShowFullScreenImage } = useFullImage();

  const handleSend = async (_) => {
    if (!image && !text.trim().length) {
      return;
    }
    setIsSending(true);
    let imageUrl = null;
    const mid = uuid();
    if (image) {
      const storageRef = ref(storage, `chatImages/${mid}`);
      await uploadBytesResumable(storageRef, image);
      const url = await getDownloadURL(storageRef);
      imageUrl = url;
    }
    try {
      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          text,
          imageUrl,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [chatId + ".date"]: serverTimestamp(),
        [chatId + ".lastMessage"]: text||'photo',
      });
      await updateDoc(doc(db, "userChats", userInfo.uid), {
        [chatId + ".userInfo"]: {
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
          uid: currentUser.uid,
        },
        [chatId + ".date"]: serverTimestamp(),
        [chatId + ".lastMessage"]: text||'photo',
      });
      setText("");
      setImage(null);
    } catch {}
    setIsSending(false);
  };

  useEffect(() => {
    if (image) {
      let file = new FileReader();
      file.readAsDataURL(image);
      file.onload = () => {
        setImagePreview(file.result);
      };
    }
  }, [image]);
  if (isSending) return <div>sending...</div>;
  return (
    <div className="sendFiled">
      <button className="sendFiled-btn">
        <IoMicOutline />
      </button>
      {image && (
        <img
          src={imagePreview}
          alt=""
          className="preview-image"
          onClick={(_) => {
            setShowFullScreenImage(true);
            setImageSrc(imagePreview);
          }}
        />
      )}
      <label htmlFor="file-input">
        <input
          type="file"
          id="file-input"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <span className="sendFiled-btn">
          <MdOutlineAddPhotoAlternate />
        </span>
      </label>
      <input
        type="text"
        placeholder="Type a message"
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <button className="sendFiled-btn" onClick={handleSend}>
        <AiOutlineSend />
      </button>
    </div>
  );
};

export default SendInput;
