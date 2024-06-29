import { mongoConnection } from '@/db/mongo';
import Product from '@/models/product';
import { NextResponse } from 'next/server';

export const GET = async (req, { params }) => {
  await mongoConnection();

  try {
    const { id } = params;
    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
};

export const PUT = async (req, { params }) => {
  await mongoConnection();

  try {
    const { id } = params;
    const body = await req.json();
    
    const product = await Product.findByIdAndUpdate(id, body, { new: true });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
};

export const DELETE = async (req, { params }) => {
  await mongoConnection();

  try {
    const { id } = params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Product deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
};
