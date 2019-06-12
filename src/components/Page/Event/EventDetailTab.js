/*
 * @PageName    :: EventDetailPage.js
 * @Author      :: Pradeep Kumar
 * @Description :: This component used for add details on events
 * @Created Date:: 09 May 2019
 */
import React from 'react';
import axios from 'axios'
import $ from 'jquery';
import Constants  from '../../../config/Constants'
import InformationTab from '../Event/InformationTab';
import LocationTab from '../Event/LocationTab';
import ImageGalleryTab from '../Event/ImageGalleryTab';
import EventTimingTab from '../Event/EventTimingTab';
import SeatingTab from '../Event/SeatingTab';
const urlStr    = Constants.EVENT_DETAILS_URL;
const token     = localStorage.getItem('token');
const event_id  = localStorage.getItem('event_id');
class EventDetailTab extends React.Component{
    constructor() {
        super();
        this.state = {
            event_id  : '',
            event : {},
            isTabOn : false
        };
        this.getEventDetails    = this.getEventDetails.bind(this);
    }
    getEventDetails(){
        var tokenStr = token;
        const formData = {
            token     : tokenStr,
            event_id  : event_id
        }
        axios.post(urlStr, formData)
        .then((response) => {
          var response = response.data[0]; 
          if(response.code===200) {
                this.setState({
                    event    : response.data,
                    event_id : response.data.id,
                    eventDetails:response.data.event_detail,
                    isTabOn : true
                });
                $('.overlay').hide();
          }
          else
          {
            this.setState({isMsg:true});
            this.setState({className:'error'});
          }
        })
        .catch((err) => {
            this.setState({isMsg:true});
            this.setState({className:'error'});
        })
    }

    componentDidMount(){
      this.getEventDetails();
    }

    stripHtml(html){
        // Create a new div element
        var temporalDivElement = document.createElement("div");
        // Set the HTML content with the providen
        temporalDivElement.innerHTML = html;
        // Retrieve the text property of the element (cross-browser support)
        return temporalDivElement.textContent || temporalDivElement.innerText || "";
      }


    render(){
        const { event } =  this.state;
        const { isTabOn } =  this.state;
        console.log(event.event_detail);

        return(
            <section className="content">
                <div className="row">
                <div className="tab_container tabContainer">

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
                        <EventTimingTab eventObj={this.state.event} show={isTabOn} eventId={this.state.event_id} eventDetails={this.state.eventDetails}/>
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
