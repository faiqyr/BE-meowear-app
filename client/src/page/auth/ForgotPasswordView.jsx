import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import customAPI from "../../api";
import { toast } from "react-toastify";

const ForgotPasswordView = () => {
  const [step, setStep] = useState(1); // 1: Request Email, 2: Input Token & New Password
  const [email, setEmail] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRequestToken = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await customAPI.post("/auth/forgot-password", { email });
      toast.success("Token reset berhasil dibuat!");
      // Di sistem tanpa SMTP email, token dikembalikan langsung di respons agar bisa langsung dipakai
      if (res.data.resetToken) {
        setResetToken(res.data.resetToken);
      }
      setStep(2);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await customAPI.post("/auth/reset-password", { resetToken, newPassword });
      toast.success("Password berhasil diubah! Silahkan login.");
      navigate("/login");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Gagal merubah password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen grid place-items-center">
      <div className="card w-96 p-8 bg-base-300 shadow-lg flex flex-col gap-y-4">
        <h4 className="text-center text-2xl font-bold">
          {step === 1 ? "Lupa Password" : "Reset Password Baru"}
        </h4>

        {step === 1 ? (
          <form onSubmit={handleRequestToken} className="flex flex-col gap-y-4">
            <div>
              <label className="label">
                <span className="label-text capitalize">Email terdaftar</span>
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="masukkan email anda"
                className="input input-bordered w-full"
              />
            </div>
            <div className="mt-2">
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary btn-block"
              >
                {loading ? "Memproses..." : "Kirim Permintaan"}
              </button>
            </div>
            <p className="text-center text-sm">
              Ingat password?
              <Link to="/login" className="ml-2 link link-hover link-accent">
                Login
              </Link>
            </p>
          </form>
        ) : (
          <form onSubmit={handleResetPassword} className="flex flex-col gap-y-4">
            <div>
              <label className="label">
                <span className="label-text capitalize">Token Reset (Otomatis / Paste)</span>
              </label>
              <textarea
                value={resetToken}
                onChange={(e) => setResetToken(e.target.value)}
                required
                rows={3}
                placeholder="Token reset password"
                className="textarea textarea-bordered w-full text-xs"
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text capitalize">Password Baru</span>
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                placeholder="Minimal 6 karakter"
                className="input input-bordered w-full"
              />
            </div>
            <div className="mt-2">
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary btn-block"
              >
                {loading ? "Menyimpan..." : "Simpan Password Baru"}
              </button>
            </div>
            <p className="text-center text-sm">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="link link-hover link-accent"
              >
                Kembali ke input email
              </button>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordView;
