import React, { useContext } from 'react'

import { ChatContext } from '../Context/Chat';

const Navbar = () => {
    const { data } = useContext(ChatContext);
    return (
        <div id='navbar-base' className='h-1/6 w-full rounded-tr-lg bg-black flex items-center'>
            {data.showChat &&
                <div id='user-wrapper' className='w-20 flex items-center ml-auto'>
                    <img className='w-14 h-12 rounded-lg object-cover' src={data.user.photoURL} alt="" />
                </div>}
        </div>
    )
}

export default Navbar;