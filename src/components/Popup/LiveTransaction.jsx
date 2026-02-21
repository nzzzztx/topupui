import { useEffect, useState } from "react"
import { liveFallbackData } from "../../data/live"

export default function LiveTransaction() {
    const [visible, setVisible] = useState(false)
    const [transaction, setTransaction] = useState(null)
    // const isSuccess =
    //     transaction?.status?.toLowerCase() === "success"
    const isSuccess =
        String(transaction?.status).toLowerCase() === "success"


    const showTransaction = (data) => {
        setTransaction(data)
        setVisible(true)

        setTimeout(() => {
            setVisible(false)
        }, 5000)
    }

    // useEffect(() => {
    //     const fetchTransaction = async () => {
    //         try {
    //             const res = await fetch("/api/live-transactions")
    //             const data = await res.json()

    //             if (data?.length > 0) {
    //                 const random =
    //                     data[Math.floor(Math.random() * data.length)]
    //                 showTransaction(random)
    //             } else {
    //                 const random =
    //                     liveFallbackData[
    //                     Math.floor(Math.random() * liveFallbackData.length)
    //                     ]
    //                 showTransaction(random)
    //             }
    //         } catch (error) {
    //             const random =
    //                 liveFallbackData[
    //                 Math.floor(Math.random() * liveFallbackData.length)
    //                 ]
    //             showTransaction(random)
    //         }
    //     }

    //     const firstTimeout = setTimeout(fetchTransaction, 1500)
    //     const interval = setInterval(fetchTransaction, 9000)

    //     return () => {
    //         clearTimeout(firstTimeout)
    //         clearInterval(interval)
    //     }
    // }, [])

    useEffect(() => {
        let index = 0

        const showDummy = () => {
            const data = liveFallbackData[index]

            showTransaction(data)

            index++
            if (index >= liveFallbackData.length) {
                index = 0
            }
        }

        const firstTimeout = setTimeout(showDummy, 1500)
        const interval = setInterval(showDummy, 4000)

        return () => {
            clearTimeout(firstTimeout)
            clearInterval(interval)
        }
    }, [])

    if (!transaction) return null

    return (
        <div
            className={`fixed bottom-6 left-6 z-50 transition-all duration-500 ${visible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6 pointer-events-none"
                }`}
        >
            <div className={`
            bg-gradient-to-br from-[#0f172a] to-[#111827]
            border ${isSuccess ? "border-green-500/30" : "border-red-500/30"}
            p-4 rounded-2xl
            shadow-[0_10px_30px_rgba(0,0,0,0.6)]
            w-[320px]
            backdrop-blur-lg
        `}>

                <div className="flex items-start gap-3">

                    <div className={`
                    w-9 h-9 rounded-full
                    flex items-center justify-center
                    text-sm font-bold
                    ${isSuccess
                            ? "bg-green-500/20 text-green-400"
                            : "bg-red-500/20 text-red-400"}
                `}>
                        {isSuccess ? "✓" : "✕"}
                    </div>

                    <div className="flex-1 text-xs text-gray-300 leading-relaxed">
                        <p>
                            <span className="text-white font-medium">
                                {transaction.email}
                            </span>{" "}
                            {isSuccess ? "berhasil membeli" : "gagal membeli"}{" "}
                            <span className="text-blue-400 font-semibold">
                                {transaction.product}
                            </span>{" "}
                            {transaction.item}
                        </p>

                        <div className="flex items-center justify-between mt-2">

                            <span className={`
                            text-[10px] font-medium
                            ${isSuccess ? "text-green-400" : "text-red-400"}
                        `}>
                                {isSuccess ? "Transaksi Sukses" : "Transaksi Gagal"}
                            </span>

                            <span className="text-[10px] text-gray-500">
                                Beberapa detik lalu
                            </span>

                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}
