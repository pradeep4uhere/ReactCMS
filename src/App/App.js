import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import Setting from '../components/Setting';
import MemberList from '../components/MemberList';
import EventList from '../components/EventList';
import EventAdd from '../components/EventAdd';
import EventDetail from '../components/EventDetail';
import EventGallery from '../components/EventGallery';
import Login, {user} from '../Login/Login';
import Logout from '../Logout';
import NotFound from '../components/NotFound';
import Register from '../Login/Register';
import $ from 'jquery';

class App extends Component {
  	constructor() {
  		super();
      this.state = {
        isLoggedIn:false,
        user: user
      }
      this.handler = this.handler.bind(this);
    }


  // This method will be sent to the child component
  handler() {
      this.setState({
          isLoggedIn: false
      });
  }


componentDidMount() {
    var userId= localStorage.getItem('user');
    if(localStorage.getItem('user')){
        this.setState({ isLoggedIn: true});    
    }else{
        this.setState({ isLoggedIn: false });    
    }
    $('#ipl-progress-indicator').hide();
    

}

render() {
     const { isLoggedIn } = this.state
     return (
      <div>
         <Router>
          <Switch>
              <Route path="/" component={Dashboard} exact/>
              <Route path="/setting" component={Setting} exact />
              <Route path="/dashboard" component={Dashboard}  />
              <Route path="/memberlist" component={MemberList}  />
              <Route path="/memberlist/{:page}" component={MemberList}  />

              <Route path="/eventlist" component={EventList}  />
              <Route path="/addevent" component={EventAdd}  />
              <Route path="/eventdetails" component={EventDetail}/>
              <Route path="/eventgallery" component={EventGallery}/>


              <Route path="/logout" component={Logout} exact/>
              <Route path="/login" component={Login} exact/>
              <Route path="/register" component={Register} exact/>
              <Route path="*" component={NotFound} exact/>
         </Switch>
        </Router>
      </div>
    );
  }
}
export default App;
