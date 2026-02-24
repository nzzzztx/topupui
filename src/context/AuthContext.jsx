import { createContext, useContext, useEffect, useState } from "react"
import { setSecure, getSecure, hashPassword } from "../utils/secureStorage"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(() => {
        return getSecure("xml_user")
    })

    useEffect(() => {
        if (user) {
            setSecure("xml_user", user)
        } else {
            localStorage.removeItem("xml_user")
        }
    }, [user])

    const login = (username, password) => {

        const users = getSecure("xml_users") || []

        const foundUser = users.find(
            (u) =>
                u.username === username.trim() &&
                u.password === hashPassword(password.trim())
        )

        if (!foundUser) {
            return { success: false, message: "Username atau password salah" }
        }

        const updatedUser = {
            ...foundUser,
            lastLogin: new Date().toISOString()
        }

        const updatedUsers = users.map(u =>
            u.username === username ? updatedUser : u
        )

        setSecure("xml_users", updatedUsers)
        setUser(updatedUser)

        return { success: true }
    }

    const register = (data) => {

        const users = getSecure("xml_users") || []

        const exist = users.find(u => u.username === data.username.trim())

        if (exist) {
            return { success: false, message: "Username sudah terdaftar" }
        }

        const newUser = {
            username: data.username.trim(),
            name: data.name.trim(),
            email: data.email.trim(),
            phone: data.phone.trim(),
            password: hashPassword(data.password.trim()),
            saldo: 0,
            memberType: "Basic",
            affiliateTotal: 0,
            createdAt: new Date().toISOString(),
            lastLogin: null,
            pin: null,
            pinAttempts: 0,
            pinBlockedUntil: null
        }

        users.push(newUser)
        setSecure("xml_users", users)

        return { success: true }
    }

    const resetPassword = (email, newPassword) => {

        const users = getSecure("xml_users") || []

        const userIndex = users.findIndex(u => u.email === email)

        if (userIndex === -1) {
            return { success: false, message: "Email tidak ditemukan" }
        }

        users[userIndex].password = hashPassword(newPassword.trim())

        setSecure("xml_users", users)

        return { success: true }
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem("xml_user")
    }

    return (
        <AuthContext.Provider value={{ user, login, register, logout, setUser, resetPassword }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)