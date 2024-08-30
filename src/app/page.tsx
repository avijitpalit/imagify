'use client'

import { createUser, getUserIdByClerkId } from "@/controllers/user.controller";
import { FC, useEffect, useState } from "react";
import { useClerk } from '@clerk/clerk-react';
import { createImage, getImages } from "@/controllers/image.controller";
import Image from "next/image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWandMagicSparkles, faEraser, faObjectGroup, faPalette, faMagnifyingGlass, faMagicWandSparkles, faHome } from '@fortawesome/free-solid-svg-icons'
import Link from "next/link";
import { IconDefinition, IconProp } from "@fortawesome/fontawesome-svg-core";

type IconKeys = 'generative_fill' | 'remove_object' | 'replace_object' | 'recolor_object'
const iconMap: Record<IconKeys, IconDefinition> = {
    generative_fill: faMagicWandSparkles,
    remove_object: faEraser,
    replace_object: faObjectGroup,
    recolor_object: faPalette
}

interface IconProps {
    link: string;
    icon: IconProp;
    text: string;
}

interface EditViewProps {
    key: string
    src: string
    title: string
    icon: IconDefinition
}

interface ImageType {
    _id: string;
    name: string;
    path: string;
    conversionType: 'generative_fill' | 'remove_object' | 'replace_object' | 'recolor_object';
}

const Shortcut: FC<IconProps> = ({link, icon, text}) => {
    return (
        <Link href={link} className="flex flex-col items-center">
            <div className="p-3 rounded-full w-[48px] h-[48px] bg-white flex items-center justify-center"><FontAwesomeIcon icon={icon}/></div>
            <p className="text-white text-lg font-semibold mt-2 text-center leading-6">{text}</p>
        </Link>
    )
}

const EditView: FC<EditViewProps> = ({src, title, icon}) => {
    return (
        <div className="rounded-lg shadow-md overflow-hidden">
            <div><Image src={src} className="w-full" alt="" width={0} height={0} sizes='100vw' /></div>
            <div className="p-3 flex items-center gap-3">
                <h4 className="text-lg font-bold">{title}</h4>
                <FontAwesomeIcon className="ml-auto" icon={icon}/>
            </div>
        </div>
    )
}

export default function Home() {
    const [users, setUsers] = useState([])
    const { user } = useClerk();
    const [images, setImages] = useState<ImageType[]>([])

    const handleClick = async () => {
        const currentUserId = user?.id
        const _images = await getImages(currentUserId!)
        console.log(_images)
    }

    useEffect(() => {
        if(!user?.id) return
        console.log(user?.id)
        const currentUserId = user?.id
        const fetchImages = async () => {
            const imagesData = await getImages(currentUserId!)
            // console.log(typeof imagesData.images[0].conversionType)
            imagesData.done && setImages(imagesData.images)
        }
        fetchImages()
    }, [user])

    const defaultIcon = faHome
    

    return (
        <div className='w-full max-w-[1000px]'>
            <div className="px-8 py-[4rem] rounded-3xl bg-gradient-to-br from-[var(--color-primary)] to-purple-700">
                <h1 className="text-white text-4xl font-bold text-center">Reimagine Your Images <br /> with Imagify</h1>
                <div className="flex gap-[4rem] justify-center mt-8">
                    <Shortcut link="/generative-fill" icon={faWandMagicSparkles} text="Generative Fill"/>
                    <Shortcut link="/remove-object" icon={faEraser} text="Remove Object"/>
                    <Shortcut link="/replace-object" icon={faObjectGroup} text="Replace Object"/>
                    <Shortcut link="/recolor-object" icon={faPalette} text="Recolor Object"/>
                </div>
            </div>

            <div className="flex gap-3 mt-[4rem]">
                <h2 className="text-3xl font-bold">Recent Edits</h2>
                <div className="relative ml-auto overflow-hidden">
                    <FontAwesomeIcon icon={faMagnifyingGlass} className='absolute w-[30px] h-[30px] top-[16px] left-[7px] text-slate-500' />
                    <input type="text" name="search_text" id="" className="h-full outline-none pl-[40px] px-4 py-3 min-w-[300px] border-2 border-slate-300 rounded-lg focus:border-slate-400" />
                </div>
            </div>

            <div className="grid gap-5 grid-cols-3 mt-5">
                {images.map(image => (
                    <div>
                        <EditView key={image._id} src={image.path} title={image.name} icon={iconMap[image.conversionType] || defaultIcon} />
                        <span>{image.conversionType}</span>
                    </div>
                ))}
            </div>

            <div className="mt-9">
                <button className="btn btn-primary" onClick={handleClick}>Test</button>
            </div>
        </div>
    );
}
