import React, { useState } from "react";
import { VscSearch } from "react-icons/vsc";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { useConversation } from "../context/ConversationContext";
import HintBox from "./HintBox";

const Search = () => {
  const [searchName, setSearchName] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchUser, setSearchUser] = useState(null);
  const { currentUser } = useAuth();
  const { showConversation, userInfo } = useConversation();

  const handelSearch = async (e) => {
    // e.preventDefault();
    if (!searchName) {
      setSearchUser("");
      return;
    }
    try {
      setSearchLoading(true);
      const q = query(
        collection(db, "users"),
        where("displayName", "==", searchName),
        where("displayName", "!=", currentUser.displayName),
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((element) => {
        setSearchUser(element.data());
      });
    } catch (error) {
      console.log(error);
    }
    setSearchLoading(false);
  };

  const handleSelect = async () => {
    const combinedId =
      currentUser.uid > searchUser.uid
        ? currentUser.uid + searchUser.uid
        : searchUser.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, 'userChats', currentUser.uid))
      if (!res.data[combinedId]) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] });
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            displayName: searchUser.displayName,
            photoURL: searchUser.photoURL,
            uid: searchUser.uid,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
      showConversation(combinedId)
    } catch (error) {
      console.log(error);
    }
    setSearchUser(null);
    setSearchName("");
  };

  return (
    <div className="search">
      <HintBox hint={'search for users hear'} hintOff={!!userInfo} dir={'R'}>
        <input
          type="text"
          className="searchInput"
          value={searchName}
          onChange={(e) => {
            setSearchName(e.target.value)
            handelSearch()
          }}
        />
        <VscSearch className="searchIcon" onClick={handelSearch} />
      </HintBox>
      {searchLoading && <p>loading...</p>}
      {searchUser && (
        <div className="search-result" onClick={handleSelect}>
          <img src={searchUser.photoURL} alt="" className="CsAvatar" />
          <div className="CsInfo">
            <div className="CsName">
              <span>{searchUser.displayName}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
