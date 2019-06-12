/*
 * @PageName    :: EventAddPage.js
 * @Author      :: Pradeep Kumar
 * @Description :: This component used for add new event 
 * @Created Date:: 09 May 2019
 */
import React , { Component } from 'react';
import axios from 'axios'
import Constants  from '../../../config/Constants'
import $ from 'jquery';
import Breadcrum from '../../BreadcrumPage';
import ImageUploader from 'react-images-upload';

//import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import Gallery from 'react-grid-gallery';
import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';
const urlSaveImgStr = Constants.IMAGE_UPLOAD;
const token     = localStorage.getItem('token');

class EventGalleryPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isMsg           : false,
            eventId         : this.props.id,
            className       : '',
            message         : '',
            pictures        : [],
            ImageGallery    : [
                                    {
                                            src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
                                            thumbnail: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_n.jpg",
                                            thumbnailWidth: 320,
                                            thumbnailHeight: 174,
                                            isSelected: false,
                                            caption: "After Rain (Jeshu John - designerspics.com)"
                                    },
                                    {
                                            src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
                                            thumbnail: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_n.jpg",
                                            thumbnailWidth: 320,
                                            thumbnailHeight: 212,
                                            tags: [{value: "Ocean", title: "Ocean"}, {value: "Peoplessssss", title: "People"}],
                                            caption: "Boats (Jeshu John - designerspics.com)"
                                    }
                              ]


        };
        this.onDrop         = this.onDrop.bind(this);
        this.getGalleryList = this.getGalleryList.bind(this); 
    }


    onDrop(pictureFiles, pictureDataURLs) {
		this.setState({
            pictures: this.state.pictures.concat(pictureFiles),
        });

        const formData={
            id : this.props.id,
            token:token,
            imageStr : pictureDataURLs
        }
        axios.post(urlSaveImgStr, formData)
        .then((response) => {
        if(response.data.data.code==200) {
            this.setState({
                message     : response.data.data.message,
                classstr    : 'alert alert-success',
                className   : 'success',
                isMsg       : true,
            });
            $("#formTheatre").trigger("reset");
            this.setState({
                pictures: [],
                ImageGallery:response.data.data.imagesList
            });
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

    getGalleryList(){
        const formData={
            id : this.props.id,
            token:token,
        }
        axios.post(urlSaveImgStr, formData)
        .then((response) => {
        if(response.data.data.code==200) {
            this.setState({
                ImageGallery:response.data.data.imagesList
            });
        }else{
            this.setState({ 
                message:response.data.message,
                className   : 'error',
                classstr    : 'alert alert-danger',
                isMsg       : true,
            });
        }}).catch((err) => {
            console.log("Error: ", err);
            this.setState({message:err});
            this.setState({className:'error'});
            this.setState({ isMsg: true });
            this.setState({classstr: 'alert alert-danger'});
        })
    }

    componentDidMount() {
        
        this.getGalleryList();
    }
    
    render(){
        const { ImageGallery } = this.state;
        console.log(this.state.ImageGallery);
        return(
                <div className="content-wrapper">
                {/* Import Breadcrup component boxes here */}
                <Breadcrum title="Event Image Gallery" titleRight='All Event List' url='eventlist' />
                    <section className="content">
                    <div className="row">
                    <div className="col-md-12">
                    <ImageUploader
                        withIcon={true}
                        buttonText='Choose images'
                        onChange={this.onDrop}
                        imgExtension={['.jpg', '.gif', '.png', '.gif', '.jpeg']}
                        maxFileSize={5242880}
                        withPreview={true}
                    />
                    <hr/>
                    <Gallery images={ImageGallery}/>
                    </div>
                    </div>
                    </section>
                    {/* /.content */}
                </div>
           );
    };
}
export default EventGalleryPage;
