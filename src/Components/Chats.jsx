import { doc, onSnapshot } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../Context/Auth";
import { ChatContext } from "../Context/Chat";
import Loading from "../Utility/Loading";
import { db } from "../firebase";

const Chats = () => {
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);

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
    if (currentUser.uid) {
      getChats();
    }
  }, [currentUser.uid]);

  const handleSelect = (userInfo) => {
    dispatch({ type: "SHOW_CHAT", payload: userInfo });
  };

  return (
    <>
      {loading ? (
        <div id="svg-wrapper" className="my-4 h-4/6 flex justify-center items-center">
          <Loading />
        </div>
      ) : (
        <div id="chats-base" className="w-full h-4/6 overflow-x-hidden overflow-y-auto rounded-xl">
          {Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date).map((chat) => (
            <div
              id="chat-wrapper"
              className="flex items-center pl-4 h-20 cursor-pointer max-sm:flex-col max-sm:my-4"
              key={chat[0]}
              onClick={() => handleSelect(chat[1].userInfo)}
            >
              <img className="w-12 h-12 object-cover rounded-xl mr-6" src={chat[1].userInfo.photoURL} alt="" />
              <div id="chat-info" className="flex flex-row max-sm:hidden">
                <span className="text-base mr-6 text-gray-100 font-semibold">
                  {
                    (chat[1].userInfo.displayName.length > 12) ? (chat[1].userInfo?.displayName.substring(0, 12) + "...") : (chat[1].userInfo.displayName)
                  }
                </span>
                {!((chat[1].lastMessage?.text) === undefined) &&
                  <p className="text-gray-400 font-semibold max-lg:hidden">
                    {
                      (chat[1].lastMessage?.text.length > 15) ? (chat[1].lastMessage?.text.substring(0, 15) + "...")
                        :
                        (
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