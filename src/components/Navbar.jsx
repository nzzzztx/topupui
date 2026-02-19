import { NavLink } from "react-router-dom"
import { useState } from "react"

export default function Navbar() {
    const [open, setOpen] = useState(false)

    const menu = [
        { name: "Beranda", path: "/" },
        { name: "Harga", path: "/harga" },
        { name: "Pesanan", path: "/pesanan" },
        { name: "Pencarian", path: "/pencarian" },
        { name: "Kalkulator", path: "/kalkulator" },
    ]

    return (
        <div className="bg-[#111827] border-b border-[#1f2937] px-4 md:px-16 py-4 relative z-50">

            <div className="flex items-center justify-between">
                <NavLink
                    to="/"
                    className="text-white text-xl font-bold tracking-wide"
                >
                    XMLTOPUP
                </NavLink>

                <div className="hidden md:flex items-center gap-8 text-sm">
                    {menu.map((item, i) => (
                        <NavLink
                            key={i}
                            to={item.path}
                            className={({ isActive }) =>
                                isActive
                                    ? "text-blue-500"
                                    : "text-gray-400 hover:text-white"
                            }
                        >
                            {item.name}
                        </NavLink>
                    ))}
                </div>

                <div className="hidden md:block">
                    <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium">
                        Member
                    </button>
                </div>

                <button
                    onClick={() => setOpen(prev => !prev)}
                    className="md:hidden p-2 relative z-50"
                >
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/1828/1828859.png"
                        className="w-6 h-6 invert"
                        alt="menu"
                    />
                </button>
            </div>

            <div
                className={`md:hidden fixed left-0 top-[72px] w-full bg-[#0f172a] border-t border-[#1f2937] transition-all duration-300 ${open
                    ? "translate-y-0 opacity-100"
                    : "-translate-y-5 opacity-0 pointer-events-none"
                    }`}
            >
                <div className="flex flex-col p-6 gap-6 text-sm">

                    {menu.map((item, i) => (
                        <NavLink
                            key={i}
                            to={item.path}
                            onClick={() => setOpen(false)}
                            className={({ isActive }) =>
                                isActive
                                    ? "text-blue-500"
                                    : "text-gray-400 hover:text-white"
                            }
                        >
                            {item.name}
                        </NavLink>
                    ))}

                    <button
                        onClick={() => setOpen(false)}
                        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium"
                    >
                        Member
                    </button>

                </div>
            </div>

        </div>
    )
}
