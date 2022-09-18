import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

import styles from "../styles.module.scss";

function CustomTextField({ name, label }) {
    const { control } = useFormContext();

    return (
        <Grid className={styles.formInput} item xs={12}>
            <Controller
                defaultValue=""
                control={control}
                name={name}
                render={({ field }) => <TextField fullWidth label={label} required {...field} />}
            />
        </Grid>
    );
}
export default CustomTextField;
