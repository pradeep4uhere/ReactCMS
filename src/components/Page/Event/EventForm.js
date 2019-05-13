/*
 * @PageName    :: EventAddPage.js
 * @Author      :: Pradeep Kumar
 * @Description :: This component used for add new event 
 * @Created Date:: 09 May 2019
 */
import React from 'react';
import axios from 'axios'
import Constants  from '../../../config/Constants'
import $ from 'jquery';
import Message from '../../../components/Message';
const urlStr = Constants.EVENT_ADD_URL;
const token     = localStorage.getItem('token');
class EventAddPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isMsg           : false,
            className       : '',
            message         : '',
            MsgClass        : 'info',
            Msg             : 'Please Enter all event details here',
            show            : true,
            hasTError       : '',
            hasDesError     : '',
            hasDError       : '',
            hasSError       : ''
        };
        this.handleSubmit   = this.handleSubmit.bind(this);
    }
    /**********Login Form Handle********************/
    handleSubmit(event) {
        event.preventDefault();
        var title       = event.target.title.value;
        var description = event.target.description.value;
        var durration   = event.target.durration.value;
        var status      = event.target.status.value;

        //Validation all the fields here
        if(title==''){
            this.setState({ 
                isMsg : true, 
                classstr  : 'alert alert-danger', 
                message   : 'Please enter title of the event', 
                hasTError : 'has-error' });
        }else if(description==''){
            this.setState({ isMsg : true, classstr  : 'alert alert-danger', message   : 'Please enter description of the event', hasDesError : 'has-error' });
        }else if(durration==''){
            this.setState({ isMsg : true, classstr  : 'alert alert-danger', message   : 'Please choose durration of the event', hasDError : 'has-error' });
        }else if(status==''){
            this.setState({ isMsg : true, classstr  : 'alert alert-danger', message   : 'Please select status of the event', hasSError : 'has-error' });
        }else{
            this.setState({ isMsg : false});
            this.setState({ hasDesError : ''});
            this.setState({ hasDError : ''});
            this.setState({ hasSError : ''});
            this.setState({ hasTError : ''});
        }

        if(title!='' && description!='' && durration!=''){
            const formData = {
                event        : {
                    title       : title,
                    description : description,
                    durration   : durration,
                    status      : status
                },
                token       : token
            }
            axios.post(urlStr, formData)
              .then((response) => {
                  console.log(response);
                if(response.data.data.code==200) {
                  this.setState({
                        message     : response.data.data.message,
                        classstr    : 'alert alert-success',
                        className   : 'success',
                        isMsg       : true,
                  });
                }
                else
                {
                    this.setState({ 
                        message:response.data.data.message,
                        className   : 'error',
                        classstr    : 'alert alert-danger',
                        isMsg       : true,
                    });
                  
                }
              })
              .catch((err) => {
                  console.log("Error: ", err);
                  this.setState({message:err});
                  this.setState({className:'error'});
                  this.setState({isMsg:true});
                  this.setState({classstr: 'alert alert-danger'});
              })
    
        }


       
    }
    render(){
        const { MsgClass }      = this.state;
        const { Msg }           = this.state;
        const { show }          = this.state;
        const { hasTError }     = this.state;
        const { hasDesError }   = this.state;
        const { hasDError }     = this.state;
        const { hasSError }     = this.state;
        const { isMsg }         = this.state;
        const { classstr }      = this.state;
        const { message }       = this.state;


        //alert(MsgClass+ show + Msg);
        console.log(this.state);
        return(
            <div className="row">
            <div className="col-md-12">
            <Message title={MsgClass} Msg={Msg} show={show}/>
            {(isMsg)?(<div className={classstr}>{message}</div>):(<div></div>)}
            <div className="box box-success">
                <div className="box-header with-border">
                <h3 className="box-title">Add New Event</h3>
                </div>
                <div className="box-body">
                <form role="form" onSubmit={this.handleSubmit} enctype="multipart/form-data" id="form-event">
                    <div className="box-body">
                    <div className={"form-group"+" "+hasTError}>
                        <label htmlFor="exampleInputEmail1">Event Title</label>
                        <input type="text" className="form-control" id="title" placeholder="Enter event title" />
                    </div>
                    <div className={"form-group"+" "+hasDesError}>
                        <label htmlFor="exampleInputPassword1">Description</label>
                        <textarea id="description" name="description" rows="10" cols="80"  className="form-control">
                            Enter Description of the event
                        </textarea>
                    </div>
                
                    <div className="bootstrap-timepicker">
                    <div className={"form-group"+" "+hasDError}>
                    <label>Event Durration:</label>
                    <small>Total durration of the event in minutes only</small>
                    <div className="input-group">
                        <input type="text" class="form-control timepicker" id="durration" name="durration"/>
                        <div className="input-group-addon">
                        <i className="fa fa-clock-o"></i>
                        </div>
                    </div>
                    </div>
                    </div>   
                    <div className="form-group">
                        <label htmlFor="exampleInputFile">Event Banner</label>
                        <input type="file" id="event_banner" name="event_banner" />
                        <p className="help-block">(only jpeg, jpg, png, gif file extenstion allowd).</p>
                    </div>
                    <div className={"form-group"+" "+hasSError}>
                    <label htmlFor="inputEmail3">Status</label>
                            <select className="form-control" id="status">
                                <option value="1">Active</option>
                                <option value="0">In Active</option>
                            </select>
                     </div>
                    </div>
                    {/* /.box-body */}
                    <div className="box-footer">
                    <button type="submit" className="btn btn-default">Cancel</button>&nbsp;
                    <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
                </div>
            </div>
        </div>
        </div>
      );
    };
}

export default EventAddPage;
