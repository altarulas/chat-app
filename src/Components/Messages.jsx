import React, { useContext, useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";

import { ChatContext } from "../Context/Chat"
import Loading from "../Utility/Loading";
import Message from "./Message";
import Navbar from "./Navbar";
import { db } from "../firebase";

const Messages = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    const { data } = useContext(ChatContext);

    useEffect(() => {
        setLoading(true);
        const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
            doc.exists() && setMessages(doc.data().messages);
            setLoading(false);
        });
        return () => {
            unSub();
        };
    }, [data.chatId]);

    return (
        <>
            <Navbar />
            {(data.showChat && !loading) ? (
                <div id="messages-base" className="h-4/6 w-full overflow-scroll bg-gray-200">
                    {messages.map((message) => (
                        <Message message={message} key={message.id} />
                    ))}
                </div>
            ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    {loading ? (
                        <Loading />
                    ) : (
                        <span className="text-3xl font-semibold">
                            Welcome to Chat App!
                        </span>
                    )}
                </div>
            )}
        </>
    );
};

export default Messages;