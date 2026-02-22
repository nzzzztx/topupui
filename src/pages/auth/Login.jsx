import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
    const [show, setShow] = useState(false);
    const location = useLocation();
    const message = location.state?.message;
    const { login, user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate("/profile", { replace: true })
        }
    }, [user, navigate])

    const handleSubmit = (e) => {
        e.preventDefault();

        const form = new FormData(e.target);

        const result = login(
            form.get("username"),
            form.get("password")
        )

        if (!result.success) {
            alert(result.message)
            return
        }

        navigate("/profile", { replace: true })
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
            <div className="relative w-full max-w-md animate-fadeIn">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold tracking-wide">
                        XML<span className="text-blue-500">Topup</span>
                    </h1>
                    <p className="text-gray-400 mt-2 text-sm">
                        Silakan masuk untuk mengakses akunmu.
                    </p>
                </div>

                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8">
                    {message && (
                        <div className="mb-6 bg-blue-600/20 border border-blue-500/40 text-blue-400 text-sm px-4 py-3 rounded-lg text-center">
                            {message}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">

                        <div>
                            <label className="block text-gray-300 text-sm mb-2">
                                Username
                            </label>
                            <input
                                type="text"
                                name="username"
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white"
                                placeholder="Masukkan username"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-300 text-sm mb-2">
                                Password
                            </label>

                            <div className="relative">
                                <input
                                    type={show ? "text" : "password"}
                                    name="password"
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white"
                                    placeholder="Masukkan password"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShow(!show)}
                                    className="absolute right-3 top-3 bg-green-600 text-white text-xs px-3 py-1 rounded-md"
                                >
                                    {show ? "Hide" : "Show"}
                                </button>
                            </div>
                        </div>

                        <div className="text-right">
                            <Link
                                to="/forgot-password"
                                className="text-sm text-blue-400 hover:underline"
                            >
                                🔒 Lupa Password?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg py-3 font-semibold text-white">
                            Masuk
                        </button>

                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-gray-400 text-sm mb-3">
                            Belum punya akun?
                        </p>

                        <Link
                            to="/register"
                            className="block w-full bg-green-600 hover:bg-green-700 rounded-lg py-3 font-semibold text-white"
                        >
                            Daftar
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
}