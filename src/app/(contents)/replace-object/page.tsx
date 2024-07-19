'use client'

import Image from 'next/image';
import React, { useState } from 'react'

const HF_TOKEN = process.env.NEXT_PUBLIC_HF_TOKEN

async function query(data: any) {
	const response = await fetch(
		"https://api-inference.huggingface.co/models/SG161222/RealVisXL_V4.0",
		{
			headers: {
				Authorization: `Bearer ${ HF_TOKEN }`,
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.blob();
	return result;
}

const Page = () => {
    const [imgUrl, setImgUrl] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = (e: any) => {
        e.preventDefault()
        const prompt = e.target.prompt.value
        console.log(HF_TOKEN)
        setIsLoading(true)
        setImgUrl('')
        query({"inputs": prompt}).then((response) => {
            console.log(response)
            const url = URL.createObjectURL(response)
            console.log(url)
            setImgUrl(url)
            setIsLoading(false)

            /* const image = new Image();
            image.src = url;
            image.onload = function() {
                // Image is loaded and ready for display
                document.body.appendChild(image); // Append image to the body
                console.log('image added');
                
            }; */
        })
        .catch(error => {
            console.log(error)
        });
    }

    return (
        <div>
            <h2 className='text-3xl font-bold'>Text to image</h2>

            <div className='mt-5'>
                <form action="#" id="txt-to-img-form" onSubmit={handleSubmit}>
                    <div className="form-row">
                        <label className='block text-lg font-semibold' htmlFor="prompt">Prompt</label>
                        <div className="flex gap-3 items-center">
                            <input className='input' type="text" name="prompt" id="prompt" />
                            <button type="submit" className="btn-primary btn-rounded-0 px-4 self-stretch">Generate</button>
                        </div>
                    </div>
                </form>
                
                <div className="result mt-5 bg-gray-100 rounded-lg min-h-[300px] flex items-center justify-center">
                    { !imgUrl ? (
                        isLoading ?
                        <Image src='/pulse.svg' width={40} height={0} alt="" /> :
                        <h4 className='text-xl text-gray-300 select-none'>Output</h4>
                    ) : (
                        <Image src={imgUrl} width={400} height={0} sizes='100vw' alt="" />
                    ) }
                </div>
            </div>
        </div>
    )
}

export default Page
