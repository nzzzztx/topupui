import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function ForgotPassword() {
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const { register } = useAuth()

    const handleSubmit = (e) => {
        e.preventDefault()

        const form = new FormData(e.target)

        const data = {
            username: form.get("username"),
            name: form.get("name"),
            email: form.get("email"),
            phone: form.get("phone"),
            password: form.get("password"),
            saldo: 0,
            createdAt: new Date().toISOString()
        }

        const result = register(data)

        if (!result.success) {
            alert(result.message)
            return
        }

        navigate("/login", {
            state: { message: "Akun berhasil dibuat, silakan login." }
        })
    }

    return (
        <div className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">

            <div className="relative w-full max-w-md animate-fadeIn">

                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold tracking-wide">
                        XML<span className="text-blue-500">Topup</span>
                    </h1>
                    <p className="text-gray-400 mt-2 text-sm">
                        Silakan masukkan email kamu untuk melakukan reset password.
                    </p>
                </div>

                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8">

                    {success && (
                        <div className="mb-6 bg-green-600/20 border border-green-500/40 text-green-400 text-sm px-4 py-3 rounded-lg animate-fadeIn text-center">
                            ✅ Link reset password telah dikirim ke email kamu.
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">

                        <div>
                            <label className="block text-gray-300 text-sm mb-2">
                                Alamat Email
                            </label>
                            <input
                                type="email"
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                placeholder="emailkamu@gmail.com"
                            />
                        </div>

                        <div>
                            <p className="text-sm text-gray-400 mb-2">
                                Memastikan bahwa kamu bukan robot.
                            </p>
                            {/* <div className="bg-white rounded-md p-4 flex items-center gap-3">
                                <input type="checkbox" className="w-5 h-5" />
                                <span className="text-gray-700 text-sm">
                                    I'm not a robot
                                </span>
                                <div className="ml-auto text-xs text-gray-500">
                                    reCAPTCHA
                                </div>
                            </div> */}
                        </div>

                        <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-[1.02] active:scale-95 transition-all duration-300 rounded-lg py-3 font-semibold text-white shadow-lg">
                            Reset Password
                        </button>

                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-gray-400 text-sm mb-3">
                            Sudah ingat password?
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
    );
}