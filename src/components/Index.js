import React from 'react';
import Home from '../theme/rudra/images/home.png';
class Index extends React.Component{
    constructor() {
        super();
        this.state = {
            clicked: false,
        };
    }
    render(){
        return(
            <a href="login"><img src={Home} width={'100%'} alt="homepage"/></a>
      );
    };
}
export default Index;
