import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Helmet } from "react-helmet";

export default function Riwayat() {
    const [transactions, setTransactions] = useState([])
    const [selected, setSelected] = useState(null)
    const navigate = useNavigate()

    const loadData = () => {
        const user = JSON.parse(localStorage.getItem("xml_user"))

        let data = []

        if (user) {
            data =
                JSON.parse(localStorage.getItem("xml_transactions")) || []
        } else {
            data =
                JSON.parse(localStorage.getItem("guest_transactions")) || []
        }

        setTransactions(
            data.sort(
                (a, b) =>
                    new Date(b.createdAt) - new Date(a.createdAt)
            )
        )
    }

    useEffect(() => {
        loadData()
        window.addEventListener("focus", loadData)
        return () => window.removeEventListener("focus", loadData)
    }, [])

    const getStatusStyle = (status) => {
        if (status === "success")
            return "bg-green-500 text-white"
        if (status === "pending")
            return "bg-yellow-400 text-black"
        if (status === "failed")
            return "bg-red-500 text-white"
        return "bg-blue-500 text-white"
    }

    const getStatusLabel = (status) => {
        if (status === "success") return "Sukses"
        if (status === "pending") return "Pending"
        if (status === "failed") return "Gagal"
        return status
    }

    return (
        <>
            <Helmet>
                <title>Riwayat Transaksi - XML Topup</title>
                <meta
                    name="description"
                    content="Lihat riwayat transaksi dan detail pesanan top up kamu dengan mudah di XML Topup."
                />
                <meta property="og:title" content="Riwayat Transaksi - XML Topup" />
                <meta
                    property="og:description"
                    content="Pantau riwayat transaksi dan status pembayaran kamu di XML Topup."
                />
                <meta property="og:image" content="/logofix.png" />
            </Helmet>

            <div className="min-h-screen bg-[#0f172a] text-white py-10 px-4">

                <div className="max-w-6xl mx-auto">

                    <div className="mb-10">
                        <h1 className="text-2xl md:text-3xl font-bold">
                            Riwayat Transaksi
                        </h1>
                        <div className="w-16 h-1 bg-blue-500 mt-3 rounded-full" />
                    </div>

                    {/* ================= DESKTOP TABLE ================= */}
                    <div className="hidden md:block bg-[#1e2a3f] border border-blue-500/20 rounded-2xl overflow-hidden">

                        <div className="bg-gradient-to-r from-blue-600 to-blue-500">
                            <div className="grid grid-cols-7 text-sm font-semibold text-white">
                                <div className="px-6 py-4">NO</div>
                                <div className="px-6 py-4">TGL</div>
                                <div className="px-6 py-4">NO TRX</div>
                                <div className="px-6 py-4">PRODUK</div>
                                <div className="px-6 py-4 text-center">HARGA</div>
                                <div className="px-6 py-4 text-center">STATUS</div>
                                <div className="px-6 py-4 text-center">AKSI</div>
                            </div>
                        </div>

                        <div className="divide-y divide-[#24324a]">
                            {transactions.map((trx, index) => (
                                <div
                                    key={trx.id}
                                    className="grid grid-cols-7 items-center text-sm hover:bg-[#1f2937] transition"
                                >
                                    <div className="px-6 py-4">{index + 1}</div>

                                    <div className="px-6 py-4">
                                        {trx.createdAt
                                            ? new Date(trx.createdAt).toLocaleString("id-ID")
                                            : trx.date || "-"}
                                    </div>

                                    <div className="px-6 py-4 font-medium">
                                        {trx.id}
                                    </div>

                                    <div className="px-6 py-4">
                                        {trx.product?.name || "Top Up Saldo"}
                                    </div>

                                    <div className="px-6 py-4 text-center font-semibold">
                                        Rp {(trx.totalPrice || trx.amount || 0).toLocaleString("id-ID")}
                                    </div>

                                    <div className="px-6 py-4 text-center">
                                        <span className={`text-xs px-3 py-1 rounded-full font-semibold ${getStatusStyle(trx.status)}`}>
                                            {getStatusLabel(trx.status)}
                                        </span>
                                    </div>

                                    <div className="px-6 py-4 flex justify-center gap-2">
                                        <button
                                            onClick={() => setSelected(trx)}
                                            className="px-4 py-1 bg-green-600 hover:bg-green-700 text-xs rounded-lg"
                                        >
                                            Detail
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ================= MOBILE CARD ================= */}
                    <div className="md:hidden space-y-4">
                        {transactions.map((trx) => (
                            <div
                                key={trx.id}
                                className="bg-[#1f2937] p-5 rounded-2xl shadow-lg border border-blue-500/10"
                            >
                                <div className="flex justify-between items-start mb-3">
                                    <p className="text-xs text-gray-400">
                                        {trx.createdAt
                                            ? new Date(trx.createdAt).toLocaleDateString("id-ID")
                                            : trx.date || "-"}
                                    </p>

                                    <span className={`text-xs px-3 py-1 rounded-full font-semibold ${getStatusStyle(trx.status)}`}>
                                        {getStatusLabel(trx.status)}
                                    </span>
                                </div>

                                <h3 className="font-semibold text-sm">
                                    Top Up {trx.product?.name || "Saldo"}
                                </h3>

                                <p className="text-xs text-gray-400 mt-1">
                                    {trx.id}
                                </p>

                                <p className="text-blue-400 font-bold text-lg mt-3">
                                    Rp {(trx.totalPrice || trx.amount || 0).toLocaleString("id-ID")}
                                </p>

                                <div className="flex justify-end mt-4">
                                    <button
                                        onClick={() => setSelected(trx)}
                                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-xs rounded-lg"
                                    >
                                        Detail
                                    </button>

                                    {trx.status === "pending" && (
                                        <button
                                            onClick={() => navigate("/payment", { state: trx })}
                                            className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black text-xs rounded-lg ml-2"
                                        >
                                            Bayar
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ================= MODAL ================= */}
                {selected && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">

                        <div
                            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                            onClick={() => setSelected(null)}
                        />

                        <div className="relative bg-[#111827] w-[95%] max-w-xl rounded-2xl border border-blue-500/20 p-8 shadow-2xl">

                            <button
                                onClick={() => setSelected(null)}
                                className="absolute top-4 right-4 text-gray-400 hover:text-white"
                            >
                                ✕
                            </button>

                            <h2 className="text-lg font-semibold mb-6">
                                Detail Pesanan
                            </h2>

                            <div className="space-y-4 text-sm">

                                <DetailRow label="No. Transaksi" value={selected.id} />
                                <DetailRow
                                    label="Produk"
                                    value={selected.product?.name || "Top Up Saldo"}
                                />
                                <DetailRow
                                    label="Total"
                                    value={`Rp ${(selected.totalPrice || selected.amount || 0).toLocaleString("id-ID")}`}
                                />
                                <DetailRow
                                    label="Status"
                                    value={
                                        <span className={`text-xs px-3 py-1 rounded font-semibold ${getStatusStyle(selected.status)}`}>
                                            {getStatusLabel(selected.status)}
                                        </span>
                                    }
                                />
                            </div>

                            <div className="flex justify-end gap-3 mt-8">

                                <button
                                    onClick={() => navigate(`/invoice/${selected.id}`)}
                                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-sm rounded-lg"
                                >
                                    Print Invoice
                                </button>

                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

function DetailRow({ label, value }) {
    return (
        <div className="flex justify-between border-b border-[#24324a] pb-3">
            <span className="text-gray-400">{label}</span>
            <span className="font-medium text-right">{value}</span>
        </div>
    )
}