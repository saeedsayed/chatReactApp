import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png";
import { IoCloseSharp } from "react-icons/io5";

const SideHeader = ({ setOpenBar }) => {
  const { currentUser, signOutHandler } = useAuth();

  return (
    <div className="sideHeader">
      {/* <img src={logo} alt="" className="logo" /> */}
      <div className="userOpt">
        <img src={currentUser.photoURL} alt="avatar " />
        <h3 className="name">{currentUser.displayName}</h3>
        <button className="logout" onClick={(_) => signOutHandler()}>
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
