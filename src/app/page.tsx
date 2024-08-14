'use client'

import handler from "@/api/users";
import { useEffect, useState } from "react";

export default function Home() {
    const [users, setUsers] = useState([])

    const handleClick = async () => {
        const response = await fetch('/api/users');
        const _users = await response.json();
        setUsers(_users) ;
        console.log(_users)
    }

    return (
        <div className='w-full max-w-[1000px]'>
            <button className="px-3 py-2 bg-green-600 rounded text-white" onClick={handleClick}>Test</button>
        </div>
    );
}
