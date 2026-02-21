import { useEffect, useState } from "react"
import testBanner from "../../assets/img/bannertest1.png"

export default function PromoPopup() {
    const [open, setOpen] = useState(false)
    const [dontShow, setDontShow] = useState(false)

    useEffect(() => {
        const hide = localStorage.getItem("hidePromo")

        if (!hide) {
            const timer = setTimeout(() => {
                setOpen(true)
            }, 800)

            return () => clearTimeout(timer)
        }
    }, [])

    const handleClose = () => {
        if (dontShow) {
            localStorage.setItem("hidePromo", "true")
        }
        setOpen(false)
    }

    {/* test nomer */ }
    const phoneNumber = "6281234567890"

    const message = `
    Halo XMLTronik 👋

    Saya tertarik membuat website top up seperti XMLTopup.

    Mohon info paket dan harganya ya.
    `
    const encodedMessage = encodeURIComponent(message)
    const waLink = `https://wa.me/${phoneNumber}?text=${encodedMessage}`

    if (!open) return null

    return (
        <div
            onClick={handleClose}
            className="fixed top-0 left-0 w-screen h-screen z-50 flex items-center justify-center
             bg-black/80 animate-fadeIn px-4"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-lg rounded-2xl overflow-hidden
                           bg-gradient-to-b from-[#0f172a] to-[#111827]
                           border border-blue-500/20
                           shadow-[0_20px_50px_rgba(0,0,0,0.6)]
                           animate-scaleIn"
            >
                {/* <button
                    onClick={handleClose}
                    className="absolute top-3 right-3 z-20
                               bg-black/50 hover:bg-black/70
                               w-8 h-8 rounded-full
                               text-white text-sm
                               flex items-center justify-center
                               transition"
                >
                    ✕
                </button> */}

                <div className="relative">
                    <img
                        src={testBanner}
                        alt="promo"
                        className="w-full h-64 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent" />
                </div>

                <div className="p-6 space-y-4 text-sm text-gray-300">

                    <h2 className="text-lg font-semibold text-white">
                        🚀 Selamat Datang di XMLTOPUP
                    </h2>

                    <p>
                        Ingin punya website top up seperti ini dengan sistem lengkap?
                    </p>

                    <div className="bg-[#0f2744] border border-blue-500/20 rounded-lg p-4">
                        <p className="text-blue-400 font-medium">
                            Hubungi:
                        </p>
                        <p className="text-white font-semibold">
                            xmltronik.com
                        </p>
                    </div>

                    <a
                        href="https://wa.me/6281234567890?text=Halo%20XMLTronik%20👋%20Saya%20tertarik%20membuat%20website%20top%20up."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-3 rounded-xl
                        bg-gradient-to-r from-blue-600 to-indigo-600
                        hover:scale-[1.02]
                        active:scale-95
                        transition-all duration-300
                        shadow-lg text-white font-medium
                        text-center block"
                    >
                        Konsultasi Sekarang
                    </a>

                    <div className="flex items-center justify-between pt-2 text-xs">
                        <label className="flex items-center gap-2 cursor-pointer select-none">
                            <input
                                type="checkbox"
                                onChange={(e) => setDontShow(e.target.checked)}
                                className="accent-blue-600"
                            />
                            Jangan tampilkan lagi
                        </label>

                        <button
                            onClick={handleClose}
                            className="text-blue-400 hover:text-blue-300 transition"
                        >
                            Tutup
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}
