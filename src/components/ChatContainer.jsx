import React from 'react';
import avatar from '../assets/avatar.webp'
import bg from '../assets/bg.jpg'
import { AiOutlineSend } from "react-icons/ai";
import { PiUsersThreeBold } from "react-icons/pi";
import { IoCloseSharp } from "react-icons/io5";


const ChatContainer = ({setOpenBar,openBar}) => {

    return (
        <div className='chatContainer'>
            <div className="chatHeader">
                <div className="chatUser">
                    <img src={avatar} alt="" />
                    <h3>Saeed</h3>
                </div>
                <button onClick={_=>setOpenBar(!openBar)}>
                    {openBar?<IoCloseSharp/>:<PiUsersThreeBold/>}
                </button>
            </div>
            <div className="chatBox">
                <div className="chatMessage">
                    <div className="chatImg">
                        <img src={avatar} alt="" />
                    </div>
                    <div className="chatContent">
                        <p>How are you?</p>
                    </div>
                </div>
                <div className="chatMessage owner">
                    <div className="chatImg">
                        <img src={avatar} alt="" />
                    </div>
                    <div className="chatContent">
                        <p>i'm fine</p>
                        <img src={bg} alt="" />
                    </div>
                </div>
                <div className="chatMessage owner">
                    <div className="chatImg">
                        <img src={avatar} alt="" />
                    </div>
                    <div className="chatContent">
                        <p>i'm fine</p>
                        <img src={bg} alt="" />
                    </div>
                </div>
            </div>
            <div className="sendFiled">
                <button><AiOutlineSend /></button>
                <button><AiOutlineSend /></button>
                <input type="text" placeholder='Type a message'/>
                <button><AiOutlineSend /></button>
            </div>
        </div>
    );
}

export default ChatContainer;
