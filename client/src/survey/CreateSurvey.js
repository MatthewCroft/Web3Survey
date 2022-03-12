import React from "react";
import { useForm, useFieldArray, Controller, useWatch } from "react-hook-form";
import ReactDOM from "react-dom";
import getWeb3 from "../getWeb3";
import '../index.css';
import TextField from '@mui/material/TextField';
import { makeStyles } from "@material-ui/core/styles";
import Button from '@mui/material/Button';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {Link} from "react-router-dom";
import { Input, Paper, Grid, Item, Container, Box, AppBar, IconButton, Toolbar, Typography} from "@mui/material";
import { alignProperty } from "@mui/material/styles/cssUtils";
import { textAlign } from "@mui/system";

const useStyles = makeStyles((theme) => ({
  input: {
    background: "rgb(232, 241, 250)",
  },
  buttons: {
      padding: "10px",
      width: "100%",
      height: "100%"
  },
  items: {
      justifyContent: "center"
  }
}));

// let schema = yup.object().shape({
//     option: yup.string().max(50).required()
//   });

function CreateSurvey(props) {
    const classes = useStyles();

    const { register, control, handleSubmit, reset, watch, formState:{ errors } } = useForm({
        defaultValues: {
            ballot: [{option: ""}]
        },
        // resolver: yupResolver(schema)
    })
    const { fields, append, prepend, remove } = useFieldArray({
        control,
        name: "ballot"
    })

    const onSubmit = (data) => {
        console.log(data);
      };

    return (
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
            <Grid container rowGap={3} >
                <Grid container item justifyContent="center">
                    <h1>
                        Create Survey
                    </h1>
                </Grid>   
                <Grid container item xs={9} justifyContent="flex-start">
                    <Button variant="contained" onClick={() => {reset()}}>
                        Reset
                    </Button>
                </Grid>
                <Grid container item xs={2} justifyContent="center">
                    <Button variant="contained" onClick={() => {append()}}>
                        Add Option
                    </Button>
                </Grid>
                <Grid container item xs={1} justifyContent="flex-end" >
                    <Button variant="contained" onClick={() => {remove(1)}}>
                        Remove
                    </Button>
                </Grid>
                <Grid container item  > 
                    <Paper elevation={3} className={classes.buttons} background="" >
                        <form  onSubmit={handleSubmit(onSubmit)}>
                            <Grid container item justifyContent="center"  columnSpacing={3}>
                                <ul>
                                    {fields.map((item, index) =>( 
                                    <li  key={item.id}>                                     
                                        <Controller
                                            render={({field}) =>
                                            <p textAlign="center">Option {index+1}: &nbsp;
                                            <TextField
                                            {...field} />
                                            </p>  
                                           }
                                            name={`ballot.${index}.option`}
                                            control={control} />
                                 
                                    </li>
                                    ))}
                                </ul>
                            </Grid>
                            <Grid container item justifyContent="flex-end" paddingRight={5} >
                                <Input type="submit" value="Create Survey"/>
                            </Grid>
                        </form> 
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}

export default CreateSurvey;