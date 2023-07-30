import { IconButton, InputBase, Paper } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"

function Search(props: { searchValue: string; setSearchValue: Function }) {
    const styles = {
        icon: { borderRadius: "0", backgroundColor: "#29b6f6", color: "white" },
        container: {
            borderRadius: "0",
            border: "0.1rem solid lightGrey",
        },
    }

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.setSearchValue(event.target.value)
    }
    return (
        <Paper style={styles.container} component="form" sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400, margin: "5rem 0" }}>
            <InputBase
                value={props.searchValue}
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search invoice by number, customer, total amo..."
                inputProps={{ "aria-label": "search google maps" }}
                onChange={onInputChange}
            />
            <IconButton type="button" aria-label="search" style={styles.icon}>
                <SearchIcon />
            </IconButton>
        </Paper>
    )
}

export default Search
