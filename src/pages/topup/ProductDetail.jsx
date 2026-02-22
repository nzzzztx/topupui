import { useParams, Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { products } from "../../data/product"
import { Helmet } from "react-helmet";

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

export default function ProductDetail() {
    const { slug } = useParams()
    const product = products.find((p) => p.slug === slug)
    const [showHelp, setShowHelp] = useState(false)
    const navigate = useNavigate()
    const [formData, setFormData] = useState({})

    const [selectedItems, setSelectedItems] = useState([])
    const [paymentCategory, setPaymentCategory] = useState("bank")
    const [selectedPayment, setSelectedPayment] = useState(null)
    const [showConfirm, setShowConfirm] = useState(false)

    const user = JSON.parse(localStorage.getItem("xml_user"))
    const handleBuy = () => {
        if (!isFormComplete) return
        setShowConfirm(true)
    }

    useEffect(() => {
        setFormData({})
        setSelectedItems([])
        setSelectedPayment(null)
    }, [slug])

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center text-white">
                Produk tidak ditemukan
            </div>
        );
    }

    const payments = {
        bank: [
            { name: "BCA", logo: bca },
            { name: "BRI", logo: bri },
            { name: "MANDIRI", logo: mandiri },
            { name: "BSI", logo: bsi },
        ],
        ewallet: [
            { name: "OVO", logo: ovo },
            { name: "DANA", logo: dana },
            { name: "GOPAY", logo: gopay },
            { name: "SHOPEEPAY", logo: shopeepay },
            { name: "LINKAJA", logo: linkaja },
        ],
        va: [
            { name: "BCA VA", logo: bcava },
            { name: "BRI VA", logo: briva },
            { name: "BSI VA", logo: bsiva },
        ],
        store: [
            { name: "ALFAMART", logo: alfamart },
            { name: "INDOMARET", logo: indomaret },
            { name: "ALFAMIDI", logo: alfamidi },
        ],
        qris: [
            { name: "QRIS", logo: qris },
        ],
    }

    function getFullName(name) {
        const map = {
            BCA: "Bank Central Asia (BCA)",
            BRI: "Bank Rakyat Indonesia (BRI)",
            MANDIRI: "Bank Mandiri",
            BSI: "Bank Syariah Indonesia",
            OVO: "OVO (E-Wallet)",
            DANA: "DANA (E-Wallet)",
            GOPAY: "GOPAY (E-Wallet)",
            SHOPEEPAY: "ShopeePay (E-Wallet)",
            LINKAJA: "LinkAja (E-Wallet)",
            "BCA VA": "BCA Virtual Account",
            "BRI VA": "BRI Virtual Account",
            "BSI VA": "BSI Virtual Account",
            ALFAMART: "Alfamart",
            INDOMARET: "Indomaret",
            QRIS: "QRIS",
        }

        return map[name] || name
    }

    useEffect(() => {
        if (showHelp) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "auto"
        }

        const handleEsc = (e) => {
            if (e.key === "Escape") setShowHelp(false)
        }

        window.addEventListener("keydown", handleEsc)
        return () => window.removeEventListener("keydown", handleEsc)
    }, [showHelp])

    const isFormComplete =
        selectedItems.length > 0 &&
        selectedPayment &&
        (!product.fields ||
            product.fields.every((f) => formData[f.name]))

    const totalPrice = selectedItems.reduce(
        (acc, item) => acc + item.price,
        0
    )

    return (
        <>
            <Helmet>
                <title>Top Up {product.name} Murah - XML Topup</title>
                <meta
                    name="description"
                    content={`Top up ${product.name} murah, cepat dan terpercaya hanya di XML Topup. Proses instan 24 jam.`}
                />
                <meta property="og:title" content={`Top Up ${product.name} - XML Topup`} />
                <meta
                    property="og:description"
                    content={`Top up ${product.name} murah dan instan hanya di XML Topup.`}
                />
                <meta property="og:image" content={product.banner || "/logofix.png"} />
            </Helmet>

            <div className="
        min-h-screen text-white
        bg-gradient-to-b
        from-[#08192d]
        via-[#0b223f]
        to-[#08192d]
        ">
                <div className="max-w-6xl mx-auto px-6 py-16 grid lg:grid-cols-3 gap-10">

                    <div>
                        <div className="bg-[#0f2744] border border-blue-400/10 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-md">

                            <div className="relative overflow-hidden group">
                                <img
                                    src={product.banner}
                                    className="w-full h-72 object-cover 
                                    transition duration-700 ease-out
                                    group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t 
                                    from-[#0f2744] via-transparent to-transparent" />
                            </div>

                            <div className="p-6 space-y-5">

                                <h2 className="text-xl font-semibold leading-tight">
                                    Top Up Produk {product.name}
                                </h2>
                                <div className="flex flex-wrap gap-2">
                                    <span className="px-3 py-1 text-xs rounded-full bg-blue-600/20 text-blue-300 border border-blue-500/30">
                                        🚀 Proses Instan
                                    </span>

                                    <span className="px-3 py-1 text-xs rounded-full bg-green-600/20 text-green-300 border border-green-500/30">
                                        🟢 Layanan Aktif 24 Jam
                                    </span>
                                </div>
                                <div className="text-sm text-gray-300 leading-relaxed space-y-5">

                                    <p>
                                        Jika belum jelas silakan ikuti catatan pada{" "}
                                        <button
                                            type="button"
                                            onClick={() => setShowHelp(true)}
                                            className="text-green-400 font-medium hover:text-green-300 transition"
                                        >
                                            Tombol Bantuan
                                        </button>{" "}
                                        / form input di poin 1. Saat memasukan tujuan, pastikan tujuan valid untuk{" "}
                                        <button
                                            type="button"
                                            onClick={() =>
                                                navigate(`/?search=${encodeURIComponent(product.name)}`)
                                            }
                                            className="text-blue-400 font-medium hover:text-blue-300 transition"
                                        >
                                            Produk {product.name}
                                        </button>.
                                        Setelah itu pilih metode pembayaran, lalu pilih produk & layanan,
                                        dan lakukan pembayaran, pesanan akan diproses otomatis.
                                    </p>

                                    <p>
                                        Untuk harga {product.name} yang lebih murah gunakan saldo,
                                        silakan daftar akun {" "}
                                        <button
                                            type="button"
                                            onClick={() => navigate("/member")}
                                            className="text-purple-400 font-medium hover:text-purple-300 transition"
                                        >
                                            XMLTopup
                                        </button>.
                                        Kamu juga dapat menggunakan e-wallet, bank transfer, dan convenience store.
                                        XMLTopup adalah panel pembayaran top up dan pembelian game
                                        termurah dengan proses instan dan online 24 jam.
                                    </p>

                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-2 space-y-12">

                        <Section number="1" title="Masukkan Tujuan">

                            <div className="grid md:grid-cols-2 gap-4">
                                {product.fields?.map((field) => {
                                    if (field.type === "select") {
                                        return (
                                            <select
                                                key={field.name}
                                                value={formData[field.name] || ""}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, [field.name]: e.target.value })
                                                }
                                                className="w-full bg-[#0b1e36] border border-blue-500/10 p-3 rounded-lg focus:outline-none focus:border-blue-500 transition"
                                            >
                                                <option value="">{field.label}</option>
                                                {field.options.map((opt) => (
                                                    <option key={opt} value={opt}>
                                                        {opt}
                                                    </option>
                                                ))}
                                            </select>
                                        )
                                    }

                                    return (
                                        <Input
                                            key={field.name}
                                            value={formData[field.name] || ""}
                                            onChange={(e) =>
                                                setFormData({ ...formData, [field.name]: e.target.value })
                                            }
                                            placeholder={field.placeholder || field.label}
                                        />
                                    )
                                })}
                            </div>

                            <button
                                onClick={() => setShowHelp(true)}
                                className="
                        mt-4 inline-flex items-center gap-2 px-4 py-2 text-xs rounded-lg 
                        bg-gradient-to-r from-green-600 to-emerald-600
                        transition-all duration-300
                        hover:scale-105 hover:shadow-lg
                        active:scale-95
                    "
                            >
                                <span className="text-sm">ℹ</span>
                                Bantuan
                            </button>

                            {showHelp && (
                                <div className="fixed inset-0 z-50 flex items-center justify-center">

                                    <div
                                        onClick={() => setShowHelp(false)}
                                        className="absolute inset-0 bg-black/70 backdrop-blur-md transition-opacity"
                                    />

                                    <div className="relative w-[92%] max-w-xl rounded-2xl p-[1px] 
                                    bg-gradient-to-br from-blue-500/40 to-purple-500/30 
                                    shadow-[0_0_40px_rgba(59,130,246,0.3)] animate-modalIn">

                                        <div className="relative bg-[#0b1e36]/95 backdrop-blur-xl 
                                        rounded-2xl p-8">

                                            <button
                                                onClick={() => setShowHelp(false)}
                                                className="absolute top-4 right-4 text-gray-400 hover:text-white transition text-lg"
                                            >
                                                ✕
                                            </button>

                                            <h3 className="text-lg font-semibold mb-6">
                                                Panduan Top Up {product.name}
                                            </h3>

                                            <ol className="space-y-3 text-sm text-gray-300 leading-relaxed">
                                                <li>1. Masukkan User ID</li>
                                                <li>2. Masukkan Zone ID</li>
                                                <li>3. Pilih Produk Sesuai Harga</li>
                                                <li>4. Pilih Metode Pembayaran</li>
                                                <li>5. Masukkan Email (Opsional)</li>
                                                <li>6. Klik Submit Pesanan</li>
                                                <li>7. Selesaikan Pembayaran</li>
                                                <li>8. Tunggu Proses 1–2 Menit</li>
                                            </ol>

                                        </div>
                                    </div>
                                </div>
                            )}
                        </Section>

                        <Section number="2" title="Pilih Produk">
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {product.denominations.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => {
                                            setSelectedItems((prev) => {
                                                const exists = prev.find((i) => i.id === item.id)

                                                if (exists) {
                                                    return prev.filter((i) => i.id !== item.id)
                                                }

                                                return [...prev, item]
                                            })
                                        }}
                                        className={`
                                        p-4 rounded-xl border text-left
                                        transition-all duration-300 ease-out
                                        hover:-translate-y-1 hover:shadow-xl
                                        active:scale-95
                                        ${selectedItems.find(i => i.id === item.id)
                                                ? "border-blue-500 bg-blue-500/20 scale-[1.03] shadow-lg"
                                                : "border-blue-500/10 hover:border-blue-400 hover:bg-blue-500/5"}
                                    `}
                                    >
                                        <p className="font-medium">{item.name}</p>
                                        <p className="text-xs text-gray-400 mt-2">
                                            Rp {item.price.toLocaleString()}
                                        </p>
                                    </button>

                                ))}
                            </div>
                        </Section>

                        <Section number="4" title="Metode Pembayaran">
                            <div className="flex flex-wrap gap-3 mb-6 text-xs">
                                {Object.keys(payments).map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setPaymentCategory(cat)}
                                        className={`px-4 py-2 rounded-lg border transition
                                    ${paymentCategory === cat
                                                ? "border-blue-500 bg-blue-500/20"
                                                : "border-blue-500/10 hover:border-blue-400"
                                            }`}
                                    >
                                        {cat.toUpperCase()}
                                    </button>
                                ))}
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">

                                {payments[paymentCategory].map((item) => (
                                    <button
                                        key={item.name}
                                        onClick={() => setSelectedPayment(item.name)}
                                        className={`
                                        text-left p-5 rounded-xl border
                                        transition-all duration-300 ease-out
                                        hover:-translate-y-1 hover:shadow-xl
                                        active:scale-95
                                        ${selectedPayment === item.name
                                                ? "border-blue-500 bg-blue-500/20 scale-[1.02] shadow-lg"
                                                : "border-blue-500/10 hover:border-blue-400 hover:bg-blue-500/5"}
                                        `}
                                    >
                                        <div className="flex items-center justify-between">
                                            <img
                                                src={item.logo}
                                                alt={item.name}
                                                className="h-10 object-contain bg-white px-3 py-1 rounded-md"
                                            />
                                        </div>

                                        <div className="border-t border-blue-500/20 my-4"></div>

                                        <p className="font-semibold text-sm tracking-wide">
                                            {getFullName(item.name)}
                                        </p>

                                        <p className="text-xs text-gray-400 mt-1">
                                            Dikonfirmasi Otomatis & Manual
                                        </p>
                                    </button>
                                ))}

                            </div>
                        </Section>

                        <Section number="5" title="Konfirmasi Pesanan">

                            <div className="space-y-4">

                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-gray-200">
                                        Masukkan Alamat Email Aktif
                                    </p>

                                    <p className="text-xs text-gray-400">
                                        Untuk menerima notifikasi pesananmu
                                    </p>

                                    <input
                                        type="email"
                                        placeholder="emailkamu@gmail.com"
                                        className="w-full bg-[#0b1e36] border border-blue-500/10
                                    px-3 py-2.5 rounded-lg text-sm
                                    focus:outline-none focus:border-blue-500
                                    transition"
                                    />

                                    {selectedItems.length > 0 && (
                                        <div className="bg-[#0f2744] border border-blue-500/20 rounded-xl p-4 mt-6 space-y-3">

                                            <h3 className="text-sm font-semibold text-blue-400">
                                                📦 Ringkasan Pesanan
                                            </h3>

                                            <div className="space-y-2 text-sm">
                                                {selectedItems.map((item) => (
                                                    <div
                                                        key={item.id}
                                                        className="flex justify-between text-gray-300"
                                                    >
                                                        <span>{item.name}</span>
                                                        <span>Rp {item.price.toLocaleString()}</span>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="border-t border-blue-500/20 pt-3 flex justify-between font-semibold text-white">
                                                <span>Total</span>
                                                <span>Rp {totalPrice.toLocaleString()}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <p className="text-xs text-gray-400">
                                    Dengan melakukan order, kamu menyetujui{" "}
                                    <Link
                                        to="/syarat-ketentuan"
                                        className="text-blue-400 hover:underline"
                                    >
                                        Syarat & Ketentuan
                                    </Link>.
                                </p>

                                <div className="flex justify-end pt-1">
                                    <button
                                        onClick={handleBuy}
                                        disabled={!isFormComplete}
                                        className="
                                    px-5 py-2.5 rounded-lg text-sm font-medium
                                    bg-blue-600 hover:bg-blue-700
                                    transition-all duration-300
                                    hover:scale-105 hover:shadow-lg
                                    active:scale-95
                                    disabled:opacity-40 disabled:cursor-not-allowed
                                "
                                    >
                                        Beli Sekarang
                                    </button>
                                </div>
                            </div>

                        </Section>

                    </div>
                </div>
                {showConfirm && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">

                        {/* Overlay */}
                        <div
                            onClick={() => setShowConfirm(false)}
                            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                        />

                        {/* Modal */}
                        <div className="relative w-[92%] max-w-lg bg-[#0b1e36] rounded-xl shadow-2xl border border-blue-500/20 p-6 animate-fadeIn">

                            {/* Header */}
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-semibold text-white">
                                    Data Pesanan
                                </h3>
                                <button
                                    onClick={() => setShowConfirm(false)}
                                    className="text-gray-400 hover:text-white"
                                >
                                    ✕
                                </button>
                            </div>

                            {/* Content */}
                            <div className="space-y-3 text-sm text-gray-300">

                                <div className="flex justify-between">
                                    <span>Kategori Layanan:</span>
                                    <span>{paymentCategory.toUpperCase()}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span>Produk / Layanan:</span>
                                    <span>{selectedItems.map(i => i.name).join(", ")}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span>Data Tujuan:</span>
                                    <span>
                                        {product.fields?.map(f => formData[f.name]).join(" - ")}
                                    </span>
                                </div>

                                <div className="flex justify-between">
                                    <span>Kode Voucher:</span>
                                    <span>Tanpa Kode Voucher</span>
                                </div>

                                <div className="flex justify-between">
                                    <span>Diskon:</span>
                                    <span>Tidak Ada</span>
                                </div>

                                <div className="flex justify-between">
                                    <span>Metode Pembayaran:</span>
                                    <span>{selectedPayment}</span>
                                </div>

                                <div className="border-t border-blue-500/20 pt-3 flex justify-between font-semibold text-white">
                                    <span>Total Pembayaran:</span>
                                    <span>Rp {totalPrice.toLocaleString()}</span>
                                </div>

                                <p className="text-xs text-gray-400 pt-3">
                                    Pastikan data transaksi sudah benar. Kesalahan input data bukan tanggung jawab kami.
                                </p>
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-end gap-3 mt-6">
                                <button
                                    onClick={() => setShowConfirm(false)}
                                    className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-sm transition"
                                >
                                    Batal
                                </button>

                                <button
                                    onClick={() => {

                                        const user = JSON.parse(localStorage.getItem("xml_user"))

                                        const transaction = {
                                            id: "TRX-" + Date.now(),
                                            product,
                                            selectedItems,
                                            formData,
                                            selectedPayment,
                                            totalPrice,
                                            status: "pending",
                                            createdAt: new Date().toISOString(),
                                            userId: user?.id || null
                                        }

                                        //  login
                                        if (user) {
                                            const oldData =
                                                JSON.parse(localStorage.getItem("xml_transactions")) || []

                                            localStorage.setItem(
                                                "xml_transactions",
                                                JSON.stringify([transaction, ...oldData])
                                            )
                                        }

                                        //  guest
                                        else {
                                            const oldGuest =
                                                JSON.parse(localStorage.getItem("guest_transactions")) || []

                                            localStorage.setItem(
                                                "guest_transactions",
                                                JSON.stringify([transaction, ...oldGuest])
                                            )
                                        }

                                        setShowConfirm(false)

                                        navigate("/payment", {
                                            state: transaction
                                        })
                                    }}
                                    className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-sm transition"
                                >
                                    Lanjut ke Pembayaran
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}


function Section({ number, title, children }) {
    return (
        <div className="bg-[#112b4a] border border-blue-500/10 
                    rounded-2xl p-8 shadow-lg
                    transition-all duration-500
                    hover:shadow-[0_0_25px_rgba(59,130,246,0.15)]
                    animate-fadeIn">

            <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-8 flex items-center justify-center 
                        rounded-full bg-blue-600 text-sm font-bold
                        transition duration-300 hover:scale-110">
                    {number}
                </div>

                <h2 className="text-lg font-semibold tracking-wide">
                    {title}
                </h2>
            </div>

            {children}
        </div>
    )
}

function Input({ ...props }) {
    return (
        <input
            {...props}
            className="w-full bg-[#0b1e36] border border-blue-500/10 p-3 rounded-lg focus:outline-none focus:border-blue-500 transition"
        />
    )
}
