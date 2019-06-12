import React from 'react';  
import Navigation           from '../components/Navigation';
import LeftSideBar          from '../components/LeftSideBar/LeftSideBar';
import DashboardPage        from '../components/Page/DashboardPage';
import SettingPage          from '../components/Page/SettingPage';
import MemberListPage       from '../components/Page/MemberListPage';
import EventListPage        from '../components/Page/Event/EventListPage';
import EventAddPage         from '../components/Page/Event/EventAddPage';
import EditEventPage         from '../components/Page/Event/EditEventPage';
import EventDetailPage      from '../components/Page/Event/EventDetailPage';
import EventGalleryPage     from '../components/Page/Event/EventGalleryPage';

import TheatrePage          from '../components/Page/Theatre/TheatrePage';
import AddTheatrePage       from '../components/Page/Theatre/AddTheatrePage';
import EditTheatrePage      from '../components/Page/Theatre/EditTheatrePage';
import AddTheatreSeatPage   from '../components/Page/Theatre/AddTheatreSeatPage';

import LocationPage         from '../components/Page/Event/LocationPage';
import EventTimingPage      from '../components/Page/Event/EventTimingPage';
import SittingTypePage      from '../components/Page/SittingType/SittingTypePage';
import SittingListPage      from '../components/Page/SittingType/SittingListPage';
import SittingEditPage      from '../components/Page/SittingType/SittingEditPage';

import PageListPage         from '../components/Page/PageListPage';
import EditPagePage         from '../components/Page/StaticPage/EditPagePage';
import ViedoListPage        from '../components/Page/ViedoListPage';




class DashboardLayout extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            loadComponent: this.props.component,
            id: this.props.id,
        };
    }
  
   render(){
    const { id } = this.state;
    console.log(this.props.component)
    return(
          <div className="hold-transition skin-blue sidebar-mini">
          <Navigation/> 
          <LeftSideBar/> 
          {
            {
              'DashboardPage'     : <DashboardPage  /> ,
              'SettingPage'       : <SettingPage    /> ,
              'MemberListPage'    : <MemberListPage /> ,
              'EventListPage'     : <EventListPage  /> ,
              'EventAddPage'      : <EventAddPage   /> ,
              'EventDetailPage'   : <EventDetailPage/> ,
              'EventGalleryPage'  : <EventGalleryPage id={id}/> ,
              'TheatrePage'       : <TheatrePage/> ,
              'AddTheatrePage'    : <AddTheatrePage/> ,
              'EditTheatrePage'   : <EditTheatrePage theatre_id={id}/>,
              'AddTheatreSeatPage': <AddTheatreSeatPage theatre_id={id}/>,
              'LocationTab'       : <LocationPage id={id}/>,
              'EventTimingTab'    : <EventTimingPage id={id}/>,
              'EditEventPage'     : <EditEventPage id={id}/>,
              'SittingType'       : <SittingTypePage/>,
              'SittingList'       : <SittingListPage/>,
              'SittingEdit'       : <SittingEditPage id={id}/>,
              'PageList'          : <PageListPage/>,
              'EditPagePage'      : <EditPagePage id={id}/>,
              'ViedoListPage'     : <ViedoListPage/> 
            }[this.props.component]
          }
          </div>
        );
    };
}
export default DashboardLayout;
