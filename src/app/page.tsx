'use client'

import { createUser } from "@/controllers/user.controller";
import { useEffect, useState } from "react";

export default function Home() {
    const [users, setUsers] = useState([])

    const handleClick = async () => {
        /* const newUser = await createUser({
            clerkId: Math.random().toString(),
            fname: 'Peter',
            lname: 'Parker',
            email: `peterparker_${Math.random()}@gmail.com`,
            avatar: 'avatar url here'
        }) */

        const user = {
            clerkId: 'ferge',
            fname: 'Peter',
            lname: 'Parker',
            email: `peterparker_ferge@gmail.com`,
            avatar: 'avatar url here, again'
        }
    
        const x = await fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                clerkId: 'ferge',
                fname: 'Peter',
                lname: 'Parker',
                email: `peterparker_ferge@gmail.com`,
                avatar: 'avatar url here, again'
            })
        })

        console.log(x)
    }

    return (
        <div className='w-full max-w-[1000px]'>
            <button className="px-3 py-2 bg-green-600 rounded text-white" onClick={handleClick}>Test</button>
        </div>
    );
}
