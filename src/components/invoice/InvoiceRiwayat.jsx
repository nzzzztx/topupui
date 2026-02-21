import { useParams, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { handlePrintInvoiceRiwayat } from "../../data/invoiceriwayat"

export default function InvoiceRiwayat() {
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const data =
            JSON.parse(localStorage.getItem("transactions")) || []

        const found = data.find(
            (t) => String(t.id) === String(id)
        )

        if (!found) {
            navigate("/riwayat")
            return
        }

        handlePrintInvoiceRiwayat(found)

    }, [id, navigate])

    return null
}