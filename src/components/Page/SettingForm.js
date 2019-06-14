/*
 * @PageName    :: SettingPage.js
 * @Author      :: Pradeep Kumar
 * @Description :: General Setting Page 
 * @Created Date:: 23 Apr 2019
 */
import React from 'react';
import Setting from '../../json/Setting.json'
class SettingForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            clicked: false,
            setting:Setting
        };
    }
    render(){
     let optionItems = this.state.setting.map((val,i) =>
        <div className="form-group">
              <label htmlFor="inputEmail3" className="col-sm-2 control-label">{val.title}</label>
              <div className="col-sm-10">      
                <input type="text" name={val.options} className="form-control" id="inputEmail3" placeholder={val.title} value={val.options_value} />
              </div>
        </div>
        
        );
     return(
            <div classname="box-body">
              <form class="form-horizontal">
              <div className="box-body">
                {optionItems}
              </div>
              <div class="box-footer">
                <button type="submit" class="btn btn-default">Cancel</button>
                <button type="submit" class="btn btn-info pull-right">Update</button>
              </div>
              </form>
            </div>
            );
    };
}
export default SettingForm;
