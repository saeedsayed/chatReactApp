import React from "react";
import { SideBarHeader } from "./index";
import avatar from "../assets/avatar.webp";
import { VscSearch } from "react-icons/vsc";

const Sidebar = ({openBar, setOpenBar}) => {
  return (
    <div className={`sidebar ${openBar&&'open'}`}>
      <SideBarHeader setOpenBar={setOpenBar}/>
      <div className="search">
        <input type="text" placeholder="Search or start a new chat" />
        <VscSearch className="searchIco"/>
      </div>
      <ul className="conversationList">
        <li className="conversation" onClick={_=>setOpenBar(false)}>
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
        <li className="conversation">
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
        <li className="conversation">
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
        <li className="conversation">
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
        <li className="conversation">
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
        <li className="conversation">
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
        <li className="conversation">
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
        <li className="conversation">
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
        <li className="conversation">
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
        <li className="conversation">
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
        <li className="conversation">
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
        <li className="conversation">
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
        <li className="conversation">
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
        <li className="conversation">
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
      </ul>
    </div>
  );
};

export default Sidebar;
