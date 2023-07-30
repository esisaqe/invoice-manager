import { Order } from "./Types"
import { InvoiceStatus } from "../enum"

export interface EnhancedTableProps {
    numSelected: number
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void
    order: Order
    orderBy: string
    rowCount: number
}

export interface Data {
    number: string
    status: keyof typeof InvoiceStatus
    date: string
    customer: { name: string; number: number; country: string }
    total: number
    hasEmail: boolean
    hasEinvoice: boolean
    paymentComplete:boolean
}

export interface HeadCell {
    disablePadding: boolean
    id: keyof Data
    label: string
    numeric: boolean
}

