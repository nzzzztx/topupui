import { createContext, useContext, useEffect, useState } from "react"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem("xml_user")
        return saved ? JSON.parse(saved) : null
    })

    useEffect(() => {
        if (user) {
            localStorage.setItem("xml_user", JSON.stringify(user))
        } else {
            localStorage.removeItem("xml_user")
        }
    }, [user])

    const login = (username, password) => {

        const users = JSON.parse(localStorage.getItem("xml_users")) || []

        const foundUser = users.find(
            (u) => u.username === username && u.password === password
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

        localStorage.setItem("xml_users", JSON.stringify(updatedUsers))

        setUser(updatedUser)

        return { success: true, user: updatedUser }
    }

    const register = (data) => {

        const users = JSON.parse(localStorage.getItem("xml_users")) || []

        const exist = users.find((u) => u.username === data.username)

        if (exist) {
            return { success: false, message: "Username sudah terdaftar" }
        }

        const newUser = {
            ...data,
            memberType: "Basic",
            affiliateTotal: 0,
            createdAt: new Date().toISOString(),
            lastLogin: null,
            pin: null,
            pinAttempts: 0,
            pinBlockedUntil: null
        }

        users.push(newUser)
        localStorage.setItem("xml_users", JSON.stringify(users))

        return { success: true }
    }

    const logout = () => {
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, login, register, logout, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)