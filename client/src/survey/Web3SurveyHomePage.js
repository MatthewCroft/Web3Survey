import React, { Component } from "react";
import getWeb3 from "../getWeb3";
import '../index.css';
import moment from 'moment';
import {Link} from "react-router-dom";
import {Button, AppBar, IconButton, Toolbar, Typography, Input, Paper, Grid, Item, Container,} from '@mui/material';


class Web3SurveyHomePage extends Component {
    
    render() {
        return (
            <Container>
            <AppBar position="static">
                    <Toolbar variant="dense">
                        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                        </IconButton>
                        <Typography variant="h6" color="inherit" component="div">
                        Web3 Survey
                        </Typography>
                    </Toolbar>
                </AppBar>
                <h1>
                </h1>
                <Link style={{ textDecoration: 'none' }} to="/surveybuilder">
                    <Button variant="contained">
                        Create Survey
                    </Button>
                </Link>

                </Container>
        )
    }
}

export default Web3SurveyHomePage;