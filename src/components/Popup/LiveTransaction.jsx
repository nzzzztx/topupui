import { useEffect, useState } from "react"

const transactions = [
    "nat******com baru saja membeli PUBG MOBILE 11950 UC",
    "riz******com baru saja membeli Mobile Legends 344 Diamond",
    "ari******com baru saja membeli Free Fire 140 Diamond",
    "and******com baru saja membeli Valorant 475 VP",
    "han******com baru saja membeli Genshin Impact 6480 Genesis",
]

export default function LiveTransaction() {
    const [visible, setVisible] = useState(false)
    const [message, setMessage] = useState("")

    useEffect(() => {
        const showTransaction = () => {
            const random =
                transactions[Math.floor(Math.random() * transactions.length)]

            setMessage(random)
            setVisible(true)

            setTimeout(() => {
                setVisible(false)
            }, 4000)
        }

        const firstTimeout = setTimeout(showTransaction, 1500)

        const interval = setInterval(showTransaction, 8000)

        return () => {
            clearTimeout(firstTimeout)
            clearInterval(interval)
        }
    }, [])

    return (
        <div
            className={`fixed bottom-6 left-6 z-50 transition-all duration-500 ${visible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6 pointer-events-none"
                }`}
        >
            <div className="bg-[#111827] border border-[#1f2937] p-4 rounded-xl shadow-xl w-[300px] backdrop-blur">

                <p className="text-xs text-gray-300 leading-relaxed">
                    {message}
                </p>

            </div>
        </div>
    )
}
