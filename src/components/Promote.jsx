import { Container, Grid, Button, Box, Typography, CardMedia } from "@mui/material";
import PromoteImg from "../assets/images/Promote.png";

function Promote() {
    return (
        <Container sx={{ padding: "6% 0" }}>
            <Grid container justifyContent="space-evenly" alignItems="center" spacing={4}>
                <Grid item xs={4}>
                    <CardMedia sx={{ maxHeight: "300px", objectFit: "contain" }} component={"img"} image={PromoteImg} alt="promote" />
                </Grid>
                <Grid item container xs={8} spacing={4} alignItems="center" justifyContent="center">
                    <Grid item xs={6}>
                        <Box sx={{ padding: "0.3rem .6rem", border: "solid 2px gray", boxShadow: "0 15px 25px rgba(0,0,0,.1)" }}>
                            <Grid container justifyContent="center" alignItems="center" wrap="nowrap">
                                <Typography variant="defaultSubtitle" noWrap>
                                    use coupon code:&nbsp;
                                </Typography>
                                <Typography variant="contrastSubtitle" sx={{ fontWeight: "500" }}>
                                    SOFA100
                                </Typography>
                            </Grid>
                        </Box>
                    </Grid>
                    <Grid item xs={5}>
                        <Button variant="contained">Explore</Button>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Promote;
