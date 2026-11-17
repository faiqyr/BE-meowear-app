import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import asyncHandler from "../middlewares/asyncHandler.js";

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "6d",
  });
};

const createSendResToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  const isDev = process.env.NODE_ENV === "development" ? false : true;

  const cookieOption = {
    expire: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    security: isDev,
  };

  res.cookie("jwt", token, cookieOption);

  user.password = undefined;

  res.status(statusCode).json({
    data: user,
  });
};

export const registerUser = asyncHandler(async (req, res) => {
  const isOwner = (await User.countDocuments()) === 0;

  const role = isOwner ? "owner" : "user";

  const createUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    role: role,
  });

  createSendResToken(createUser, 201, res);
});

export const loginUser = asyncHandler(async (req, res) => {
  // tahap 1 kita buat validasi
  if (!req.body.email || !req.body.password) {
    res.status(400);
    throw new Error("Inputan email/password tidak boleh kosong");
  }

  // tahap 2 check apakah email yang dimasukan ada di db atau tidak
  const userData = await User.findOne({
    email: req.body.email,
  });

  // tahap 3 check password
  if (userData && (await userData.comparePassword(req.body.password))) {
    createSendResToken(userData, 200, res);
  } else {
    res.status(400);
    throw new Error("Invalid User");
  }
});

export const getCurrentUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");

  if (user) {
    return res.status(200).json({
      user,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export const logoutUser = async (req, res)=>{
  res.cookie('jwt', "", {
    httpOnly: true,
    expires: new Date(Date.now())
  })

  res.status(200).json({
    message: "Logout Berhasil"
  })
}

// 1. Lupa Password (Request Token / Reset Code sederhana atau langsung ganti via email)
export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) {
    res.status(400);
    throw new Error("Email harus diisi");
  }

  const user = await User.findOne({ email });
  if (!user) {
    res.status(404);
    throw new Error("Email tidak terdaftar");
  }

  // Untuk keperluan praktis/sederhana tanpa SMTP server email (seperti Nodemailer),
  // kita buat token reset singkat atau kembalikan pesan sukses.
  // Di production nyata, biasanya token dikirim via Nodemailer ke email user.
  const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "15m", // Berlaku 15 menit
  });

  res.status(200).json({
    message: "Instruksi reset password berhasil dibuat",
    resetToken, // Dikirim ke client agar bisa dipakai di form reset password
  });
});

// 2. Reset Password / Ganti Password Baru
export const resetPassword = asyncHandler(async (req, res) => {
  const { resetToken, newPassword } = req.body;

  if (!resetToken || !newPassword) {
    res.status(400);
    throw new Error("Token dan password baru harus diisi");
  }

  if (newPassword.length < 6) {
    res.status(400);
    throw new Error("Password minimal 6 karakter");
  }

  try {
    const decoded = jwt.verify(resetToken, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      res.status(404);
      throw new Error("User tidak ditemukan");
    }

    // Set password baru (mongoose pre-save hook akan otomatis menghash password baru)
    user.password = newPassword;
    await user.save();

    res.status(200).json({
      message: "Password berhasil diubah, silahkan login kembali",
    });
  } catch (error) {
    res.status(400);
    throw new Error("Token tidak valid atau sudah kedaluwarsa");
  }
});
