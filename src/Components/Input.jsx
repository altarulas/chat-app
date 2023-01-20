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
import { Button } from "@mui/material";
import { ChatContext } from "../Context/Chat";
import Img from "../Images/img.png";
import { v4 as uuid } from "uuid";

const Input = () => {
  const [inputText, setInputText] = useState("");
  const [image, setImage] = useState(null);


  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    const text = inputText;
    setInputText("");

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
      const uploadTask = uploadBytesResumable(storageRef, image).then(
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
      //TODO: add edge case
    }

    setInputText("");
    setImage(null);
  }

  const handleKeyboard = (e) => {
    e.code === "Enter" && handleSend();
  };

  return (
    <>
      <div id="input-base" className="h-1/6 w-full flex border-l-4 bg-gray-200">

        <input
          className="w-3/4 pl-2 bg-gray-200"
          type="text"
          placeholder="Type something..."
          onChange={(e) => setInputText(e.target.value)}
          value={inputText}
          onKeyDown={handleKeyboard}
          {...(!data.showChat && { disabled: true })}
        />

        <div className="w-1/4 flex items-center justify-center px-6 border-l-2 border-gray-300 justify-between">

          <label
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
            <div className="w-8">
              <img className={`${!data.showChat && ("cursor-not-allowed")} w-full`} src={Img} alt="" />
            </div>
          </label>

          <Button
            style={{ width: "50px", height: "40px" }}
            color="secondary"
            variant="contained"
            onClick={handleSend}
            {...(!data.showChat && { disabled: true })}
          >
            Send
          </Button>
        </div>

      </div>
    </>
  );

};


export default Input;