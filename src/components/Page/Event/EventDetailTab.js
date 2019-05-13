/*
 * @PageName    :: EventDetailPage.js
 * @Author      :: Pradeep Kumar
 * @Description :: This component used for add details on events
 * @Created Date:: 09 May 2019
 */
import React from 'react';
import axios from 'axios'
import Constants  from '../../../config/Constants'
import Message from '../../../components/Message';
import InformationTab from '../Event/InformationTab';
import LocationTab from '../Event/LocationTab';
import ImageGalleryTab from '../Event/ImageGalleryTab';
import EventTimingTab from '../Event/EventTimingTab';
import SeatingTab from '../Event/SeatingTab';
class EventDetailTab extends React.Component{
    constructor(props) {
        super(props);
    }
    render(){
        return(
            <section className="content">
                <div className="row">
                <div className="tab_container">

                    <input id="tab1" type="radio" name="tabs" defaultChecked />
                    <label htmlFor="tab1"><i className="fa fa-pencil-square-o" /><span>Event Information</span></label>
                    
                    <input id="tab2" type="radio" name="tabs" />
                    <label htmlFor="tab2"><i className="fa fa-map" /><span>Location</span></label>

                    <input id="tab3" type="radio" name="tabs" />
                    <label htmlFor="tab3"><i className="fa fa-image" /><span>Image Gallery</span></label>

                    <input id="tab4" type="radio" name="tabs" />
                    <label htmlFor="tab4"><i className="fa fa-clock-o" /><span>Event Timing</span></label>

                    <input id="tab5" type="radio" name="tabs" />
                    <label htmlFor="tab5"><i className="fa fa-wheelchair" /><span>Seats</span></label>

                    {/*Load Inforamtion Tab about the event*/}
                    <section id="content1" className="tab-content">
                    <InformationTab/>
                    </section>

                    {/*Load Location Tab about the event*/}
                    <section id="content2" className="tab-content">
                        <LocationTab/>
                    </section>

                    {/*Load Image Gallery Tab about the event*/}
                    <section id="content3" className="tab-content">
                        <ImageGalleryTab/>
                    </section>

                    {/*Load Event Timing Tab about the event*/}
                    <section id="content4" className="tab-content">
                        <EventTimingTab/>
                    </section>

                    {/*Load Seating arrangment Tab about the event*/}
                    <section id="content5" className="tab-content">
                        <SeatingTab/>
                    </section>
                </div>
            </div>
      </section>
      );
    };
}

export default EventDetailTab;
