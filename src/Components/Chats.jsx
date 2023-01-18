import { doc, onSnapshot } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../Context/Auth";
import { ChatContext } from "../Context/Chat";
import Loading from "../Utility/Loading";
import { db } from "../firebase";

const Chats = () => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unSub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
        setLoading(false);
      });

      return () => {
        unSub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
    <>
      {loading ? (
        <div id="svg-wrapper" className="my-4 h-4/6 flex justify-center items-center">
          <Loading />
        </div>
      ) : (
        <div id="chats-base" className="w-full h-4/6 overflow-x-hidden overflow-y-auto bg-gray-600">
          {Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date).map((chat) => (
            <div
              className="flex items-center pl-4 h-20 cursor-pointer"
              key={chat[0]}
              onClick={() => handleSelect(chat[1].userInfo)}
            >
              <img className="w-12 h-12 object-cover rounded-xl mr-6" src={chat[1].userInfo.photoURL} alt="" />
              <div className="flex flex-row">
                <span className="text-base mr-6 text-gray-100 font-semibold">{chat[1].userInfo.displayName}</span>
                {!((chat[1].lastMessage?.text) === undefined) &&
                  <p className="text-gray-400 font-semibold">
                    {
                      (chat[1].lastMessage?.text.length > 15) ? (chat[1].lastMessage?.text.substring(0, 15) + "...") : (
                        chat[1].lastMessage?.text
                      )
                    }
                  </p>
                }
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Chats;