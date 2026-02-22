import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"
import { Helmet } from "react-helmet";

export default function Register() {
    const [showPass, setShowPass] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();
    const { register } = useAuth()

    const handleSubmit = (e) => {
        e.preventDefault()

        const form = new FormData(e.target)

        const username = form.get("username")
        const name = form.get("name")
        const email = form.get("email")
        const phone = form.get("phone")
        const password = form.get("password")
        const confirm = form.get("confirm")

        if (password !== confirm) {
            alert("Password tidak sama")
            return
        }

        const result = register({
            username,
            name,
            email,
            phone,
            password
        })

        if (!result.success) {
            alert(result.message)
            return
        }

        setSuccess(true)

        setTimeout(() => {
            navigate("/login", {
                state: { message: "Akun berhasil dibuat. Silakan login." }
            })
        }, 1500)
    }

    return (
        <>
            <Helmet>
                <title>Daftar Akun - XML Topup</title>
                <meta
                    name="description"
                    content="Buat akun XML Topup untuk menikmati layanan top up game cepat, murah, dan terpercaya."
                />
                <meta property="og:title" content="Daftar Akun - XML Topup" />
                <meta
                    property="og:description"
                    content="Registrasi akun XML Topup dan nikmati berbagai promo serta layanan top up instan."
                />
                <meta property="og:image" content="/logofix.png" />
            </Helmet>

            <div className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">

                <div className="relative w-full max-w-md animate-fadeIn">

                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold tracking-wide">
                            XML<span className="text-blue-500">Topup</span>
                        </h1>
                        <p className="text-gray-400 mt-2 text-sm">
                            Silakan isi formulir untuk membuat akun baru.
                        </p>
                    </div>

                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8">
                        {success && (
                            <div className="mb-6 bg-green-600/20 border border-green-500/40 text-green-400 text-sm px-4 py-3 rounded-lg animate-fadeIn text-center">
                                ✅ Akun berhasil dibuat. Silakan konfirmasi melalui email.
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">

                            <div>
                                <label className="block text-gray-300 text-sm mb-1">
                                    Username
                                </label>
                                <p className="text-xs text-gray-500 mb-2">
                                    Huruf kecil dan angka, minimal 5 karakter
                                </p>
                                <input
                                    type="text"
                                    name="username"
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                    placeholder="Masukkan username"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-300 text-sm mb-2">
                                    Nama Lengkap
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                    placeholder="Masukkan nama lengkap"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-300 text-sm mb-2">
                                    Alamat Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                    placeholder="emailkamu@gmail.com"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-300 text-sm mb-2">
                                    No. WhatsApp
                                </label>
                                <input
                                    type="text"
                                    required
                                    name="phone"
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                    placeholder="08xxxxxxxxxx"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-300 text-sm mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPass ? "text" : "password"}
                                        required
                                        name="password"
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                        placeholder="Masukkan password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPass(!showPass)}
                                        className="absolute right-3 top-3 bg-green-600 hover:bg-green-700 text-white text-xs px-3 py-1 rounded-md transition"
                                    >
                                        {showPass ? "Hide" : "Show"}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-300 text-sm mb-2">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showConfirm ? "text" : "password"}
                                        required
                                        name="confirm"
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                        placeholder="Ulangi password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirm(!showConfirm)}
                                        className="absolute right-3 top-3 bg-green-600 hover:bg-green-700 text-white text-xs px-3 py-1 rounded-md transition"
                                    >
                                        {showConfirm ? "Hide" : "Show"}
                                    </button>
                                </div>
                            </div>

                            {/* <div>
                            <p className="text-sm text-gray-400 mb-2">
                                Memastikan bahwa kamu bukan robot.
                            </p>
                            <div className="bg-white rounded-md p-4 flex items-center gap-3">
                                <input type="checkbox" className="w-5 h-5" />
                                <span className="text-gray-700 text-sm">
                                    I'm not a robot
                                </span>
                                <div className="ml-auto text-xs text-gray-500">
                                    reCAPTCHA
                                </div>
                            </div>
                        </div> */}

                            <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-[1.02] active:scale-95 transition-all duration-300 rounded-lg py-3 font-semibold text-white shadow-lg">
                                Daftar
                            </button>

                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-gray-400 text-sm mb-3">
                                Sudah punya akun?
                            </p>

                            <Link
                                to="/login"
                                className="block w-full bg-green-600 hover:bg-green-700 transition rounded-lg py-3 font-semibold text-white"
                            >
                                Masuk
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}