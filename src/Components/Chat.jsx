import { ChatContext } from "../Context/Chat";
import Input from "./Input";
import Messages from "./Messages";
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