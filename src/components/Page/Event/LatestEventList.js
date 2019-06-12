/*
 * @PageName    :: LatestUserList.js
 * @Author      :: Pradeep Kumar
 * @Description :: All List of the user
 * @Created Date:: 07 May 2019
 */
import React from 'react';
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import Constants  from '../../../config/Constants'
import Message from '../../../components/Message';
import $ from 'jquery';
import Modal from 'react-modal';
import EventViewPage from '../../Page/Event/EventViewPage';
import UserEditPage from '../../Page/User/UserEditPage';
// import ReactTooltip from 'react-tooltip'
const urlStr    = Constants.EVENT_LIST_URL;
const token     = localStorage.getItem('token');
class LatestEventList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            eventList    : [],
            isMsg       : false,
            className   : '',
            user        : '',
            urlParams   : '',
            show        : false,
            modalIsOpen : false,
            eventDetails : {},
            actiontype  : 'view',
            redirectToReferrer  : false,
            redirectPage        : ''
        }
        this.getEventList       = this.getEventList.bind(this);
        this.handleClick        = this.handleClick.bind(this);
        this.capitalize         = this.capitalize.bind(this);
    
        this.openModal          = this.openModal.bind(this);
        this.afterOpenModal     = this.afterOpenModal.bind(this);
        this.closeModal         = this.closeModal.bind(this);

        this.stripHtml          = this.stripHtml.bind(this);
        this.handleRouteClick   = this.handleRouteClick.bind(this);
 
    }


    handleRouteClick = (e) => {
        e.preventDefault();
        var idStr = e.target.id;
        var idStrArr = idStr.split('|');
        var id = idStrArr[0];
        var str = idStrArr[1];
        localStorage.setItem('redirectPage','');
        if(str=='details'){
            localStorage.setItem('event_id',id);
            this.setState({redirectPage:'eventdetails'});
            this.setState({redirectToReferrer:true});
        }
        if(str=='gallery'){
            localStorage.setItem('event_id',id);
            this.setState({redirectPage:'eventgallery'});
            this.setState({redirectToReferrer:true});
        }
        
        
    };


    handleClick = (e) => {
        e.preventDefault();
        this.setState({
            urlParams  : e.target.href
        });
        this.getUserList()
        
    };


    /******Get all the user list here********/   
    getEventList(){
        var tokenStr = token;
        const formData = {
            token    : tokenStr,
            urlParams: this.state.urlParams
        }
        axios.post(urlStr, formData)
        .then((response) => {
          if(response.data.data.code==200) {
                this.setState({
                    eventList    : response.data.data.event.data,
                    event       : response.data.data.event,
                });
                $('#ipl-progress-indicator').hide();
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
       this.getEventList();
    }

    capitalize(str) {
        var strVal = '';
        str = str.split(' ');
        for (var chr = 0; chr < str.length; chr++) {
          strVal += str[chr].substring(0, 1).toUpperCase() + str[chr].substring(1, str[chr].length) + ' '
        }
        return strVal
    }


    //Open Modle box for user Either we can view or edit the user details here
    openModal(e) {
        var strId = e.target.id;
        var array   = strId.split("|");
        var userId  = array[0];
        var type    = array[1];
        this.setState({
              actiontype  : type
        });

        let optionItems = this.state.eventList.map((val,i) =>{
                if(val.id==userId){
                    this.setState({
                        eventDetails: val
                    });        
                }
        });
        this.setState({modalIsOpen: true});
    }
    
    
    afterOpenModal() {
        // references are now sync'd and can be accessed.
        //this.subtitle.style.color = '#f00';
    }
    
    closeModal() {
        this.setState({modalIsOpen: false});
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
       const { eventList }          =  this.state; 
       const { user }               =  this.state; 
       const { eventDetails }       =  this.state;
       const { actiontype  }        =  this.state;
       const { redirectToReferrer } =  this.state;
       const { redirectPage }       =  this.state;
       let optionItems = eventList.map((val,i) =>
        <tr>
            <td><a href="#">{val.id}</a></td>
            <td><a href="#" title="Click to Add Details" onClick={this.handleRouteClick} id={val.id+'|details'}>{val.title}</a></td>
            <td>{val.durration} Min</td>
            <td><a data-tip={this.stripHtml(val.description)}>{this.stripHtml(val.description).substring(0,100)}</a>
                {/* <ReactTooltip className='extraClass'  delayHide={500} type="success" effect="solid"/> */}
            </td>
            <td>{(val.status==1)?(<span className='label label-success'>Active</span>):(<span className='label label-danger'>In Active</span>)}</td>
            <td>{val.created_at}</td>
            <td>
                <a href={"eventdetails?"+val.id} onClick={this.openModal} id={val.id+'|view'}><i className="fa fa-eye"></i></a>&nbsp;&nbsp;
                <a href={"eventlocation?"+val.id}><i className="fa fa-map"></i></a>&nbsp;&nbsp;
                <a href={"eventgallery?"+val.id}><i className="fa fa-image"></i></a>&nbsp;&nbsp;
                <a href={"eventtiming?"+val.id}><i className="fa fa-clock-o"></i></a>&nbsp;&nbsp;
                <a href={"editevent?"+val.id}><i className="fa fa-pencil"></i></a>&nbsp;&nbsp; 
                <a href="#"><i className="fa fa-trash"></i></a></td>
        </tr>
        );
        if (redirectToReferrer === true) {
            return <Redirect to={"/"+redirectPage}/>;
        }
        return(
            <div className="row">
              <div className="col-md-12">
                {/*Model Box Start For View User Details*/}
                <Modal isOpen={this.state.modalIsOpen} onAfterOpen={this.afterOpenModal} onRequestClose={this.closeModal} contentLabel="User Details">
                
                {/*Load UserViewPage Component for Display the details of User, params user Object*/}
                {(actiontype=='edit')?(
                    <UserEditPage user={eventDetails}/>
                ):(<div>
                    <EventViewPage event={eventDetails}/>
                    <button type="button" class="btn btn-primary pull-right" onClick={this.closeModal}>Close</button>
                    </div>
                )}
                </Modal>
                {/*Model Box Start For View User Edit*/}    

                <Message title={this.state.className}    Msg='Your message goes here' show={this.isMsg}/>
                <div className="box box-info">
                <div className="box-header with-border">
                <h3 className="box-title">Latest Event List</h3>
                <div className="box-tools pull-right">
                <button type="button" className="btn btn-box-tool" data-widget="collapse"><i className="fa fa-minus" />
                </button>
                <button type="button" className="btn btn-box-tool" data-widget="remove"><i className="fa fa-times" /></button>
                </div>
                </div>
                {/* /.box-header */}
                <div className="box-body">
                <div className="table-responsive">
                <table className="table no-margin">
                    <thead>
                    <tr>
                        <th>SN</th>
                        <th>Event Name</th>
                        <th>Durration</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Created On</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {optionItems}
                    </tbody>
                </table>
                </div>
                {/* /.table-responsive */}
                </div>
                <div className="box-footer clearfix">
                <div class="box-tools">
                    <ul class="pagination pagination-sm no-margin pull-right">
                        <li><a href={user.first_page_url} onClick={this.handleClick}>First</a></li>
                        <li><a href={user.prev_page_url} onClick={this.handleClick}>«</a></li>
                        <li><a href={user.next_page_url} onClick={this.handleClick}>»</a></li>
                        <li><a href={user.last_page_url} onClick={this.handleClick}>Last</a></li>
                    </ul>
                </div>
                </div>
                </div>
                </div>
                </div>
      );
    };
}
export default LatestEventList;
