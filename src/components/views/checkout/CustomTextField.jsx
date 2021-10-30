import React from "react";
import { TextField, Grid } from "@material-ui/core";
import { useFormContext, Controller } from "react-hook-form";
import styles from "./styles.module.scss";

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
