import React, { useContext, useState } from "react";
import {
  Timestamp,
  arrayUnion,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

import { AuthContext } from "../Context/Auth";
import { ChatContext } from "../Context/Chat";
import Img from "../Images/img.png";
import { v4 as uuid } from "uuid";

const Input = () => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const [inputText, setInputText] = useState("");
  const [image, setImage] = useState(null);

  //sends the input to the userChats
  const handleSend = async () => {
    const text = inputText;
    setInputText("");

    //whenever database gets a text this function will update the current chat in real time
    const chatUpdater = async () => {
      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [data.chatId + ".lastMessage"]: {
          text,
        },
        [data.chatId + ".date"]: serverTimestamp(),
      });

      await updateDoc(doc(db, "userChats", data.user.uid), {
        [data.chatId + ".lastMessage"]: {
          text,
        },
        [data.chatId + ".date"]: serverTimestamp(),
      });
    }

    if (text && image) {
      const storageRef = ref(storage, uuid());
      await uploadBytesResumable(storageRef, image).then(
        () => {
          getDownloadURL(storageRef).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                image: downloadURL,
              }),
            });
          });
        }
      );
      chatUpdater();
    } else if (text !== "") {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
      chatUpdater();
    } else if (image) {
      const storageRef = ref(storage, uuid());
      await uploadBytesResumable(storageRef, image).then(
        () => {
          getDownloadURL(storageRef).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                image: downloadURL,
              }),
            });
          });
        }
      );
      chatUpdater();
    } else {
      alert("Something went wrong try again");
    }
    setInputText("");
    setImage(null);
  }

  const handleKeyboard = (e) => {
    e.code === "Enter" && handleSend();
  };

  return (
    <>
      <div id="input-base" className="h-1/6 w-full flex border-l-4 bg-gray-200 rounded-lg">
        <input
          id="input-text"
          className="w-3/4 pl-2 bg-gray-200 outline-0"
          type="text"
          placeholder="Type something..."
          onChange={(e) => setInputText(e.target.value)}
          value={inputText}
          onKeyDown={handleKeyboard}
          {...(!data.showChat && { disabled: true })}
        />
        <div id="input-buttons" className="w-1/4 flex items-center justify-center px-6 max-lg:px-2 border-l-2 border-gray-300 justify-between max-lg:flex-col max-md:py-2 max-sm:flex-row max-xs:flex-col">
          <label
            id="image-upload"
            className="cursor-pointer"
            htmlFor="file"
            {...(!data.showChat && { disabled: true })}
          >
            <input
              className={`${!data.showChat && ("cursor-not-allowed")}`}
              type="file"
              style={{ display: "none" }}
              id="file"
              onChange={(e) => setImage(e.target.files[0])}
              {...(!data.showChat && { disabled: true })}
            />
            <div className="w-8 max-md:w-7 max-md:mb-2 max-lg:mt-1">
              <img className={`${!data.showChat && ("cursor-not-allowed")} w-full`} src={Img} alt="" />
            </div>
          </label>
          <button
            id="send-button"
            className="cursor-pointer text-sm font-bold py-2 px-4 rounded-lg bg-black text-white hover:bg-gray-400 max-lg:mb-2 max-lg:text-sm max-md:text-xs max-sm:mb-1"
            onClick={handleSend}
            {...(!data.showChat && { disabled: true })}
          >
            SEND
          </button>
        </div>
      </div>
    </>
  );

};


export default Input;