'use client'

import { createUser } from "@/controllers/user.controller";
import { useEffect, useState } from "react";

export default function Home() {
    const [users, setUsers] = useState([])

    const handleClick = async () => {
        const user = {
            clerkId: 'rthrtjrt',
            fname: 'Peter',
            lname: 'Parker',
            email: `peterparker_rthrtjrt@gmail.com`,
            avatar: 'avatar url here xxx'
        }
    
        const newUser = await createUser(user)
        console.log(newUser)
    }

    return (
        <div className='w-full max-w-[1000px]'>
            <button className="px-3 py-2 bg-green-600 rounded text-white" onClick={handleClick}>Test</button>
        </div>
    );
}
