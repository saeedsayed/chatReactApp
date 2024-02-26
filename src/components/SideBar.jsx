import React, { useEffect, useState } from "react";
import avatar from "../assets/avatar.webp";
import { VscSearch } from "react-icons/vsc";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { IoCloseSharp } from "react-icons/io5";

const Sidebar = ({ openBar, setOpenBar }) => {
  const { currentUser, signOutHandler, setLoading } = useAuth();
  const navigate = useNavigate();
  const handleSignOut = async () => {
    try {
      setLoading(true);
      await signOutHandler();
      navigate("/login");
    } catch {}
    setLoading(false);
  };

  // useEffect(
  //   (_) => {
  //     !currentUser && navigate("/login");
  //   },
  //   [currentUser]
  // );

  return (
    <div className={`sidebar ${openBar && "open"}`}>
      <div className="sideHeader">
        <img src={logo} alt="" className="logo" />
        <div className="userOpt">
          <img src={currentUser.photoURL} alt="avatar " />
          <h3 className="name">{currentUser.displayName}</h3>
          <button className="logout" onClick={handleSignOut}>
            logout
          </button>
          <button className="closeBar" onClick={(_) => setOpenBar(false)}>
            <IoCloseSharp />
          </button>
        </div>
      </div>
      <div className="search">
        <input type="text" placeholder="Search or start a new chat" />
        <VscSearch className="searchIco" />
      </div>
      <ul className="conversationList">
        {Array.from({ length: 100 }).map((e, i) => {
          return (
            <li
              key={i}
              className="conversation"
              onClick={(_) => setOpenBar(false)}
            >
              <img src={avatar} alt="" className="CsAvatar" />
              <div className="CsInfo">
                <div className="CsName">
                  <span>testName</span>
                </div>
                <div className="CsLastMessage">
                  <span>yeah</span>
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
