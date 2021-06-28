import React, { Component } from 'react';
import axios from 'axios';
import "./profileUpdateStyle.css";
import Helmet from 'react-helmet';
// import FormData from 'form-data';


class profile_update extends Component {

    constructor(props) {
        super(props);
        this.onchangedob = this.onchangedob.bind(this);
        this.onChangegender = this.onChangegender.bind(this);
        this.onchangedepartment = this.onchangedepartment.bind(this);
        this.onchangedescription = this.onchangedescription.bind(this);
        this.onsubmit = this.onsubmit.bind(this);
        this.state = {
            dob: '',
            gender: '',
            department: '',
            description: '',
        }
    }


    onChangegender(event) {
        this.setState({
          gender: event.target.value
        });
      }

    onchangedob(e) {
        this.setState({
            dob: e.target.value,
        })
    }

    onchangedepartment(e) {
        this.setState({
            department : e.target.value.toUpperCase()
        })
    }

    onchangedescription(e) {
        this.setState({
            description : e.target.value
        })
    }

    onsubmit(e) {
        e.preventDefault()

        // const data = new FormData();
        // data.append('Photo', this.state.Photo);
        // console.log(this.state.Photo);
        // console.warn(this.state.Photo);
        axios.get('http://localhost:5000/userdetails', { headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` } })
        .then((res)=>{
            var id = res.data._id;
            console.log(res.data);
            axios.post(`http://localhost:5000/update/${id}`,{
                "dob" : this.state.dob,
                "gender" : this.state.gender,
                "department" : this.state.department,
                "description" : this.state.description,
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
                    <label>Gender: </label>
                    <input type="radio" value="male" checked={this.state.gender === "male"} onChange={this.onChangegender} /> Male
                    <input type="radio" value="female" checked={this.state.gender === "female"} onChange={this.onChangegender} /> Female
                    <br />
                    <label>Department: </label>
                    <input type="text" value={this.state.department} onChange={this.onchangedepartment} /> 
                    <br />
                    <label>Description: </label>
                    <input type="text" value={this.state.description} onChange={this.onchangedescription} /> 
                    <br />
                    <label>DOB: </label>
                    <input type="date" value={this.state.dob} onChange={this.onchangedob} /><br /><br />
                    <button>Submit</button>
                </form>
                <Helmet>
                {/* <meta charSet="utf-8" /> */}
                {/* <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w==" crossorigin="anonymous" /> */}
                {/* <script>
                    {`
                        const inpFile = document.getElementById("inpFile");
                        const previewContainer = document.getElementById("imagePreview");
                        const previewImage = previewContainer.querySelector(".image-preview__image");
                        const previewDefaultText = previewContainer.querySelector(".image-preview__default-text");

                        inpFile.addEventListener("change", function() {
                            const file = this.fil+es[0];

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
                </script> */}
                </Helmet>
            </div>
        );
    }
}

export default profile_update;