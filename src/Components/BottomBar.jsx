import { AuthContext } from "../Context/Auth"
import { Button } from "@mui/material";
import { ChatContext } from "../Context/Chat";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const BottomBar = () => {
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  const navigate = useNavigate();

  const resetSelected = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div id="bottom-bar-base" className="w-full h-1/6 p-1 px-2 py-2">
      <div id="bar-wrapper" className="w-full h-full bg-black flex items-center rounded-xl px-4" >
        <img className="w-10 h-10 object-cover rounded-xl mr-4" src={currentUser.photoURL} alt="" />
        <span id="bottom-title" className="text-white">{currentUser.displayName}</span>
        <div className="flex ml-auto">
          <Button
            color="secondary"
            variant="contained"
            onClick={() => {
              signOut(auth)
              navigate("/");
              resetSelected();
            }}
          >
            <img src="https://img.icons8.com/ios-glyphs/20/null/logout-rounded--v1.png" alt="" />
          </Button>
        </div>
      </div >
    </div >

  );
};

export default BottomBar;