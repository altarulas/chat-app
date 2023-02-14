import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../Context/Auth"
import { ChatContext } from "../Context/Chat";
import LogoutIcon from '@mui/icons-material/Logout';
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const BottomBar = () => {
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  const navigate = useNavigate();

  const resetSelected = () => {
    dispatch({ type: "LOGOUT" });
  };


  const useBreakpoint = () => {
    const [breakpoint, setBreakpoint] = useState(1200)
    const resize = () => {
      setBreakpoint(window.innerWidth)
    }

    useEffect(() => {
      window.addEventListener('resize', resize)

      return () => {
        window.removeEventListener('resize', resize)
      }
    }, [])

    return breakpoint
  }

  const windowWidth = useBreakpoint();

  return (
    <div id="bottom-bar-base" className="w-full h-1/6 p-1 px-2 py-2">
      <div id="bar-wrapper" className="w-full h-full bg-black flex items-center rounded-xl px-4" >
        <img id="bottom-profile-image" className="w-10 h-10 object-cover rounded-xl mr-4" src={currentUser.photoURL} alt="" />
        <span id="bottom-title" className="text-white font-bold">
          {(currentUser.displayName?.length > 8) ? (currentUser.displayName.substring(0, 8) + "...")
            : (currentUser.displayName)}
        </span>
        <div id="logout-button" className="flex ml-auto">
          <button
            className="text-black text-sm bg-white py-2 px-3 rounded-lg font-bold hover:bg-gray-400 max-lg:text-xs"
            onClick={() => {
              signOut(auth)
              navigate("/");
              resetSelected();
            }}
          >
            {windowWidth > "850" ? ("LOGOUT") : (<LogoutIcon fontSize="small" />)}
          </button>
        </div>
      </div >
    </div >

  );
};

export default BottomBar;