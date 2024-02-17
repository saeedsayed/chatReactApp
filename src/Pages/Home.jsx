import React, { useState } from 'react';
import { Sidebar, ChatContainer } from '../components';


const Home = () => {
    const [openBar, setOpenBar] = useState(false)
    return (
        <div className='homeLayOut'>
            <Sidebar openBar={openBar} setOpenBar={setOpenBar}/>
            <ChatContainer openBar={openBar} setOpenBar={setOpenBar}/>
        </div>
    );
}

export default Home;
