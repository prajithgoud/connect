import React, { Component } from 'react';
import axios from 'axios';
import "./profileUpdateStyle.css";
import Helmet from 'react-helmet';
// import FormData from 'form-data';


class addPhoto extends Component {

    constructor(props) {
        super(props);
        this.onsubmit = this.onsubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.state = {
            
            Photo: ''
        }
    }

    handleInputChange(e) {
        this.setState({
            Photo: e.target.files[0]
          })
    }

    onsubmit(e) {
        e.preventDefault()

        const data = new FormData();
        data.append('Photo', this.state.Photo);
        console.log(this.state.Photo);
        // console.warn(this.state.Photo);
        axios.get('http://localhost:5000/userdetails', { headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` } })
        .then((res)=>{
            var id = res.data._id 
            axios.post(`http://localhost:5000/updatephoto/${id}`,data,{
                // headers: {
                  
                //   'Content-Type': `multipart/form-data`
                // }
              }).then((res) => {
                console.log(res.data);
            }).catch((err) => {
                console.error(err);
            })
        })
    }

    render() {
        return (
            <div>
                 
                <form onSubmit={this.onsubmit}>
                    <br />
                    <br />
                    <br />
                    <br />
                    <div class = "image-preview" id = "imagePreview"> 
                        <img src = "" alt = "Image Preview" class = "image-preview__image"/>
                        <span class="image-preview__default-text">Image Preview</span>
                    </div>
                        <br />
                    <div>
                    <input type = "file" name = "inpFile" id = "inpFile" accept = "image/*" onChange={this.handleInputChange} /><br />
                    </div>
                    <button>Submit</button>
                </form>
                <Helmet>
                {/* <meta charSet="utf-8" /> */}
                {/* <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w==" crossorigin="anonymous" /> */}
                <script>
                    {`
                        const inpFile = document.getElementById("inpFile");
                        const previewContainer = document.getElementById("imagePreview");
                        const previewImage = previewContainer.querySelector(".image-preview__image");
                        const previewDefaultText = previewContainer.querySelector(".image-preview__default-text");

                        inpFile.addEventListener("change", function() {
                            const file = this.files[0];

                            if (file) {
                                const reader = new FileReader();

                                previewDefaultText.style.display = "none";
                                previewImage.style.display = "block";

                                reader.addEventListener("load", function() {
                                    console.log(this);
                                    previewImage.setAttribute("src",this.result);
                                });
                                reader.readAsDataURL(file);
                            }
                            else {
                                previewDefaultText.style.display = null;
                                previewImage.style.display = null;
                                previewImage.setAttribute("src","");
                            }
                            
                        })
                    `}
                </script>
                </Helmet>
            </div>
        );
    }
}

export default addPhoto;