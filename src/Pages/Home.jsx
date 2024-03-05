import React, { useState } from "react";
import { Sidebar, ChatContainer } from "../components/indexComponents";
import { useAuth } from "../context/AuthContext";
import Loading from "./Loading";
import FullScreenImage from "../components/FullScreenImage";

const Home = () => {
  const [openBar, setOpenBar] = useState(false);
  const { loading } = useAuth();
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="homeLayOut">
      <FullScreenImage/>
      <Sidebar openBar={openBar} setOpenBar={setOpenBar} />
      <ChatContainer openBar={openBar} setOpenBar={setOpenBar} />
    </div>
  );
};

export default Home;
