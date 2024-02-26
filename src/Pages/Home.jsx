import React, { useState } from "react";
import { Sidebar, ChatContainer } from "../components";
import { useAuth } from "../context/AuthContext";
import Loading from "./Loading";

const Home = () => {
  const [openBar, setOpenBar] = useState(false);
  const { loading } = useAuth();
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="homeLayOut">
      <Sidebar openBar={openBar} setOpenBar={setOpenBar} />
      <ChatContainer openBar={openBar} setOpenBar={setOpenBar} />
    </div>
  );
};

export default Home;
