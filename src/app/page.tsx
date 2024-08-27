'use client'

import { createUser, getUserIdByClerkId } from "@/controllers/user.controller";
import { useEffect, useState } from "react";
import { useClerk } from '@clerk/clerk-react';
import { createImage } from "@/controllers/image.controller";
import Image from "next/image";

export default function Home() {
    const [users, setUsers] = useState([])
    const { user } = useClerk();

    const handleClick = async () => {
        const r = await createImage('test', 'path here', 'user_2kuxejCMsr2Q2VRAxCaeDZDWGo5', 'generative_fill')
        console.log(r)
    }

    return (
        <div className='w-full max-w-[1000px]'>
            <p>shortcuts</p>
            <p>recent edits</p>
            <h2 className="text-3xl font-bold">Imagify Feeds</h2>
            <div className="flex gap-5 mt-4">
                <div className="rounded-lg shadow-md overflow-hidden">
                    <div><Image src="/test-compressed.jpg" width={300} height={300} layout="full" alt="" /></div>
                    <div className="p-3">
                        <div className="rounded bg-[var(--color-primary)] px-1 inline-block"><small className="text-white font-medium text-sm">Replace Color</small></div>
                        <h4 className="text-lg font-bold mt-3">Image title here</h4>
                        <div className="flex gap-2 mt-4 items-center">
                            <Image src='/user-placeholder.png' width={32} height={32} alt="" className="rounded-full" />
                            <span>User fullname</span>
                        </div>
                    </div>
                </div>
                <div className="rounded-lg shadow-md overflow-hidden">
                    <div><Image src="/test-compressed.jpg" width={300} height={300} layout="full" alt="" /></div>
                    <div className="p-3">
                        <div className="rounded bg-[var(--color-primary)] px-1 inline-block"><small className="text-white font-medium text-sm">Replace Color</small></div>
                        <h4 className="text-lg font-bold mt-3">Image title here</h4>
                        <div className="flex gap-2 mt-4 items-center">
                            <Image src='/user-placeholder.png' width={32} height={32} alt="" className="rounded-full" />
                            <span>User fullname</span>
                        </div>
                    </div>
                </div>
                <div className="rounded-lg shadow-md overflow-hidden">
                    <div><Image src="/test-compressed.jpg" width={300} height={300} layout="full" alt="" /></div>
                    <div className="p-3">
                        <div className="rounded bg-[var(--color-primary)] px-1 inline-block"><small className="text-white font-medium text-sm">Replace Color</small></div>
                        <h4 className="text-lg font-bold mt-3">Image title here</h4>
                        <div className="flex gap-2 mt-4 items-center">
                            <Image src='/user-placeholder.png' width={32} height={32} alt="" className="rounded-full" />
                            <span>User fullname</span>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    );
}
