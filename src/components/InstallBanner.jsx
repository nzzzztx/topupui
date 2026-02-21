import { useState, useEffect } from "react"

export default function InstallBanner() {
    const [deferredPrompt, setDeferredPrompt] = useState(null)

    useEffect(() => {
        window.addEventListener("beforeinstallprompt", (e) => {
            e.preventDefault()
            setDeferredPrompt(e)
        })
    }, [])

    const handleInstall = async () => {

        // 1️⃣ Kirim log ke backend (optional)
        try {
            await fetch("http://localhost:5000/api/install-log", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    device: navigator.userAgent,
                    time: new Date()
                })
            })
        } catch (err) {
            console.log("Backend not connected yet")
        }

        // 2️⃣ Trigger PWA install
        if (deferredPrompt) {
            deferredPrompt.prompt()
            const { outcome } = await deferredPrompt.userChoice
            console.log("Install outcome:", outcome)
            setDeferredPrompt(null)
        } else {
            alert("Install tidak tersedia di browser ini")
        }
    }

    return (
        <div className="px-4 mt-6">
            <div className="max-w-7xl mx-auto">

                <div className="relative overflow-hidden rounded-2xl border border-[#1f2937] bg-gradient-to-r from-[#111827] to-[#0f172a] p-6 shadow-lg">

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-blue-600/20 flex items-center justify-center border border-blue-600/30">
                                <img
                                    src="https://cdn-icons-png.flaticon.com/512/15/15874.png"
                                    alt="phone"
                                    className="w-6 h-6 invert"
                                />
                            </div>

                            <div>
                                <h3 className="text-white font-semibold text-sm md:text-base">
                                    Install Aplikasi XMLTOPUP
                                </h3>
                                <p className="text-gray-400 text-xs md:text-sm">
                                    Tambahkan ke Home Screen untuk akses lebih cepat
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={handleInstall}
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-5 py-2.5 rounded-lg text-sm font-medium transition shadow-md w-fit active:scale-95"
                        >
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/724/724933.png"
                                alt="download"
                                className="w-4 h-4 invert"
                            />
                            Install Sekarang
                        </button>

                    </div>

                    <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-600/10 blur-3xl"></div>

                </div>

            </div>
        </div>
    )

}
