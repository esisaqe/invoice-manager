import React from "react"
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material"
import { InvoiceStatus } from "../../../App/enum"

export const initialFormState = {
    id: 0,
    number: "",
    status: InvoiceStatus.Draft,
    date: "",
    customer: { name: "", number: 0, country: "" },
    total: 0,
    hasEmail: false,
    hasEinvoice: false,
    paymentComplete: false,
}

function NewInvoiceDialog(props: { open: boolean; onClose: () => void; onAddRow: (formData: typeof initialFormState) => void }) {
    const [formData, setFormData] = React.useState(initialFormState)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target

        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value,
        }))
    }

    const handleCustomerChange = (event: { target: { name: any; value: any } }) => {
        const { name, value } = event.target
        setFormData(prevFormData => ({
            ...prevFormData,
            customer: {
                ...prevFormData.customer,
                [name]: value,
            },
        }))
    }

    const handleAddRow = () => {
        props.onAddRow(formData)
        setFormData(initialFormState)
        props.onClose()
    }

    return (
        <Dialog open={props.open} onClose={props.onClose}>
            <DialogTitle>Add New Invoice</DialogTitle>
            <DialogContent>
                <DialogContentText>Fill in the fields to create a new invoice.</DialogContentText>
                <TextField autoFocus margin="dense" name="number" label="Invoice" fullWidth value={formData.number} onChange={handleChange} />
                <TextField margin="dense" name="date" type="date" fullWidth value={formData.date} onChange={handleChange} />
                <TextField margin="dense" name="hasEmail" label="Email" type="boolean" fullWidth value={formData.hasEmail} onChange={handleChange} />
                <TextField margin="dense" name="hasEinvoice" label="E-Invoice" type="boolean" fullWidth value={formData.hasEinvoice} onChange={handleChange} />
                <TextField
                    margin="dense"
                    name="paymentComplete"
                    label="Payment"
                    type="boolean"
                    fullWidth
                    value={formData.paymentComplete}
                    onChange={handleChange}
                />
                <TextField margin="dense" name="name" label="Customer Name" fullWidth value={formData.customer.name} onChange={handleCustomerChange} />
                <TextField margin="dense" name="country" label="Country" fullWidth value={formData.customer.country} onChange={handleCustomerChange} />
                <TextField
                    margin="dense"
                    name="number"
                    label="Customer Number"
                    type="number"
                    fullWidth
                    value={formData.customer.number}
                    onChange={handleCustomerChange}
                />
                <TextField margin="dense" name="total" label="Total Amount" type="number" fullWidth value={formData.total} onChange={handleChange} />
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleAddRow} color="primary">
                    Add Row
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default NewInvoiceDialog
