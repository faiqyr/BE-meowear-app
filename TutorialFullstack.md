## Documentasi

- npmjs.com
- expressjs.com
- mongoosejs.com
- https://docs.midtrans.com/

## Folder Server

- $ npm init -y
- $ npm install express
- 1. server/app.js
- 2. server/routes/authRouter.js
- Buat request untuk Auth di insomnia/postman
- 3. Buat mongodb
- 4. middlewares/errorMiddleware.js
- 5. models/userModel.js
- 6. middlewares/asyncHandler.js
- "$ npm i jsonwebtoken" => from npmjs.com
- "$ npm i bcryptsjs" => from npmjs.com
- "$ npm i validator" => from npmjs.com
- "$ npm install cookie-parser" => from npmjs.com
- 7. controllers/authController.js
- 8. isi .env: NODE_EVN=development, JWT_SECRET=secret-jwt-saya
- 9. jwt.io untuk melihat token id
- 10. middlewares/authMiddleware.js
- 11. routes/productRouter.js
- 12. controllers/ProductController.js
- 13. Buat request untuk Product di insomnia/postman
- 14. models/productModel.js
- 15. "$ npm install --save multer"=> from npmjs.com , ini untuk upload foto
- 16. utils/uploadFileHandler.js
- 17. public/uploads
- 18. controllers/OrderController.js
  |Fungsinya ada:
  |- buat order
  |-semua order
  |-detail order
  |- order by user auth
- 19. routes/orderRouter.js 
- 20. models/orderModels.js
- 21. Baca dokumentasi https://docs.midtrans.com/
- 22. deploy to vercel
  |
  |-"$ npm install express-mongo-sanitize" from npmjs.com
  |-"$ npm i helmet" from npmjs.com for security shield
  |- server/vercel.json
  |- server/.gitignore
  |- Jalankan dibawah:
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/faiqyr/BE-ecommerce.git
git push -u origin main