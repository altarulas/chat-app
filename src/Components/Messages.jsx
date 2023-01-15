import React, { useContext, useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";

import { ChatContext } from "../Context/Chat"
import Message from "./Message";
import { db } from "../firebase";

const Messages = () => {
    const [messages, setMessages] = useState([]);

    const { data } = useContext(ChatContext);

    useEffect(() => {
        const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
            doc.exists() && setMessages(doc.data().messages);
        });

        return () => {
            unSub();
        };
    }, [data.chatId]);

    return (
        <div id="messages-base" className="w-full h-5/6 overflow-scroll bg-gray-200">
            {messages.map((m) => (
                <Message message={m} key={m.id} />
            ))}
        </div>
    );
};

export default Messages;