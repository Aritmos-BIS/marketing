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

    return NextResponse.json(products, { status: 200 });

  } catch (error) {
 
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
 
  }
};
