import { useState } from "react"

export default function KalkulatorWinRate() {
    const [totalMatch, setTotalMatch] = useState("")
    const [winRate, setWinRate] = useState("")
    const [target, setTarget] = useState("")
    const [result, setResult] = useState(null)

    const hitung = () => {
        const total = Number(totalMatch)
        const wr = Number(winRate)
        const t = Number(target)

        if (!total || !wr || !t) return

        const winNow = (wr / 100) * total
        const totalNeeded = Math.ceil((t / 100 * total - winNow) / (1 - t / 100))

        const currentWin = Math.round(winNow)

        setResult({
            currentWin,
            total,
            wr,
            target: t,
            needWin: totalNeeded
        })
    }

    return (
        <div>
            <h2 className="text-xl font-semibold mb-6">
                Kalkulator Win Rate
            </h2>

            <div className="space-y-5">

                <input
                    type="number"
                    placeholder="Total Match"
                    value={totalMatch}
                    onChange={(e) => setTotalMatch(e.target.value)}
                    className="
                        w-full
                        bg-[#0f2744]
                        border border-blue-500/20
                        px-4 py-3
                        rounded-xl
                        text-white
                        placeholder-gray-400
                        focus:outline-none
                        focus:border-blue-500
                        focus:ring-2 focus:ring-blue-500/30
                        transition
                    "
                />

                <input
                    type="number"
                    placeholder="Win Rate Sekarang (%)"
                    value={winRate}
                    onChange={(e) => setWinRate(e.target.value)}
                    className="
                        w-full
                        bg-[#0f2744]
                        border border-blue-500/20
                        px-4 py-3
                        rounded-xl
                        text-white
                        placeholder-gray-400
                        focus:outline-none
                        focus:border-blue-500
                        focus:ring-2 focus:ring-blue-500/30
                        transition
                    "
                />

                <input
                    type="number"
                    placeholder="Target Win Rate (%)"
                    value={target}
                    onChange={(e) => setTarget(e.target.value)}
                    className="
                        w-full
                        bg-[#0f2744]
                        border border-blue-500/20
                        px-4 py-3
                        rounded-xl
                        text-white
                        placeholder-gray-400
                        focus:outline-none
                        focus:border-blue-500
                        focus:ring-2 focus:ring-blue-500/30
                        transition
                    "
                />

                <button
                    onClick={hitung}
                    className="
                        w-full
                        bg-blue-600
                        hover:bg-blue-700
                        py-3
                        rounded-xl
                        font-semibold
                        transition-all
                        hover:shadow-lg
                    "
                >
                    Hitung
                </button>

                {result && (
                    <div className="
        mt-6
        bg-[#0f2744]
        border border-blue-500/30
        p-6
        rounded-2xl
        space-y-4
    ">

                        <h3 className="text-lg font-semibold text-blue-400">
                            📊 Ringkasan Perhitungan
                        </h3>

                        <div className="grid md:grid-cols-2 gap-4 text-sm">

                            <div className="bg-[#112b4a] p-4 rounded-xl">
                                <p className="text-gray-400">Total Match</p>
                                <p className="text-white font-semibold">{result.total}</p>
                            </div>

                            <div className="bg-[#112b4a] p-4 rounded-xl">
                                <p className="text-gray-400">Win Rate Sekarang</p>
                                <p className="text-white font-semibold">
                                    {result.wr}%
                                </p>
                            </div>

                            <div className="bg-[#112b4a] p-4 rounded-xl">
                                <p className="text-gray-400">Target Win Rate</p>
                                <p className="text-white font-semibold">
                                    {result.target}%
                                </p>
                            </div>

                            <div className="bg-[#112b4a] p-4 rounded-xl">
                                <p className="text-gray-400">Kemenangan Saat Ini</p>
                                <p className="text-white font-semibold">
                                    {result.currentWin} Match
                                </p>
                            </div>

                        </div>

                        <div className="
            mt-4
            bg-gradient-to-r from-blue-600 to-indigo-600
            p-4
            rounded-xl
            text-center
        ">
                            <p className="text-sm text-blue-100">
                                Kamu perlu menang sekitar
                            </p>

                            <p className="text-2xl font-bold mt-1">
                                {result.needWin} Match Berturut-turut
                            </p>

                            <p className="text-xs text-blue-100 mt-2">
                                Untuk mencapai {result.target}% win rate
                            </p>
                        </div>

                    </div>
                )}

            </div>
        </div>
    )
}
