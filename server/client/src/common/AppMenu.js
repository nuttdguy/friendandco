import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import classNames from 'classnames';

// TODO revisit and add sub-menu functional component


export default class AppMenu extends Component {

    // static defaultProps = {
    //     model: null,
    //     onMenuItemClick: null,
    //     onRootMenuItemClick: null,
    //     layoutMode: null,
    //     active: false
    // };


    render() {

        let items = this.props.model.map((item, i) => {
            return (
            <li key={i}>
                <a href="#/">
                    <i className="material-icons">{item.icon}</i>
                    <span> {item.label} </span>
                </a>
            </li>)
        });

        return (
            <ul className="ultima-menu ultima-main-menu clearfix">
                {items}
            </ul>
        );

    }

}