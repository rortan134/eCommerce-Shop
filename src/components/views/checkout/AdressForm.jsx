import { commerce } from "../../../lib/commerce";
import { useState, useEffect, useContext } from "react";
import { InputLabel, Select, MenuItem, Button, Grid, Typography, Paper } from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form";
import CustomTextField from "./CustomTextField";
import { Link } from "react-router-dom";
import CommerceHandler from "../../shared/commerce-context";

import styles from "./styles.module.scss";

function AdressForm({ checkoutToken }) {
    const commerceHandling = useContext(CommerceHandler);

    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState("");
    const [shippingStates, setShippingStates] = useState([]);
    const [shippingState, setShippingState] = useState("");
    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippingOption, setShippingOption] = useState("");

    const methods = useForm();

    const countries = Object.entries(shippingCountries).map(([code, name]) => ({ id: code, label: name }));
    const states = Object.entries(shippingStates).map(([code, name]) => ({ id: code, label: name }));
    const options = shippingOptions.map((sO) => ({
        id: sO.id,
        label: `${sO.description} - (${sO.price.formatted_with_symbol})`,
    }));

    const fetchShippingCountries = async (checkoutTokenId) => {
        const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);
        setShippingCountries(countries);
        setShippingCountry(Object.keys(countries)[0]);
    };

    const fetchSubdivisions = async (countryCode) => {
        const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode);
        setShippingStates(subdivisions);
        setShippingState(Object.keys(subdivisions)[0]);
    };

    const fetchShippingOptions = async (checkoutTokenId, country, region = null) => {
        const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region });
        setShippingOptions(options);
        setShippingOption(options[0].id);
    };

    useEffect(() => {
        fetchShippingCountries(checkoutToken.id);
    }, []);

    useEffect(() => {
        if (shippingCountry) fetchSubdivisions(shippingCountry);
    }, [shippingCountry]);

    useEffect(() => {
        if (shippingState) fetchShippingOptions(checkoutToken.id, shippingCountry, shippingState);
    }, [shippingState]);

    return (
        <>
            <div className={styles.all_aroundWrapper}>
                <Paper className={styles.adressForm__layout}>
                    <Typography className={styles.adressForm__title} variant="h6">
                        Shipping Information
                    </Typography>
                    <FormProvider {...methods}>
                        <form
                            onSubmit={methods.handleSubmit((data) => commerceHandling.checkoutNext({
                                ...data,
                                shippingCountry,
                                shippingState,
                                shippingOption,
                            }))}
                        >
                            <Grid container alignItems="center" className={styles.innerFormWrapper}>
                                <CustomTextField name="fullName" label="Fullname" />
                                <CustomTextField name="emailAdress" label="Email Adress" />
                                <CustomTextField name="phoneNumber" label="Phone Number" />
                                <CustomTextField name="city" label="City" />
                                <CustomTextField name="shippingAdress" label="Shipping Adress" />
                                <Grid className={styles.formSelect} item xs={12}>
                                    <InputLabel>Country</InputLabel>
                                    <Select
                                        fullWidth
                                        value={shippingCountry}
                                        onChange={(e) => setShippingCountry(e.target.value)}
                                    >
                                        {countries.map((country) => (
                                            <MenuItem key={country.id} value={country.id}>
                                                {country.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </Grid>

                                <Grid item container spacing={2} direction="row" xs="auto">
                                    <Grid className={styles.formInput} item container xs={6}>
                                        <InputLabel>State / Province</InputLabel>
                                        <Select
                                            fullWidth
                                            value={shippingState}
                                            onChange={(e) => setShippingState(e.target.value)}
                                        >
                                            {states.map((state) => (
                                                <MenuItem key={state.id} value={state.id}>
                                                    {state.label}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </Grid>
                                    <Grid item container xs={6}>
                                        <CustomTextField required name="zipCode" label="Zip Code" />
                                    </Grid>
                                </Grid>
                                <Grid className={styles.formSelect} item xs={12}>
                                    <InputLabel>Delivery</InputLabel>
                                    <Select
                                        fullWidth
                                        value={shippingOption}
                                        onChange={(e) => setShippingOption(e.target.value)}
                                    >
                                        {options.map((option) => (
                                            <MenuItem key={option.id} value={option.id}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </Grid>
                            </Grid>
                            <Grid
                                className={styles.continueButtons}
                                container
                                justifyContent="space-between"
                                alignItems="center"
                                wrap="nowrap"
                            >
                                <Button component={Link} to="/cart" size="large" variant="outlined">
                                    Continue Shopping
                                </Button>
                                <Button
                                    type="submit"
                                    style={{
                                        backgroundColor: "rgba(32, 36, 49, 1)",
                                        color: "rgba(255, 255, 255, 0.8)",
                                    }}
                                    size="large"
                                    variant="contained"
                                >
                                    Confirm
                                </Button>
                            </Grid>
                        </form>
                    </FormProvider>
                </Paper>
            </div>
        </>
    );
}

export default AdressForm;
