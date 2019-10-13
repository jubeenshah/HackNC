import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import Container from '@material-ui/core/Container';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import InputBase from '@material-ui/core/InputBase';
import DynamicFeed from '@material-ui/icons/DynamicFeed';
import Search from '@material-ui/icons/Search';

import SearchBar from './Search';



const useStyles = makeStyles(theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.grey,
        },
    },
    paper: {
        marginTop: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    inline: {
        display: 'inline',
    }

}));



export default function Home(props) {
    const classes = useStyles();




    return (
        <Container component="main" maxWidth="xl">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <Search />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Search
                </Typography>
                <Grid container alignItems="center" justify="center" spacing={0}>
                    <Grid item xs={12}>
                        <SearchBar suggestions={props.data.recipe_suggestions} />
                    </Grid>
                </Grid>
            </div>
        </Container>
    );
}