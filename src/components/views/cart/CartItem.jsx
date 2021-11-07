import React from "react";
import {
    Typography,
    Button,
    Grid,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    FormControl,
    NativeSelect,
    InputLabel,
} from "@material-ui/core";
import DeleteForever from "@material-ui/icons/DeleteForever";

import styles from "./styles.module.scss";

function CartItem({ item, onRemoveFromCart, onUpdateCartQty }) {
    return (
        <Card className={styles.cartCard}>
            <Grid container direction="row">
                <CardMedia image={item.media.source} alt={item.name} className={styles.cardImage} />
                <CardContent className={styles.cardContent}>
                    <Typography variant="h5">{item.name}</Typography>
                    <Typography variant="h6">{item.line_total.formatted_with_symbol}</Typography>
                </CardContent>
            </Grid>

            <CardActions className={styles.cardActions}>
                <Grid container direction="column">
                    <Grid item className={styles.actionFeatures}>
                        <FormControl className={styles.cardFormControl}>
                            <InputLabel className={styles.actionsInputLabel} variant="standard" htmlFor="packaging">
                                Select Packaging
                            </InputLabel>
                            <NativeSelect
                                defaultValue={10}
                                inputProps={{
                                    name: "Default Packaging",
                                    id: "packaging",
                                }}
                            >
                                <option value={10}>Default Packaging (Free)</option>
                                <option value={20}>International (€11,99)</option>
                                <option value={30}>Alaska (€29,99)</option>
                            </NativeSelect>
                        </FormControl>
                    </Grid>
                    <Grid
                        className={styles.actionFeatures}
                        item
                        container
                        direction="row"
                        justifyContent="space-evenly"
                        alignItems="center"
                    >
                        <Button
                            onClick={() => {
                                onUpdateCartQty(item.id, item.quantity - 1);
                            }}
                            className={styles.actionButton}
                            type="button"
                            size="small"
                        >
                            -
                        </Button>
                        <Typography>{item.quantity}</Typography>
                        <Button
                            onClick={() => {
                                onUpdateCartQty(item.id, item.quantity + 1);
                            }}
                            className={styles.actionButton}
                            type="button"
                            size="small"
                        >
                            +
                        </Button>
                        <Typography variant="h6">{item.line_total.formatted_with_symbol}</Typography>
                        <Button
                            onClick={() => {
                                onRemoveFromCart(item.id);
                            }}
                            className={styles.actionButton}
                            type="button"
                            size="small"
                            title="Remove All"
                        >
                            <DeleteForever fontSize="small" />
                        </Button>
                    </Grid>
                </Grid>
            </CardActions>
        </Card>
    );
}

export default CartItem;
