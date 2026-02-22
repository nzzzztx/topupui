import { useState, useMemo } from "react";
import { categories, hargaData } from "../../data/harga";
import { Helmet } from "react-helmet";

export default function Harga() {
    const [active, setActive] = useState("Games");

    const filteredData = useMemo(() => {
        return hargaData.filter((item) => item.kategori === active);
    }, [active]);

    const formatRupiah = (number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(number);
    };

    return (
        <>
            <Helmet>
                <title>Daftar Harga - XML Topup</title>
                <meta
                    name="description"
                    content="Cek daftar harga top up game terbaru dan terlengkap hanya di XML Topup."
                />
                <meta property="og:title" content="Daftar Harga - XML Topup" />
                <meta property="og:description" content="Daftar harga top up game terbaru dan terpercaya." />
                <meta property="og:image" content="/logofix.png" />
            </Helmet>

            <div className="min-h-screen bg-[#0f172a] text-white py-10 px-4">
                <div className="max-w-6xl mx-auto">

                    <div className="mb-10">
                        <h1 className="text-2xl md:text-3xl font-bold">
                            Daftar Harga
                        </h1>
                        <div className="w-16 h-1 bg-blue-500 mt-3 rounded-full" />
                    </div>

                    <div className="bg-[#1e2a3f] border border-blue-500/20 rounded-2xl p-6 mb-10 shadow-2xl">

                        <div className="flex justify-center gap-6 md:gap-10 flex-wrap">

                            {categories.map((cat) => (
                                <button
                                    key={cat.name}
                                    onClick={() => setActive(cat.name)}
                                    className="flex flex-col items-center group transition-all duration-300"
                                >
                                    <div
                                        className={`flex items-center justify-center
                    w-12 h-12 md:w-14 md:h-14 rounded-xl transition-all duration-300
                    ${active === cat.name
                                                ? "bg-blue-600 shadow-lg scale-105"
                                                : "bg-[#142033] group-hover:bg-[#1f2d46]"
                                            }
                  `}
                                    >
                                        <img
                                            src={cat.icon}
                                            alt={cat.name}
                                            className="w-4 h-4 md:w-5 md:h-5 invert"
                                        />
                                    </div>

                                    <span
                                        className={`text-xs mt-2 font-medium transition ${active === cat.name
                                            ? "text-blue-400"
                                            : "text-gray-400 group-hover:text-white"
                                            }`}
                                    >
                                        {cat.name}
                                    </span>
                                </button>
                            ))}

                        </div>
                    </div>

                    <div className="hidden md:block bg-[#1e2a3f] border border-blue-500/20 rounded-2xl shadow-2xl">

                        <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-t-2xl">
                            <div className="grid grid-cols-5 text-sm font-semibold">
                                <div className="px-6 py-4">Kategori</div>
                                <div className="px-6 py-4">Produk</div>
                                <div className="px-6 py-4 text-center">Member</div>
                                <div className="px-6 py-4 text-center">Reseller</div>
                                <div className="px-6 py-4 text-center">Status</div>
                            </div>
                        </div>

                        <div className="max-h-[450px] overflow-y-auto">

                            {filteredData.length === 0 ? (
                                <div className="text-center py-10 text-gray-400">
                                    Tidak ada data tersedia
                                </div>
                            ) : (
                                filteredData.map((item, index) => (
                                    <div
                                        key={index}
                                        className="grid grid-cols-5 border-t border-[#2a3a56] hover:bg-[#24334f] transition text-sm"
                                    >
                                        <div className="px-6 py-4">{item.namaKategori}</div>
                                        <div className="px-6 py-4 font-medium">{item.produk}</div>
                                        <div className="px-6 py-4 text-center font-semibold">
                                            {formatRupiah(item.member)}
                                        </div>
                                        <div className="px-6 py-4 text-center font-semibold">
                                            {formatRupiah(item.reseller)}
                                        </div>
                                        <div className="px-6 py-4 text-center">
                                            <span className="bg-green-600 text-xs px-3 py-1 rounded-full">
                                                {item.status}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            )}

                        </div>
                    </div>

                    <div className="md:hidden space-y-4">

                        {filteredData.length === 0 ? (
                            <div className="text-center text-gray-400 py-6">
                                Tidak ada data tersedia
                            </div>
                        ) : (
                            filteredData.map((item, index) => (
                                <div
                                    key={index}
                                    className="bg-[#1e2a3f] border border-[#2a3a56] rounded-2xl p-5 shadow-xl"
                                >
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-xs text-gray-400">
                                            {item.namaKategori}
                                        </span>

                                        <span className="bg-green-600 text-xs px-2 py-1 rounded-full">
                                            {item.status}
                                        </span>
                                    </div>

                                    <div className="text-sm font-semibold mb-3">
                                        {item.produk}
                                    </div>

                                    <div className="flex justify-between text-sm">
                                        <div>
                                            <div className="text-gray-400 text-xs">Member</div>
                                            <div className="font-bold text-blue-400">
                                                {formatRupiah(item.member)}
                                            </div>
                                        </div>

                                        <div>
                                            <div className="text-gray-400 text-xs">Reseller</div>
                                            <div className="font-bold">
                                                {formatRupiah(item.reseller)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}

                    </div>

                </div>
            </div>
        </>
    );
}
