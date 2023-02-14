import React, { useContext, useEffect, useRef } from "react";

import { AuthContext } from "../Context/Auth";
import { ChatContext } from "../Context/Chat";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div id="message-base" ref={ref} className={`flex p-8 gap-4 ${message.senderId === currentUser.uid && "flex-row-reverse"}`}>
      <div id="image-wrapper" className="flex flex-col">
        <img
          id="user-image"
          className="w-16 h-16 object-cover rounded-2xl max-sm:w-12 max-sm:h-12"
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
      </div>
      <div id="text-content-wrapper" className="max-w-4/5 flex flex-col g-10">
        {message.text !== "" &&
          <p id="text" className={`max-w-max py-1 px-4 ${message.senderId === currentUser.uid ? "bg-gray-300" : "bg-gray-400"}
           rounded-2xl max-w-sm break-words max-w-md mb-4`}>{message.text}
          </p>}
        {message.image && <img className="w-48 h-32 rounded-lg object-cover" src={message.image} alt="" />}
      </div>
    </div>
  )
};

export default Message;