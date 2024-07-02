'use client'

import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CldImage, CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import React, { useState } from 'react'

const Page = () => {
  const [previewImage, setPreviewImage] = useState('/test.jpg')
  const [publicId, setPublicId] = useState('')
  const [isTransforming, setIsTransforming] = useState(true)
  const [transformStart, setTransformStart] = useState(false)

  const handleSuccess = (results: any, option: any) => {
    console.log(results);
    setPreviewImage(results.info.secure_url);
    setPublicId(results.info.public_id)
    // console.log('inside success');
  }

  return (
    <div className='w-full max-w-[1000px]'>
      <CldUploadWidget
      signatureEndpoint="/api/sign-cloudinary-params"
      onSuccess={handleSuccess}
      >
        {({ open }) => {
          return (
            <button onClick={() => open()} className='p-4 rounded-lg flex flex-col items-center justify-center bg-primary text-white gap-2' type="button">
              <FontAwesomeIcon icon={faPlus}/>
              <span className='font-semibold'>Upload Image</span>
            </button>
          )
        }}
      </CldUploadWidget>

      <div className='mt-5'>
        <Image width={500} height={300} src={previewImage} alt=''/>
      </div>

      <div className='mt-5'>
        {transformStart && (
          <>
            {publicId && (
              <>
                <CldImage
                  src={publicId} // Use this sample image or upload your own via the Media Explorer
                  width='700'
                  height="250"
                  alt=''
                  onLoad={() => {
                    console.log('Loaded');
                    setIsTransforming(false)
                  }}
                  // sizes='100vw'
                  fillBackground
                  crop={{
                    width: 500,
                    height: 500,
                    type: 'thumb',
                    source: true,
                    aspectRatio: '16:9'
                  }}
                />
                
                {isTransforming && (
                  <div className="p-4 rounded-lg bg-gray-200">Loading...</div>
                )}
              </>
            )}
          </>
        )}

        <button className='btn btn-primary' type="button" onClick={() => { setTransformStart(true) }}>Apply tranform</button>

        {/* {publicId ? (
          <CldImage
            src={publicId} // Use this sample image or upload your own via the Media Explorer
            width='700'
            height="250"
            alt=''
            onLoad={() => {
              console.log('Loaded');
              setIsTransforming(false)
            }}
            // sizes='100vw'
            fillBackground
            crop={{
              width: 500,
              height: 500,
              type: 'thumb',
              source: true,
              aspectRatio: '16:9'
            }}
          />
        ) : (
          <p>Loading...</p>
        )} */}
        
      </div>
    </div>
  )
}

export default Page
