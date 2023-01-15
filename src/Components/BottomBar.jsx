import { AuthContext } from "../Context/Auth"
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const BottomBar = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div id="bottom-bar-base" className="w-full h-1/6 p-1 px-2 py-2">
      <div id="bar-wrapper" className="w-full h-full bg-black flex items-center rounded-xl px-2" >
        <img className="w-10 h-10 object-cover rounded-2xl mr-6" src={currentUser.photoURL} alt="" />
        <span className="w-1/2 text-white">{currentUser.displayName}</span>
        <button className="bg-gray-700 text-white font-semibold w-28 h-10 rounded-lg" onClick={() => {
          signOut(auth)
          navigate("/");
        }} variant="contained">Logout</button>
      </div >
    </div >

  );
};

export default BottomBar;