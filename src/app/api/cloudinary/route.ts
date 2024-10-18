import { v2 as cloudinary } from 'cloudinary';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';

// Configure your Cloudinary credentials
cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET(req: NextRequest) {
    const public_id = req.nextUrl.searchParams.get('public_id');
    try {
        if(!public_id || Array.isArray(public_id))
            return NextResponse.json(
                { msg: "Invalid or missing public_id" },
                {status: 400}
            );
        // Fetch image metadata from Cloudinary
        const result = await cloudinary.api.resource(public_id);
        return NextResponse.json(
            {
                width: result.width,
                height: result.height,
                format: result.format,
                url: result.secure_url
            },
            {status: 200}
        );
    } catch (error) {
        console.error('Error fetching image metadata:', error);
        return NextResponse.json(
            {error: 'Error fetching image metadata'},
            {status: 500}
        );
    }

    return NextResponse.json(
        { msg: "API working" },
        {
            status: 405
        }
    );
}
