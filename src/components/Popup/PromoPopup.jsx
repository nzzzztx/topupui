import { useEffect, useState } from "react"

export default function PromoPopup() {
    const [open, setOpen] = useState(false)

    useEffect(() => {
        const hide = localStorage.getItem("hidePromo")

        if (!hide) {
            setTimeout(() => {
                setOpen(true)
            }, 800) // delay sedikit biar smooth
        }
    }, [])

    const handleClose = () => {
        setOpen(false)
    }

    const handleHideForever = () => {
        localStorage.setItem("hidePromo", "true")
        setOpen(false)
    }

    if (!open) return null

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 animate-fadeIn">

            <div className="bg-[#111827] w-[90%] max-w-lg rounded-xl overflow-hidden shadow-2xl animate-scaleIn">

                <div className="relative">
                    <img
                        src="/assets/img/banner_affiliate.png"
                        alt="promo"
                        className="w-full h-64 object-cover"
                    />
                </div>

                <div className="p-6 text-sm text-gray-300">

                    <p className="mb-3">
                        Selamat datang di XMLTOPUP!
                    </p>

                    <p className="font-semibold text-white mb-4">
                        Ingin punya web Top Up seperti ini?
                    </p>

                    <p className="mb-4">
                        Hubungi xmltronik.com
                    </p>

                    <div className="flex items-center justify-between">

                        <label className="flex items-center gap-2 text-xs cursor-pointer">
                            <input
                                type="checkbox"
                                onChange={handleHideForever}
                            />
                            Jangan tampilkan lagi
                        </label>

                        <button
                            onClick={handleClose}
                            className="bg-blue-600 px-4 py-2 rounded-md text-white hover:bg-blue-700 transition"
                        >
                            Tutup
                        </button>

                    </div>

                </div>
            </div>
        </div>
    )
}
