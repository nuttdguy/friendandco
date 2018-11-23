import React, {Component} from 'react';


export default class AppTopbar extends Component {
    constructor() {
        super();
        this.state = {}
    }

    render() {
        return (
            <div className="topbar clearfix">

                {/*=====> menubar items for left side */}
                <div className="topbar-left">
                    <div className="logo"></div>
                </div>

                {/*=====> menu bar items right side */}
                <div className="topbar-right">
                    <div id="menu-button">
                        <i> </i>
                    </div>
                    <div id="rightpanel-menu-button">
                        <span>Welcome registered user</span>
                    </div>
                    <div id="topbar-menu-button">
                        <i className="material-icons">menu</i>
                    </div>
                </div>
            </div>
        )
    }
}