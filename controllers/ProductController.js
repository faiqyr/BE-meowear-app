import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModel.js";

// Ini contoh
// export const AllProduct = asyncHandler(async (req, res) => {
//   res.send("All Product");
// });

export const CreateProduct = asyncHandler(async (req, res) => {
  const newProduct = await Product.create(req.body);

  return res.status(201).json({
    message: "Berhasil tambah product",
    data: newProduct,
  });
});

export const AllProduct = asyncHandler(async (req, res) => {
  // Req Query
  const queryObject = { ...req.query };

  // fungsi untuk mengabaikan jika ada req page dan limit
  const excludeField = ["page", "limit", "name"];
  excludeField.forEach((element) => delete queryObject[element]);

  let query 

  if(req.query.name){
    query = Product.find({
      name: {$regex: req.query.name, $options: 'i'}
    })
  } else {
    query = Product.find(queryObject)
  }


  //Pagination
  const page = req.query.page * 1 || 1;
  const limitData = req.query.limit * 1 || 30;
  const skipData = (page - 1) * limitData;

  query = query.skip(skipData).limit(limitData);

  let countProduct = await Product.countDocuments()

  if (req.query.page) {
    if (skipData >= countProduct) {
      res.status(404);
      throw new Error("This page doest exist");
    }
  }

  const data = await query;

  return res.status(200).json({
    message: "Berhasil tampil semua product",
    data,
    count: countProduct
  });
});

export const detailProduct = asyncHandler(async (req, res) => {
  const paramsId = req.params.id;
  const productData = await Product.findById(paramsId);

  if (!productData) {
    res.status(404);
    throw new Error("Id tidak ditemukan");
  }
  return res.status(200).json({
    message: "Detail data product berhasil ditampilkan",
    data: productData,
  });
});

export const updateProduct = asyncHandler(async (req, res) => {
  const paramId = req.params.id;
  const updateProduct = await Product.findByIdAndUpdate(paramId, req.body, {
    runValidators: false,
    new: true,
  });

  return res.status(201).json({
    message: "Update Product Berhasil",
    data: updateProduct,
  });
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const paramId = req.params.id;
  await Product.findByIdAndDelete(paramId);

  return res.status(200).json({
    message: "delete Product Berhasil",
  });
});

export const FileUpload = asyncHandler(async (req, res) => {
  const file = req.file;
  if (!file) {
    res.status(400);
    throw new Error("Tidak ada file yang diinput");
  }
  const imageFileName = file.filename;
  const pathImageFile = `/uploads/${imageFileName}`;

  res.status(200).json({
    message: "Image berhasil diupload",
    image: pathImageFile,
  });
});
