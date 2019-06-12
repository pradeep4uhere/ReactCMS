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
import Breadcrum from '../../BreadcrumPage';
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';
import DeleteImg from '../../../theme/dist/img/recycle.png';
import DoneImg from '../../../theme/dist/img/done.png';

const showSecond = true;
const str = showSecond ? 'HH:mm:ss' : 'HH:mm';
const urlEventStr    = Constants.EVENT_DETAILS_URL;
const urlStr = Constants.THEATRE_LIST_URL;
const urlEventTimeUpdate = Constants.EVENT_TIME_UPDATE_URL;
const urlEventTimeDelete = Constants.EVENT_TIME_DELETE_URL;
const token     = localStorage.getItem('token');
class EventTimingPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          eventId : this.props.id,
          event : '',
          theater : [],
          message : '',
          classstr:'',
          isMsg   :false,
          className:'',
          event_detail:[],
          event_timing:[],
          isOverlay : true,
          noRecords: false,
          show: false,
          sATitle:'',
          sAClass:'',
          sAText:'',
          sAImg:DoneImg,
          showCancelButton:true,
          confirmButtonColor:'#FF0000'
        };
        this.getEventDetails  = this.getEventDetails.bind(this);
        this.getTheatreList   = this.getTheatreList.bind(this);
        this.handleSubmit     = this.handleSubmit.bind(this);
        this.EditTime         = this.EditTime.bind(this);
        this.DeleteTime       = this.DeleteTime.bind(this);
        this.DeleteNow        = this.DeleteNow.bind(this);
    }


    getTheatreList(){
        var tokenStr = token;
        const formData = {
            token     : tokenStr,
            event_id  : this.state.event_id
        }
        axios.post(urlStr, formData)
        .then((response) => {
          var response = response.data; 
          if(response.code==200) {
            
                this.setState({
                  theater    : response.theatre.data,
                  isOverlay  : false
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



    getEventDetails(){
      this.setState({
        isOverlay  : true
      });
      var tokenStr = token;
      const formData = {
          token     : tokenStr,
          event_id  : this.props.id
      }
      //alert(formData.event_id);
      axios.post(urlEventStr, formData)
      .then((response) => {
        if(response.data[0].code==200) {
            this.setState({
                event       : response.data[0],
                event_detail: response.data[0].data.event_detail,
                isOverlay  : false
            });
            if(response.data[0].data.event_detail.length==0){
              this.setState({
                noRecords:true
              });
            }else{
              this.setState({
                noRecords:false
              });
            }
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
      this.getTheatreList();
      this.getEventDetails();
    }



    handleSubmit(event){
      var tokenStr = token;
      event.preventDefault();
      var id              = event.target.id.value;
      var event_detail_id = event.target.event_detail_id.value;
      var theater_id      = event.target.theater_id.value;
      var event_start_time= event.target.event_start_time.value;
      var event_end_time  = event.target.event_end_time.value;
      var status          = event.target.status.value;
      var event_id        = this.props.id;
      const formData = {
          token           : tokenStr,
          event_id        : event_id,
          theater_id      : theater_id,
          event_start_time: event_start_time,
          event_end_time  : event_end_time,
          event_detail_id : event_detail_id,
          status          : status,
          id              : id,
      }
      axios.post(urlEventTimeUpdate, formData)
      .then((response) => {
        response = response.data[0];
        if(response.code==200) {
                this.setState({
                  message     : response.message,
                  classstr    : 'alert alert-success',
                  className   : 'success',
                  isMsg       : true,
            });
            this.setState({
              noRecords:false
            });
            this.getEventDetails();
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

    //Open Modle box for user Either we can view or edit the user details here
    EditTime(e) {
      var strId   = e.target.id;
      var array   = strId.split("|");
      var event_detail_id  = array[0];
      var theatre_id  = array[1];
      var event_start_time  = array[2];
      var event_end_time  = array[3];
      var status  = array[4];
      var id  = array[5];
      $('#event_detail_id').val(event_detail_id);
      $('#theatre_id').val(theatre_id);
      $('#event_start_time').val(event_start_time);
      $('#event_end_time').val(event_end_time);
      $('#status').val(status);
      $('#id').val(id);
  }



    DeleteTime(e){
      if(e==undefined || e==''){
        this.setState({
          show    : false,
          
        });
      }
      var strId   = e.target.id;
      var array   = strId.split("|");
      var event_detail_id  = array[0];
      this.setState({ 
          sATitle : 'Are you sure ?',
          sAClass : 'error',
          sAText  : 'You want to delete event timing  ',
          show    : true,
          sAImg   : DeleteImg,
          event_detail_id:event_detail_id,
          confirmButtonColor:'#FF0000',
          showCancelButton:true,
      })
    }


    DeleteNow(e){
      if(e==undefined || e==''){
        this.setState({
          show    : false,
        });
      }
      var tokenStr = token;
      const formData = {
          token           : tokenStr,
          id              : e,
      }
      axios.post(urlEventTimeDelete, formData)
      .then((response) => {
        response = response.data[0];
        if(response.code==200) {
            this.setState({ 
              show    : false,
              confirmButtonColor:'#008000'
            })
          this.getEventDetails();
          this.setState({ 
            sATitle : 'Deleted !',
            sAClass : 'Success',
            sAText  : 'Event Timing Deleted!',
            sAImg   : DoneImg,
            show    : true,
            event_detail_id:'',
            showCancelButton:false,
            confirmButtonColor:'#008000'
          })
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



    
    render(){
      const { event } = this.state;
      const { theater } = this.state;
      const { isMsg }         = this.state;
      const { classstr }      = this.state;
      const { message }       = this.state;
      const { event_detail }  = this.state;
      const { isOverlay }     = this.state;
      const { noRecords }     = this.state;
      // alert(this.state.noRecords);
      console.log("======================+render=================");
      console.log(this.state.event_detail);
      // let timingOption ='';
        let timingOption = this.state.event_detail.map((val,i) =>
            val.event_timing.map((key,k)=> 
            <tr>
              <td>{k+1}</td>
              <td>{key.theatre.theater_name}</td>
              <td>{key.theatre.address}</td>
              <td>{key.event_start_time}</td>
              <td>{key.event_end_time}</td>
              <td>{(key.status==1)?(<span className="badge bg-green">Active</span>):(<span className="badge bg-red">In Active</span>)}</td>
              <td>
                <a href="#"><i className="fa fa-pencil" onClick={this.EditTime} id={key.event_detail_id+'|'+key.theatre.id+'|'+key.event_start_time+'|'+key.event_end_time+'|'+key.status+'|'+key.id}></i></a>&nbsp;&nbsp;
                <a href="#"><i className="fa fa-trash" onClick={this.DeleteTime} id={key.id}></i></a>
              </td>
            </tr>
            )
        );

      let eventDetailListOption = this.state.event_detail.map((val,i) =>
        <option value={val.id}>{val.event.title}</option>
      );
      
      
      let theatreListOption = this.state.theater.map((val,i) =>
        <option value={val.id}>{val.theater_name}</option>
      );
        return(
            <div className="content-wrapper">
            <Breadcrum title="Edit Event Timing" titleRight='All Event List' url='eventlist' />
            <SweetAlert
              dangerMode={true}
              showCancelButton={this.state.showCancelButton}
              animation={true}
              imageUrl={this.state.sAImg}
              imageSize='80x80'
              confirmButtonColor={this.state.confirmButtonColor}
              onCancel={() => this.setState({ show: false })}
              show={this.state.show}
              title={this.state.sATitle}
              text={this.state.sAText}
              icon="warning"
              onConfirm={() => this.DeleteNow(this.state.event_detail_id)}
            />
            <section className="content">
            <div className="row">
             <div className="col-md-8">
            <div className="box box-solid">
            <div className="overlay" show={isOverlay}><i className="fa fa-refresh fa-spin"></i></div>
              <div className="box-header with-border">
                <i className="fa fa-text-width" />
                <h3 className="box-title">Event Timing List</h3>
              </div>
              <div className="box-body no-padding">
              <table className="table table-striped" style={{'font-size':'12px'}}>
                <tbody><tr>
                  <th>#</th>
                  <th>Theater Name</th>
                  <th>Address</th>
                  <th style={{'white-space':'nowrap'}}>Start Time</th>
                  <th style={{'white-space':'nowrap'}}>End Time</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
                {timingOption}
                {/* <tr><td colspan="7"><div className="alert alert-danger" show={this.state.noRecords}>No Records Found</div></td></tr> */}
              </tbody></table>
            </div>
            </div>
            </div>
            <div className="col-md-4">
            <div className="box box-solid">
              <div className="box-header with-border">
                <i className="fa fa-text-width" />
                <h3 className="box-title">Update Event Timing</h3>
              </div>
              {(isMsg)?(<div className={classstr}>{message}</div>):(<div></div>)}
              <form role="form" onSubmit={this.handleSubmit}  id="form-event">
                <div className="box-body">
                    <div className={"form-group col-md-12"}>
                        <dt>Event Detail</dt>
                        <select className="form-control" id="event_detail_id">
                        <option value="">Choose Event</option>
                         { eventDetailListOption }
                        </select>
                    </div>
                    <div className={"form-group col-md-12"}>
                        <dt>Theatre Detail</dt>
                        <select className="form-control" id="theatre_id" name="theater_id">
                        <option value="">Choose Theater</option>
                         { theatreListOption }
                        </select>
                    </div>
                    <div className="bootstrap-timepicker col-md-12">
                    <div className={"form-group"}>
                    <dt>Event Start time:</dt>
                    <small>Total durration of the event in minutes only</small>
                    <div className="input-group">
                      <input type="text" class="form-control timepicker" id="event_start_time" name="event_start_time"/>
                      <div className="input-group-addon">
                      <i className="fa fa-clock-o"></i>
                      </div>
                    </div>
                    </div>
                    </div>
                    <div className="bootstrap-timepicker col-md-12">
                    <div className={"form-group"}>
                    <dt>Event End Time:</dt>
                    <small>Total durration of the event in minutes only</small>
                    <div className="input-group">
                      <input type="text" class="form-control timepicker" id="event_end_time" name="event_end_time"/>
                      <div className="input-group-addon">
                      <i className="fa fa-clock-o"></i>
                      </div>
                    </div>
                    </div>
                    </div> 

                    <div className={"form-group col-md-12"}>
                        <dt>Status</dt>
                        <select className="form-control" id="status">
                        <option value="1">Active</option>
                        <option value="0">In Active</option>
                        </select>
                    </div>                    
                </div>
                <div class="box-footer">
                <input type="hidden" id="id"  class="form-control" />
                <button type="submit" class="btn btn-primary  pull-right">Submit</button>&nbsp;&nbsp;
                <button type="reset" class="btn btn-warning  pull-right" style={{"margin-right":"5px"}}>Reset</button>&nbsp;&nbsp;
                </div>
                </form>
                </div>
             </div>
            
            </div>
            
            </section>
            </div>
            )
    };


   
    
}

export default EventTimingPage;