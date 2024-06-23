import { mongoConnection } from '@/db/mongo';
import User from '@/models/user';
import { NextResponse } from 'next/server';

export const GET = async (req, { params }) => {
  await mongoConnection();

  try {
    const { id } = params;

    
    const user = await User.findById(id);
   
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });

  } catch (error) {
 
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
 
  }
};
