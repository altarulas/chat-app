import React, { useContext, useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";

import { ChatContext } from "../Context/Chat"
import Message from "./Message";
import { db } from "../firebase";

const Messages = () => {
    const [messages, setMessages] = useState([]);

    const { data, visible } = useContext(ChatContext);

    useEffect(() => {
        const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
            doc.exists() && setMessages(doc.data().messages);
        });

        return () => {
            unSub();
        };
    }, [data.chatId]);

    return (
        <>
            {visible ? (
                <div id="messages-base" style={{ height: "86%" }} className="w-full overflow-scroll bg-gray-200">
                    {messages.map((m) => (
                        <Message message={m} key={m.id} />
                    ))}
                </div>
            ) : (
                <div className="w-full h-full flex items-center justify-center">
                    <span className="text-3xl font-semibold">Welcome to Chat App!</span>
                </div>
            )}
        </>
    );
};

export default Messages;