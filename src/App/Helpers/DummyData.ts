import { HeadCell } from "./Interfaces";
import { InvoiceStatus } from "../enum";

export const invoices=[
    {id:1,number:"#6",status:InvoiceStatus.Draft, date:"19/05/2022", customer:{name:"Ferrero S.R.L", number:12345, country:"Fossano(CN), Italy"},total:732.00, hasEmail:true, hasEinvoice:true, paymentComplete:false},
    {id:2,number:"FVL-2",status:InvoiceStatus.Confirmed, date:"19/05/2022", customer:{name:"Viberti S.R.L", number:12345, country:"Alba(CN), Italy"},total:500.00, hasEmail:false, hasEinvoice:true, paymentComplete:true},
    {id:3,number:"PRO-1",status:InvoiceStatus.Completed, date:"18/05/2022", customer:{name:"Ferrero S.R.L", number:12345, country:"Montebelluna(TV), Italy"},total:890.95, hasEmail:true, hasEinvoice:true, paymentComplete:true},
    {id:4,number:"PRO-3",status:InvoiceStatus.Reversed, date:"18/05/2022", customer:{name:"Zambon S.P.A", number:12345, country:"Bresso(MI), Italy"},total:1390.00, hasEmail:true, hasEinvoice:false, paymentComplete:false},
    {id:5,number:"FVL-1",status:InvoiceStatus.Completed, date:"17/05/2022", customer:{name:"Ferrero S.R.L", number:12345, country:"Alba(CN), Italy"},total:712.00, hasEmail:true, hasEinvoice:false, paymentComplete:true},
    {id:6,number:"#5",status:InvoiceStatus.Draft, date:"16/04/2022", customer:{name:"Viberti S.R.L", number:12345, country:"Alba(CN), Italy"},total:1732.00, hasEmail:false, hasEinvoice:true, paymentComplete:false},

]


export const headCells: readonly HeadCell[] = [
    {
        id: "number",
        numeric: false,
        disablePadding: false,
        label: "Invoice",
    },
    {
        id: "date",
        numeric: false,
        disablePadding: false,
        label: "Invoice date",
    },
    {
        id: "hasEmail",
        numeric: false,
        disablePadding: false,
        label: "Email",
    },
    {
        id: "hasEinvoice",
        numeric: false,
        disablePadding: false,
        label: "E-Invoice",
    },
    {
        id: "paymentComplete",
        numeric: false,
        disablePadding: false,
        label: "Payment",
    },
    
    {
        id: "status",
        numeric: false,
        disablePadding: false,
        label: "Accounting",
    },
    {
        id: "customer",
        numeric: false,
        disablePadding: false,
        label: "Customer",
    },
    {
        id: "total",
        numeric: false,
        disablePadding: false,
        label: "Total amount",
    },
]