import { download } from '@/utils/helper';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CldImage, getCldImageUrl } from 'next-cloudinary';
import React from 'react'

const TransformedImage = ({ publicId, transformStart, isTransforming, imgLoaded, onError, renderKey, ...transformProperties }: any) => {
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

export default TransformedImage