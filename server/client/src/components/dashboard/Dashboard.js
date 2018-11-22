import React, {Component} from 'react';


export default class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            color: 'rgb(0, 150, 136)',
        };
    }

    render() {

        return (

            // this is for the dashboard main view
            <div className="p-grid dashboard">

                {/*=====> this is for breaking down grid. Use for displaying activities */}
                <div className="p-col-8 p-md-8">

                    {/*=====> TODO convert card into a self contained component */}
                    <div className="card overview">
                        <div className="overview-content clearfix">
                            <span className="overview-title">Activity Title</span>
                            <span className="overview-badge">Organizer Groups (3)</span>
                            <span className="overview-detail">Activity Description</span>
                            <img className="overview-footer" alt="add new css rules for img" />
                            <button>Join</button>
                        </div>
                    </div>
                </div>

                {/*=====> add timeline for activities */}
                <div className="p-col-4 p-col-md-4">
                    <div className="card timeline p-fluid">
                        <div className="p-grid">

                            {/* this is a group of individual events in timeline */}

                            <div className="p-col-12">
                                <h3>your activity</h3>
                            </div>
                            <div className="p-col-3">
                                <span className="event-time">just now</span>
                                <i className="material-icons" ></i>
                            </div>
                            <div className="p-col-9">
                                <span className="event-owner">Katherine May</span>
                                <span className="event-text">Lorem ipsum text</span>
                                <div className="event-content">
                                    <img src="" alt="md"/>
                                </div>
                            </div>

                            <div className="p-col-3">
                                <span className="event-time">12h ago</span>
                                <i className="material-icons" ></i>
                            </div>
                            <div className="p-col-9">
                                <span className="event-owner">Katherine May</span>
                                <span className="event-text">Lorem ipsum text</span>
                                <div className="event-content">
                                    <img src="" alt="md"/>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        )
    }
}