import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModel.js";
import Order from "../models/orderModels.js";

export const CreateOrder = asyncHandler(async (req, res) => {
  const { email, firstName, lastName, phone, cartItem } = req.body;
  if (!cartItem || cartItem.length < 1) {
    res.status(400);
    throw new Error("keranjang masih kosong");
  }

  let orderItem = []
  let total = 0

  for(const cart of cartItem){
    const productData = await Product.findOne({_id: cart.product})
    if(!productData){
        res.status(404)
        throw new Error("id product tidak ditemukan")
    }

    const {name, price, _id} = productData
    const singleProduct = {
        quantity: cart.quantity,
        name,
        price,
        product: _id
    }
    orderItem = [...orderItem, singleProduct]

    total += cart.quantity * price
  }

  const order = await Order.create({
    itemsDetail: orderItem,
    total, 
    firstName,
    lastName,
    email,
    phone,
    user: req.user.id
  })

  return res.status(201).json({
    total,
    order,
    message: "Berhasil Buat Order Product",
  });
});

export const AllOrder = asyncHandler(async (req, res) => {
    const orders = await Order.find()
    
  return res.status(200).json({
    data: orders,
    message: "Berhasil Tampil Semua Order Product",
  });
});

export const DetailOrder = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)

  return res.status(200).json({
    data: order,
    message: "Berhasil Tampil Detail Order Product",
  });
});
export const CurrentUserOrder = asyncHandler(async (req, res) => {
    const order = await Order.find({'user': req.user.id})

  return res.status(200).json({
    data: order,
    message: "Berhasil Tampil Current User Order Product",
  });
});
