import React from 'react';
import avatar from '../assets/avatar.webp'
import logo from '../assets/logo.png'
import { IoCloseSharp } from 'react-icons/io5';
const SideBarHeader = ({setOpenBar}) => {
    return (
        <div className='sideHeader'>
            <img src={logo} alt="" className="logo" />
            <div className="userOpt">
                <img src={avatar} alt="" />
                <h3 className='name'>Saeed</h3>
                <button className='logout'>logout</button>
            <button className='closeBar' onClick={_=>setOpenBar(false)}>
                <IoCloseSharp />
            </button>
            </div>
        </div>
    );
}

export default SideBarHeader;
