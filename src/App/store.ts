import { configureStore } from "@reduxjs/toolkit"
import InvoiceDataSlice from "../Module/Components/Invoice/InvoiceSlice"

export const store = configureStore({
    reducer: {
        InvoiceDataSlice:InvoiceDataSlice
    },
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch