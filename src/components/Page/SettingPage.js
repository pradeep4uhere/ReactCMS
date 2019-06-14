/*
 * @PageName    :: SettingPage.js
 * @Author      :: Pradeep Kumar
 * @Description :: General Setting Page 
 * @Created Date:: 23 Apr 2019
 */
import React from 'react';
import SettingForm from '../Page/SettingForm';
import Message from '../../components/Message';
import Setting from '../../json/Setting.json'
class SettingPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            clicked: false,
            title: 'General Setting',
            subtitle: 'You can update all general setting of the website',
            setting:Setting
        };
    }
    render(){
      // let errorMessage ="<div className='alert alert-danger'><h4><i className='fa fa-info'></i> Note:</h4>This page has been enhanced for printing. Click the print button at the bottom of the invoice to test.</div>";
     return(
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <section className="content-header">
          <h1>{this.state.title}
            <small>{this.state.subtitle}</small>
          </h1>
          <ol className="breadcrumb">
            <li><a href="#"><i className="fa fa-dashboard" /> Home</a></li>
            <li className="active">{this.state.title}</li>
          </ol>
        </section>
        {/* Main content */}
        <section className="content">
          {/* Default box */}
          <div className="box box-warning">
            <div className="box-header with-border">
              <h3 className="box-title">{this.state.title}</h3>
              <div className="box-tools pull-right">
                <button type="button" className="btn btn-box-tool" data-widget="collapse" data-toggle="tooltip" title="Collapse">
                  <i className="fa fa-minus" /></button>
                <button type="button" className="btn btn-box-tool" data-widget="remove" data-toggle="tooltip" title="Remove">
                  <i className="fa fa-times" /></button>
              </div>
            </div>

            <div className="box-body">

            <Message title='success'  Msg='Your message goes here' show="true"/>
            <Message title='error'    Msg='Your message goes here' show="false"/>

            <div class="col-md-6">
              <SettingForm/>
              </div>
            </div>
            {/* /.box-body */}
          </div>
          {/* /.box */}
        </section>
        {/* /.content */}
      </div>
      );
    };
}
export default SettingPage;
