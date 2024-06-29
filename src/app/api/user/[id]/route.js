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
    console.error('Error fetching user:', error);
    return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 });
  }
};

export const PUT = async (req, { params }) => {
  await mongoConnection();

  try {
    const { id } = params;
    const body = await req.json();
    
    const user = await User.findByIdAndUpdate(id, body, { new: true });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
};

export const DELETE = async (req, { params }) => {
  await mongoConnection();

  try {
    const { id } = params;
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'User deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
  }
};
