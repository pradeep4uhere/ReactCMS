import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import Navigation from '../components/Navigation';
import LeftSideBar from '../components/LeftSideBar/LeftSideBar';
import Footer from '../components/Footer';
import Dashboard from '../components/Dashboard';
import Setting from '../components/Setting';
import Login, {user} from '../Login/Login';
import Logout from '../Logout';
import NotFound from '../components/NotFound';
import Register from '../Login/Register';


// export const PrivateRoute = ({ component: Component, ...rest }) => (
//     <Route {...rest} render={props => (
//         localStorage.getItem('user')
//             ? <Component {...props} />
//             : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
//     )} />
// )
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
              <Route path="/logout" component={Logout} exact/>
              <Route path="/login" component={Login} exact/>
              <Route path="*" component={NotFound} exact/>
         </Switch>
        </Router>
      </div>
    );
  }
}
export default App;
