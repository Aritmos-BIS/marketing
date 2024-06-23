import { mongoConnection } from '@/db/mongo';
import Product from '@/models/product';
import { NextResponse } from 'next/server';

export const POST = async (req, res) => {
  await mongoConnection();

  try {
    const body = await req.json(); 
    const product = await Product.create(body);

    return NextResponse.json({ product }, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
};

export const GET = async (req) => {
  await mongoConnection();

  try {
    const products = await Product.find();

    if (!products || products.length === 0) {
      return NextResponse.json({ error: 'No products found' }, { status: 404 });
    }

    return NextResponse.json(products, { status: 200 });

  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
};

