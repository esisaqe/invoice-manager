import * as React from "react"
import { Checkbox, Stack, Typography } from "@mui/material"
import { InvoiceStatus } from "../../../App/enum"
import "./InvoiceStyle.css"
import AllInboxIcon from "@mui/icons-material/AllInbox"
import TableCell from "@mui/material/TableCell"
import DescriptionIcon from "@mui/icons-material/Description"
import TableRow from "@mui/material/TableRow"
import LocalAtmIcon from "@mui/icons-material/LocalAtm"
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import { Button, ListItem, Menu, MenuItem } from "@mui/material"
import Fade from "@mui/material/Fade"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../../App/store"
import { getInvoiceData } from "./InvoiceSlice"

function Invoice(props: {
    id: number
    number: string
    date: string
    customer: { number: number; name: string; country: string }
    status: keyof typeof InvoiceStatus
    handleClick: React.MouseEventHandler<HTMLTableRowElement>
    key: number
    total: number
    isItemSelected: boolean
    hasEmail: boolean
    hasEinvoice: boolean
    paymentComplete: boolean
}) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)
    const [openStatus, setOpenStatus] = React.useState<boolean>(false)
    const statusArray = [InvoiceStatus.Completed, InvoiceStatus.Confirmed, InvoiceStatus.Draft, InvoiceStatus.Reversed]
    const labelId = `enhanced-table-checkbox-${props.key}`
    const invoicesArray = useSelector((state: RootState) => state.InvoiceDataSlice.invoiceData)
    const dispatch = useDispatch()

    const styles = {
        mainText: {
            fontWeight: 500,
            color: "#263238",
        },
        subText: {
            fontSize: "0.8rem",
            color: "#bdbdbd",
            align: "start",
        },
        checkbox: {
            color: "#81d4fa",
        },
        link: {
            color: "#29b6f6",
            textDecoration: "underline",
            "&:hover": {
                color: "#0277bd",
            },
            paddingTop: "0.2rem",
        },
        label: {
            padding: "0.2rem 0.3rem",
            borderRadius: "0.2rem",
            marginLeft: "0.5rem",
            fontWeight: 500,
        },
    }

    const getLabelColor = (status: keyof typeof InvoiceStatus) => {
        switch (status) {
            case InvoiceStatus.Draft:
                return "grey"

            case InvoiceStatus.Completed:
                return "green"

            case InvoiceStatus.Reversed:
                return "#01579b"

            case InvoiceStatus.Confirmed:
                return "#ffc400"
            default:
                break
        }
    }

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }
    const handleStatusDroddownOpen = () => {
        setOpenStatus(!openStatus)
    }

    const handleStatusChange = (status: any) => {
        const getIndex = invoicesArray.findIndex(obj => {
            return obj.id === props.id
        })
        const newStatusArray = JSON.parse(JSON.stringify(invoicesArray))
        newStatusArray[getIndex].status = status.toString()
        dispatch(getInvoiceData(newStatusArray))
        setAnchorEl(null)
        setOpenStatus(false)
    }

    const handleDeleteClick = () => {
        const updatedData = invoicesArray.filter(item => item.id !== props.id)
        dispatch(getInvoiceData(updatedData))
    }

    return (
        <TableRow
            hover
            onClick={props.handleClick}
            role="checkbox"
            aria-checked={props.isItemSelected}
            tabIndex={-1}
            key={props.key}
            selected={props.isItemSelected}
            sx={{ cursor: "pointer" }}
        >
            <TableCell padding="checkbox">
                <Checkbox
                    color="primary"
                    checked={props.isItemSelected}
                    inputProps={{
                        "aria-labelledby": labelId,
                    }}
                    style={styles.checkbox}
                />
            </TableCell>
            <TableCell component="th" id={labelId} scope="row" padding="none">
                <Stack direction="row">
                    <Typography variant="body1" style={styles.link}>
                        {props.number}
                    </Typography>
                    <Typography
                        variant="body1"
                        style={styles.label}
                        sx={{ bgcolor: getLabelColor(props.status), color: props.status === InvoiceStatus.Confirmed ? "black" : "white" }}
                    >
                        {props.status}
                    </Typography>
                </Stack>
                <Typography variant="body2" style={styles.subText}>
                    {"Last edited " + props.date}
                </Typography>
            </TableCell>
            <TableCell align="right" style={styles.mainText}>
                {props.date}
            </TableCell>
            <TableCell align="right">
                <AllInboxIcon sx={{ color: props.hasEmail ? "green" : "grey" }} />
            </TableCell>
            <TableCell align="right">
                <DescriptionIcon sx={{ color: props.hasEinvoice ? "green" : "grey" }} />
            </TableCell>
            <TableCell align="right">
                <LocalAtmIcon
                    sx={{ color: props.status === InvoiceStatus.Completed ? "green" : props.status === InvoiceStatus.Confirmed ? "#ffc400" : "grey" }}
                />
            </TableCell>
            <TableCell align="right">
                <AccountBalanceWalletIcon
                    sx={{ color: props.status === InvoiceStatus.Draft ? "grey" : props.status === InvoiceStatus.Confirmed ? "#ffc400" : "green" }}
                />
            </TableCell>
            <TableCell align="right">
                <Typography variant="body1" style={styles.mainText}>
                    {props.customer.name}{" "}
                </Typography>
                <Typography variant="body2" style={styles.subText}>
                    {props.customer.country}
                </Typography>
            </TableCell>
            <TableCell align="right">{props.total + " €"}</TableCell>
            <TableCell>
                <div>
                    <Button
                        aria-controls={open ? "fade-menu" : undefined}
                        sx={{ color: "#29b6f6" }}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        onClick={handleClick}
                    >
                        <MoreVertIcon /> Actions
                    </Button>
                    <Menu
                        id="fade-menu"
                        MenuListProps={{
                            "aria-labelledby": "fade-button",
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        TransitionComponent={Fade}
                    >
                        <MenuItem onClick={handleDeleteClick}>Delete</MenuItem>
                        <MenuItem onClick={handleStatusDroddownOpen}>Change Status</MenuItem>
                        {openStatus &&
                            statusArray
                                .filter(status => status !== props.status)
                                .map((status, index) => (
                                    <ListItem
                                        sx={{
                                            "& .MuiListItem-root:hover": {
                                                bgcolor: "orange",
                                                "&, & .MuiListItemIcon-root": {
                                                    color: "yellow",
                                                },
                                            },
                                        }}
                                        key={index}
                                        onClick={() => handleStatusChange(status)}
                                    >
                                        {status}
                                    </ListItem>
                                ))}
                    </Menu>
                </div>
            </TableCell>
        </TableRow>
    )
}

export default Invoice
