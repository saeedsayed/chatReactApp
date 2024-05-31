import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png";
import { IoCloseSharp } from "react-icons/io5";
import { useState } from "react";

const SideHeader = ({ setOpenBar }) => {
  const { currentUser, signOutHandler } = useAuth();
  const [alertPopUp, setAlertPopUp] = useState(false);

  return (
    <div className="sideHeader">
      {alertPopUp && (
        <div className="alert-popup">
          <div className="alert-body">
            <p>{alertPopUp}</p>
            <button className="yes-btn" onClick={(_) => signOutHandler()}>yes</button>
            <button onClick={(_) => setAlertPopUp(false)}>no</button>
          </div>
        </div>
      )}
      <div className="userOpt">
        <img src={currentUser.photoURL} alt="avatar " />
        <h3 className="name">{currentUser.displayName}</h3>
        <button
          className="logout"
          onClick={(_) => setAlertPopUp("Are you sure to log out")}
        >
          logout
        </button>
        <button className="closeBar" onClick={(_) => setOpenBar(false)}>
          <IoCloseSharp />
        </button>
      </div>
    </div>
  );
};

export default SideHeader;
