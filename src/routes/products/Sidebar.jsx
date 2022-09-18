import { Box, Button, Checkbox, FormControlLabel, FormGroup, Grid, Slider, Typography } from "@mui/material";
import { useState } from "react";

function valuetext(value) {
    return `€${value}`;
}

function Sidebar({ handlePriceChange, priceRange, filterProducts }) {
    const [checked, setChecked] = useState(true);

    const handleChange = (event) => {
        setChecked(event.target.checked);
        console.log(checked);
    };

    return (
        <Box>
            <div>
                <Typography variant="subtitle1" align="left">
                    Price
                </Typography>
                <Grid container direction="row" justifyContent="space-between" alignItems="center">
                    <Slider
                        getAriaLabel={() => "Price range"}
                        value={priceRange}
                        getAriaValueText={valuetext}
                        onChange={handlePriceChange}
                        valueLabelDisplay="auto"
                        defaultValue={priceRange}
                        max={4000}
                    />
                    <Grid container direction="row" justifyContent="space-between" alignItems="center">
                        <Grid item md={4} xs={12}>
                            <Button
                                onClick={() => filterProducts()}
                                variant="contained"
                                size="small"
                                style={{ borderRadius: "30px", margin: ".6rem 0" }}
                            >
                                Filter
                            </Button>
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <Typography align="right" variant="body2">
                                Price: 0€ - 4000€
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
            <div>
                <Typography variant="subtitle1" align="left">
                    Filter
                </Typography>
                <Box>
                    <Typography variant="subtitle2" align="left">
                        Materials
                    </Typography>
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox onChange={handleChange} name="check1" color="default" />}
                            label="Synthetic Skin (6)"
                            labelPlacement="start"
                        />
                        <FormControlLabel
                            control={<Checkbox onChange={handleChange} name="check1" color="default" />}
                            label="Metal (88)"
                            labelPlacement="start"
                        />
                        <FormControlLabel
                            control={<Checkbox onChange={handleChange} name="check1" color="default" />}
                            label="Wooden (168)"
                            labelPlacement="start"
                        />
                        <FormControlLabel
                            control={<Checkbox onChange={handleChange} name="check1" color="default" />}
                            label="Fabric (42)"
                            labelPlacement="start"
                        />
                        <FormControlLabel
                            control={<Checkbox onChange={handleChange} name="check1" color="default" />}
                            label="Polyurethane (26)"
                            labelPlacement="start"
                        />
                        <FormControlLabel
                            control={<Checkbox onChange={handleChange} name="check1" color="default" />}
                            label="Foam (78)"
                            labelPlacement="start"
                        />
                    </FormGroup>
                </Box>
            </div>
        </Box>
    );
}

export default Sidebar;
