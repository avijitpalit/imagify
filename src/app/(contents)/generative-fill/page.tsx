"use client";

import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CldImage, CldUploadWidget } from 'next-cloudinary';

const TransformedImage = ({image}: any) => {
  return (
    <>
      <h4 className='text-3xl font-bold'>Transformed</h4>
      <div className="bg-gray-100 rounded-lg flex items-center justify-center mt-3 h-[300px] relative">
        <div className="absolute inset-0 before:absolute before:inset-0 before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-black/5 before:to-transparent before:animate-[shimmer_1s_infinite] before:rounded-lg overflow-hidden"></div>
      </div>
    </>
  )
}

const UploadButton = ({click}: any) => {
  const handleSuccess = (results: any, option: any) => {
    console.log(results);
    console.log('inside success');
  }

  return (
    <CldUploadWidget signatureEndpoint="/api/sign-cloudinary-params" onSuccess={handleSuccess}>
      {({ open }) => {
        return (
          <button onClick={() => open()} className='p-4 rounded-lg flex flex-col items-center justify-center bg-primary text-white gap-2' type="button">
            <FontAwesomeIcon icon={faPlus}/>
            <span className='font-semibold'>Upload Image</span>
          </button>
        )
      }}
    </CldUploadWidget>
  )
}

// By default, the CldImage component applies auto-format and auto-quality to all delivery URLs for optimized delivery.
export default function Page() {
  const handleSuccess = (results: any, option: any) => {
    console.log(results);
    console.log('inside success');
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
            <h4 className='text-3xl font-bold'>Original</h4>
            <div className="bg-gray-100 rounded-lg flex items-center justify-center mt-3 h-[300px]">
            <CldUploadWidget signatureEndpoint="/api/sign-cloudinary-params" onSuccess={handleSuccess}>
              {({ open }) => {
                return (
                  <button onClick={() => open()} className='p-4 rounded-lg flex flex-col items-center justify-center bg-primary text-white gap-2' type="button">
                    <FontAwesomeIcon icon={faPlus}/>
                    <span className='font-semibold'>Upload Image</span>
                  </button>
                )
              }}
            </CldUploadWidget>
            </div>
          </div>
          <div className='w-1/2'>
            <TransformedImage/>
          </div>
        </div>

        <div className="form-row mt-10">
          <button type="button" className='btn btn-primary w-full transition'>Apply Transform</button>
        </div>
      </form>
      <div className="py-5"></div>
    </div>
  );
}