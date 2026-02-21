import { NavLink, useNavigate } from "react-router-dom"
import { useState, useRef, useEffect } from "react"
import { useAuth } from "../context/AuthContext"

export default function Navbar() {
    const [open, setOpen] = useState(false)
    const [memberOpen, setMemberOpen] = useState(false)
    const navigate = useNavigate()
    const dropdownRef = useRef()
    const { user, logout } = useAuth()

    const menu = [
        { name: "Beranda", path: "/" },
        { name: "Harga", path: "/harga" },
        { name: "Pesanan", path: "/pesanan" },
        { name: "Kalkulator", path: "/kalkulator" },
    ]

    useEffect(() => {
        function handleClickOutside(e) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setMemberOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    return (
        <div className="sticky top-0 bg-[#111827] border-b border-[#1f2937] px-4 md:px-16 py-4 z-50">

            <div className="flex items-center justify-between">

                <NavLink to="/" className="text-white text-xl font-bold">
                    XMLTOPUP
                </NavLink>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8 text-sm">
                    {menu.map((item, i) => (
                        <NavLink
                            key={i}
                            to={item.path}
                            className={({ isActive }) =>
                                isActive
                                    ? "text-blue-500"
                                    : "text-gray-400 hover:text-white transition"
                            }
                        >
                            {item.name}
                        </NavLink>
                    ))}

                    {user && (
                        <NavLink
                            to="/riwayat"
                            className={({ isActive }) =>
                                isActive
                                    ? "text-blue-500"
                                    : "text-gray-400 hover:text-white transition"
                            }
                        >
                            Riwayat
                        </NavLink>
                    )}
                </div>

                {/* Desktop Right */}
                <div ref={dropdownRef} className="hidden md:flex items-center gap-3 relative">

                    {user && (
                        <div
                            onClick={() => navigate("/saldo")}
                            className="flex items-center gap-2 bg-[#1f2937] border border-[#2d3748] px-3 py-2 rounded-lg text-sm transition-all duration-300 hover:border-blue-500 hover:bg-[#1b2432]"
                        >
                            <span className="text-yellow-400">💰</span>
                            <span className="text-gray-400">Saldo</span>
                            <span className="font-semibold text-white">
                                Rp {user.saldo?.toLocaleString("id-ID") || 0}
                            </span>
                        </div>
                    )}

                    {!user ? (
                        <button
                            onClick={() => setMemberOpen(!memberOpen)}
                            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-medium transition"
                        >
                            Member
                        </button>
                    ) : (
                        <button
                            onClick={() => setMemberOpen(!memberOpen)}
                            className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2"
                        >
                            {user.username}
                            <span className={`transition-transform duration-300 ${memberOpen ? "rotate-180" : ""}`}>
                                ▼
                            </span>
                        </button>
                    )}

                    {memberOpen && (
                        <div className="absolute right-0 top-14 w-44 bg-[#111827] border border-[#2d3748] rounded-xl shadow-2xl overflow-hidden animate-fadeIn">
                            <button
                                onClick={() => {
                                    navigate("/profile")
                                    setMemberOpen(false)
                                }}
                                className="w-full text-left px-4 py-3 text-sm text-gray-300 hover:bg-[#1f2937]"
                            >
                                Profile
                            </button>

                            <button
                                onClick={() => {
                                    logout()
                                    navigate("/")
                                    setMemberOpen(false)
                                }}
                                className="w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-[#1f2937]"
                            >
                                Keluar
                            </button>
                        </div>
                    )}

                </div>

                {/* Mobile Toggle */}
                <button
                    onClick={() => setOpen(!open)}
                    className="md:hidden p-2"
                >
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/1828/1828859.png"
                        className="w-6 h-6 invert"
                        alt="menu"
                    />
                </button>
            </div>

            {/* Mobile Menu */}
            <div
                className={`md:hidden fixed left-0 top-[72px] w-full bg-[#0f172a] border-t border-[#1f2937] transition-all duration-300 ${open
                    ? "translate-y-0 opacity-100"
                    : "-translate-y-5 opacity-0 pointer-events-none"
                    }`}
            >
                <div className="flex flex-col p-6 gap-6 text-sm">

                    {user && (
                        <div
                            onClick={() => {
                                navigate("/saldo")
                                setOpen(false)
                            }}
                            className="bg-[#1f2937] border border-[#2d3748] rounded-xl p-4 flex items-center justify-between hover:border-blue-500 transition cursor-pointer"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center text-lg">
                                    💰
                                </div>
                                <div>
                                    <div className="text-gray-400 text-xs">Saldo Saya</div>
                                    <div className="font-semibold text-white text-sm">
                                        Rp {user.saldo?.toLocaleString("id-ID") || 0}
                                    </div>
                                </div>
                            </div>

                            <span className="text-gray-500">›</span>
                        </div>
                    )}

                    {menu.map((item, i) => (
                        <NavLink
                            key={i}
                            to={item.path}
                            onClick={() => setOpen(false)}
                            className={({ isActive }) =>
                                `transition ${isActive
                                    ? "text-blue-500"
                                    : "text-gray-400 hover:text-white"
                                }`
                            }
                        >
                            {item.name}
                        </NavLink>
                    ))}

                    {user && (
                        <NavLink
                            to="/riwayat"
                            onClick={() => setOpen(false)}
                            className={({ isActive }) =>
                                `transition ${isActive
                                    ? "text-blue-500"
                                    : "text-gray-400 hover:text-white"
                                }`
                            }
                        >
                            Riwayat
                        </NavLink>
                    )}

                    {!user ? (
                        <>
                            <button
                                onClick={() => {
                                    navigate("/login")
                                    setOpen(false)
                                }}
                                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition"
                            >
                                Masuk
                            </button>

                            <button
                                onClick={() => {
                                    navigate("/register")
                                    setOpen(false)
                                }}
                                className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition"
                            >
                                Daftar
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={() => {
                                    navigate("/profile")
                                    setOpen(false)
                                }}
                                className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg transition"
                            >
                                Profile
                            </button>

                            <button
                                onClick={() => {
                                    logout()
                                    navigate("/")
                                    setOpen(false)
                                }}
                                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition"
                            >
                                Keluar
                            </button>
                        </>
                    )}

                </div>
            </div>
        </div>
    )
}