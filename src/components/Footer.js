/*
 * @PageName    :: LeftsideBar.js
 * @Author      :: Pradeep Kumar
 * @Description :: Left Menu of the profile
 * @Created Date:: 20 Oct 2018
 */
import React from 'react';
class Footer extends React.Component{
    constructor() {
        super();
        this.state = {
            clicked: false,
        };
    }
    render(){
        return(
      <footer className="main-footer">
        <div className="pull-right hidden-xs">
          <b>Version</b> 1.0
        </div>
        <strong>Copyright © 2019 <a href="http://www.aimbeyond.com">Aimbyond Infotech Pvt Ltd</a>.</strong> All rights
        reserved.
      </footer>
        );
    };
}
export default Footer;
