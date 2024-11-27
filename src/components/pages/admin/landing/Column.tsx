// Components
import { Divider, Grid, Stack } from "@mui/material"

interface ColumnProps {
    header: string
    children: React.ReactElement
}

const Column: React.FunctionComponent<ColumnProps> = (props) => {
    return (
        <Grid item xs={6}>
            <Stack spacing={1} sx={{ mb: 4 }}>
                <h2>{props.header}</h2>

                <Divider flexItem sx={{ margin: "12px 0 !important" }} />

                {props.children}
            </Stack>
        </Grid>
    )
}

export default Column
