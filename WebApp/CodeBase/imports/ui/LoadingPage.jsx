import React from 'react';

import { SphereSpinner } from "react-spinners-kit";
import { makeStyles } from '@material-ui/core/styles';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({

    loader: {
        marginTop: "20%",

    },

}));

export default function CircularIndeterminate() {
    const classes = useStyles();

    return <Container className={classes.loader} maxWidth="xl">
        <SphereSpinner  size={100} color={"#008080"} />
    </Container>



}
