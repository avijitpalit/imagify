import { connectToDatabase } from '@/lib/mongodb';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
    const db = await connectToDatabase();
    const collection = db.collection('users');
    try {
        const documents = await collection.find().toArray();
        return NextResponse.json({ users: documents });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ msg: 'Error fetching data' });
    }
}

export async function POST(req: NextRequest) {
    const body = await req.json()
    const { clerkId, fname, lname, email, avatar } = body
    const db = await connectToDatabase();
    const collection = db.collection('users');
    try {
        collection.insertOne({clerkId, fname, lname, email, avatar})
        return NextResponse.json({ done: true });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ done: false });
    }
}