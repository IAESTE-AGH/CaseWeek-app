// Components
import { Grid, CircularProgress as MUICircularProgress } from "@mui/material"

const CircularProgress: React.FunctionComponent = () => {
    return (
        <Grid
            container //
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: "100vh" }}
        >
            <Grid item xs={3}>
                <MUICircularProgress />
            </Grid>
        </Grid>
    )
}

export default CircularProgress
