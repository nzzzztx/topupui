import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay } from "swiper/modules"
import { useRef, useEffect, useState } from "react"

import "swiper/css"
import "swiper/css/pagination"

export default function Hero() {
    const prevRef = useRef(null)
    const nextRef = useRef(null)
    const [swiperInstance, setSwiperInstance] = useState(null)

    useEffect(() => {
        if (swiperInstance) {
            swiperInstance.params.navigation.prevEl = prevRef.current
            swiperInstance.params.navigation.nextEl = nextRef.current
            swiperInstance.navigation.init()
            swiperInstance.navigation.update()
        }
    }, [swiperInstance])

    return (
        <section className="px-4 md:px-16 mt-5">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">

                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    onSwiper={setSwiperInstance}
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 5000 }}
                    loop
                    className="hero-swiper"
                >

                    <SwiperSlide>
                        <div className="relative h-[180px] sm:h-[240px] md:h-[300px] lg:h-[350px] overflow-hidden">

                            <img
                                src="https://images.unsplash.com/photo-1605902711622-cfb43c4437d1"
                                alt="Hero"
                                className="w-full h-full object-cover object-center will-change-auto"
                            />

                            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>

                            <div className="absolute inset-0 flex items-center px-4 md:px-20">
                                <div className="max-w-xl">
                                    <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
                                        WEBSITE TOPUP GAME
                                    </h1>

                                    <p className="mt-4 text-sm sm:text-base md:text-xl text-gray-300">
                                        MURAH • CEPAT • TERPERCAYA
                                    </p>

                                    <button className="mt-6 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg text-sm md:text-base font-medium transition shadow-lg">
                                        Topup Sekarang
                                    </button>
                                </div>
                            </div>

                            <div className="absolute right-10 bottom-10 text-white/10 text-6xl font-bold hidden md:block select-none">
                                XMLTOPUP
                            </div>

                        </div>
                    </SwiperSlide>

                    <SwiperSlide>
                        <div className="relative h-[180px] sm:h-[240px] md:h-[300px] lg:h-[350px] overflow-hidden">

                            <img
                                src="https://images.unsplash.com/photo-1552820728-8b83bb6b773f"
                                alt="Hero 2"
                                className="w-full h-full object-cover object-center"
                            />

                            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>

                        </div>
                    </SwiperSlide>

                </Swiper>

                <button
                    ref={prevRef}
                    className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition shadow-lg"
                >
                    <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2.5}
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                <button
                    ref={nextRef}
                    className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition shadow-lg"
                >
                    <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2.5}
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                </button>

            </div>
        </section>
    )
}
