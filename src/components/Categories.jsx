import { useSearchParams } from "react-router-dom"
import { useEffect } from "react"

export default function Categories({
    activeCategory,
    setActiveCategory,
    search,
    setSearch,
}) {

    const categories = ["GAMES", "VOUCHER", "EMONEY", "MOBILE", "BUNDLE"]
    const [searchParams] = useSearchParams()

    useEffect(() => {
        const urlSearch = searchParams.get("search")

        if (urlSearch) {
            setSearch(urlSearch)
        }
    }, [searchParams, setSearch])

    useEffect(() => {
        if (search) {
            setActiveCategory("GAMES")
        }
    }, [search, setActiveCategory])

    return (
        <div className="px-4 mt-6">
            <div className="max-w-7xl mx-auto">

                <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-[#1f2937] pb-4 gap-6">

                    <div className="flex gap-8 text-sm text-gray-400 overflow-x-auto">

                        {categories.map((item) => (
                            <button
                                key={item}
                                onClick={() => {
                                    setSearch("")
                                    setActiveCategory(item)
                                }}
                                className={`relative pb-2 transition ${activeCategory === item
                                    ? "text-blue-500"
                                    : "hover:text-white"
                                    }`}
                            >
                                {item}

                                {activeCategory === item && (
                                    <span className="absolute left-0 bottom-0 w-full h-[2px] bg-blue-500 rounded-full"></span>
                                )}
                            </button>
                        ))}

                    </div>

                    <div className="relative w-full md:w-72">

                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            type="text"
                            placeholder="Cari..."
                            className="w-full bg-[#111827] border border-[#1f2937]
                            focus:border-blue-500 focus:ring-1 focus:ring-blue-500
                            px-4 py-2.5 pl-10 text-sm rounded-xl
                            outline-none transition placeholder-gray-500"
                        />

                        <img
                            src="https://cdn-icons-png.flaticon.com/512/622/622669.png"
                            alt="search"
                            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 invert opacity-70"
                        />

                    </div>

                </div>

            </div>
        </div>
    )
}
