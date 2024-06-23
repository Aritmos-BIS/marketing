import { mongoConnection } from '@/db/mongo';
import user from '@/models/user';
import User from '@/models/user';
import { NextResponse } from 'next/server';

export const POST = async (req, res) => {
  await mongoConnection();

  try {
    const body = await req.json(); 
    const user = await User.create(body);

    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: 'Failed to create ' }, { status: 500 });
  }
};

export const GET = async (req) => {
  await mongoConnection();

  try {
    const users = await User.find();

    if (!users || users.length === 0) {
      return NextResponse.json({ error: 'No users found' }, { status: 404 });
    }

    return NextResponse.json(users, { status: 200 });

  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
};
