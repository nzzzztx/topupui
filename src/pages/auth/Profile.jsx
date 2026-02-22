import { useAuth } from "../../context/AuthContext"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function Profile() {
    const { user, setUser } = useAuth()
    const [tab, setTab] = useState("profil")
    const [form, setForm] = useState({
        username: "",
        name: "",
        email: "",
        phone: "",
    })

    useEffect(() => {
        if (user) {
            setForm({
                username: user.username,
                name: user.name,
                email: user.email,
                phone: user.phone,
            })
        }
    }, [user])

    if (!user) return null

    const formatDate = (date) => {
        if (!date) return "-"
        return new Date(date).toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        })
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSave = () => {
        const users = JSON.parse(localStorage.getItem("xml_users")) || []

        const updatedUsers = users.map(u =>
            u.email === user.email
                ? { ...u, ...form }
                : u
        )

        localStorage.setItem("xml_users", JSON.stringify(updatedUsers))

        const updatedUser = updatedUsers.find(
            u => u.email === user.email
        )

        setUser(updatedUser)

        alert("Profil berhasil diperbarui")
    }

    return (
        <div className="w-full min-h-screen px-4 sm:px-6 py-8 sm:py-10
                md:max-w-6xl md:mx-auto">

            <h2 className="text-xl sm:text-2xl font-semibold mb-6 border-b border-blue-600 inline-block pb-2">
                Pengaturan Akun
            </h2>

            <div className="flex flex-col gap-6
                md:grid md:grid-cols-3 md:gap-8">

                {/* CARD KIRI */}
                <div className="w-full bg-gradient-to-br from-[#0f172a] to-[#111827] 
                                p-5 sm:p-7 
                                rounded-2xl 
                                border border-[#1f2937] 
                                shadow-2xl">

                    <h3 className="text-lg sm:text-xl font-semibold mb-6 sm:mb-8 text-blue-400 tracking-wide">
                        {user.username}
                    </h3>

                    <div className="space-y-6 text-sm">

                        <div className="grid grid-cols-2 gap-2">
                            <span className="text-gray-400">Jenis Member</span>
                            <span className="text-white font-medium text-right">
                                {user.memberType || "Basic"}
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            <span className="text-gray-400">Tanggal Daftar</span>
                            <span className="text-white font-medium text-right">
                                {formatDate(user.createdAt)}
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            <span className="text-gray-400">Terakhir Login</span>
                            <span className="text-white font-medium text-right">
                                {formatDate(user.lastLogin)}
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            <span className="text-gray-400">Total Afiliasi</span>
                            <span className="text-white font-medium text-right">
                                {user.affiliateTotal || 0}
                            </span>
                        </div>

                    </div>
                </div>

                {/* CARD KANAN */}
                <div className="w-full md:col-span-2
                                bg-[#111827] 
                                p-5 sm:p-6 
                                rounded-2xl 
                                border border-[#1f2937] 
                                shadow-xl">

                    {/* TAB */}
                    <div className="flex overflow-x-auto gap-6 sm:gap-8 
                                    border-b border-[#1f2937] 
                                    mb-6 text-sm whitespace-nowrap no-scrollbar">

                        {["profil", "keamanan", "password", "afiliasi"].map(item => (
                            <button
                                key={item}
                                onClick={() => setTab(item)}
                                className={`pb-3 capitalize font-medium transition-all duration-200 ${tab === item
                                    ? "border-b-2 border-blue-500 text-blue-400"
                                    : "text-gray-400"
                                    }`}
                            >
                                {item}
                            </button>
                        ))}
                    </div>

                    {/* TAB PROFIL */}
                    {tab === "profil" && (
                        <div className="space-y-5">

                            <div>
                                <label className="text-sm text-gray-400">
                                    Username
                                </label>
                                <input
                                    name="username"
                                    value={form.username}
                                    onChange={handleChange}
                                    className="w-full bg-[#1f2937] mt-1 px-4 py-3 rounded-lg"
                                />
                            </div>

                            <div>
                                <label className="text-sm text-gray-400">
                                    Nama Lengkap
                                </label>
                                <input
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    className="w-full bg-[#1f2937] mt-1 px-4 py-3 rounded-lg"
                                />
                            </div>

                            <div>
                                <label className="text-sm text-gray-400">
                                    Email
                                </label>
                                <input
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    className="w-full bg-[#1f2937] mt-1 px-4 py-3 rounded-lg"
                                />
                            </div>

                            <div>
                                <label className="text-sm text-gray-400">
                                    No WhatsApp
                                </label>
                                <input
                                    name="phone"
                                    value={form.phone}
                                    onChange={handleChange}
                                    className="w-full bg-[#1f2937] mt-1 px-4 py-3 rounded-lg"
                                />
                            </div>

                            <button
                                onClick={handleSave}
                                className="bg-blue-600 hover:bg-blue-700 
                                           transition px-6 py-3 
                                           rounded-lg w-full font-medium"
                            >
                                Simpan Perubahan
                            </button>
                        </div>
                    )}

                    {tab === "keamanan" && (
                        <KeamananTab user={user} setUser={setUser} />
                    )}

                    {tab === "password" && (
                        <PasswordTab user={user} setUser={setUser} />
                    )}

                    {tab === "afiliasi" && (
                        <AfiliasiTab user={user} />
                    )}

                </div>
            </div>
        </div>
    )
}

// SET PIN
function KeamananTab({ user, setUser }) {
    const [oldPin, setOldPin] = useState("")
    const [newPin, setNewPin] = useState("")
    const [password, setPassword] = useState("")

    const hasPin = !!user.pin

    const handleSave = () => {

        const users = JSON.parse(localStorage.getItem("xml_users")) || []

        const currentUser = users.find(u => u.email === user.email)

        if (!currentUser) {
            alert("User tidak ditemukan")
            return
        }

        if (password.trim() !== currentUser.password) {
            alert("Password salah")
            return
        }

        if (currentUser.pin && oldPin !== currentUser.pin) {
            alert("PIN lama salah")
            return
        }

        if (newPin.length < 6 || !/^\d+$/.test(newPin)) {
            alert("PIN minimal 6 angka dan hanya angka")
            return
        }

        const updatedUsers = users.map(u =>
            u.email === user.email
                ? {
                    ...u,
                    pin: newPin,
                    pinAttempts: 0,
                    pinBlockedUntil: null
                }
                : u
        )

        localStorage.setItem("xml_users", JSON.stringify(updatedUsers))

        const updatedUser = updatedUsers.find(
            u => u.email === user.email
        )

        setUser(updatedUser)

        alert(currentUser.pin ? "PIN berhasil diubah" : "PIN berhasil dibuat")

        setOldPin("")
        setNewPin("")
        setPassword("")
    }

    const handleReset = () => {

        const users = JSON.parse(localStorage.getItem("xml_users")) || []

        const currentUser = users.find(u => u.email === user.email)

        if (password !== currentUser.password) {
            alert("Password salah")
            return
        }

        const updatedUsers = users.map(u =>
            u.email === user.email
                ? {
                    ...u,
                    pin: null,
                    pinAttempts: 0,
                    pinBlockedUntil: null
                }
                : u
        )

        localStorage.setItem("xml_users", JSON.stringify(updatedUsers))

        setUser({
            ...currentUser,
            pin: null,
            pinAttempts: 0,
            pinBlockedUntil: null
        })

        alert("PIN berhasil direset")

        setOldPin("")
        setNewPin("")
        setPassword("")
    }

    return (
        <div className="space-y-6">

            {hasPin && (
                <div>
                    <label className="text-sm text-gray-400">
                        PIN Transaksi Lama
                    </label>
                    <input
                        type="password"
                        value={oldPin}
                        onChange={(e) => setOldPin(e.target.value)}
                        className="w-full bg-[#1f2937] mt-1 px-4 py-3 rounded-lg"
                        placeholder="Masukkan PIN lama"
                    />
                </div>
            )}

            <div>
                <label className="text-sm text-gray-400">
                    {hasPin ? "PIN Transaksi Baru" : "Buat PIN Transaksi"}
                </label>
                <input
                    type="password"
                    value={newPin}
                    onChange={(e) => setNewPin(e.target.value)}
                    className="w-full bg-[#1f2937] mt-1 px-4 py-3 rounded-lg"
                    placeholder="Minimal 6 angka"
                />
            </div>

            <div>
                <label className="text-sm text-gray-400">
                    Masukkan Password
                </label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#1f2937] mt-1 px-4 py-3 rounded-lg"
                    placeholder="Konfirmasi password akun"
                />
            </div>

            <button
                onClick={handleSave}
                className="bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-lg w-full font-medium"
            >
                {hasPin ? "Simpan Perubahan" : "Buat PIN"}
            </button>

            {hasPin && (
                <button
                    onClick={handleReset}
                    className="bg-red-600 hover:bg-red-700 transition px-6 py-3 rounded-lg w-full font-medium"
                >
                    Reset PIN
                </button>
            )}

        </div>
    )
}

// SET PASSWORD
function PasswordTab({ user, setUser }) {

    const navigate = useNavigate()
    const { logout } = useAuth()

    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const [showOld, setShowOld] = useState(false)
    const [showNew, setShowNew] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)

    const handleSave = () => {

        if (oldPassword.trim() !== user.password) {
            alert("Password lama salah")
            return
        }

        if (newPassword.length < 6) {
            alert("Password minimal 6 karakter")
            return
        }

        if (newPassword !== confirmPassword) {
            alert("Konfirmasi password tidak sama")
            return
        }

        const users = JSON.parse(localStorage.getItem("xml_users")) || []

        const updatedUsers = users.map(u =>
            u.email === user.email
                ? { ...u, password: newPassword }
                : u
        )

        localStorage.setItem("xml_users", JSON.stringify(updatedUsers))

        alert("Password berhasil diganti. Silakan login ulang.")

        logout()
        navigate("/login")
    }

    const inputStyle =
        "w-full bg-[#1f2937] mt-1 px-4 py-3 rounded-lg pr-16"

    const buttonStyle =
        "absolute right-3 top-1/2 -translate-y-1/2 text-xs bg-green-600 hover:bg-green-700 px-3 py-1 rounded-md"

    return (
        <div className="space-y-6">

            <div>
                <label className="text-sm text-gray-400">
                    Password Lama
                </label>
                <div className="relative">
                    <input
                        type={showOld ? "text" : "password"}
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        className={inputStyle}
                        placeholder="Masukkan password lama"
                    />
                    <button
                        type="button"
                        onClick={() => setShowOld(!showOld)}
                        className={buttonStyle}
                    >
                        {showOld ? "Hide" : "Show"}
                    </button>
                </div>
            </div>

            <div>
                <label className="text-sm text-gray-400">
                    Password Baru
                </label>
                <div className="relative">
                    <input
                        type={showNew ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className={inputStyle}
                        placeholder="Minimal 6 karakter"
                    />
                    <button
                        type="button"
                        onClick={() => setShowNew(!showNew)}
                        className={buttonStyle}
                    >
                        {showNew ? "Hide" : "Show"}
                    </button>
                </div>
            </div>

            <div>
                <label className="text-sm text-gray-400">
                    Ulangi Password Baru
                </label>
                <div className="relative">
                    <input
                        type={showConfirm ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className={inputStyle}
                        placeholder="Ulangi password baru"
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirm(!showConfirm)}
                        className={buttonStyle}
                    >
                        {showConfirm ? "Hide" : "Show"}
                    </button>
                </div>
            </div>

            <button
                onClick={handleSave}
                className="bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-lg w-full font-medium"
            >
                Simpan Perubahan
            </button>

        </div>
    )
}

// SET AFILIASI
function AfiliasiTab({ user }) {

    const affiliateLink = `${window.location.origin}/register?ref=${user.username}`

    const handleCopy = () => {
        navigator.clipboard.writeText(affiliateLink)
        alert("Link berhasil disalin")
    }

    return (
        <div className="space-y-6">

            <p className="text-gray-300 text-sm">
                Dapatkan komisi dari setiap transaksi yang dilakukan oleh afiliasi Anda:
            </p>

            <div className="w-full overflow-x-auto">
                <table className="w-full text-sm border border-[#2d3748]">
                    <thead className="bg-blue-600">
                        <tr>
                            <th className="py-3 px-4 text-left">#</th>
                            <th className="py-3 px-4 text-left">Tipe Produk</th>
                            <th className="py-3 px-4 text-right">Komisi Afiliasi</th>
                        </tr>
                    </thead>
                    <tbody className="bg-[#0f172a]">
                        <tr className="border-t border-[#2d3748]">
                            <td className="py-3 px-4">1</td>
                            <td className="py-3 px-4">Games & Voucher</td>
                            <td className="py-3 px-4 text-right">1%</td>
                        </tr>
                        <tr className="border-t border-[#2d3748]">
                            <td className="py-3 px-4">2</td>
                            <td className="py-3 px-4">Mobile & Bundle</td>
                            <td className="py-3 px-4 text-right">1%</td>
                        </tr>
                        <tr className="border-t border-[#2d3748]">
                            <td className="py-3 px-4">3</td>
                            <td className="py-3 px-4">EMoney</td>
                            <td className="py-3 px-4 text-right">2%</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <p className="text-gray-400 text-sm">
                Komisi afiliasi diambil dari markup harga member basic atau reseller.
            </p>

            <p className="text-gray-400 text-sm">
                Cookie pelacakan afiliasi kami bertahan selama 90 hari.
                Kamu akan menerima komisi dari semua pelanggan yang mendaftar dalam waktu 90 hari setelah mengklik link afiliasimu.
            </p>

            <div className="flex gap-2">
                <input
                    value={affiliateLink}
                    readOnly
                    className="flex-1 bg-[#1f2937] px-4 py-3 rounded-lg text-sm"
                />
                <button
                    onClick={handleCopy}
                    className="bg-green-600 hover:bg-green-700 px-4 rounded-lg text-sm"
                >
                    Salin
                </button>
            </div>

        </div>
    )
}
