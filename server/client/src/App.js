import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {withRouter} from "react-router";
import jwt_decode from 'jwt-decode';

import setAuthToken from './utils/setAuthToken';
import {setCurrentUser, logoutUser} from './actions/authAction';
import {clearCurrentProfile} from './actions/profileActions';

import {Provider} from 'react-redux';
// import store from './store';
import classNames from 'classnames';

import {AppBreadcrumb} from "./common/AppBreadcrumb";
import AppTopbar from './common/AppTopbar';
import Dashboard from './components/dashboard/Dashboard';
import AppMenu from './common/AppMenu';
import AppInlineProfile from './common/AppInlineProfile'
import Activities from './components/activities/Activities';
import {ActivityForm} from "./components/activities/activityform/ActivityForm";
import {ScrollPanel} from 'primereact/scrollpanel';
import 'primeflex/primeflex.css';
import 'primeflex/primegrid.css';
import 'primereact/resources/primereact.css';
import './App.css';


// check for token
// if (localStorage.jwtToken) {
//     setAuthToken(localStorage.jwtToken);
//     // Set auth token header auth
//     const decoded = jwt_decode(localStorage.jwtToken);
//     // Set user and isAuthenticated
//     store.dispatch(setCurrentUser(decoded));
//
//     // Check for expired token
//     const currentTime = Date.now() / 1000;
//     if (decoded.exp < currentTime) {
//         // Logout user
//         store.dispatch(logoutUser());
//         // Clear current profile
//         store.dispatch(clearCurrentProfile());
//         // Redirect to login
//         window.place.href = '/login';
//     }
// }


class App extends Component {

    constructor() {
        super();
        this.state = {
            layoutMode: 'static',
            profileMode: 'inline',
            horizontal: 'horizontal',
            overlayMenuActive: null,
            staticMenuDesktopInactive: false,
            staticMenuMobileActive: false,
            darkMenu: true,
            rightPanelActive: false,
            menuActive: false
        };

        this.onDocumentClick = this.onDocumentClick.bind(this);
        this.onMenuClick = this.onMenuClick.bind(this);
        this.onMenuButtonClick = this.onMenuButtonClick.bind(this);
        this.onMenuItemClick = this.onMenuItemClick.bind(this);
        this.onRootMenuItemClick = this.onRootMenuItemClick.bind(this);

        this.createMenu();

    }

    // set sidebar menu
    onMenuClick(event) {
        this.menuClick = true;

        if (!this.isHorizontal()) {
            setTimeout(() => {
                this.layoutMenuScroller.moveBar();
            }, 500);
        }
    }

    // this sets the state of menus
    onDocumentClick(event) {
        //    TODO add logic for menu

    }

    onMenuItemClick(event) {

    }

    onRootMenuItemClick(event) {

    }

    onMenuButtonClick(event) {

    }

    isOverlay() {
        return this.state.layoutMode === 'overlay';
    }

    isHorizontal() {
        return this.state.layoutMode === 'horizontal';
    }

    isSlim() {
        return this.state.layoutMode === 'slim';
    }

    createMenu() {
        this.menu = [
            //===> TODO add user and peer rating
            {
                label: 'Dashboard', icon: 'dashboard', command: () => {
                    window.location = "#/"
                }
            },
            {
                label: 'Activities', icon: 'palette',
                items: [
                    {label: 'category', icon: 'menu'},
                    {label: 'mob size', icon: 'menu'}
                ]
            },
            {
                label: 'Your Activities', icon: 'menu', command:()=>{window.location="#/activities"},
                items: [
                    {label: 'new', icon: 'menu', command:()=>{window.location ="#/activities/activityform"}},
                    {label: 'list', icon: 'menu'},
                    {label: 'lead', icon: 'menu'},
                    {label: 'participate', icon: 'menu'},
                ]
            },
            {
                label: 'Profile', icon: 'contacts',
                items: [
                    {label: 'identity', icon: 'label'},
                    {label: 'match preferences', icon: 'label'},
                    {label: 'social preferences', icon: 'label'},
                    {label: 'self identified persona tags', icon: 'label'},
                    {label: 'interested activity tags', icon: 'label-outline'},
                    {label: 'self identified values tags', icon: 'label'},
                    {label: 'peer identified tags', icon: 'person-pin'}
                ]
            },
            {
                label: 'social', icon: 'person-pin',
                items: [
                    {label: 'matches', icon: 'contacts'},
                    {label: 'friends', icon: 'contacts'},
                    {label: 'messages', icon: 'menu'}
                ]
            }
        ]
    }

    render() {

        // this is used to layout side menu
        const layoutContainerClassName = classNames('layout-container', {
            'menu-layout-static': this.state.layoutMode !== 'overlay',
            'menu-layout-overlay': this.state.layoutMode === 'overlay',
            'layout-menu-overlay-active': this.state.overlayMenuActive,
            'menu-layout-slim': this.state.layoutMode === 'slim',
            'menu-layout-horizontal': this.state.layoutMode === 'horizontal',
            'layout-menu-static-inactive': this.state.staticMenuDesktopInactive,
            'layout-menu-static-active': this.state.staticMenuMobileActive
        });

        //=====> sidebar menu configuration
        const menuClassName = classNames('layout-menu', {'layout-menu-dark:': this.state.darkMenu});
        const AppBreadCrumbWithRouter = withRouter(AppBreadcrumb);

        return (
            <div className="layout-wrapper" onClick={this.onDocumentClick}>

                {/*=== > if side menu is desired, replace layout-container with layoutContainerClassName */}
                <div ref={(el) => this.layoutContainer = el} className={layoutContainerClassName}>

                    {/*====> this is the horizontal top bar*/}
                    <AppTopbar
                        profileMode={this.state.profileMode}
                        horizontal={this.props.horizontal}> </AppTopbar>


                    {/*=====> sidebar menu */}
                    <div className={menuClassName} onClick={this.onMenuClick}>
                        <ScrollPanel ref={(el) => this.layoutMenuScroller = el} style={{height: '100%'}}>

                            <div className="menu-scroll-content">
                                {/*=====> add <AppLineProfile /> component if what the expanded profile view*/}
                                {(this.state.profileMode === 'inline' && this.state.horizontal === 'horizontal') &&
                                <AppInlineProfile/>}

                                {/*== TODO add menu item click for command in appMenu */}
                                <AppMenu

                                    model={this.menu}
                                    onMenuItemClick={this.onMenuItemClick}
                                    onRootMenuItemClick={this.onRootMenuItemClick}
                                    layoutMode={this.state.layoutMode}
                                    active={this.state.menuActive}
                                />
                            </div>

                        </ScrollPanel>
                    </div>


                    {/* =========> BEGIN MAIN LAYOUT */}
                    <div className="layout-main">

                        <AppBreadCrumbWithRouter/>

                        {/* ==========> BEGIN MAIN CONTENT LAYOUT */}
                        <div className="layout-content">

                            <Route path="/" exact component={Dashboard}/>
                            <Route path="/activities" exact component={Activities}/>
                            <Route path="/activities/activityform" component={ActivityForm}/>

                        </div>

                        {/* a dark tint overlay mask */}
                        <div className="layout-mask"></div>


                    </div>
                </div>


            </div>
        );
    }
}

export default App;
