import React, { useEffect, useState } from "react";
import SideHeader from "./SideHeader";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import Search from "./Search";
import { useConversation } from "../context/ConversationContext";

const Sidebar = ({ openBar, setOpenBar }) => {
  const { currentUser } = useAuth();
  const { showConversation } = useConversation()
  const [conversations, setConversations] = useState([]);

  const handleSelect = (id ) =>{
    showConversation(id)
    setOpenBar(false)
  }

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
      setConversations(Object.entries(doc.data()));
    });
    return () => unsub();
  }, [currentUser.uid]);

  return (
    <div className={`sidebar ${openBar && "open"}`}>
      <SideHeader setOpenBar={setOpenBar} />
      <Search />
      <ul className="conversationList">
        {conversations.sort((a,b)=> b[1].date - a[1].date).map((e) => {
          return (
            <li
              key={e[0]}
              className="conversation"
              onClick={(_) =>handleSelect(e[0]) }
            >
              <img src={e[1].userInfo.photoURL} alt="" className="CsAvatar" />
              <div className="CsInfo">
                <div className="CsName">
                  <span>{e[1].userInfo.displayName}</span>
                </div>
                <div className="CsLastMessage">
                  <span>{e[1]?.lastMessage}</span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
