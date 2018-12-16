import React, {Component} from 'react';
import {Route} from "react-router-dom";

import 'primeflex/primeflex.css';
import 'primeflex/primegrid.css';
import 'primereact/resources/primereact.css';

import RegisterComponent from './Register.component';
import LoginComponent from './Login.component'

class App extends Component {


    render() {

        return (
            <div className='layout-content'>
                <Route exact path='/register' component={RegisterComponent}/>
                <Route exact path='/login' component={LoginComponent} />
            </div>
        )
    }

}

export default App;