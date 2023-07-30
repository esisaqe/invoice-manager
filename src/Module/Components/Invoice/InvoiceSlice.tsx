import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { invoices } from "../../../App/Helpers/DummyData"

const initialInvoiceDataState = { invoiceData: invoices }

const InvoiceDataSlice = createSlice({
    name: "InvoiceDataSlice",
    initialState: initialInvoiceDataState,
    reducers: {
        getInvoiceData(state, action: PayloadAction<typeof invoices>) {
            state.invoiceData = action.payload
        },
    },
})

export const { getInvoiceData } = InvoiceDataSlice.actions

export default InvoiceDataSlice.reducer
