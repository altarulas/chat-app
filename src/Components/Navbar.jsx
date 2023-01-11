import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className='navbar'>
      <span className="logo">Lama Chat</span>
      <div className="user">
        <button onClick={() => {
          signOut(auth)
          navigate("/");
        }} >Logout</button>
      </div>
    </div>
  );
};

export default Navbar;