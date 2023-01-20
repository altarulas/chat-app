import Input from "./Input";
import Messages from "./Messages";

const Chat = () => {

    return (
        <div id="chat-base" className=" w-2/3 h-full rounded-r-lg flex flex-col  bg-gray-200">
            <Messages />
            <Input />
        </div>
    );
};

export default Chat;