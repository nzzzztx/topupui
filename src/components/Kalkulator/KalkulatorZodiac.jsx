import { useState } from "react"

export default function KalkulatorZodiac() {
    const [point, setPoint] = useState(50)

    const max = 200
    const sisa = max - point
    const diamond = sisa * 5

    return (
        <div className="grid md:grid-cols-2 gap-12 items-center">

            <div>
                <h2 className="text-xl font-semibold mb-4">Kalkulator Zodiac</h2>
                <p className="text-gray-400 text-sm">
                    Hitung kebutuhan diamond untuk mendapatkan skin Zodiac.
                </p>
            </div>

            <div>
                <p className="mb-2 text-sm">
                    Star Point: <span className="text-blue-400">{point}</span>
                </p>

                <input
                    type="range"
                    min="0"
                    max={max}
                    value={point}
                    onChange={(e) => setPoint(Number(e.target.value))}
                    className="w-full mb-4"
                />

                <p className="text-sm mb-4">
                    Membutuhkan Maksimal:{" "}
                    <span className="text-cyan-400 font-semibold">
                        {diamond} 💎
                    </span>
                </p>

                <button className="w-full bg-amber-500 hover:bg-amber-600 transition py-2 rounded-lg font-medium">
                    Beli Diamond
                </button>
            </div>
        </div>
    )
}
