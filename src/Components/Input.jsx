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
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);


  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
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

    setText("");
    setImg(null);
  };
  return (
    <>
      <div id="input-base" className="w-full h-1/6 flex border-l-4 bg-gray-200">

        <input
          className="w-3/4 pl-2 bg-gray-200"
          type="text"
          placeholder="Type something..."
          onChange={(e) => setText(e.target.value)}
          value={text} />

        <div className="w-1/4 flex items-center justify-between px-4 border-l-2 border-gray-300">
          <label className="cursor-pointer" htmlFor="file">
            <input
              className="cursor-pointer"
              type="file"
              style={{ display: "none" }}
              id="file"
              onChange={(e) => setImg(e.target.files[0])} />
            <img src={Img} alt="" />
          </label>
          <button className="bg-gray-700 text-white font-semibold h-10 w-20 rounded-lg" onClick={handleSend}>Send</button>
        </div>

      </div>
    </>
  );
};

export default Input;