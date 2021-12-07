import { useEffect, useContext, useState } from "react";
import CommerceHandler from "../../contexts/commerce-context";
import { Link, useHistory } from "react-router-dom";
import {
    Stepper,
    Step,
    StepLabel,
    Grid,
    Typography,
    CircularProgress,
    Button,
    Paper,
    Divider,
    List,
    ListItem,
    ListItemText,
    StepConnector,
} from "@material-ui/core";

import AdressForm from "./components/AdressForm";
import PaymentDetails from "./components/PaymentDetails";
import PaymentForm from "./components/PaymentForm";
import Review from "./components/Review";

import { ReactComponent as CheckoutIcon } from "../../assets/checkout.svg";
import { ReactComponent as PaymentIcon } from "../../assets/payment.svg";
import { ReactComponent as ConfirmIcon } from "../../assets/confirm.svg";
import { ReactComponent as CheckoutIconActive } from "../../assets/checkoutAct.svg";
import { ReactComponent as PaymentIconActive } from "../../assets/paymentAct.svg";
import { ReactComponent as ConfirmIconActive } from "../../assets/confirmAct.svg";

import { ReactComponent as CheckoutComplete } from "../../assets/checkoutComplete.svg";
import { ReactComponent as TimeSvg } from "../../assets/time.svg";

import styles from "./styles.module.scss";

const steps = ["1. Checkout", "2. Payment", "3. Confirmation"];

function Checkout() {
    const commerceHandling = useContext(CommerceHandler);
    const { generateToken } = useContext(CommerceHandler);
    const [cartIsEmpty, setCartIsEmpty] = useState(false);
    const history = useHistory();

    useEffect(() => {
        history.listen(() => {
            if (history.location.pathname !== "/checkout") {
                commerceHandling.setStep(0);
            }
        });
    });

    useEffect(() => {
        const checkIfCartIsEmpty = () => {
            if (commerceHandling.cart.line_items && commerceHandling.cart.line_items.length === 0) {
                setCartIsEmpty(true);
            } else generateToken();
        };
        checkIfCartIsEmpty();
    }, [generateToken, commerceHandling.cart.line_items]);

    const Form = () =>
        commerceHandling.activeStep === 0 ? (
            <AdressForm checkoutToken={commerceHandling.checkoutToken} />
        ) : (
            <>
                <PaymentDetails />
            </>
        );

    let items = commerceHandling.checkoutToken
        ? commerceHandling.checkoutToken.live.line_items.map((product) => ({
              productId: product.id,
              productName: product.name,
              productImage: product.image.url,
              productQty: product.quantity,
              productPrice: product.line_total.formatted_with_symbol,
          }))
        : null;

    const CheckoutError = () =>
        cartIsEmpty ? (
            <>
                <Typography variant="h6">Your Cart is empty.</Typography>
                <br />
                <Button component={Link} variant="outlined" to="/">
                    Go to home page
                </Button>
            </>
        ) : null;

    let Confirmation = () =>
        commerceHandling.order.customer && commerceHandling.currentShipping ? (
            <>
                <Grid container spacing={4}>
                    <Grid item container direction="column" xs={12} md={6}>
                        <Paper className={styles.review_paperWrapper}>
                            <Grid container justifyContent="center" direction="column" wrap="nowrap" alignItems="center">
                                <CheckoutComplete style={{ padding: "2em 0" }} />
                                <Typography style={{ paddingBottom: ".6em" }} variant="h5">
                                    Order Confirmed
                                </Typography>
                                <Typography align="center" variant="body2">
                                    Your order have been confirmed {commerceHandling.order.customer.firstname}, please wait and track your order.
                                </Typography>
                                <Typography style={{ paddingBottom: "2em" }} variant="caption">
                                    Order Reference: {commerceHandling.order.customer_reference}
                                </Typography>
                                <Button
                                    variant="contained"
                                    style={{
                                        backgroundColor: "#4875ca",
                                        color: "rgba(255, 255, 255, 0.8)",
                                    }}
                                    component={Link}
                                    to="/"
                                >
                                    Go to home page
                                </Button>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item container direction="column" xs={12} md={6}>
                        <Paper className={styles.review_paperWrapper}>
                            <Grid container alignItems="center" style={{ marginBottom: "1em" }}>
                                <TimeSvg style={{ marginRight: ".6em" }} /> Up to 14 days delivery
                            </Grid>
                            <List style={{ marginBottom: "1em" }}>
                                <Typography variant="h6">Items</Typography>
                                {items.map((product) => (
                                    <ListItem key={product.productName}>
                                        <img
                                            src={product.productImage}
                                            width="60px"
                                            height="auto"
                                            style={{ marginRight: "1em", display: "inline-block" }}
                                            alt={product.productName}
                                        />
                                        <ListItemText primary={product.productName} secondary={`Quantity: ${product.productQty}`} />
                                        <Grid item>
                                            <Typography variant="subtitle1">{product.productPrice}</Typography>
                                        </Grid>
                                    </ListItem>
                                ))}
                            </List>
                            <Grid item container xs={12} justifyContent="space-between">
                                <Typography variant="h6">Subtotal</Typography>
                                <Typography>{commerceHandling.currentShipping.live.subtotal.formatted_with_symbol}</Typography>
                            </Grid>
                            <Grid item container xs={12} justifyContent="space-between">
                                <Typography variant="h6">Shipping Cost</Typography>
                                <Typography>{commerceHandling.currentShipping.price.formatted_with_symbol}</Typography>
                            </Grid>
                            <Divider variant="middle" style={{ margin: "1em 0" }} />
                            <Grid item container xs={12} justifyContent="space-between">
                                <Typography variant="h5">Grand Total</Typography>
                                <Typography variant="h5">{commerceHandling.currentShipping.live.total.formatted_with_symbol}</Typography>
                            </Grid>
                            <Divider variant="middle" style={{ margin: "1em 0" }} />
                            <Grid item container xs={12} justifyContent="space-between">
                                <Typography variant="body1">Shipping Adress</Typography>
                                <Typography variant="body1">
                                    {commerceHandling.shippingData.shippingCountry},{commerceHandling.shippingData.shippingAdress}, <br />
                                    {commerceHandling.shippingData.zipCode}
                                </Typography>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </>
        ) : (
            <Grid container justifyContent="center" alignItems="center">
                <CircularProgress />
            </Grid>
        );

    function StepIcons(props) {
        const { className } = props;

        const icons = {
            1: commerceHandling.activeStep === 0 ? <CheckoutIconActive className={styles.activeStepperIcon} /> : <CheckoutIcon />,
            2: commerceHandling.activeStep === 1 ? <PaymentIconActive className={styles.activeStepperIcon} /> : <PaymentIcon />,
            3: commerceHandling.activeStep === 2 ? <ConfirmIconActive className={styles.activeStepperIcon} /> : <ConfirmIcon />,
        };

        return <div className={className}>{icons[String(props.icon)]}</div>;
    }

    return (
        <>
            <main className={styles.checkout__layout}>
                <Stepper
                    connector={<StepConnector classes={{ root: styles.connectorLine, alternativeLabel: styles.connectorAlternativeLabel }} />}
                    alternativeLabel
                    activeStep={commerceHandling.activeStep}
                    className={styles.checkout__stepper}
                >
                    {steps.map((step) => (
                        <Step key={step}>
                            <StepLabel classes={{ active: styles.activeStepLabel }} StepIconComponent={StepIcons}>
                                {step}
                            </StepLabel>
                        </Step>
                    ))}
                </Stepper>

                <Grid container direction="row" columns={2} spacing={4}>
                    <Grid item xs={12} md={6}>
                        {commerceHandling.activeStep === 2 ? null : <Review />}
                    </Grid>

                    <Grid item xs={12} md={6}>
                        {commerceHandling.activeStep === 2 ? null : commerceHandling.checkoutToken && <Form />}
                    </Grid>

                    {commerceHandling.activeStep >= 1 ? (
                        <Grid item xs={12}>
                            {commerceHandling.checkoutToken && commerceHandling.activeStep === 1 ? (
                                <PaymentForm />
                            ) : commerceHandling.activeStep === 2 ? (
                                <Confirmation />
                            ) : (
                                <Grid container xs={12} justifyContent="center" alignItems="center">
                                    <CircularProgress />
                                </Grid>
                            )}
                        </Grid>
                    ) : null}

                    {commerceHandling.activeStep !== 2 || (commerceHandling.currentShipping && commerceHandling.currentShipping.valid === false) ? (
                        <Grid item container xs={12} justifyContent="center" direction="column" alignItems="center">
                            <CheckoutError />
                        </Grid>
                    ) : null}
                </Grid>
            </main>
        </>
    );
}

export default Checkout;
