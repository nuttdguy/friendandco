import React, {Component} from 'react';
import {Route} from "react-router-dom";

import 'primeflex/primeflex.css';
import 'primeflex/primegrid.css';
import 'primereact/resources/primereact.css';

import RegisterComponent from './Register.component';
import LoginComponent from './Login.component'
import ActivityNewComponent from './Activity.New.component';
import ActivityViewComponent from './Activity.View.component';
import ActivityTagNewComponent from './ActivityTag.New.component';
import ActivityKindNewComponent from './ActivityKind.New.component';
import ActivitySceneNewComponent from './ActivityScene.New.component';
import ActivityPlaceNewComponent from './ActivityPlace.New.component';

class App extends Component {


    render() {

        return (
            <div className='layout-content'>
                <Route exact path='/register' component={RegisterComponent}/>
                <Route exact path='/login' component={LoginComponent} />
                <Route exact path='/activity' component={ActivityViewComponent} />
                <Route exact path='/activity/new' component={ActivityNewComponent} />
                <Route exact path='/activity/tag/new' component={ActivityTagNewComponent} />
                <Route exact path='/activity/kind/new' component={ActivityKindNewComponent} />
                <Route exact path='/activity/scene/new' component={ActivitySceneNewComponent} />
                <Route exact path='/activity/place/new' component={ActivityPlaceNewComponent} />
            </div>
        )
    }


}

export default App;