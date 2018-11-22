import React, {Component} from 'react';
import classNames from 'classnames';


export default class AppInlineProfile extends Component {

    constructor() {
        super();
        this.state = {
            expanded: false,
        }
    }

    render() {
        return (
            <div>
                <div className={classNames('profile', {'profile-expanded': this.state.expanded})}>
                    <a href="#/">
                        <img  className="profile-image" src="" alt="img of face"/>
                        <span className="profile-name">John Doe</span>
                        {/*===> add dropdown menu if desired */}
                        {/*<i className="material-icons">keyboard_arrow_down</i>*/}
                    </a>
                </div>
            </div>
        )
    }

}