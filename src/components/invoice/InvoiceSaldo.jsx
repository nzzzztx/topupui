import { useParams, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { handlePrintInvoiceSaldo } from "../../data/invoicesaldo"

export default function InvoiceSaldo() {
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const data =
            JSON.parse(localStorage.getItem("xml_transactions")) || []

        const found = data.find(
            (t) => String(t.id) === String(id)
        )

        if (!found) {
            navigate("/saldo")
            return
        }

        handlePrintInvoiceSaldo(found)

    }, [id, navigate])

    return null
}