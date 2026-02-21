import { useState } from "react"
import KalkulatorZodiac from "../../components/Kalkulator/KalkulatorZodiac"
import KalkulatorWinRate from "../../components/Kalkulator/KalkulatorWinRate"
import KalkulatorMagicWheel from "../../components/Kalkulator/KalkulatorMagicWheel"

export default function Kalkulator() {
    const [active, setActive] = useState("zodiac")

    const menus = [
        { id: "zodiac", label: "Point Zodiac" },
        { id: "winrate", label: "Win Rate" },
        { id: "magic", label: "Magic Wheel" },
    ]

    return (
        <div className="min-h-screen text-white px-6 py-12">

            <div className="max-w-6xl mx-auto">

                <div className="mb-10">
                    <h1 className="text-2xl md:text-3xl font-bold tracking-wide">
                        Kalkulator
                    </h1>
                    <div className="w-16 h-[3px] bg-blue-500 mt-3 rounded-full" />
                </div>

                <div className="flex flex-wrap gap-3 mb-10">
                    {menus.map(menu => (
                        <button
                            key={menu.id}
                            onClick={() => setActive(menu.id)}
                            className={`
                                px-5 py-2.5 rounded-lg text-sm font-medium
                                transition-all duration-300
                                ${active === menu.id
                                    ? "bg-blue-600 shadow-lg scale-[1.02]"
                                    : "bg-[#1e293b] hover:bg-[#243447] border border-blue-500/10"}
                            `}
                        >
                            {menu.label}
                        </button>
                    ))}
                </div>

                <div className="
                    bg-gradient-to-b from-[#1e293b] to-[#172033]
                    border border-blue-500/20
                    rounded-2xl
                    p-6 md:p-10
                    shadow-[0_10px_30px_rgba(0,0,0,0.4)]
                    transition-all
                ">
                    {active === "zodiac" && <KalkulatorZodiac />}
                    {active === "winrate" && <KalkulatorWinRate />}
                    {active === "magic" && <KalkulatorMagicWheel />}
                </div>

            </div>
        </div>
    )
}
