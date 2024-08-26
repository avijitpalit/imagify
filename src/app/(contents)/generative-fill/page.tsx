"use client";

import { faDownload, faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CldImage, CldUploadWidget, getCldImageUrl } from 'next-cloudinary';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useClerk } from '@clerk/clerk-react';
import { createImage } from '@/controllers/image.controller';
import TransformedImage from '@/components/TransformedImage';

declare interface FormValue {
    name: string,
    width: number,
    height: number,
    crop: CropOptions,
    ratio_1: number,
    ratio_2: number
}

const initialImageInfo = {
    public_id: '',
    url: ''
}

export default function Page() {
    const { user } = useClerk();
    const [imageInfo, setImageInfo] = useState(initialImageInfo)
    const [transformStart, setTransformStart] = useState(false)
    const [isTransforming, setIsTransforming] = useState(false)
    const [uploaded, setUploaded] = useState(false)
    const [cropEnabled, setCropEnabled] = useState(false)
    const [saveEnabled, setSaveEnabled] = useState(false)
    const [publicId, setPublicId] = useState<string>('')
    
    const initialFormValue: FormValue = {
        name: '',
        width: 0,
        height: 0,
        crop: 'auto',
        ratio_1: 0,
        ratio_2: 0
    }
    const [formValue, setFormValue] = useState(initialFormValue)
    const [renderKey, setRenderKey] = useState('')

    const handleSuccess = (results: any) => {
        setImageInfo(results.info)
        setUploaded(true)
        setPublicId('')
    }

    /* const handleTransform = () => {
        setTransformStart(true)
        setIsTransforming(true)
        setPublicId(imageInfo.public_id)
        setRenderKey('' + Math.random())
    } */

    /* const handleInputChange = (e: any) => {
        const {name, value} = e.target
        // console.log(name, value)
        setFormValue({
            ...formValue,
            [name]: value
        })
    } */

    const handleSubmit = (e: any) => {
        e.preventDefault()
        setFormValue(prev => ({
            ...prev,
            name: e.target.name.value,
            width: e.target.width.value,
            height: e.target.height.value,
            crop: e.target.crop.value,
            ...(
                e.target.crop.value == 'crop' && {
                    ratio_1: e.target.ratio_1.value,
                    ratio_2: e.target.ratio_2.value
                }
            )
        }))
        setTransformStart(true)
        setIsTransforming(true)
        setPublicId(imageInfo.public_id)
        setRenderKey('' + Math.random())
    }

    const handleSave = async () => {
        const path = getCldImageUrl({
            src: publicId,
            fillBackground: true,
            crop: formValue.crop,
            width: formValue.width,
            height: formValue.height,
            ...(formValue.crop == 'crop' && {
                aspectRatio: `${formValue.ratio_1}:${formValue.ratio_2}`
            })
        })
        const currentUserId = user?.id
        const r = await createImage(formValue.name, path, currentUserId!, 'generative_fill')
        if(r) toast.success('Image saved')
        else toast.error('Something went wrong')
    }

    const handleCropChange = (e: any) => {
        setCropEnabled(e.target.value == 'crop' ? true : false)
    }

    return (
        <div className='w-full max-w-[1000px]'>
            <form action="" method="post" onSubmit={handleSubmit}>
                <div className="form-row">
                    <label className='block text-lg font-semibold' htmlFor="name">Name</label>
                    <input className='input' type="text" name="name" id="name" />
                </div>

                <div className="form-row flex gap-3 mt-3">
                    <div className='flex-auto'>
                        <label className='block text-lg font-semibold' htmlFor="width">Width</label>
                        <input className='input' type="number" name="width" id="width" required />
                    </div>
                    <div className='flex-auto'>
                        <label className='block text-lg font-semibold' htmlFor="height">Height</label>
                        <input className='input' type="number" name="height" id="height" required />
                    </div>
                </div>

                <div className="form-row mt-3 flex gap-3">
                    <div className="flex-1">
                        <label className='block text-lg font-semibold' htmlFor="crop">Crop</label>
                        <select className='input bg-white' name="crop" id="crop" onChange={handleCropChange}>
                            <option value="">-- Select --</option>
                            <option value="auto">Auto</option>
                            <option value="fill">Fill</option>
                            <option value="crop">Crop</option>
                            <option value="thumb">Thumb</option>
                            <option value="scale">Scale</option>
                            <option value="fit">Fit</option>
                            <option value="pad">Pad</option>
                        </select>
                    </div>
                    {cropEnabled && (
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
                    )}
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
                            setSaveEnabled(true)
                            toast.success('Image transformed')
                        }}
                        onError={() => {
                            setIsTransforming(false)
                            toast.error('Something went wrong, image not loaded')
                        }}
                        renderKey={renderKey}
                        {...((formValue.crop == 'crop' && formValue.ratio_1 || formValue.ratio_2) != 0 && {
                            aspectRatio: `${ formValue.ratio_1 }:${ formValue.ratio_2 }`
                        })}
                        fillBackground
                        {...(formValue.crop && { crop: formValue.crop })}
                        width={formValue.width}
                        height={formValue.height}
                        />
                    </div>
                </div>

                <div className="form-row mt-10 flex gap-3">
                    <button type="submit" disabled={uploaded ? false : true} className='btn btn-primary w-full transition disabled:opacity-50'>Apply Transform</button>
                    <button type="button" disabled={saveEnabled ? false : true} className='btn btn-green w-[300px] transition disabled:opacity-50' onClick={handleSave}>Save</button>
                </div>

                <ToastContainer/>
            </form>
            <div className="py-5"></div>
        </div>
    );
}