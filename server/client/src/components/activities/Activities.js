import React, {Component} from 'react';
// import classNames from 'classnames';


// TODO LIST
// add new activity
// your created activities
// activities you're leading
// activities you're participating

export default class Activities extends Component {

    constructor() {
        super();
        this.state = {
            activities: [
                {
                    title: 'Swim',
                    where: 'Alameda beach',
                    interest: 22,
                    match: 96,
                },
                {
                    title: 'Hiking',
                    where: 'Walnut Creek',
                    interest: 30,
                    match: 96,
                },
                {
                    title: 'Alan Walker',
                    where: 'San Francisco',
                    interest: 108,
                    match: 96,
                },
            ],
        }

    }


    render() {
        const activityList = this.state.activities.map((item, i) => {
            return (
                <div key={i} className="p-col-12 p-lg-4">
                    <div className="card card-w-title">
                        <h2>{item.title}</h2>
                        <h3>{item.where}</h3>
                        <h3>People interested: {item.interest}</h3>
                        <h3>Match %: {item.match}</h3>
                    </div>
                </div>)
            });

        return (
            <div className="p-grid p-fluid">
                <div className="p-col-12">
                    <h2 >Activities (All)</h2>
                </div>
                {activityList}
            </div>
        )
    }

}