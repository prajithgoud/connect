import React, { Component } from 'react';
import axios from 'axios';

export default class checkotp extends Component {

    constructor(props) {
        super(props)

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeotp = this.onChangeotp.bind(this);

        this.state = {
            otp : ''
        }
    }

    onChangeotp(e) {
        this.setState({ otp : e.target.value })
    }

    onSubmit = (st) => (event) => {
        event.preventDefault()
        const otp = this.state.otp;
        const origOtp = this.props.location.state.otp;
        console.log(this.props.location.state.otp);
        console.log(otp);
        const userObject = this.props.location.state.detail;

        console.log(userObject);
        if ( origOtp == otp) {
            axios.post('http://localhost:5000/create', userObject)
                .then((res) => {
                    console.log("create");
                    console.log(res.data);
                })
                .catch((error) => {
                    console.log(error)
                });
        }
        else{
            console.log("Users details not stored in db");
        }
    }
    render() {
            return (
            <div>
            <form onSubmit={this.onSubmit()}>
                <div>
                <label for="Otp">Enter Otp:</label>
                <input type="text" value={this.state.otp} onChange={this.onChangeotp}></input><br></br>
                <input type="submit" value="Submit" />
                </div>
            </form>
            </div>
        )
    }
}