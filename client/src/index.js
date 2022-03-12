import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Web3SurveyHomePage from './survey/Web3SurveyHomePage';
import CreateSurvey from './survey/CreateSurvey';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter,Routes,Route } from "react-router-dom";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

ReactDOM.render(

    <BrowserRouter>
        <Routes>
            <Route path="/" element={ <Web3SurveyHomePage/>}/>
            <Route path="/surveybuilder" element={ <CreateSurvey/>}/>
        </Routes>
    </BrowserRouter>, 

document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
