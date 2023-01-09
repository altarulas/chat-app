import Add from "../Images/add.png";
import Cam from "../Images/cam.png";
import { Input } from "@mui/material";
import Messages from "./Messages";
import More from "../Images/more.png";
import React from "react";

const Chat = () => {
    return (
        <div className="chat">
            <div className="chatInfo">
                <div className="chatIcons">
                    <img src={Cam} alt="" />
                    <img src={Add} alt="" />
                    <img src={More} alt="" />
                </div>
            </div>
            <Messages />
            <Input />
        </div>
    );
};

export default Chat;