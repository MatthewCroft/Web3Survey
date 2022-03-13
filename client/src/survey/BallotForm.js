import { Container, Grid, Paper, Input, List, ListItem, Button, TextField } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import React from "react"
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { v4 as uuidv4 } from 'uuid';

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

function BallotForm(props) {
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

    const onSubmit = async(data) => {
        try {

            var options = []

            for (var i = 0; i < data.ballot.length; i++) {
                var ans = props.web3.utils.asciiToHex(data.ballot[i].option)
                options.push(ans)
            }

            var surveyName = props.web3.utils.randomHex(32)

            var actualSurveyName = await props.contract.methods.createVoteCard(options, surveyName).send({
                from: props.accounts[0]
            });

            console.log(actualSurveyName);

        } catch(error) {
            console.log(error);
        }
        console.log(data.ballot);
    };


    
    return (
    <div>
    <Grid container rowGap={3} paddingTop={5} paddingBottom={3}  > 
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
        </Grid>
        <Grid container rowGap={3}  > 
            <Paper elevation={3} className={classes.buttons} background="" >
                <form  onSubmit={handleSubmit(onSubmit)}>
                        <List>
                            {fields.map((item, index) =>( 
                            <ListItem  key={item.id}>
                                <Grid container item xs={5} justifyContent="flex-end" paddingRight={2}>
                                    <p>Option {index+1}:</p>
                                </Grid>
                                <Grid item xs={7} justifyContent="flex-start">
                                <Controller
                                    render={({field}) => 
                                    <TextField 
                                    id="outlined-name"
                                    label="Enter Survey Option"
                                    {...field} />
                                }
                                    name={`ballot.${index}.option`}
                                    control={control} />
                                </Grid>
                        
                            </ListItem>
                            ))}
                        </List>
                    <Grid container item justifyContent="flex-end" paddingRight={5} >
                        <Input type="submit" value="Create Survey"/>
                    </Grid>
                </form> 
            </Paper>
        </Grid>
    </div>
    )
}

export default BallotForm;