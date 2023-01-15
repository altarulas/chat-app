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
import { v4 as uuid } from "uuid";

/* import Img from "../Images/img.png"; */


const Input = () => {
  const [inputText, setInputText] = useState("");
  const [img, setImg] = useState(null);


  const { currentUser } = useContext(AuthContext);
  const { data, visible } = useContext(ChatContext);

  const handleSend = async () => {
    const text = inputText;
    if (text) {
      setInputText("");
      if (img) {
        const storageRef = ref(storage, uuid());

        const uploadTask = uploadBytesResumable(storageRef, img);

        uploadTask.on(
          (error) => {
            console.log(error)
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
              await updateDoc(doc(db, "chats", data.chatId), {
                messages: arrayUnion({
                  id: uuid(),
                  text,
                  senderId: currentUser.uid,
                  date: Timestamp.now(),
                  img: downloadURL,
                }),
              });
            });
          }
        );
      } else {
        await updateDoc(doc(db, "chats", data.chatId), {
          messages: arrayUnion({
            id: uuid(),
            text,
            senderId: currentUser.uid,
            date: Timestamp.now(),
          }),
        });
      }

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

      setInputText("");
      setImg(null);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSend();
  };

  return (
    <>
      <div id="input-base" style={{ height: "14%" }} className="w-full flex border-l-4 bg-gray-200">

        <input
          className="w-3/4 pl-2 bg-gray-200"
          type="text"
          placeholder="Type something..."
          onChange={(e) => setInputText(e.target.value)}
          value={inputText}
          onKeyDown={handleKey}
          {...(!visible && { disabled: true })}
        />

        <div className="w-1/4 flex items-center justify-center px-4 border-l-2 border-gray-300">
          {/* <label
            className="cursor-pointer"
            htmlFor="file"
            {...(!visible && { disabled: true })}
          >
            <input
              className={`${!visible && ("cursor-not-allowed")}`}
              type="file"
              style={{ display: "none" }}
              id="file"
              onChange={(e) => setImg(e.target.files[0])}
              {...(!visible && { disabled: true })}
            />
            <img className={`${!visible && ("cursor-not-allowed")}`} src={Img} alt="" />
          </label> */}
          <Button
            style={{ width: "100px", height: "44px" }}
            color="secondary"
            variant="contained"
            onClick={handleSend}
            {...(!visible && { disabled: true })}
          >
            Send
          </Button>
        </div>

      </div>
    </>
  );
};

export default Input;