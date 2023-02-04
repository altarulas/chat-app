import React, { useContext, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

import { AuthContext } from "../Context/Auth"
import { db } from "../firebase"

const Search = () => {
  const { currentUser } = useContext(AuthContext);

  const [userName, setUserName] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);

  //Checks whether the group(chats in firestore) exists. If it is not, it will be create
  const handleSelect = async () => {
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      //Checks if there is a already created chat and userChats
      const response = await getDoc(doc(db, "chats", combinedId));
      //If there is no response then it will creates chats and userChats
      if (!response.exists()) {
        //Creates a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });
        //Creates userChats for currentUser
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
        //Creates userChats for clicked user (user that currentUser searched and clicked)
        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (error) {
      setError(true);
    }
    setUser(null);
    setUserName("")
  };

  //Searches user that you typed to input and sets the user's information
  const handleSearch = async () => {
    const searchedUser = query(collection(db, "users"), where("displayName", "==", userName));
    try {
      const querySnapshot = await getDocs(searchedUser);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
        setUserName("");
      });
    } catch (error) {
      setError(true);
    }
  }

  //Makes the enter key clickable 
  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  return (
    <div id="search-base" className="w-full h-2/6 flex flex-col">
      <div id="search-input" className="p-4 w-full max-sm:w-56">
        <input
          className="w-full h-10 rounded-lg pl-2"
          type="text"
          placeholder="Find a user"
          onKeyDown={handleKey}
          onChange={(e) => setUserName(e.target.value)}
          value={userName}
        />
      </div>
      {error && <span>User not found!</span>}
      {user &&
        <div id="user-wrapper" className="flex items-center h-16 p-1 w-full pl-4 cursor-pointer" onClick={handleSelect}>
          <img className="w-12 h-12 object-cover rounded-xl mr-6" src={user.photoURL} alt="" />
          <div className="userChatInfo">
            <span className="text-white font-semibold">{user.displayName}</span>
          </div>
        </div>
      }
    </div>
  );
};

export default Search;