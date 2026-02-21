import { useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

export default function Payment() {
    const location = useLocation()
    const navigate = useNavigate()
    const trx = location.state

    const [transaction, setTransaction] = useState(trx)
    const [timeLeft, setTimeLeft] = useState(86400)

    useEffect(() => {
        if (!trx) {
            navigate("/")
        }
    }, [trx, navigate])

    useEffect(() => {
        if (!transaction || transaction.status !== "pending") return

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer)
                    updateStatus("failed")
                    return 0
                }
                return prev - 1
            })
        }, 1000)

        return () => clearInterval(timer)
    }, [transaction])

    if (!transaction) return null

    const updateStatus = (newStatus) => {
        const data =
            JSON.parse(localStorage.getItem("transactions")) || []

        const updated = data.map((t) =>
            t.id === transaction.id
                ? { ...t, status: newStatus }
                : t
        )

        localStorage.setItem("transactions", JSON.stringify(updated))

        setTransaction({ ...transaction, status: newStatus })
    }

    const handleConfirmPayment = () => {
        updateStatus("success")
    }

    const handleCancelPayment = () => {
        updateStatus("failed")
    }

    const handleRetry = () => {
        updateStatus("pending")
        setTimeLeft(86400)
    }

    const formatTime = () => {
        const hours = Math.floor(timeLeft / 3600)
        const minutes = Math.floor((timeLeft % 3600) / 60)
        const seconds = timeLeft % 60
        return `${hours}j ${minutes}m ${seconds}d`
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#08192d] via-[#0b223f] to-[#08192d] text-white flex items-center justify-center p-6">

            <div className="w-full max-w-3xl space-y-6">

                <h1 className="text-3xl font-bold text-center">
                    Pembayaran
                </h1>

                <div className="bg-[#0f2744] rounded-2xl p-8 border border-blue-500/20 shadow-2xl space-y-6">

                    {transaction.status === "pending" && (
                        <>
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-yellow-400 font-semibold text-lg">
                                        ⏳ Menunggu Pembayaran
                                    </p>
                                    <p className="text-sm text-gray-400 mt-1">
                                        Selesaikan sebelum waktu habis
                                    </p>
                                </div>

                                <div className="bg-yellow-500/10 text-yellow-400 px-4 py-2 rounded-lg text-sm border border-yellow-500/30">
                                    {formatTime()}
                                </div>
                            </div>

                            <div className="border-t border-blue-500/20 pt-6 space-y-4 text-sm">

                                <DetailRow label="No. Transaksi" value={transaction.id} />
                                <DetailRow label="Metode Pembayaran" value={transaction.selectedPayment} />
                                <DetailRow label="Produk" value={`Top Up ${transaction.product.name}`} />

                                <DetailRow
                                    label="Total Pembayaran"
                                    value={
                                        <span className="text-2xl font-bold text-blue-400">
                                            Rp {transaction.totalPrice.toLocaleString()}
                                        </span>
                                    }
                                />
                            </div>

                            <div className="pt-6 space-y-3">
                                <button
                                    onClick={handleConfirmPayment}
                                    className="w-full h-12 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 hover:scale-[1.02] transition"
                                >
                                    Saya Sudah Bayar
                                </button>

                                <button
                                    onClick={handleCancelPayment}
                                    className="w-full h-12 rounded-xl bg-red-600 hover:bg-red-700 transition"
                                >
                                    Batalkan Pembayaran
                                </button>
                            </div>
                        </>
                    )}

                    {transaction.status === "success" && (
                        <div className="text-center space-y-6">

                            <div className="text-6xl animate-bounce">✅</div>

                            <div>
                                <h2 className="text-2xl font-bold text-green-400">
                                    Pembayaran Berhasil
                                </h2>
                                <p className="text-gray-400 mt-2 text-sm">
                                    Pesanan sedang diproses otomatis.
                                </p>
                            </div>

                            <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 text-sm">
                                No Transaksi: <span className="font-semibold">{transaction.id}</span>
                            </div>
                        </div>
                    )}

                    {transaction.status === "failed" && (
                        <div className="text-center space-y-6">

                            <div className="text-6xl">❌</div>

                            <div>
                                <h2 className="text-2xl font-bold text-red-400">
                                    Pembayaran Gagal
                                </h2>
                                <p className="text-gray-400 mt-2 text-sm">
                                    Waktu habis atau transaksi dibatalkan.
                                </p>
                            </div>

                            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-sm">
                                No Transaksi: <span className="font-semibold">{transaction.id}</span>
                            </div>

                            <button
                                onClick={handleRetry}
                                className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 transition"
                            >
                                Coba Bayar Lagi
                            </button>
                        </div>
                    )}
                </div>

                <div className="flex justify-center">
                    <button
                        onClick={() => navigate("/riwayat")}
                        className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition hover:scale-105"
                    >
                        Lihat Riwayat
                    </button>
                </div>

            </div>
        </div>
    )
}

function DetailRow({ label, value }) {
    return (
        <div className="flex justify-between border-b border-blue-500/10 pb-3">
            <span className="text-gray-400">{label}</span>
            <span className="font-medium text-right">{value}</span>
        </div>
    )
}