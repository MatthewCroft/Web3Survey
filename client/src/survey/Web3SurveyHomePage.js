import React, { Component } from "react";
import { AppBar, Container, IconButton, Toolbar, Typography, Button, Grid } from '@mui/material';
import Survey from "../contracts/Survey.json";
import { Link } from "react-router-dom";
import getWeb3 from "../getWeb3";
import '../index.css';
import CreateSurvey from './CreateSurvey';
import { padding } from "@mui/system";


class Web3SurveyHomePage extends Component {

    componentDidMount = async() => {

    }

    createSurvey = async() => {

    }

    //load web3, pass props
    
    render() {
        return (
            <Container>
            <Grid container paddingBottom={3}>
            <AppBar position="static">
                    <Toolbar variant="dense">
                        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                        </IconButton>
                        <Typography variant="h6" color="inherit" component="div">
                        Web3 Survey
                        </Typography>
                    </Toolbar>
                </AppBar>
                </Grid>
                <Link to="/surveybuilder" style={{textDecoration: "none"
                }} >
                    <Button variant="contained">
                        Create Survey
                    </Button>
                </Link>


                </Container>
        )
    }
}

export default Web3SurveyHomePage;