import * as React from "react"
import { invoices } from "../../App/Helpers/DummyData"
import Invoice from "../Components/Invoice/Invoice"
import { Button, Card, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow } from "@mui/material"
import EnhancedTableHead from "../Components/EnhancedTableHead"
import { Data } from "../../App/Helpers/Interfaces"
import { Order } from "../../App/Helpers/Types"
import { getComparator, stableSort } from "../../App/Helpers/Helpers"
import Search from "../Components/Search"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../App/store"
import NewInvoiceDialog, { initialFormState } from "../Components/Invoice/NewInvoiceDialog"
import { getInvoiceData } from "../Components/Invoice/InvoiceSlice"
import PostAddIcon from "@mui/icons-material/PostAdd"
import { CSVLink } from "react-csv"

function InvoiceLayout() {
    const dispatch = useDispatch()
    const [selected, setSelected] = React.useState<readonly string[]>([])
    const isSelected = (name: string) => selected.indexOf(name) !== -1
    const [page, setPage] = React.useState(0)
    const [rowsPerPage, setRowsPerPage] = React.useState(4)
    const [order, setOrder] = React.useState<Order>("asc")
    const [orderBy, setOrderBy] = React.useState<keyof Data>("date")
    const [searchValue, setSearchValue] = React.useState("")
    const [isDialogOpen, setIsDialogOpen] = React.useState(false)
    const invoicesArray = useSelector((state: RootState) => state.InvoiceDataSlice.invoiceData)
    const headers = [
        { label: "Invoice", key: "number" },
        { label: "Invoice date", key: "date" },
        { label: "E-mail", key: "hasEmail" },
        { label: "Payments", key: "paymentComplete" },
        { label: "Status", key: "status" },
        { label: "Customer Name", key: "customer.name" },
        { label: "Customer Number", key: "customer.number" },
        { label: "Customer Country", key: "customer.country" },
        { label: "Total Amount", key: "total" },
    ]

    const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
        const isAsc = orderBy === property && order === "asc"
        setOrder(isAsc ? "desc" : "asc")
        setOrderBy(property)
    }

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelected = invoices.map(n => n.number)
            setSelected(newSelected)
            return
        }
        setSelected([])
    }

    const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
        const selectedIndex = selected.indexOf(name)
        let newSelected: readonly string[] = []

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name)
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1))
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1))
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1))
        }

        setSelected(newSelected)
    }

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - invoices.length) : 0

    const visibleRows = React.useMemo(
        () => stableSort(invoicesArray, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
        [invoicesArray, order, orderBy, page, rowsPerPage]
    )

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    const handleAddRow: (formData: typeof initialFormState) => void = formData => {
        const isEmpty = !Object.values(formData).some(x => x !== null && x !== "")
        if (!isEmpty) {
            dispatch(getInvoiceData([formData, ...invoicesArray]))
        }

        setIsDialogOpen(false)
    }

    return (
        <Card sx={{ height: "100vh", width: "70%", margin: "auto" }}>
            <div className="invoice-header">
                <Search searchValue={searchValue} setSearchValue={setSearchValue} />
                <div className="invoice-buttons">
                    <Button variant="text" sx={{ color: "#29b6f6", display: "flex", height: "4em", marginRight: "1rem" }}>
                        <PostAddIcon sx={{ color: "#29b6f6", marginRight: "0.5rem" }} />{" "}
                        <CSVLink data={invoicesArray} headers={headers} filename={"new-invoice-sheet"} target="_blank" className="invoice-export-button">
                            Export Invoices
                        </CSVLink>
                    </Button>
                    <Button variant="contained" sx={{ backgroundColor: "#29b6f6", display: "flex", height: "4em" }} onClick={() => setIsDialogOpen(true)}>
                        New Invoice
                    </Button>
                </div>
            </div>
            <NewInvoiceDialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} onAddRow={handleAddRow} />
            <TableContainer>
                <Table sx={{ minWidth: 750, width: "100%", margin: "auto" }} aria-labelledby="tableTitle">
                    <EnhancedTableHead
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={invoices.length}
                    />
                    <TableBody>
                        {visibleRows
                            ?.filter(
                                invoice =>
                                    invoice.number.toLowerCase().includes(searchValue.toLowerCase()) ||
                                    invoice.customer.name.toLowerCase().includes(searchValue.toLowerCase()) ||
                                    invoice.customer.country.toLowerCase().includes(searchValue.toLowerCase()) ||
                                    invoice.total.toString().includes(searchValue) ||
                                    invoice.date.toString().includes(searchValue) ||
                                    invoice.status.toString().includes(searchValue)
                            )
                            .map((invoice, index) => {
                                const isItemSelected = isSelected(invoice.number)

                                return (
                                    <Invoice
                                        id={invoice.id}
                                        number={invoice.number}
                                        date={invoice.date}
                                        customer={invoice.customer}
                                        status={invoice.status}
                                        key={index}
                                        handleClick={event => handleClick(event, invoice.number)}
                                        isItemSelected={isItemSelected}
                                        total={invoice.total}
                                        hasEmail={invoice.hasEmail}
                                        hasEinvoice={invoice.hasEinvoice}
                                        paymentComplete={invoice.paymentComplete}
                                    />
                                )
                            })}
                        {emptyRows > 0 && (
                            <TableRow>
                                <TableCell colSpan={5} />
                            </TableRow>
                        )}
                    </TableBody>
                </Table>{" "}
            </TableContainer>{" "}
            <TablePagination
                rowsPerPageOptions={[2, 4, 6]}
                component="div"
                count={invoicesArray.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                sx={{ minWidth: 750, width: "60%", margin: "auto" }}
            />
        </Card>
    )
}

export default InvoiceLayout
