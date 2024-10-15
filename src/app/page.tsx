'use client'

import { createUser, getUserIdByClerkId } from "@/controllers/user.controller";
import { FC, useEffect, useState } from "react";
import { useClerk } from '@clerk/clerk-react';
import { createImage, deleteImage, getImages, getImagesDemo, searchImage } from "@/controllers/image.controller";
import Image from "next/image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWandMagicSparkles, faEraser, faObjectGroup, faPalette, faMagnifyingGlass, faMagicWandSparkles, faHome, faChevronRight, faChevronLeft, faTrashAlt, faFaceFrownOpen } from '@fortawesome/free-solid-svg-icons'
import Link from "next/link";
import { IconDefinition, IconProp } from "@fortawesome/fontawesome-svg-core";
import { useRouter, useSearchParams } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { SignedIn } from "@clerk/nextjs";

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
    id: string;
    key: string
    src: string
    title: string
    icon: IconDefinition,
    deleted: any
}

interface ImageType {
    _id: string;
    name: string;
    path: string;
    conversionType: IconKeys;
}

const Shortcut: FC<IconProps> = ({link, icon, text}) => {
    return (
        <Link href={link} className="flex flex-col items-center">
            <div className="p-3 rounded-full w-[48px] h-[48px] bg-white flex items-center justify-center"><FontAwesomeIcon icon={icon}/></div>
            <p className="text-white text-lg font-semibold mt-2 text-center leading-6">{text}</p>
        </Link>
    )
}

const EditView: FC<EditViewProps> = ({id, src, title, icon, deleted}) => {
    const handleDelete = async (id: string) => {
        const deleteConfirm = confirm('Are you sure?')
        if(!deleteConfirm) return
        const result = await deleteImage(id)
        if(result) deleted()
        else toast.error('Something went wrong')
    }

    return (
        <div className="group rounded-lg shadow-md overflow-hidden relative">
            <button className='w-[40px] h-[40px] flex items-center justify-center bg-red-500 text-white absolute right-3 top-3 rounded-lg hover:bg-red-600 opacity-30 group-hover:opacity-100 transition' type='button' onClick={() => handleDelete(id)}><FontAwesomeIcon icon={faTrashAlt}/></button>
            <div><Image src={src} className="w-full" alt="" width={0} height={0} sizes='100vw' /></div>
            <div className="p-3 flex items-center gap-3">
                <h4 className="text-lg font-bold">{title}</h4>
                <FontAwesomeIcon className="ml-auto" icon={icon}/>
            </div>
        </div>
    )
}

export default function Home() {
    const router = useRouter()
    const [users, setUsers] = useState([])
    const { user } = useClerk();
    const [images, setImages] = useState<ImageType[]>([])
    const [currentUserId, setCurrentUserId] = useState('')
    const [page, setPage] = useState({currentPage: 1, totalPages: 0})
    const query = useSearchParams()
    const [isSearching, setIsSearching] = useState(false)

    useEffect(() => {
        if(!user?.id) return
        const currentUserId = user?.id
        setCurrentUserId(user?.id)
        const fetchImages = async () => {
            const currentPage = query.get('page') ? parseInt(query.get('page')!) : 1
            const imagesData = await getImages(user?.id, currentPage)
            if(imagesData.done){
                setImages(imagesData.images)
                setPage({currentPage: imagesData.page!, totalPages: imagesData.totalPages!})
            }
        }
        fetchImages()
    }, [user])

    const handlePageChange = async (page: number) => {
        if(!currentUserId) return
        if(page === 1){
            const params = new URLSearchParams(query.toString())
            params.delete('page')
            router.replace(`?${params.toString()}`, {scroll: false})
        } else router.push(`?page=${page}`, {scroll: false})
        // router.push(`?page=${page}`, {scroll: false})
        const imagesData = await getImages(currentUserId!, page)
        if(imagesData.done){
            setImages(imagesData.images)
            setPage((prev: any) => ({
                ...prev,
                currentPage: imagesData.page
            }))
        }
    }

    const handleNextClick = async () => {
        if(!currentUserId) return
        const imagesData = await getImages(currentUserId!, 2)
        if(imagesData.done){
            setImages(imagesData.images)
            setPage((prev: any) => ({
                ...prev,
                currentPage: imagesData.page
            }))
        }
    }

    const onImageDeleted = (id: string) => {
        setImages(images.filter(image => image._id != id))
        toast.success('Image deleted')
    }

    const test = async () => {
        const data = await searchImage(user?.id!, 'Recolor')
        console.log(data)
        setIsSearching(true)
    }

    type Callback = (...args: any[]) => Promise<any>
    const debounce = (callback: Callback, wait: number): Callback  => {
        let timeoutId: any = null;
        return async (...args: any[]): Promise<any> => {
            timeoutId && window.clearTimeout(timeoutId);
            timeoutId = window.setTimeout(async () => {
                await callback(...args);
            }, wait);
        };
    }

    const searchImageByText = async (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const clerkId = user?.id!
            const search = async () => {
                return await searchImage(clerkId, event.target.value)
            }
            // console.log(await search())
            // const r = await searchImage(clerkId, event.target.value)
            const debouncedSearch = debounce(search, 300)
            const r = await debouncedSearch()
            console.log(r);
            if(r.done){
                setImages(r.images)
            }
        } catch (error) {
            
        }
    }

    function test2(){
        return 'hello'
    }

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

            <SignedIn>
                <div className="flex gap-3 mt-[4rem]">
                    <h2 className="text-3xl font-bold">Recent Edits</h2>
                    <div className="relative ml-auto overflow-hidden">
                        <FontAwesomeIcon icon={faMagnifyingGlass} className='absolute w-[30px] h-[30px] top-[16px] left-[7px] text-slate-500' />
                        <input type="text" name="search" id="" className="h-full outline-none pl-[40px] px-4 py-3 min-w-[300px] border-2 border-slate-300 rounded-lg focus:border-slate-400" onChange={searchImageByText} />
                    </div>
                </div>

                { images.length > 0 ? (
                    <>
                        <div className="grid gap-5 grid-cols-3 mt-5">
                            { images.map((image, index) => (
                                <EditView key={index.toString()} id={image._id} src={image.path} title={image.name} icon={iconMap[image.conversionType]} deleted={() => onImageDeleted(image._id)} />
                            )) }
                        </div>
                        
                        {/* Pagination */}
                        {!isSearching && (
                            <div className="flex gap-3 justify-center items-center mt-5">
                                <button className="btn btn-primary p-1 flex gap-2 items-center btn-sm disabled:opacity-50" onClick={() => handlePageChange(page.currentPage - 1)} disabled={page.currentPage === 1}><FontAwesomeIcon icon={faChevronLeft}/> Previous</button>
                                <button className="btn btn-primary p-1 flex gap-2 items-center btn-sm disabled:opacity-50" onClick={() => handlePageChange(page.currentPage + 1)} disabled={page.currentPage === page.totalPages}>Next <FontAwesomeIcon icon={faChevronRight}/></button>
                            </div>
                        )}
                    </>
                ) : <h3 className="text-3xl text-center w-full mt-[3rem] font-semibold text-slate-400">Wow such empty <FontAwesomeIcon icon={faFaceFrownOpen}/></h3> }
            </SignedIn>

            <ToastContainer/>

            <button className="btn btn-primary btn-sm" onClick={test}>Test</button>
        </div>
    );
}
