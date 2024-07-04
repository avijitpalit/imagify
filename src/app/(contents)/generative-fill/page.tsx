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

const TransformedImage = ({ publicId, transformStart, isTransforming, resetIsTransforming, firstLoad }: any) => {
    return (
        <div className='h-full flex flex-col'>
            <h4 className='text-2xl font-bold'>Transformed</h4>
            {transformStart && publicId ? (
                <div className='mt-3 overflow-hidden grow relative'>
                    <CldImage
                        key={publicId}
                        src={publicId}
                        width='100'
                        height='100'
                        alt=''
                        className='w-full rounded-lg'
                        onLoad={() => {
                            console.log('Loaded');
                            setTimeout(() => {
                                resetIsTransforming()
                            }, 500);
                        }}
                        onError={(error) => {
                            console.log('Image loading error: ', error)
                        }}
                        sizes='100vw'
                        fillBackground
                    />
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
    const [isLoading, setIsLoading] = useState(false)
    const [firstLoad, setFirstLoad] = useState<String[]>([])
    useEffect(() => {
        console.log(firstLoad)
    }, [firstLoad])

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
        setIsLoading(true)
        // setPublicId('')
        setIsTransforming(false)
        setTimeout(() => {
            setIsTransforming(true)
            setPublicId(imageInfo.public_id)
            setIsLoading(false)
        }, 1000);
        // setIsTransforming(true)
    }

    return (
        <div className='w-full max-w-[1000px]'>
            <form action="" method="post">
                <div className="form-row">
                    <label className='block text-lg font-semibold' htmlFor="name">Name</label>
                    <input className='input' type="text" name="name" id="name" />
                </div>

                <div className="form-row mt-3">
                    <label className='block text-lg font-semibold' htmlFor="aspectRatio">Aspect Ratio</label>
                    <select className='input bg-white' name="aspectRatio" id="aspectRatio">
                        <option value="">-- Select Ratio --</option>
                        <option value="1:1">1:1</option>
                        <option value="16:9">16:9</option>
                        <option value="9:16">9:16</option>
                    </select>
                </div>

                <div className="form-row mt-7 flex gap-5">
                    <div className='w-1/2'>
                        <h4 className='text-2xl font-bold'>Original</h4>
                        {uploaded ? (
                            <div className="relative rounded-lg mt-3 overflow-hidden bg-gray-100 min-h-[300px]">
                                <button className='w-[40px] h-[40px] flex items-center justify-center bg-red-500 text-white absolute right-3 top-3 rounded-lg hover:bg-red-600' type='button' onClick={() => { setUploaded(false) }}><FontAwesomeIcon icon={faTrashAlt}/></button>
                                <Image className='w-full' width={0} height={0} sizes='100vw' alt='' src={imageInfo.url}/>
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
                    <div className='w-1/2'>
                        {!isLoading && <TransformedImage
                        publicId={publicId}
                        transformStart={transformStart}
                        isTransforming={isTransforming}
                        resetIsTransforming={() => {
                            setIsTransforming(false);
                            setFirstLoad(prev => {
                                if (!prev.includes(publicId)) {
                                  return [...prev, publicId];
                                }
                                return prev;
                            });
                        }}
                        firstLoad
                        />}
                        
                    </div>
                </div>

                <div className="form-row mt-10">
                    <button type="button" disabled={uploaded ? false : true} className='btn btn-primary w-full transition disabled:opacity-50' onClick={handleTransform}>Apply Transform</button>
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