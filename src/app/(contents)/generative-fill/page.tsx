"use client";

import { faDownload, faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CldImage, CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import React, { use, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialImageInfo = {
    public_id: '',
    url: ''
}

const TransformedImage = ({ publicId, transformStart, isTransforming, imgLoaded, onError, renderKey, ...transformProperties }: any) => {
    const [prevPublicId, setPrevPublicId] = useState('')
    // const [prevTransformProperties, setPrevTransformProperties] = useState<any>()
    /* useEffect(() => {
      console.log(transformProperties, prevTransformProperties)
    }, [prevTransformProperties, transformProperties]) */
    /* useEffect(() => {
        console.log('transformStart changed', transformStart)
    }, [transformStart]) */

    return (
        <div className='h-full flex flex-col'>
            <h4 className='text-2xl font-bold'>Transformed</h4>
            {transformStart && publicId ? (
                <div className='mt-3 overflow-hidden grow relative bg-gray-100 rounded-lg relative'>
                    <a href="#" className="p-4 rounded-lg bg-[var(--color-green)] w-[40px] h-[40px] flex items-center justify-center absolute right-3 top-3">
                        <FontAwesomeIcon icon={faDownload} className='text-white'/>
                    </a>
                    <CldImage
                    key={renderKey}
                    src={publicId}
                    // width='960'
                    // height='640'
                    alt='Transformed image'
                    className='rounded-lg'
                    onLoadStart={() => { console.log('load started') }}
                    onLoad={() => {
                        setPrevPublicId(publicId)
                        // setPrevTransformProperties(transformProperties)
                        imgLoaded()
                    }}
                    onError={onError}
                    // sizes='100vw'
                    // fillBackground
                    // crop='fit'
                    {...transformProperties}
                    />
                    {/* {isTransforming && publicId != prevPublicId && <div className="shimmer"></div>} */}
                    {isTransforming && <div className="shimmer"></div>}
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
        ratio_1: 0,
        ratio_2: 0
    }
    const [formValue, setFormValue] = useState(initialFormValue)
    const [renderKey, setRenderKey] = useState('')

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
        setRenderKey('' + Math.random())
    }

    const handleInputChange = (e: any) => {
        const {name, value} = e.target
        // console.log(name, value)
        setFormValue({
            ...formValue,
            [name]: value
        })
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()
        setFormValue(prev => ({
            ...prev,
            name: e.target.name.value,
            width: e.target.width.value,
            height: e.target.height.value,
            crop: e.target.crop.value,
            ratio_1: e.target.ratio_1.value,
            ratio_2: e.target.ratio_2.value
        }))
        setTransformStart(true)
        setIsTransforming(true)
        setPublicId(imageInfo.public_id)
        setRenderKey('' + Math.random())
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
                        <label className='block text-lg font-semibold' htmlFor="name">Width</label>
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
                            console.log('Loaded');
                            setIsTransforming(false);
                            toast.success('Image transformed')
                            // setTransformStart(false)
                        }}
                        onError={() => {
                            setIsTransforming(false)
                            toast.error('Something went wrong, image not loaded')
                        }}
                        renderKey={renderKey}
                        {...((formValue.ratio_1 || formValue.ratio_2) != 0 && {
                            aspectRatio: `${ formValue.ratio_1 }:${ formValue.ratio_2 }`
                        })}
                        // aspectRatio={`${ formValue.ratio_1 }:${ formValue.ratio_2 }`}
                        fillBackground
                        {...(formValue.crop && { crop: formValue.crop })}
                        // crop={formValue.crop}
                        width={formValue.width}
                        height={formValue.height}
                        />
                    </div>
                </div>

                <div className="form-row mt-10">
                    <button type="submit" disabled={uploaded ? false : true} className='btn btn-primary w-full transition disabled:opacity-50'>Apply Transform</button>
                </div>

                <div className="form-row mt-10 hidden">
                    <button type="button" className='btn btn-primary w-full transition disabled:opacity-50' onClick={() => { console.log(formValue) }}>Test</button>
                </div>

                <ToastContainer/>

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