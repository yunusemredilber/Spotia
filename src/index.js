import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import 'semantic-ui-css/semantic.min.css';

import {Provider} from "react-redux";

import {store} from "./store";

import deepPurple from '@material-ui/core/colors/deepPurple';
import {CssBaseline} from "@material-ui/core";

let palette = {
    primary: deepPurple,
    secondary:{main:"#7e57c2"},
    /*type: 'dark',*/
};

const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
        suppressDeprecationWarnings: true,
        fontSize: 17,
    },
    palette: palette,
});



ReactDOM.render(
    <Provider store={store}>
    <MuiThemeProvider theme={theme}>
        <CssBaseline/>
    <App />
    </MuiThemeProvider>
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();

