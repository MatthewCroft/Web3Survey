import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Container, Grid, IconButton, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import '../index.css';
import BallotForm from './BallotForm'
import getWeb3 from "../getWeb3";
import Survey from "../contracts/Survey.json";




class CreateSurvey extends Component {

    state = { web3: null, accounts: null, contract: null }

    componentDidMount = async() => {

        try {
            const web3 = await getWeb3();

            const accounts = await web3.eth.getAccounts();

            const networkId = await web3.eth.net.getId();

            const deployedNetwork = Survey.networks[networkId];
            const contract = new web3.eth.Contract(
                Survey.abi,
                deployedNetwork && deployedNetwork.address,
            );

            console.log(web3)

            this.setState({ accounts, contract, web3 })
        } catch (error) {
            console.log(error);
        }

    }

    
    render() {
        return(
        <Container>
            <Grid container>
            <AppBar position="static">
                    <Toolbar variant="dense">
                        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                        </IconButton>
                        <Link style={{ textDecoration: 'none' }} to="/">
                        <Typography variant="h6" color="inherit" component="div">
                            Web3 Survey
                        </Typography>
                        </Link>
                    </Toolbar>
            </AppBar>
            </Grid>
            <BallotForm
                web3={this.state.web3}
                contract={this.state.contract}
                accounts={this.state.accounts}
            />
        </Container>
    )};
}

export default CreateSurvey;