import CommerceHandler from "../../../contexts/commerce-context";
import { useContext } from "react";
import { Elements, CardElement, ElementsConsumer } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import { Typography, Grid, Button, Paper } from "@material-ui/core";

import styles from "../styles.module.scss";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

function PaymentForm() {
    const commerceHandling = useContext(CommerceHandler);

    const handleSubmit = async (event, elements, stripe) => {
        event.preventDefault();

        if (!stripe || !elements) return;

        const cardElement = elements.getElement(CardElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod({ type: "card", card: cardElement });

        if (error) {
            console.log(error);
        } else {
            const orderData = {
                line_items: commerceHandling.checkoutToken.live.line_items,
                customer: {
                    firstname: commerceHandling.shippingData.fullName,
                    lastname: commerceHandling.shippingData.fullName,
                    email: commerceHandling.shippingData.emailAdress,
                },
                shipping: {
                    name: "Primary",
                    street: commerceHandling.shippingData.shippingAdress,
                    town_city: commerceHandling.shippingData.city,
                    county_state: commerceHandling.shippingData.shippingState,
                    postal_zip_code: commerceHandling.shippingData.zipCode,
                    country: commerceHandling.shippingData.shippingCountry,
                },
                fulfillment: {
                    shipping_method: commerceHandling.shippingData.shippingOption,
                },
                payment: {
                    gateway: "stripe",
                    stripe: {
                        payment_method_id: paymentMethod.id,
                    },
                },
            };
            commerceHandling.onCaptureCheckout(commerceHandling.checkoutToken.id, orderData);
            commerceHandling.checkoutNextStep();
        }
    };

    return (
        <>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Paper className={styles.review_paperWrapper}>
                        <Typography variant="h6">Payment Method</Typography>
                        <Elements stripe={stripePromise}>
                            <ElementsConsumer>
                                {({ elements, stripe }) => (
                                    <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
                                        <CardElement />
                                        <br />
                                        <br />
                                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                                            <Button variant="outlined" onClick={() => commerceHandling.checkoutBackStep()}>
                                                Back
                                            </Button>
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                disabled={!stripe}
                                                style={{
                                                    backgroundColor: "rgba(32, 36, 49, 1)",
                                                    color: "rgba(255, 255, 255, 0.8)",
                                                }}
                                            >
                                                Proceed Payment
                                            </Button>
                                        </div>
                                    </form>
                                )}
                            </ElementsConsumer>
                        </Elements>
                    </Paper>
                </Grid>
            </Grid>
        </>
    );
}

export default PaymentForm;
