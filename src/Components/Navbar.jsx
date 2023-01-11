import { AuthContext } from "../Context/Auth"
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className='navbar'>
      <span className="logo">Altar's Chat</span>
      <div className="user">
        <img src={currentUser.photoURL} alt="" />
        <span>{currentUser.displayName}</span>
        <button onClick={() => {
          signOut(auth)
          navigate("/");
        }} >Logout</button>
      </div>
    </div>
  );
};

export default Navbar;