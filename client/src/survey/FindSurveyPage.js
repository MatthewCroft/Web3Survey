import React, { Component } from "react";
import {Container, FormControl} from "@mui/material"

import getWeb3 from "../getWeb3";
import Survey from "../contracts/Survey.json";

//one function compenents, two forms, one for searching for options
//other for voting

class FindSurvey extends Component {

    state = { accounts: null, contract: null, web3: null, surveyName: null }

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

    findSurveyExists = async(surveyName) => {
        const { contract, accounts, web3 } = this.state;

        try {
            var options = await contract.methods.getPollOptions(surveyName).call()

            console.log(options);
        } catch(error) {
            
        }
    }

    render() {
        return (
            <Container>
                <FormControl>
                    <InputLabel htmlFor="component-outlined">Survey Name</InputLabel>
                    <OutlinedInput
                    id="component-outlined"
                    value={name}
                    onChange={this.findSurveyExists}
                    label="Name"
                    />
                </FormControl>
            </Container>
        )
    }
}