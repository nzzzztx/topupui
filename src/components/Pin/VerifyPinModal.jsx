import { useState } from "react"

export default function VerifyPinModal({ user, setUser, onSuccess, onClose }) {

    const [inputPin, setInputPin] = useState("")
    const [error, setError] = useState("")

    const isBlocked = user.pinBlockedUntil &&
        new Date(user.pinBlockedUntil) > new Date()

    const handleVerify = () => {

        if (isBlocked) {
            setError("Akun diblokir sementara")
            return
        }

        if (inputPin === user.pin) {

            // reset attempt
            updateUser({
                pinAttempts: 0,
                pinBlockedUntil: null
            })

            onSuccess()
            onClose()
            return
        }

        const attempts = (user.pinAttempts || 0) + 1

        if (attempts >= 3) {

            const blockedTime = new Date()
            blockedTime.setMinutes(blockedTime.getMinutes() + 5)

            updateUser({
                pinAttempts: attempts,
                pinBlockedUntil: blockedTime.toISOString()
            })

            setError("Terlalu banyak percobaan. Diblokir 5 menit.")
            return
        }

        updateUser({ pinAttempts: attempts })

        setError(`PIN salah (${attempts}/3)`)

    }

    const updateUser = (updates) => {

        const users = JSON.parse(localStorage.getItem("xml_users")) || []

        const updatedUsers = users.map(u =>
            u.username === user.username
                ? { ...u, ...updates }
                : u
        )

        localStorage.setItem("xml_users", JSON.stringify(updatedUsers))

        setUser({ ...user, ...updates })
    }

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

            <div className="bg-[#111827] p-6 rounded-2xl w-full max-w-sm space-y-5 border border-[#1f2937]">

                <h3 className="text-lg font-semibold text-center">
                    Verifikasi PIN Transaksi
                </h3>

                {isBlocked && (
                    <div className="text-red-400 text-sm text-center">
                        Akun diblokir sampai {new Date(user.pinBlockedUntil).toLocaleTimeString()}
                    </div>
                )}

                <input
                    type="password"
                    value={inputPin}
                    onChange={(e) => setInputPin(e.target.value)}
                    className="w-full bg-[#1f2937] px-4 py-3 rounded-lg text-center tracking-widest"
                    placeholder="••••••"
                />

                {error && (
                    <div className="text-red-400 text-sm text-center">
                        {error}
                    </div>
                )}

                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 bg-gray-600 hover:bg-gray-700 py-2 rounded-lg"
                    >
                        Batal
                    </button>

                    <button
                        onClick={handleVerify}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 py-2 rounded-lg"
                    >
                        Verifikasi
                    </button>
                </div>

            </div>
        </div>
    )
}