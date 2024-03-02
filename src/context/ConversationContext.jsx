import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { db } from "../firebase";
import { useAuth } from "./AuthContext";

const ConversationContext = createContext();

const ConversationProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [chatId, setChatId] = useState(null)
  const [userInfo, setUserInfo] = useState(null);
  const [currentConversation, setCurrentConversation] = useState(null);
  const showConversation = async (id) => {
    setChatId(id)
    const res = await getDoc(doc(db, 'userChats', currentUser.uid))
    setUserInfo(res.data()[id]['userInfo']);
    // console.log('res.data()[id]: ', res.data()[id]);
    onSnapshot(doc(db, "chats", id), (doc) => {
      setCurrentConversation(doc.data().messages);
    });
  };

  useEffect(() => {
    !currentUser && setCurrentConversation(null);
    !currentUser && setUserInfo(null);
  }, [currentUser]);

  return (
    <ConversationContext.Provider
      value={{chatId, showConversation, currentConversation, userInfo }}
    >
      {children}
    </ConversationContext.Provider>
  );
};

export default ConversationProvider;

export const useConversation = () => useContext(ConversationContext);
