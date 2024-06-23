// /app/api/users/[id]/products/route.js

import { mongoConnection } from '@/db/mongo';
import User from '@/models/user';
import Product from '@/models/product';
import { NextResponse } from 'next/server';

export const GET = async (req, { params }) => {
  await mongoConnection();

  try {
    const { id } = params;

    // Buscar el usuario por ID
    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Buscar los productos con tags que coincidan con los del usuario
    const products = await Product.find({
      tags: { $in: user.Tags }
    });

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
};
