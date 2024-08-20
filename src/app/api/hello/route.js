import { NextResponse } from 'next/server';
import { createUser, deleteUser } from '@/controllers/user.controller'

export async function GET() {
    const user = {
        clerkId: 'frger',
        fname: 'Peter',
        lname: 'Parker',
        email: `peterparker_frger@gmail.com`,
        avatar: 'avatar url here'
    }

    const newUser = await createUser(user)
    console.log(newUser)
    return NextResponse.json({ message: 'Test mongodb' });
}