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
      <div className="user">
        <div className="navbarInfo">
          <img src={currentUser.photoURL} alt="" />
          <span>{currentUser.displayName}</span>
        </div>
        <button onClick={() => {
          signOut(auth)
          navigate("/");
        }} variant="contained">Logout</button>

      </div>
    </div>
  );
};

export default Navbar;