'use client'

import { createUser, getUserIdByClerkId } from "@/controllers/user.controller";
import { useEffect, useState } from "react";
import { useClerk } from '@clerk/clerk-react';
import { createImage } from "@/controllers/image.controller";

export default function Home() {
    const [users, setUsers] = useState([])
    const { user } = useClerk();

    const handleClick = async () => {
        const r = await createImage('test', 'path here', 'user_2kuxejCMsr2Q2VRAxCaeDZDWGo5', 'generative_fill')
        console.log(r)
    }

    return (
        <div className='w-full max-w-[1000px]'>
            <button className="px-3 py-2 bg-green-600 rounded text-white" onClick={handleClick}>Test</button>
        </div>
    );
}
