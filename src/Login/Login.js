import React from 'react';
import axios from 'axios'
import { Redirect,withRouter } from 'react-router-dom'
import Constants  from '../config/Constants'
import $ from 'jquery';
var sha1 = require('sha1');
var globals = require('node-global-storage');
var cors = require('cors');
const appName = Constants.APP_NAME
const appTag = Constants.APP_TAG
const urlStr = Constants.LOGIN_URL;
class Login extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            redirectToReferrer: false,
            className: false,
            classNameError: false,
            isLoggedIn: false,
            message:'',
            classstr:''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        console.log(Constants);
    }



    /**********Login Form Handle********************/
    handleSubmit(event) {
        event.preventDefault();
        var tokenStr = event.target.email_address.value+'|'+event.target.password.value+'|'+Constants.APP_SALT;
        const formData = {
            username : event.target.email_address.value,
            password : event.target.password.value,
            token    : sha1(tokenStr)
        }
        axios.post(urlStr, formData)
          .then((response) => {
          console.log(response.data);
            if(response.data.code==200) {
              //Set All global Values For User After Login
              globals.set('user',response.data.user);
              globals.set('token',response.data.token);
              localStorage.setItem('user',response.data.user.id);
              localStorage.setItem('token',response.data.token);
              this.setState({
                    redirectToReferrer : true,
                    message:response.data.message,
                    classstr:'alert alert-success',
                    className:true
              });
              console.log(this.state);
            }
            else
            {

                this.setState({ 
                    redirectToReferrer: false, 
                    message:response.data.message,
                    classstr:'alert alert-danger'
                });
              
            }
          })
          .catch((err) => {
              console.log("Error: ", err);
              this.setState({ redirectToReferrer: false });
              this.setState({message:err});
              this.setState({classstr:'alert alert-danger'});
          })
    }



    componentDidMount() {
        if(localStorage.getItem('user')){
          this.setState({ redirectToReferrer: true});    
        }else{
          this.setState({ redirectToReferrer: false });    
        }
        $('#ipl-progress-indicator').hide();
    }

   render(){
      const { redirectToReferrer } = this.state;
      const { message } = this.state;
      const { classstr } = this.state;
      console.log(redirectToReferrer);
      if (redirectToReferrer === true) {
        return <Redirect to='/dashboard'/>;
      }
      return(
      <div className="login-box">
        <div className="login-logo">
          <a href="#"><b>{appName}</b>{appTag}</a>
        </div>
        <div className="login-box-body">
        <center>
           {message ? (<div className={this.state.classstr}>{this.state.message}</div>) : (<div></div>)}
        </center>
          <p className="login-box-msg">Sign in to start your session</p>
          <form  onSubmit={this.handleSubmit} id="login-form" >
            <div className="form-group has-feedback">
              <input type="text" className="form-control" placeholder="Enter your username / email" id="email_address" name="email_address"/>
              <span className="glyphicon glyphicon-envelope form-control-feedback" />
            </div>
            <div className="form-group has-feedback">
              <input type="password" className="form-control" placeholder="Enter your password" name="password" id="password" />
              <span className="glyphicon glyphicon-lock form-control-feedback" />
            </div>
            <div className="row">
              <div className="col-xs-8">
                <div className="checkbox icheck">
                  <dt>
                    <input type="checkbox" /> Remember Me
                  </dt>
                </div>
              </div>
              <div className="col-xs-4">
                <input type="submit" name="submit" class="btn btn-primary btn-block btn-flat" value="Sign In"/>
              </div>
            </div>
          </form>
          
          <a href="#">I forgot my password ?</a><br />
          <a href="register" className="text-center">Are you arelready register ?</a>
          </div>
      </div>
      );
    };
}
let userId = globals.get('Id');
export const user = userId;
export default Login;