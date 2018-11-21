import React, {Component} from 'react';
import AppTopbar from '../apptopbar/AppTopbar';


export default class EmptyPage extends Component {
    constructor() {
        super();
        this.state = {}
    }


    render() {
        return (
            <div className="p-grid">
                <AppTopbar/>
                <div className="p-col p-col-4">
                    <p>placeholder</p>
                </div>
            </div>
        )
    }

}