import { useState, useEffect } from "react"
import { useAuth } from "../../context/AuthContext"
import { handlePrintInvoiceSaldo } from "../../data/invoicesaldo"

// IMPORT LOGO
import bca from "../../assets/img/BCAA.png"
import bri from "../../assets/img/BRII.png"
import mandiri from "../../assets/img/MANDIRII.png"
import bsi from "../../assets/img/BSII.png"
import ovo from "../../assets/img/OVOOO.png"
import dana from "../../assets/img/DANAA.png"
import gopay from "../../assets/img/GOPAAY.png"
import shopeepay from "../../assets/img/shopeepay.png"
import linkaja from "../../assets/img/linkajaa.png"
import bcava from "../../assets/img/BCAA.png"
import briva from "../../assets/img/BRII.png"
import bsiva from "../../assets/img/BSII.png"
import alfamart from "../../assets/img/ALPA.png"
import indomaret from "../../assets/img/INDO.png"
import alfamidi from "../../assets/img/MIDI.png"
import qris from "../../assets/img/qris.png"

export default function Saldo() {

    const { user, setUser } = useAuth()
    const [showModal, setShowModal] = useState(false)
    const [amount, setAmount] = useState("0")
    const [openMethod, setOpenMethod] = useState(null)
    const [selectedPayment, setSelectedPayment] = useState(null)
    const [transactionList, setTransactionList] = useState([])

    const handleTopUp = () => {

        if (!selectedPayment) {
            alert("Pilih metode pembayaran dulu")
            return
        }

        const newSaldo = (user.saldo || 0) + Number(amount)

        const users = JSON.parse(localStorage.getItem("xml_users")) || []

        const updatedUsers = users.map(u =>
            u.username === user.username
                ? { ...u, saldo: newSaldo }
                : u
        )

        localStorage.setItem("xml_users", JSON.stringify(updatedUsers))

        const transactions = JSON.parse(localStorage.getItem("xml_transactions")) || []

        const newTransaction = {
            id: Date.now(),
            username: user.username,
            date: new Date().toLocaleString(),
            amount: Number(amount),
            method: selectedPayment,
            status: "Berhasil"
        }

        localStorage.setItem(
            "xml_transactions",
            JSON.stringify([newTransaction, ...transactions])
        )

        setUser({ ...user, saldo: newSaldo })

        setShowModal(false)
        alert("Top up berhasil")
    }

    useEffect(() => {
        const allTransactions =
            JSON.parse(localStorage.getItem("xml_transactions")) || []

        const myTransactions = allTransactions.filter(
            (trx) => trx.username === user?.username
        )

        setTransactionList(myTransactions)
    }, [user])

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">

            <h2 className="text-xl sm:text-2xl font-semibold mb-6 border-b border-blue-600 inline-block pb-2">
                Saldo Saya
            </h2>

            {/* CARD */}
            <div className="bg-[#0f1f3d] border border-blue-500/20 rounded-2xl shadow-[0_0_40px_rgba(37,99,235,0.05)] p-5 sm:p-8">

                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
                    <div className="text-lg sm:text-xl font-semibold">
                        Rp {user?.saldo?.toLocaleString("id-ID") || 0}
                    </div>

                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-medium transition w-full sm:w-auto"
                    >
                        + Top Up Saldo
                    </button>
                </div>

                {/* ================= DESKTOP TABLE ================= */}
                <div className="hidden sm:block rounded-2xl border border-blue-500/20 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">

                            <thead className="bg-gradient-to-r from-blue-600/90 to-blue-500/90 text-white">
                                <tr>
                                    <th className="px-4 py-3 text-left">No</th>
                                    <th className="px-4 py-3 text-left">Tgl Transaksi</th>
                                    <th className="px-4 py-3 text-left">No. Transaksi</th>
                                    <th className="px-4 py-3 text-left">Jumlah</th>
                                    <th className="px-4 py-3 text-left">Note</th>
                                    <th className="px-4 py-3 text-left">Status</th>
                                    <th className="px-4 py-3 text-left">Aksi</th>
                                </tr>
                            </thead>

                            <tbody className="bg-[#1e2f4f] text-gray-200">
                                {transactionList.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="px-4 py-6 text-center text-gray-400">
                                            Belum ada transaksi
                                        </td>
                                    </tr>
                                ) : (
                                    transactionList.map((trx, index) => (
                                        <tr
                                            key={trx.id}
                                            className="border-t border-blue-500/10 hover:bg-[#22365a] transition"
                                        >
                                            <td className="px-4 py-3">{index + 1}</td>
                                            <td className="px-4 py-3">{trx.date}</td>
                                            <td className="px-4 py-3">{trx.id}</td>
                                            <td className="px-4 py-3">
                                                Rp {trx.amount.toLocaleString("id-ID")}
                                            </td>
                                            <td className="px-4 py-3">{trx.method}</td>
                                            <td className="px-4 py-3">
                                                <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs">
                                                    {trx.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <button
                                                    onClick={() => handlePrintInvoiceSaldo(trx)}
                                                    className="text-blue-400 hover:underline text-xs"
                                                >
                                                    Cetak
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>


                {/* ================= MOBILE CARD VERSION ================= */}
                <div className="sm:hidden space-y-5 px-1">
                    {transactionList.length === 0 ? (
                        <div className="bg-[#1e2f4f] p-6 rounded-2xl text-center text-gray-400">
                            Belum ada transaksi
                        </div>
                    ) : (
                        transactionList.map((trx) => (
                            <div
                                key={trx.id}
                                className="bg-[#1e2f4f] p-5 rounded-2xl border border-blue-500/20 shadow-lg"
                            >
                                <div className="flex justify-between mb-3">
                                    <span className="text-sm text-gray-400">Tanggal</span>
                                    <span className="text-sm">{trx.date}</span>
                                </div>

                                <div className="flex justify-between mb-3">
                                    <span className="text-sm text-gray-400">Transaksi</span>
                                    <span className="text-sm">{trx.id}</span>
                                </div>

                                <div className="flex justify-between mb-4">
                                    <span className="text-sm text-gray-400">Metode</span>
                                    <span className="text-sm">{trx.method}</span>
                                </div>

                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-base font-semibold">
                                        Rp {trx.amount.toLocaleString("id-ID")}
                                    </span>

                                    <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs">
                                        {trx.status}
                                    </span>
                                </div>

                                <button
                                    onClick={() => handlePrintInvoiceSaldo(trx)}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-sm py-2.5 rounded-lg"
                                >
                                    Cetak Invoice
                                </button>
                            </div>
                        ))
                    )}
                </div>

            </div>

            {/* MODAL */}
            {showModal && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">

                    <div className="bg-[#0f1f3d] w-full max-w-lg rounded-2xl shadow-2xl p-5 sm:p-6 relative max-h-[90vh] overflow-y-auto">

                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white"
                        >
                            ✕
                        </button>

                        <h3 className="text-lg font-semibold mb-6">
                            Formulir Top Up Saldo
                        </h3>

                        <div className="space-y-6">

                            <div>
                                <label className="text-sm text-gray-300">
                                    Nominal Top Up
                                </label>
                                <input
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="w-full mt-2 px-4 py-3 rounded-lg bg-white/10 border border-white/10 text-white"
                                />
                            </div>

                            <div>

                                <label className="text-sm text-gray-300 block mb-3">
                                    Metode Pembayaran
                                </label>

                                <div className="bg-[#1a2b4a] rounded-xl border border-blue-500/20 overflow-hidden">

                                    <button
                                        type="button"
                                        onClick={() => setOpenMethod(openMethod === "bank" ? null : "bank")}
                                        className="w-full px-4 py-3 bg-[#1a2b4a] text-sm font-medium flex justify-between items-center"
                                    >
                                        <span> Bank Transfer</span>
                                        <span className={`transition ${openMethod === "bank" ? "rotate-180" : ""}`}>▾</span>
                                    </button>

                                    <div
                                        className={`grid transition-all duration-300 ${openMethod === "bank"
                                            ? "grid-rows-[1fr] opacity-100"
                                            : "grid-rows-[0fr] opacity-0"
                                            }`}
                                    >
                                        <div className="overflow-hidden">
                                            <div className="p-4 grid grid-cols-2 gap-4">
                                                {[
                                                    { name: "BCA", img: bca },
                                                    { name: "BRI", img: bri },
                                                    { name: "BSI", img: bsi },
                                                    { name: "MANDIRI", img: mandiri },
                                                ].map((item) => (

                                                    <div
                                                        key={item.name}
                                                        onClick={() => setSelectedPayment(item.name)}
                                                        className={`bg-[#0f1f3d] border rounded-xl p-4 transition cursor-pointer
                                                ${selectedPayment === item.name
                                                                ? "border-blue-500 shadow-lg shadow-blue-500/20"
                                                                : "border-blue-500/30 hover:border-blue-400"
                                                            }`}
                                                    >
                                                        <img
                                                            src={item.img}
                                                            className="h-8 mb-3"
                                                            alt={item.name}
                                                        />

                                                        <div className="text-sm font-semibold">
                                                            {item.name}
                                                        </div>

                                                        <div className="text-xs text-gray-400">
                                                            Dikonfirmasi Otomatis & Manual
                                                        </div>
                                                    </div>

                                                ))}

                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 bg-[#1a2b4a] rounded-xl border border-blue-500/20 overflow-hidden">

                                    <button
                                        type="button"
                                        onClick={() => setOpenMethod(openMethod === "va" ? null : "va")}
                                        className="w-full px-4 py-3 text-sm font-medium flex justify-between items-center"
                                    >
                                        <span> Virtual Account</span>
                                        <span className={`transition ${openMethod === "va" ? "rotate-180" : ""}`}>▾</span>
                                    </button>

                                    <div
                                        className={`grid transition-all duration-300 ${openMethod === "va"
                                            ? "grid-rows-[1fr] opacity-100"
                                            : "grid-rows-[0fr] opacity-0"
                                            }`}
                                    >
                                        <div className="overflow-hidden">
                                            <div className="p-4 grid grid-cols-2 gap-4">
                                                {[
                                                    { name: "BRIVA", img: briva },
                                                    { name: "BCAVA", img: bcava },
                                                    { name: "BSIVA", img: bsiva },
                                                    // { name: "Permata", img: permataIcon },
                                                ].map((item) => (
                                                    <div
                                                        key={item.name}
                                                        onClick={() => setSelectedPayment(item.name)}
                                                        className={`bg-[#0f1f3d] border rounded-xl p-4 transition cursor-pointer
                                                ${selectedPayment === item.name
                                                                ? "border-blue-500 shadow-lg shadow-blue-500/20"
                                                                : "border-blue-500/30 hover:border-blue-400"
                                                            }`}
                                                    >
                                                        <img src={item.img} className="h-8 mb-3" />
                                                        <div className="text-sm font-semibold">{item.name}</div>
                                                        <div className="text-xs text-gray-400">
                                                            Virtual Account
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 bg-[#1a2b4a] rounded-xl border border-blue-500/20 overflow-hidden">

                                    <button
                                        type="button"
                                        onClick={() => setOpenMethod(openMethod === "store" ? null : "store")}
                                        className="w-full px-4 py-3 text-sm font-medium flex justify-between items-center"
                                    >
                                        <span> Convenience Store</span>
                                        <span className={`transition ${openMethod === "store" ? "rotate-180" : ""}`}>▾</span>
                                    </button>

                                    <div
                                        className={`grid transition-all duration-300 ${openMethod === "store"
                                            ? "grid-rows-[1fr] opacity-100"
                                            : "grid-rows-[0fr] opacity-0"
                                            }`}
                                    >
                                        <div className="overflow-hidden">
                                            <div className="p-4 grid grid-cols-2 gap-4">
                                                {[
                                                    { name: "Alfamart", img: alfamart },
                                                    { name: "Indomaret", img: indomaret },
                                                    { name: "Alfamidi", img: alfamidi },
                                                ].map((item) => (
                                                    <div
                                                        key={item.name}
                                                        onClick={() => setSelectedPayment(item.name)}
                                                        className={`bg-[#0f1f3d] border rounded-xl p-4 transition cursor-pointer
                                                ${selectedPayment === item.name
                                                                ? "border-blue-500 shadow-lg shadow-blue-500/20"
                                                                : "border-blue-500/30 hover:border-blue-400"
                                                            }`}
                                                    >
                                                        <img src={item.img} className="h-8 mb-3" />
                                                        <div className="text-sm font-semibold">{item.name}</div>
                                                        <div className="text-xs text-gray-400">
                                                            Bayar di Gerai
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 bg-[#1a2b4a] rounded-xl border border-blue-500/20 overflow-hidden">

                                    <button
                                        type="button"
                                        onClick={() => setOpenMethod(openMethod === "ewallet" ? null : "ewallet")}
                                        className="w-full px-4 py-3 text-sm font-medium flex justify-between items-center"
                                    >
                                        <span> E-Wallet</span>
                                        <span className={`transition ${openMethod === "ewallet" ? "rotate-180" : ""}`}>▾</span>
                                    </button>

                                    <div
                                        className={`grid transition-all duration-300 ${openMethod === "ewallet"
                                            ? "grid-rows-[1fr] opacity-100"
                                            : "grid-rows-[0fr] opacity-0"
                                            }`}
                                    >
                                        <div className="overflow-hidden">
                                            <div className="p-4 grid grid-cols-2 gap-4">
                                                {[
                                                    { name: "ShopeePay", img: shopeepay },
                                                    { name: "LinkAja", img: linkaja },
                                                    { name: "Dana", img: dana },
                                                    { name: "OVO", img: ovo },
                                                    { name: "Gopay", img: gopay },
                                                ].map((item) => (
                                                    <div
                                                        key={item.name}
                                                        onClick={() => setSelectedPayment(item.name)}
                                                        className={`bg-[#0f1f3d] border rounded-xl p-4 transition cursor-pointer
                                                ${selectedPayment === item.name
                                                                ? "border-blue-500 shadow-lg shadow-blue-500/20"
                                                                : "border-blue-500/30 hover:border-blue-400"
                                                            }`}
                                                    >
                                                        <img src={item.img} className="h-8 mb-3" />
                                                        <div className="text-sm font-semibold">{item.name}</div>
                                                        <div className="text-xs text-gray-400">
                                                            E-Wallet
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 bg-[#1a2b4a] rounded-xl border border-blue-500/20 overflow-hidden">

                                    <button
                                        type="button"
                                        onClick={() => setOpenMethod(openMethod === "qris" ? null : "qris")}
                                        className="w-full px-4 py-3 text-sm font-medium flex justify-between items-center"
                                    >
                                        <span>QRIS</span>
                                        <span className={`transition ${openMethod === "qris" ? "rotate-180" : ""}`}>▾</span>
                                    </button>

                                    <div
                                        className={`grid transition-all duration-300 ${openMethod === "qris"
                                            ? "grid-rows-[1fr] opacity-100"
                                            : "grid-rows-[0fr] opacity-0"
                                            }`}
                                    >
                                        <div className="overflow-hidden">
                                            <div className="p-4 grid grid-cols-2 gap-4">
                                                {[
                                                    { name: "QRIS", img: qris },
                                                ].map((item) => (
                                                    <div
                                                        key={item.name}
                                                        onClick={() => setSelectedPayment(item.name)}
                                                        className={`bg-[#0f1f3d] border rounded-xl p-4 transition cursor-pointer
                                                ${selectedPayment === item.name
                                                                ? "border-blue-500 shadow-lg shadow-blue-500/20"
                                                                : "border-blue-500/30 hover:border-blue-400"
                                                            }`}
                                                    >
                                                        <img src={item.img} className="h-8 mb-3" />
                                                        <div className="text-sm font-semibold">{item.name}</div>
                                                        <div className="text-xs text-gray-400">
                                                            QRIS
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            {/* Tombol */}
                            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg text-sm w-full sm:w-auto"
                                >
                                    Batal
                                </button>

                                <button
                                    onClick={handleTopUp}
                                    className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg text-sm w-full sm:w-auto"
                                >
                                    Top Up
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}