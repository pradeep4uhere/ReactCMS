/*
 * @PageName    :: EventAddPage.js
 * @Author      :: Pradeep Kumar
 * @Description :: This component used for add new event 
 * @Created Date:: 09 May 2019
 */
import React from 'react';
import axios from 'axios'
import $ from 'jquery';
import Message from '../../../components/Message';
import State from '../../../json/rd_states.json';
import Country from '../../../json/rd_countries.json';
import City from '../../../json/rd_cities.json';
import Constants  from '../../../config/Constants'
import { Form } from 'react-advanced-form'
import { Input } from 'react-advanced-form-addons'
var serialize = require('form-serialize');
const addseattheatre = Constants.ADD_SEAT_THEATRE;
const urlGetStr = Constants.THEATRE_GET_URL;
const token     = localStorage.getItem('token');
class AddTheatreSeatForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isMsg           : false,
            className       : '',
            message         : '',
            MsgClass        : 'info',
            Msg             : 'Add Seats to theatre',
            show            : true,
            hasRError       : '',
            hasCError       : '',
            theatre_id      : this.props.theatre_id,
            theatre         : {},
            totalSeat       : '0',
            theatreSeat     : {},
            row             : 2,
            col             : 10,
            seat            : {},
            rowName         : ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
            seatName        : {},
            seatArrObj      : []


        };
        this.handleSubmit       = this.handleSubmit.bind(this);
        this.getTheatreDetails  = this.getTheatreDetails.bind(this);
        this.handleChange       = this.handleChange.bind(this);
        this.createTable        = this.createTable.bind(this);
        this.handleSubmitSeat   = this.handleSubmitSeat.bind(this);
    }


    handleChange(e) {
        var strid   = e.target.id;
        var row     = e.target.value;
        var col     = e.target.value;

        if(strid=='row'){
            this.setState({
                theatreSeat : {
                        row : e.target.value
                    },
                    row: e.target.value
                });
        }
        if(strid=='col'){
            this.setState({
                theatreSeat : {
                    col : e.target.value
                },
                col: e.target.value
            });
        }

        var totalSeat = parseInt(row) * parseInt(col);
        this.setState({
            totalSeat : totalSeat
        });

        
       
    }

    /**********Login Form Handle********************/
    handleSubmit(event) {
        event.preventDefault();
        var id        	    = this.state.theatre_id;
        var row         	= event.target.row.value;
        var col            	= event.target.col.value;
        //Validation all the fields here
        if(row==''){
            this.setState({isMsg : true, classstr  : 'alert alert-danger', message   : 'Please enter number of row first', hasRError : 'has-error' });
        }else{
            this.setState({ isMsg       : false});
            this.setState({ hasRError   : ''});
        }
        
        if(col==''){
            this.setState({ isMsg : true, classstr  : 'alert alert-danger', message   : 'Please enter number of column first', hasCError : 'has-error' });
        }else{
            this.setState({ isMsg       : false});
            this.setState({ hasCError      : ''});
        }
        
       
        
        if(row!='' && col!=''){
            this.setState({
                totalSeat : parseInt(row) * parseInt(col)
            });
            this.setState({
                row: row,
                col:col
            });
            this.createTable();
        }
    }

    handleSubmitSeat(event){
        event.preventDefault();
        const form = event.currentTarget
        const body = serialize(form, {hash: true,empty:true})
        var row = this.state.row;
        var col = this.state.col;
        const formData = {
                id            : this.state.theatre_id,
                row           : row,
                col           : col,
                token         : token,
                seat          : body
            }
        console.log(formData);
        axios.post(addseattheatre, formData)
             .then((response) => {
             if(response.data.code==200) {
                this.setState({
                    message     : response.data.message,
                    classstr    : 'alert alert-success',
                    className   : 'success',
                    isMsg       : true,
                });
                $("#formTheatre").trigger("reset");
             }
             else
             {
                this.setState({ 
                    message:response.data.message,
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
                this.setState({ isMsg: true });
                this.setState({classstr: 'alert alert-danger'});
        })
    }


    //Get Theatre Details
    getTheatreDetails(){
        var id = this.state.theatre_id;
        const formData = {
            id    : id,
            token : token
        }
        axios.post(urlGetStr, formData)
        .then((response) => {
          if(response.data.code==200) {
            this.setState({
                  theatre     : response.data.theatre,
                  row         : response.data.row.count,
                  col         : response.data.col.count,
                  seat        : response.data.seatArrObj,
                  totalSeat   : response.data.row.count*response.data.col.count
            });

            Object.keys(response.data.seatArrObj).map((k) =>
                {
                   let res = response.data.seatArrObj[k];
                   Object.keys(res).map((j) => {
                       $('#seat_'+res[j]).attr('checked','checked')
                   })
                }
                
                //key = k.split(':')
                //$('#'+number).attr('checked','checked')
            );

          }
          else
          {
              this.setState({ 
                  message:response.data.message,
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
               this.setState({classstr: 'alert alert-danger'});
        })

    }



    componentDidMount() {
      this.getTheatreDetails();
    }



    createTable = () => {
        let table = []
        // Outer loop to create parent
        for (let i = 0; i < this.state.row; i++) {
        let children = []
        //Inner loop to create children
        for (let j = 0; j < this.state.col; j++) {
            //{`Column ${j + 1}`}
            children.push(<td>{this.state.rowName[i]}{j}
            <input type="checkbox" className="seats" name={"seat_"+this.state.rowName[i]+'_'+j} id={"seat_"+this.state.rowName[i]+'_'+j} value={this.state.rowName[i]+'_'+j} />
            </td>)
            // children.push(<td>{this.state.rowName[i]}{j}<input type="checkbox" className="seats" name="seat[]" id="seat[]" defaultValue={this.state.rowName[i]+'_'+j} /></td>)
        }
        //Create the parent and add the children
        table.push(<tr>{children}</tr>)
        }
        return table
    }
    

    render(){
        const { MsgClass }      = this.state;
        const { Msg }           = this.state;
        const { show }          = this.state;

        const { hasRError }     = this.state;
        const { hasCError }     = this.state;


        const { isMsg }         = this.state;
        const { classstr }      = this.state;
        const { message }       = this.state;

        const { theatre }       = this.state;
        const { row }           = this.state;
        const { col }           = this.state;
        const { seat }          = this.state;

        const table = []
        // console.log(this.state.seat);
        



        return(
            <section className="content">
            <div className="row">
            <div className="col-md-12">
            <Message title={MsgClass} Msg={Msg} show={show}/>   
            {(isMsg)?(<div className={classstr}>{message}</div>):(<div></div>)}
            <div className="box box-success">
                <div className="box-header with-border">
                <h3 className="box-title">Add Seats For Theatre::  {this.state.theatre.theater_name}</h3>
                </div>
                <div className="box-body">
                <form role="form" onSubmit={this.handleSubmit} id="formTheatre">
                    <div className="box-body">
                    <div className={"form-group col-xs-2"+" "+hasRError}>
                    <dt>No Of Rows</dt>
                        <input type="text" className="form-control col-xs-3" id="row" placeholder="Enter no of rows"  onChange = { this.handleChange.bind(this)} value={this.state.row}/>
                    </div>
                    <div className={"form-group col-xs-2"+" "+hasCError}>
                        <dt htmlFor="exampleInputPassword1">No Of Column</dt>
                        <input type="text" className="form-control" id="col" placeholder="Enter no of column"  onChange = { this.handleChange.bind(this)} value={this.state.col}/>
                    </div>
                    <div className={"form-group col-xs-2"}>
                        <dt htmlFor="exampleInputPassword1">Total Seats</dt>
                        <span>{this.state.totalSeat}</span>
                    </div>
                    <div className={"form-group col-xs-2"}>  
                    <dt htmlFor="exampleInputPassword1">&nbsp;</dt>
                        <button type="submit" className="btn btn-primary">Show Seat</button>                        
                    </div>
                    </div>
                </form>
                </div>
            </div>

            <div className="box">
                <div className="box-header with-border">
                    <h3 className="box-title">All Seats</h3>
                    </div>
            <div className="box-body">
            <form ref={form => this.form = form} onSubmit={this.handleSubmitSeat} id="formSeat">
            <table id="seatsBlock">
                <tbody>
                    {this.createTable()}
                </tbody>
            </table>
            <div className={"form-group col-xs-2"}>  
                    <dt htmlFor="exampleInputPassword1">&nbsp;</dt>
                    <button type="submit" className="btn btn-success">Update Seat</button>                        
            </div>
            </form>
            </div>
        </div>
        </div>
        </div>
        </section>
       );
    };
}
export default AddTheatreSeatForm;
