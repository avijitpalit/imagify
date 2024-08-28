import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { createUser, deleteUser } from '@/controllers/user.controller'
import { NextResponse } from 'next/server'

type ClerkUserData = {
	id: string;
	first_name: string;
	last_name: string;
	email_addresses: { email_address: string }[];
	image_url: string;
};

export async function GET(){
	console.log('ger request working')
	return NextResponse.json({msg: 'GET working'})
}

export async function POST(req: Request) {
	// You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
	const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET

	if (!WEBHOOK_SECRET) {
		throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
	}

	// Get the headers
	const headerPayload = headers();
	const svix_id = headerPayload.get("svix-id");
	const svix_timestamp = headerPayload.get("svix-timestamp");
	const svix_signature = headerPayload.get("svix-signature");

	// If there are no headers, error out
	if (!svix_id || !svix_timestamp || !svix_signature) {
		return new Response('Error occured -- no svix headers', {
			status: 400
		})
	}

	// Get the body
	const payload = await req.json()
	const body = JSON.stringify(payload);

	// Create a new Svix instance with your secret.
	const wh = new Webhook(WEBHOOK_SECRET);

	let evt: WebhookEvent

	// Verify the payload with the headers
	try {
		evt = wh.verify(body, {
			"svix-id": svix_id,
			"svix-timestamp": svix_timestamp,
			"svix-signature": svix_signature,
		}) as WebhookEvent
	} catch (err) {
		console.error('Error verifying webhook:', err);
		return new Response('Error occured', {
			status: 400
		})
	}

	// Do something with the payload
	// For this guide, you simply log the payload to the console
	const { id } = evt.data;
	const eventType = evt.type;

	let done = null
	// const { id, first_name, last_name, email_addresses, image_url } = evt.data
	console.log(evt.data)
	/* const user = {
		clerkId: id,
		fname: first_name,
		lname: last_name,
		email: email_addresses[0].email_address,
		avatar: image_url
	} */

	/* switch(evt.type){
		case 'user.created':
			console.log('User created')
			const { id, first_name, last_name, email_addresses, image_url }: any = evt.data
			const user = {
				clerkId: id,
				fname: first_name,
				lname: last_name,
				email: email_addresses[0].email_address,
				avatar: image_url
			}
			done = await createUser(user)
			console.log(done)
		break;
		case 'user.deleted':
			console.log('User deleted, userId:', evt.data.id)
			done = await deleteUser(evt.data.id!)
			console.log(done)
		break;
		case 'session.created':
			console.log('session created')
			const { id, first_name, last_name, email_addresses, image_url }: any = evt.data
			done = await createUser(user)
			console.log(done)
		break;
	} */

	switch(evt.type) {
		case 'user.created':
			console.log('User created');
			const { id: createdId, first_name: createdFirstName, last_name: createdLastName, email_addresses: createdEmailAddresses, image_url: createdImageUrl }: any = evt.data;
			const createdUser = {
				clerkId: createdId,
				fname: createdFirstName,
				lname: createdLastName,
				email: createdEmailAddresses[0].email_address,
				avatar: createdImageUrl
			};
			try {
				const createResult = await createUser(createdUser);
				console.log(createResult);
			} catch (error) {
				console.error('Error creating user:', error);
			}
			break;
			
		case 'user.deleted':
			console.log('User deleted, userId:', evt.data.id);
			try {
				const deleteResult = await deleteUser(evt.data.id!);
				console.log(deleteResult);
			} catch (error) {
				console.error('Error deleting user:', error);
			}
			break;
			
		case 'session.created':
			console.log('Session created');
			
			break;
			
		default:
			console.log('Unhandled event type:', evt.type);
	}
		

	console.log(`Webhook with and ID of ${id} and type of ${eventType}`)
	// console.log('Webhook body:', body)

	return new Response('', { status: 200 })
}