import { useSelector } from "react-redux";

export default function Ketentuan() {
    const ketentuanData = useSelector(
        (state) => state.syaratKetentuan?.data
    );

    if (!ketentuanData) {
        return (
            <div className="min-h-screen flex items-center justify-center text-white">
                Memuat ketentuan...
            </div>
        );
    }

    return (
        <div className="
        min-h-screen text-white
        bg-gradient-to-b
        from-[#08192d]
        via-[#0b223f]
        to-[#08192d]
        ">
            <div className="max-w-3xl mx-auto">

                <div className="mb-8 text-center">
                    <h1 className="text-2xl md:text-3xl font-bold tracking-wide">
                        Syarat & Ketentuan
                    </h1>
                    <div className="w-16 h-1 bg-blue-500 mx-auto mt-3 rounded-full" />
                </div>

                <div className="bg-[#111827] border border-blue-500/10 rounded-xl p-6 md:p-8 shadow-lg">

                    {ketentuanData.map((section, index) => (
                        <div key={index} className="mb-8 last:mb-0">

                            <h2 className="text-base md:text-lg font-semibold text-blue-400 mb-3">
                                {section.title}
                            </h2>

                            <ol className="list-decimal pl-5 space-y-3 text-sm text-gray-300 leading-relaxed">
                                {section.items.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ol>

                        </div>
                    ))}

                </div>

            </div>
        </div>
    );
}
