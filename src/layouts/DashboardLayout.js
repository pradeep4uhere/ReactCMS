import React, { Component } from 'react';  
import { Route, Switch } from 'react-router-dom';  
import Navigation from '../components/Navigation';
import LeftSideBar from '../components/LeftSideBar/LeftSideBar';
import DashboardPage from '../components/Page/DashboardPage';
import SettingPage from '../components/Page/SettingPage';
import MemberListPage from '../components/Page/MemberListPage';
import EventListPage from '../components/Page/Event/EventListPage';
import EventAddPage from '../components/Page/Event/EventAddPage';
import EventDetailPage from '../components/Page/Event/EventDetailPage';
import EventGalleryPage from '../components/Page/Event/EventGalleryPage';

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
        case 'DashboardPage'  : return '<DashboardPage/>';
        case 'SettingPage'    : return '<SettingPage/>';
        case 'MemberListPage' : return '<MemberListPage/>';
        case 'EventListPage'  : return '<EventListPage/>';
        case 'EventAddPage'   : return '<EventAddPage/>';
        case 'EventDetailPage': return '<EventDetailPage/>';
        case 'EventGalleryPage': return '<EventGalleryPage/>';
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
              'DashboardPage'   : <DashboardPage  /> ,
              'SettingPage'     : <SettingPage    /> ,
              'MemberListPage'  : <MemberListPage /> ,
              'EventListPage'   : <EventListPage  /> ,
              'EventAddPage'    : <EventAddPage   /> ,
              'EventDetailPage' : <EventDetailPage/> ,
              'EventGalleryPage' : <EventGalleryPage/> ,
            }[this.props.component]
          }
          </div>
        );
    };
}
export default DashboardLayout;
