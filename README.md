# 🐱 Meowear App - E-Commerce Pakaian Kucing Fullstack

[![Deployment Status](https://img.shields.io/badge/Status-Live%20on%20Vercel-brightgreen?style=for-the-badge&logo=vercel)](https://be-meowear-app.vercel.app)
[![GitHub Repository](https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github)](https://github.com/faiqyr/BE-meowear-app)

Aplikasi e-commerce modern berbasis web untuk memenuhi kebutuhan pakaian, aksesoris, dan perlengkapan fashion kucing kesayangan Anda. Dibangun menggunakan arsitektur **Fullstack Monorepo** (Frontend Modern dengan Vite/React & Backend RESTful API dengan Express.js serta Database MongoDB).

🌐 **Live Website:** [https://be-meowear-app.vercel.app](https://be-meowear-app.vercel.app)

---

## 🚀 Tech Stack

### **Frontend**
* **React 19** (Vite)
* **Tailwind CSS & DaisyUI 5** (Styling & UI Components)
* **React Router DOM 7** (Routing & Data Loading)
* **Redux Toolkit** (State Management)
* **Anime.js & Swiper** (Animations & Sliders)
* **React Toastify** (Notifications)

### **Backend & Database**
* **Node.js & Express.js 5** (REST API & Serverless functions on Vercel)
* **MongoDB & Mongoose 9** (NoSQL Database & ODM)
* **JWT (JSON Web Token) & Bcryptjs** (Authentication & Password Security)
* **Cloudinary** (Cloud File & Image Storage)
* **Midtrans Client** (Payment Gateway Integration)

---

## ✨ Fitur Utama

1. **Autentikasi & Manajemen Akun:**
   * Login & Register dengan enkripsi password (`bcryptjs`).
   * Proteksi hak akses berdasarkan peran (`user` dan `owner`).
   * Fitur **Lupa Password & Reset Password** aman berbasis token JWT.
2. **Katalog & Manajemen Produk:**
   * Menampilkan daftar produk pakaian kucing dengan layout kartu seragam (*equal height*).
   * Fitur CRUD Produk lengkap khusus untuk *Owner* (Tambah, Edit, Hapus produk & unggah foto via Cloudinary).
   * Status produk real-time (Contoh: *Sold Out* jika stok habis).
3. **Keranjang Belanja & Checkout:**
   * Manajemen keranjang interaktif.
   * Integrasi sistem pembayaran online (Midtrans Payment Gateway).
   * Riwayat pesanan (*Order History*) berdasarkan akun yang sedang login.

---

## 📂 Struktur Direktori Proyek

```text
BE-meowear-app/
├── api/                  # Vercel Serverless Function entry point
│   ├── index.js
│   ├── package.json
├── client/               # Frontend React (Vite)
│   ├── src/
│   │   ├── components/   # Komponen UI (Header, Cart, Form, dll.)
│   │   ├── page/         # Halaman Utama, Produk, Auth, Checkout, dll.
│   │   ├── features/     # Redux Slices (User, Cart)
│   │   └── App.jsx       # Konfigurasi React Router
│   └── package.json
├── server/               # Backend Express.js
│   ├── controllers/      # Logika Bisnis (Auth, Product, Order)
│   ├── models/           # Skema MongoDB (User, Product, Order)
│   ├── routes/           # Endpoint API Router
│   ├── middlewares/      # Error handler & Auth middleware
│   └── app.js            # Inisialisasi Express & Koneksi DB
├── package.json          # Root package configuration
└── vercel.json           # Konfigurasi Deployment Vercel
```

---

## 🛠️ Cara Menjalankan Secara Lokal

1. **Clone repository ini:**
   ```bash
   git clone https://github.com/faiqyr/BE-meowear-app.git
   cd BE-meowear-app
   ```

2. **Install semua dependencies:**
   ```bash
   npm install
   npm install --prefix client
   npm install --prefix server
   ```

3. **Buat file `.env` di dalam folder `server/`:**
   ```env
   DATABASE=url_mongodb_anda
   NODE_ENV=development
   JWT_SECRET=rahasia_jwt_anda
   CLOUDINARY_CLOUD_NAME=...
   CLOUDINARY_API_KEY=...
   CLOUDINARY_API_SECRET=...
   MIDTRANS_SERVER=...
   ```

4. **Jalankan aplikasi secara bersamaan (Concurrent):**
   ```bash
   npm run dev
   ```

---

## 🔒 Catatan Keamanan
Repository ini aman dari kebocoran data rahasia karena file konfigurasi lingkungan (`.env`) dan folder `node_modules` telah diabaikan menggunakan `.gitignore`. Semua kredensial produksi diatur langsung melalui panel *Environment Variables* di Vercel.

---

## 👨‍💻 Author & Maintainer
* **GitHub:** [@faiqyr](https://github.com/faiqyr)
* **Repository:** [BE-meowear-app](https://github.com/faiqyr/BE-meowear-app)
* **Live Demo:** [https://be-meowear-app.vercel.app](https://be-meowear-app.vercel.app)
