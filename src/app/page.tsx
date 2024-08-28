'use client'

import { createUser, getUserIdByClerkId } from "@/controllers/user.controller";
import { useEffect, useState } from "react";
import { useClerk } from '@clerk/clerk-react';
import { createImage } from "@/controllers/image.controller";
import Image from "next/image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWandMagicSparkles, faEraser, faObjectGroup, faPalette } from '@fortawesome/free-solid-svg-icons'

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
            <div className="px-8 py-[4rem] rounded-3xl bg-gradient-to-br from-[var(--color-primary)] to-purple-700">
                <h1 className="text-white text-4xl font-bold text-center">Reimagine Your Images <br /> with Imagify</h1>
                <div className="flex gap-[4rem] justify-center mt-8">
                    <a href="#" className="flex flex-col items-center">
                        <div className="p-3 rounded-full w-[48px] h-[48px] bg-white flex items-center justify-center"><FontAwesomeIcon icon={faWandMagicSparkles}/></div>
                        <p className="text-white text-lg font-semibold mt-2 text-center leading-6">Generative Fill</p>
                    </a>
                    <a href="#" className="flex flex-col items-center">
                        <div className="p-3 rounded-full w-[48px] h-[48px] bg-white flex items-center justify-center"><FontAwesomeIcon icon={faEraser}/></div>
                        <p className="text-white text-lg font-semibold mt-2 text-center leading-6">Remove Object</p>
                    </a>
                    <a href="#" className="flex flex-col items-center">
                        <div className="p-3 rounded-full w-[48px] h-[48px] bg-white flex items-center justify-center"><FontAwesomeIcon icon={faObjectGroup}/></div>
                        <p className="text-white text-lg font-semibold mt-2 text-center leading-6">Replace Object</p>
                    </a>
                    <a href="#" className="flex flex-col items-center">
                        <div className="p-3 rounded-full w-[48px] h-[48px] bg-white flex items-center justify-center"><FontAwesomeIcon icon={faPalette}/></div>
                        <p className="text-white text-lg font-semibold mt-2 text-center leading-6">Recolor Object</p>
                    </a>
                </div>
            </div>
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
