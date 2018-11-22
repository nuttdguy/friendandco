import React, {Component} from 'react';
import AppTopbar from './AppTopbar';


export default class EmptyPage extends Component {
    constructor() {
        super();
        this.state = {}
    }


    render() {
        return (
            <div className="layout-container layout-main">
                <AppTopbar/>
                {/*<div className="card p-col-12">*/}
                    {/*<p>placeholder</p>*/}
                {/*</div>*/}
            </div>
        )
    }

}