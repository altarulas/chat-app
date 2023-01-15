import { ChatContext } from "../Context/Chat";
import Input from "./Input";
import Messages from "./Messages";
import { useContext } from "react";

const Chat = () => {
    const { data } = useContext(ChatContext);
    return (
        <div id="chat-base" className=" w-2/3 h-full rounded-r-lg flex flex-col">
            <Messages />
            <Input />
        </div>
    );
};

export default Chat;