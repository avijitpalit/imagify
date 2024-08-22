'use client'

import { createUser, getUserIdByClerkId } from "@/controllers/user.controller";
import { useEffect, useState } from "react";
import { useClerk } from '@clerk/clerk-react';
import { createImage } from "@/controllers/image.controller";

export default function Home() {
    const [users, setUsers] = useState([])
    const { user } = useClerk();

    const handleClick = async () => {
        /* const user = {
            clerkId: 'rthrtjrt',
            fname: 'Peter',
            lname: 'Parker',
            email: `peterparker_rthrtjrt@gmail.com`,
            avatar: 'avatar url here xxx'
        }
    
        const newUser = await createUser(user)
        console.log(newUser) */

        // await getUserIdByClerkId('user_2kuxejCMsr2Q2VRAxCaeDZDWGo5')
        // console.log(user?.id);

        // await createImage('some name', 'image public path here', 'user_2kuxejCMsr2Q2VRAxCaeDZDWGo5')
        // console.log('image created')

        
    }

    return (
        <div className='w-full max-w-[1000px]'>
            <button className="px-3 py-2 bg-green-600 rounded text-white" onClick={handleClick}>Test</button>
        </div>
    );
}
