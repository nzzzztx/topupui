import { useState, useMemo, useEffect } from "react";
import { pesananData } from "../../data/pesanan";

export default function Pesanan() {
    const [search, setSearch] = useState("");
    const [invoiceInput, setInvoiceInput] = useState("");
    const [localTransactions, setLocalTransactions] = useState([]);

    const formatRupiah = (number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(number);
    };

    const combinedData = useMemo(() => {
        return [...localTransactions, ...pesananData];
    }, [localTransactions]);

    const filteredData = useMemo(() => {
        return combinedData.filter(
            (item) =>
                item.invoice.toLowerCase().includes(search.toLowerCase()) ||
                item.product.toLowerCase().includes(search.toLowerCase())
        );
    }, [search, combinedData]);

    const getStatusColor = (status) => {
        switch (status) {
            case "Pending":
                return "bg-yellow-500";
            case "Diproses":
                return "bg-blue-500";
            case "Sukses":
                return "bg-green-600";
            case "Gagal":
                return "bg-red-600";
            default:
                return "bg-gray-500";
        }
    };

    useEffect(() => {
        const data =
            JSON.parse(localStorage.getItem("transactions")) || [];

        const mapped = data.map((item) => ({
            date: new Date(item.createdAt).toLocaleDateString("id-ID"),
            invoice: item.id,
            product: "Top Up " + item.product.name,
            price: item.totalPrice,
            status:
                item.status === "success"
                    ? "Sukses"
                    : item.status === "pending"
                        ? "Pending"
                        : "Gagal",
        }));

        setLocalTransactions(mapped);
    }, []);

    return (
        <div className="min-h-screen bg-[#0f172a] text-white py-10 px-4">

            <div className="max-w-6xl mx-auto">

                <div className="mb-8">
                    <h1 className="text-2xl md:text-3xl font-bold">
                        Cek Pesanan
                    </h1>
                    <div className="w-16 h-1 bg-blue-500 mt-3 rounded-full" />
                </div>

                <div className="bg-[#1a2436] border border-blue-500/20 rounded-2xl p-6 mb-8 shadow-xl backdrop-blur-sm">
                    <label className="text-sm text-gray-300 block mb-2">
                        No. Transaksi
                    </label>

                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            setSearch(invoiceInput);
                        }}
                        className="flex flex-col md:flex-row gap-3"
                    >
                        <input
                            type="text"
                            value={invoiceInput}
                            onChange={(e) => setInvoiceInput(e.target.value)}
                            placeholder="Masukkan nomor invoice..."
                            className="flex-1 px-4 py-2 rounded-lg bg-[#0b1629] border border-[#1f2937] focus:outline-none focus:border-blue-500"
                        />

                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg transition font-medium"
                        >
                            Cek Pesanan
                        </button>
                    </form>
                </div>

                {/* <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Cari transaksi..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-[#1a2436] border border-[#24324a] focus:outline-none focus:border-blue-500 transition"
                    />
                </div> */}

                <div className="hidden md:block bg-[#1e2a3f] border border-blue-500/20 rounded-2xl shadow-2xl">

                    <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-t-2xl">
                        <div className="grid grid-cols-5 text-sm font-semibold">
                            <div className="px-6 py-4">Tanggal</div>
                            <div className="px-6 py-4">No. Invoice</div>
                            <div className="px-6 py-4">Produk</div>
                            <div className="px-6 py-4 text-center">Harga</div>
                            <div className="px-6 py-4 text-center">Status</div>
                        </div>
                    </div>

                    <div className="max-h-[450px] overflow-y-auto">

                        {filteredData.length === 0 ? (
                            <div className="text-center py-10 text-gray-400">
                                Tidak ada transaksi ditemukan
                            </div>
                        ) : (
                            filteredData.map((item, index) => (
                                <div
                                    key={index}
                                    className="grid grid-cols-5 border-t border-[#24324a] hover:bg-[#22304a] transition text-sm"
                                >
                                    <div className="px-6 py-4">{item.date}</div>
                                    <div className="px-6 py-4 font-medium">{item.invoice}</div>
                                    <div className="px-6 py-4">{item.product}</div>
                                    <div className="px-6 py-4 text-center font-semibold">
                                        {formatRupiah(item.price)}
                                    </div>
                                    <div className="px-6 py-4 text-center">
                                        <span
                                            className={`${getStatusColor(
                                                item.status
                                            )} text-xs px-3 py-1 rounded-full`}
                                        >
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
                            Tidak ada transaksi ditemukan
                        </div>
                    ) : (
                        filteredData.map((item, index) => (
                            <div
                                key={index}
                                className="bg-[#1a2436] border border-[#24324a] rounded-2xl p-5 shadow-xl hover:scale-[1.01] transition"
                            >
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-xs text-gray-400">
                                        {item.date}
                                    </span>
                                    <span
                                        className={`${getStatusColor(
                                            item.status
                                        )} text-xs px-2 py-1 rounded-full`}
                                    >
                                        {item.status}
                                    </span>
                                </div>

                                <div className="text-sm font-semibold mb-1">
                                    {item.product}
                                </div>

                                <div className="text-xs text-gray-400 mb-2">
                                    {item.invoice}
                                </div>

                                <div className="text-blue-400 font-bold text-lg">
                                    {formatRupiah(item.price)}
                                </div>
                            </div>
                        ))
                    )}
                </div>

            </div>
        </div>
    );
}
