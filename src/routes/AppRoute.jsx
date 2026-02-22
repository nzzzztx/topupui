import { Routes, Route } from "react-router-dom"
import ProtectRoute from "../context/ProtectRoute"

import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import PromoPopup from "../components/Popup/PromoPopup"
import LiveTransaction from "../components/Popup/LiveTransaction"

import Home from "../pages/navbar/Home"
import Harga from "../pages/navbar/Harga"
import Pesanan from "../pages/navbar/Pesanan"
import Kalkulator from "../pages/navbar/Kalkulator"
import Riwayat from "../pages/navbar/Riwayat"

import ProductDetail from "../pages/topup/ProductDetail"
import Ketentuan from "../pages/ketentuan/Ketentuan"
import Login from "../pages/auth/Login"
import Register from "../pages/auth/Register"
import ForgotPassword from "../pages/auth/ForgotPassword"

import Profile from "../pages/auth/Profile"
import Saldo from "../pages/saldo/Saldo"
import Payment from "../pages/payment/Payment"

export default function AppRoute() {
    return (
        <div className="flex flex-col min-h-screen bg-[#0f172a] text-white relative">
            <Navbar />
            <PromoPopup />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/harga" element={<Harga />} />
                <Route path="/pesanan" element={<Pesanan />} />

                <Route path="/riwayat" element={<Riwayat />} />
                <Route path="/kalkulator" element={<Kalkulator />} />
                <Route path="/product/:slug" element={<ProductDetail />} />
                <Route path="/syarat-ketentuan" element={<Ketentuan />} />

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />

                <Route path="/payment" element={<Payment />} />

                <Route
                    path="/profile"
                    element={
                        <ProtectRoute>
                            <Profile />
                        </ProtectRoute>
                    }
                />
                <Route
                    path="/saldo"
                    element={
                        <ProtectRoute>
                            <Saldo />
                        </ProtectRoute>
                    }
                />
            </Routes>

            <Footer />
            <LiveTransaction />
        </div>
    )
}

