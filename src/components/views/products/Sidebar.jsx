import { useState } from "react";
import { Box, Typography, Grid, Checkbox, FormControlLabel, FormGroup, Slider } from "@material-ui/core";
import styles from "./styles.module.scss";

function valuetext(value) {
    return `€${value}`;
}

function Sidebar({handlePriceChange, priceRange}) {
    const [checked, setChecked] = useState(true);
    const handleChange = (event) => {
        setChecked(event.target.checked);
        console.log(checked);
    };

    return (
        <Box className={styles.sidebarWrapper}>
            <div className={styles.sidebarInnerWrapper}>
                <Typography className={styles.title} variant="subtitle1" align="left">
                    Price
                </Typography>
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    className={styles.colorsGrid}
                >
                    <Slider
                        getAriaLabel={() => "Price range"}
                        value={priceRange}
                        getAriaValueText={valuetext}
                        onChange={handlePriceChange}
                        valueLabelDisplay="auto"
                        defaultValue={priceRange}
                        max={4000}
                        classes={{root: styles.sliderWrapper}}
                    />
                    <Typography>0€</Typography>
                    <Typography>4000€</Typography>
                </Grid>
            </div>
            <div className={styles.sidebarInnerWrapper}>
                <Typography className={styles.title} variant="subtitle1" align="left">
                    Filter
                </Typography>
                <Box>
                    <Typography className={styles.subtitle} variant="subtitle2" align="left">
                        Materials
                    </Typography>
                    <FormGroup classes={{root: styles.checkboxesContainer}}>
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
