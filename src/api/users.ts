import { connectToDatabase } from '@/lib/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { method } = req;

  const db = await connectToDatabase();
  const collection = db.collection('users');

  switch (method) {
    case 'GET':
      try {
        const documents = await collection.find().toArray();
        res.status(200).json(documents);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching data' });
      }
      break;
    case 'POST':
      // Handle POST requests
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

export async function getUsers() {
    const db = await connectToDatabase();
    const collection = db.collection('users');
    const data = await collection.find().toArray();
    return data;
}