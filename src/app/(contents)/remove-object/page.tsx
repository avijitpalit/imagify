'use client'

import { faDownload, faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CldImage, CldUploadWidget, getCldImageUrl } from 'next-cloudinary';
import Image from 'next/image';
import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialImageInfo = {
    public_id: '',
    url: ''
}

const TransformedImage = ({ publicId, transformStart, isTransforming, imgLoaded, onError, renderKey, ...transformProperties }: any) => {
    const download = (url: string, filename: string) => {
        if (!url) {
            throw new Error("Resource URL not provided! You need to provide one");
        }
        
        fetch(url)
            .then((response) => response.blob())
            .then((blob) => {
            const blobURL = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = blobURL;
        
            if (filename && filename.length)
                a.download = `${filename.replace(" ", "_")}.png`;
            document.body.appendChild(a);
            a.click();
            })
            .catch((error) => console.log({ error }));
    };

    const handleDownload = (e: any) => {
        e.preventDefault()
        download(getCldImageUrl({
            src: publicId,
            ...transformProperties
        }), 'transformed-image')
    }

    return (
        <div className='h-full flex flex-col'>
            <h4 className='text-2xl font-bold'>Transformed</h4>
            {transformStart && publicId ? (
                <div className='mt-3 overflow-hidden grow relative bg-gray-100 rounded-lg relative'>
                    <a onClick={handleDownload} href="#" className="p-4 rounded-lg bg-[var(--color-green)] w-[40px] h-[40px] flex items-center justify-center absolute right-3 top-3 hover:bg-[var(--color-green-dark)]">
                        <FontAwesomeIcon icon={faDownload} className='text-white'/>
                    </a>
                    <CldImage
                    key={renderKey}
                    src={publicId}
                    alt='Transformed image'
                    className='rounded-lg'
                    onLoadStart={() => { console.log('load started') }}
                    onLoad={() => {
                        imgLoaded()
                    }}
                    onError={onError}
                    {...transformProperties}
                    />

                    {isTransforming && <div className="shimmer"></div>}
                </div>
            ) : (     
                <div className="bg-gray-100 rounded-lg flex items-center justify-center mt-3 h-[300px] grow"></div>
            )}
        </div>
    )
}

const Page = () => {
    const [imageInfo, setImageInfo] = useState(initialImageInfo)
    const [transformStart, setTransformStart] = useState(false)
    const [isTransforming, setIsTransforming] = useState(false)
    const [uploaded, setUploaded] = useState(false)
    const [publicId, setPublicId] = useState<String>('')
    const initialFormValue = {
        name: '',
        width: 0,
        height: 0,
        crop: '',
        remove: ''
    }
    const [formValue, setFormValue] = useState(initialFormValue)
    const [renderKey, setRenderKey] = useState('')

    const handleSuccess = (results: any) => {
        setImageInfo(results.info)
        setUploaded(true)
        setPublicId('')
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()
        setFormValue(prev => ({
            ...prev,
            name: e.target.name.value,
            width: e.target.width.value,
            height: e.target.height.value,
            crop: e.target.crop.value,
            remove: e.target.remove.value
        }))
        setTransformStart(true)
        setIsTransforming(true)
        setPublicId(imageInfo.public_id)
        setRenderKey('' + Math.random())
    }

    return (
        <div className='w-full max-w-[1000px]'>
            <form action="" method='POST' onSubmit={handleSubmit}>
                <div className="form-row">
                    <label className='block text-lg font-semibold' htmlFor="name">Name</label>
                    <input className='input' type="text" name="name" id="name" />
                </div>
                <div className="form-row flex gap-3 mt-3">
                    <div className='flex-1'>
                        <label className='block text-lg font-semibold' htmlFor="width">Width</label>
                        <input className='input' type="number" name="width" id="width" required />
                    </div>
                    <div className='flex-1'>
                        <label className='block text-lg font-semibold' htmlFor="height">Height</label>
                        <input className='input' type="number" name="height" id="height" required />
                    </div>
                </div>

                <div className="form-row mt-3 flex gap-3">
                    <div className="flex-1">
                        <label className='block text-lg font-semibold' htmlFor="crop">Crop</label>
                        <select className='input bg-white' name="crop" id="crop">
                            <option value="">-- Select --</option>
                            <option value="auto">Auto</option>
                            <option value="auto_pad">Auto with padding</option>
                            <option value="crop">Crop</option>
                            <option value="fill">Fill</option>
                            <option value="fill_pad">Fill with padding</option>
                            <option value="fit">Fit</option>
                            <option value="pad">Pad</option>
                            <option value="scale">Scale</option>
                            <option value="thumb">Thumb</option>
                        </select>
                    </div>
                    <div className="flex-1">
                        <label className='block text-lg font-semibold' htmlFor="remove">Object to Remove</label>
                        <input className='input' type="text" name="remove" id="remove" required />
                    </div>
                </div>

                <div className="form-row mt-7 flex gap-5">
                    <div className='flex-1'>
                        <h4 className='text-2xl font-bold'>Original</h4>
                        {uploaded ? (
                            <div className="relative rounded-lg mt-3 overflow-hidden bg-gray-100 min-h-[300px]">
                                <button className='w-[40px] h-[40px] flex items-center justify-center bg-red-500 text-white absolute right-3 top-3 rounded-lg hover:bg-red-600' type='button' onClick={() => { setUploaded(false) }}><FontAwesomeIcon icon={faTrashAlt}/></button>
                                <Image className='w-full rounded-lg' width={0} height={0} sizes='100vw' alt='' src={imageInfo.url}/>
                            </div>
                        ) : (
                            <div className="bg-gray-100 rounded-lg flex flex-col gap-3 items-center justify-center mt-3 h-[300px]">
                                <CldUploadWidget signatureEndpoint="/api/sign-cloudinary-params" onSuccess={handleSuccess}>
                                {({ open }) => {
                                    return (
                                        <button onClick={() => open()} className='p-7 rounded-lg flex flex-col items-center justify-center text-white gap-2 shadow bg-white' type="button">
                                            <div className="rounded-lg bg-primary w-[40px] h-[40px] flex items-center justify-center">
                                                <FontAwesomeIcon icon={faPlus} />
                                            </div>
                                        </button>
                                    )
                                }}
                                </CldUploadWidget>
                                <span className='font-semibold'>Upload Image</span>
                            </div>
                        )}
                    </div>
                    <div className='flex-1'>
                        <TransformedImage
                        publicId={publicId}
                        transformStart={transformStart}
                        isTransforming={isTransforming}
                        imgLoaded={() => {
                            console.log('Loaded');
                            setIsTransforming(false);
                            toast.success('Image transformed')
                        }}
                        onError={() => {
                            setIsTransforming(false)
                            toast.error('Something went wrong, image not loaded')
                        }}
                        renderKey={renderKey}
                        fillBackground
                        {...(formValue.crop && { crop: formValue.crop })}
                        width={formValue.width}
                        height={formValue.height}
                        remove={formValue.remove}
                        />
                    </div>
                </div>

                <div className="form-row mt-10">
                    <button type="submit" disabled={uploaded ? false : true} className='btn btn-primary w-full transition disabled:opacity-50'>Remove Object</button>
                </div>

                <ToastContainer/>
            </form>
        </div>
    )
}

export default Page
