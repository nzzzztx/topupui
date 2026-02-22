import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Helmet } from "react-helmet";

export default function ForgotPassword() {
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();
    const { resetPassword } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();

        const form = new FormData(e.target);

        const email = form.get("email");
        const newPassword = form.get("password");
        const confirm = form.get("confirm");

        if (newPassword.length < 6) {
            alert("Password minimal 6 karakter");
            return;
        }

        if (newPassword !== confirm) {
            alert("Konfirmasi password tidak sama");
            return;
        }

        const result = resetPassword(email.trim(), newPassword.trim());

        if (!result.success) {
            alert(result.message);
            return;
        }

        setSuccess(true);

        setTimeout(() => {
            navigate("/login", {
                state: { message: "Password berhasil direset. Silakan login." }
            });
        }, 1500);
    };

    return (
        <>
            <Helmet>
                <title>Lupa Password - XML Topup</title>
                <meta
                    name="description"
                    content="Reset password akun XML Topup dengan mudah dan cepat."
                />
                <meta property="og:title" content="Lupa Password - XML Topup" />
                <meta
                    property="og:description"
                    content="Ajukan reset password akun XML Topup Anda."
                />
                <meta property="og:image" content="/logofix.png" />
            </Helmet>

            <div className="relative min-h-screen flex items-center justify-center px-4">

                <div className="w-full max-w-md">

                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold">
                            XML<span className="text-blue-500">Topup</span>
                        </h1>
                        <p className="text-gray-400 mt-2 text-sm">
                            Reset password akun kamu.
                        </p>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl shadow-2xl p-8">

                        {success && (
                            <div className="mb-6 bg-green-600/20 border border-green-500/40 text-green-400 text-sm px-4 py-3 rounded-lg text-center">
                                ✅ Password berhasil direset.
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">

                            <div>
                                <label className="block text-gray-300 text-sm mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white"
                                    placeholder="emailkamu@gmail.com"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-300 text-sm mb-2">
                                    Password Baru
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white"
                                    placeholder="Minimal 6 karakter"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-300 text-sm mb-2">
                                    Konfirmasi Password
                                </label>
                                <input
                                    type="password"
                                    name="confirm"
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white"
                                    placeholder="Ulangi password"
                                />
                            </div>

                            <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg py-3 font-semibold text-white">
                                Reset Password
                            </button>

                        </form>

                        <div className="mt-6 text-center">
                            <Link
                                to="/login"
                                className="text-sm text-blue-400 hover:underline"
                            >
                                ← Kembali ke Login
                            </Link>
                        </div>

                    </div>

                </div>
            </div>
        </>
    );
}