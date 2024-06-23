// /app/api/orders/create/route.js

import { mongoConnection } from '@/db/mongo';
import User from '@/models/user';
import Product from '@/models/product';
import Order from '@/models/order';
import { NextResponse } from 'next/server';

export const POST = async (req) => {
  await mongoConnection();

  try {
    const { Order_ID, Client_ID, Gift, Address, Products } = await req.json();

    // Verificar si el cliente existe
    const client = await User.findById(Client_ID);
    if (!client) {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 });
    }

    // Crear array de promesas para productos
    const productOrders = await Promise.all(Products.map(async (productOrder) => {
      const product = await Product.findById(productOrder._id);
      if (!product) {
        throw new Error(`Product with ID ${productOrder._id} not found`);
      }

      if (product.quantity < productOrder.quantity) {
        throw new Error(`Not enough stock for product ${product.name}`);
      }

      product.quantity -= productOrder.quantity;
      await product.save();

      return {
        _id: product._id,
        name: product.name,
        price: product.price,
        quantity: productOrder.quantity,
      };
    }));

    // Crear la dirección
    const orderAddress = {
      Street: Address.Street,
      City: Address.City,
      State: Address.State,
      Zip: Address.Zip,
      Phone: Address.Phone,
    };

    // Crear el pedido con los productos resueltos
    const newOrder = new Order({
      Order_ID,
      Client_ID: client._id,
      Gift,
      Address: orderAddress,
      Products: productOrders,
    });

    await newOrder.save();

    return NextResponse.json(newOrder, { status: 201 });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
};

export const GET = async (req) => {
  await mongoConnection();

  try {
    const orders = await Order.find();

    if (!orders || orders.length === 0) {
      return NextResponse.json({ error: 'No orders found' }, { status: 404 });
    }

    return NextResponse.json(orders, { status: 200 });

  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
};
