import { Routes, Route } from "react-router-dom"

import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import PromoPopup from "../components/Popup/PromoPopup"
import LiveTransaction from "../components/Popup/LiveTransaction"

import Home from "../pages/navbar/Home"
import Harga from "../pages/navbar/Harga"
import Pesanan from "../pages/navbar/Pesanan"
import Pencarian from "../pages/navbar/Pencarian"
import Kalkulator from "../pages/navbar/Kalkulator"

export default function AppRoute() {
    return (
        <div className="bg-[#0f172a] min-h-screen text-white">
            <Navbar />
            <PromoPopup />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/harga" element={<Harga />} />
                <Route path="/pesanan" element={<Pesanan />} />
                <Route path="/pencarian" element={<Pencarian />} />
                <Route path="/kalkulator" element={<Kalkulator />} />
            </Routes>

            <Footer />
            <LiveTransaction />
        </div>
    )
}
