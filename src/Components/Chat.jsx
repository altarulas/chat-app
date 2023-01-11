import Add from "../Images/add.png";
import Cam from "../Images/cam.png";
import { ChatContext } from "../Context/Chat";
import Input from "./Input";
import Messages from "./Messages";
import More from "../Images/more.png";
import { useContext } from "react";

const Chat = () => {
    const { data } = useContext(ChatContext);
    return (
        <div className="chat">
            <div className="chatNavbar">
                <div></div>
                <div className="chatInfo">
                    {<span>{data.user?.displayName}</span>}
                </div>
            </div>
            <Messages />
            <Input />
        </div>
    );
};

export default Chat;