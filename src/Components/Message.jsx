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
    message.senderId === currentUser.uid ? (
      <div ref={ref} className="flex p-8 flex-row-reverse gap-4">
        <div className="flex flex-col">
          <img
            className="w-16 h-16 object-cover rounded-2xl"
            src={
              message.senderId === currentUser.uid
                ? currentUser.photoURL
                : data.user.photoURL
            }
            alt=""
          />
        </div>
        <div className="max-w-4/5 flex flex-col">
          <p className="max-w-max py-1 px-4 bg-gray-300 rounded-2xl max-w-sm break-words max-w-md">{message.text}</p>
          {message.img && <img className="w-1/2 max-w-max" src={message.img} alt="" />}
        </div>
      </div>

    ) : (

      <div ref={ref} className="flex p-8 gap-4">
        <div className="flex flex-col">
          <img
            className="w-16 h-16 object-cover rounded-2xl"
            src={
              message.senderId === currentUser.uid
                ? currentUser.photoURL
                : data.user.photoURL
            }
            alt=""
          />
        </div>
        <div className="max-w-4/5 flex flex-col g-10">
          <p className="max-w-max py-1 px-4 bg-gray-400 rounded-2xl break-words max-w-md">{message.text}</p>
          {message.img && <img className="w-1/2 max-w-max" src={message.img} alt="" />}
        </div>
      </div>
    )
  );
};

export default Message;