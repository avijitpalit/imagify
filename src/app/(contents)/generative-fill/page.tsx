"use client";

import { faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CldImage, CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const initialImageInfo = {
    public_id: '',
    url: ''
}

const TransformedImage = ({ publicId, transformStart, isTransforming, imgLoaded }: any) => {
    const [prevPublicId, setPrevPublicId] = useState('')
    return (
        <div className='h-full flex flex-col'>
            <h4 className='text-2xl font-bold'>Transformed</h4>
            {transformStart && publicId ? (
                <div className='mt-3 overflow-hidden grow relative bg-gray-100 rounded-lg'>
                    <CldImage
                    src={publicId}
                    width='160'
                    height='300'
                    alt=''
                    className='rounded-lg'
                    onLoad={() => {
                        setPrevPublicId(publicId)
                        imgLoaded()
                    }}
                    onError={(error) => {
                        console.log('Image loading error: ', error)
                    }}
                    // sizes='100vw'
                    fillBackground
                    crop='pad'
                    />
                    {isTransforming && publicId != prevPublicId && <div className="shimmer"></div>}
                </div>
            ) : (
                <div className="bg-gray-100 rounded-lg flex items-center justify-center mt-3 h-[300px] grow"></div>
            )}
        </div>
    )
}

export default function Page() {
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
        aspectRatio: ''
    }
    const [formValue, setFormValue] = useState(initialFormValue)

    useEffect(() => {
        console.log('Uploaded', uploaded);
        console.log('transformStart', transformStart);
    }, [uploaded, transformStart])

    const handleSuccess = (results: any) => {
        setImageInfo(results.info)
        setUploaded(true)
        setPublicId('')
    }

    const handleTransform = () => {
        setTransformStart(true)
        setIsTransforming(true)
        setPublicId(imageInfo.public_id)
    }

    const handleInputChange = (e: any) => {
        const {name, value} = e.target
        if(name == 'ratio_1' || name == 'ratio_2'){
            const ratio_1 = e.target.ratio_1.value || 0
            const ratio_2 = e.target.ratio_2.value || 0
            setFormValue({
                ...formValue,
                aspectRatio: `${ratio_1}:${ratio_2}`
            })
        } else {
            setFormValue({
                ...formValue,
                [name]: value
            })
        }
    }

    return (
        <div className='w-full max-w-[1000px]'>
            <form action="" method="post">
                <div className="form-row">
                    <label className='block text-lg font-semibold' htmlFor="name">Name</label>
                    <input className='input' type="text" name="name" id="name" onChange={handleInputChange} />
                </div>

                <div className="form-row flex gap-3 mt-3">
                    <div className='flex-auto'>
                        <label className='block text-lg font-semibold' htmlFor="name">Width</label>
                        <input className='input' type="number" name="width" id="width" required onChange={handleInputChange} />
                    </div>
                    <div className='flex-auto'>
                        <label className='block text-lg font-semibold' htmlFor="height">Height</label>
                        <input className='input' type="number" name="height" id="height" required onChange={handleInputChange} />
                    </div>
                </div>

                <div className="form-row mt-3 flex gap-3">
                    <div className="flex-1">
                        <label className='block text-lg font-semibold' htmlFor="crop">Crop</label>
                        <select className='input bg-white' name="crop" id="crop" onChange={handleInputChange}>
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
                        <label className='block text-lg font-semibold' htmlFor="ratio_1">Aspect Ratio</label>
                        <div className="flex gap-3 items-center">
                            <div className="flex-1">
                                <input className='input' type="number" name="ratio_1" id="ratio_1" />
                            </div>
                            <span><b>:</b></span>
                            <div className="flex-1">
                                <input className='input' type="number" name="ratio_2" id="ratio_2" />
                            </div>
                        </div>
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
                            setIsTransforming(false);
                        }}
                        />
                    </div>
                </div>

                <div className="form-row mt-10">
                    <button type="button" disabled={uploaded ? false : true} className='btn btn-primary w-full transition disabled:opacity-50' onClick={handleTransform}>Apply Transform</button>
                </div>

                <div className="form-row mt-10">
                    <button type="button" className='btn btn-primary w-full transition disabled:opacity-50' onClick={() => { console.log(formValue) }}>Test</button>
                </div>

                {/* <CldImage
                    src='sample' // Use this sample image or upload your own via the Media Explorer
                    width='200'
                    height='200'
                    alt=''
                    sizes='100vw'
                    className='mt-5'
                    onLoad={() => {
                        console.log('Loaded');
                        // setIsTransforming(false)
                    }}
                    fillBackground
                /> */}
            </form>
            <div className="py-5"></div>
        </div>
    );
}