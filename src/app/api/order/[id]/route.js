import { mongoConnection } from '@/db/mongo';
import Order from '@/models/order';
import { NextResponse } from 'next/server';

export const GET = async (req, { params }) => {
  await mongoConnection();

  try {
    const { id } = params;

    const order = await Order.findById(id);

    if (!order || order.length === 0) {
      return NextResponse.json({ error: 'No order found' }, { status: 404 });
    }

    return NextResponse.json(order, { status: 200 });

  } catch (error) {
    console.error('Error fetching order:', error);
    return NextResponse.json({ error: 'Failed to fetch order' }, { status: 500 });
  }
};
