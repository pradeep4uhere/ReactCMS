import React, { Component } from 'react';  
import { Route, Switch } from 'react-router-dom';  
import Navigation from '../components/Navigation';
import LeftSideBar from '../components/LeftSideBar/LeftSideBar';
import DashboardPage from '../components/Page/DashboardPage';
import SettingPage from '../components/Page/SettingPage';
class DashboardLayout extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            loadComponent: this.props.component,
        };
        this.renderSwitch = this.renderSwitch.bind(this);
    }
    renderSwitch(param) {
      switch(param) {
        case 'DashboardPage': return '<DashboardPage/>';
        case 'SettingPage': return '<SettingPage/>';
        default: return '<DashboardPage/>';
      }
    }


   render(){
    const { loadComponent } = this.state
    console.log(this.props.component)
    return(
          <div> 
          <Navigation/> 
          <LeftSideBar/> 
          {
            {
              'DashboardPage': <DashboardPage />,
              'SettingPage': <SettingPage />,
            }[this.props.component]
          }
          
          </div>
        );
    };
}
export default DashboardLayout;
