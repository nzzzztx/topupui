import { Link } from "react-router-dom"

const images = import.meta.glob("../assets/img/*.png", {
    eager: true,
    import: "default",
})

export default function Footer() {

    const favoriteProducts = [
        "mobile_legends.png",
        "free_fire.png",
        "valorant.png",
        "genshin_impact.png",
        "pubg_mobile.png",
        "delta_force.png",
    ]

    const integrations = [
        "BCAA.png",
        "linkajaa.png",
        "shopeepay.png",
        "E-OVO.png",
        "E-DANA.png",
        "E-GOPAY.png",
    ]

    return (
        <footer className="relative mt-24 bg-[#0b1220] text-gray-400 overflow-hidden">

            <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:22px_22px]"></div>

            <div className="relative px-6 md:px-16 py-16">

                <div className="grid md:grid-cols-2 gap-16">

                    <div className="space-y-6">

                        <h2 className="text-white text-2xl font-bold tracking-wide">
                            XMLTOPUP
                        </h2>

                        <p className="text-sm leading-relaxed max-w-md">
                            XMLTopup menyediakan layanan top up game online 24 jam,
                            panel PPOB termurah, dan voucher digital lengkap di Indonesia.
                        </p>

                        <div className="flex gap-4">
                            <div className="bg-[#111827] px-4 py-2 rounded-lg border border-[#1f2937] hover:border-blue-500 transition cursor-pointer">
                                <div className="text-white text-sm font-semibold">
                                    App Store
                                </div>
                            </div>

                            <div className="bg-[#111827] px-4 py-2 rounded-lg border border-[#1f2937] hover:border-blue-500 transition cursor-pointer">
                                <div className="text-white text-sm font-semibold">
                                    Google Play
                                </div>
                            </div>
                        </div>

                        <div className="space-y-1 text-sm">
                            <p>📞 0823-8750-8540</p>
                            <p>📧 info@xmltopup.com</p>
                            <p>🕒 09:00 - 23:00 WIB</p>
                        </div>

                    </div>

                    <div className="max-w-[480px] w-full md:ml-auto">

                        <h3 className="text-white font-semibold mb-5 text-center md:text-left">
                            Produk Favorit
                        </h3>

                        <div className="grid grid-cols-3 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 justify-items-center md:justify-items-start">
                            {favoriteProducts.map((file, i) => {
                                const img = images[`../assets/img/${file}`]
                                if (!img) return null

                                return (
                                    <div
                                        key={i}
                                        className="w-[120px] h-[120px] bg-[#111827] p-1 rounded-lg border border-[#1f2937] hover:border-blue-500 transition"
                                    >
                                        <img
                                            src={img}
                                            alt=""
                                            className="w-full h-full object-cover rounded-md"
                                        />
                                    </div>
                                )
                            })}

                        </div>

                        <div className="pt-6 border-t border-[#1f2937] overflow-hidden">

                            <div className="flex gap-6 sm:gap-8 animate-marquee whitespace-nowrap justify-center md:justify-start">

                                {[...integrations, ...integrations].map((file, i) => {
                                    const img = images[`../assets/img/${file}`]
                                    if (!img) return null

                                    return (
                                        <img
                                            key={i}
                                            src={img}
                                            alt=""
                                            className="h-7 opacity-80 hover:opacity-120 transition"
                                        />
                                    )
                                })}

                            </div>

                        </div>


                    </div>

                </div>

                <div className="mt-16 border-t border-[#1f2937] pt-6 flex flex-col md:flex-row justify-between items-center gap-6 text-xs">

                    <div className="flex gap-6 flex-wrap">
                        <Link to="#" className="hover:text-white transition">Masuk</Link>
                        <Link to="#" className="hover:text-white transition">Daftar</Link>
                        <Link to="#" className="hover:text-white transition">Reseller</Link>
                        <Link to="#" className="hover:text-white transition">Cek Pesanan</Link>
                        <Link to="#" className="hover:text-white transition">Kontak</Link>
                    </div>

                    <div>
                        Copyright ©2026 XMLTopup.
                    </div>

                </div>

            </div>
        </footer>
    )
}
