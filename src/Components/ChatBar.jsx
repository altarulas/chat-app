import React, { useContext } from 'react'

import { ChatContext } from '../Context/Chat';
import Dialog from "./Dialog";
import ProfileMobile from "./ProfileMobile"

const ChatBar = () => {
    const { data } = useContext(ChatContext);
    return (
        <div id='chat-bar-base' className='h-1/6 w-full rounded-tr-lg bg-black flex items-center justify-between px-4 max-md:rounded-tl-lg'>
            <div id='profile' className=''>
                <ProfileMobile />
            </div>
            <div id='add-friend' className=''>
                <Dialog />
            </div>
            <div id='friend-image'>
                {data.showChat &&
                    <div id='user-wrapper' className='flex items-center'>
                        <img className='w-14 h-12 max-md:w-10 max-md:h-10 rounded-lg object-cover' src={data.user.photoURL} alt="" />
                    </div>}
            </div>
        </div>
    )
}

export default ChatBar;