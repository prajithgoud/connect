import React, { Component } from 'react';
import axios from 'axios';
import { hideaccountCreated, showaccountCreated } from '../actions';
import { connect } from 'react-redux';
class checkotp extends Component {

    update = () => {
        this.props.dispatch((showaccountCreated()))
        setTimeout(() => {
            this.props.dispatch(hideaccountCreated())
        },6000);
    }

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
                    this.props.history.push({
                        pathname : '/login'
                        // state : {detail : userObject,otp : this.state.otp}
                    });
                })
                .catch((error) => {
                    console.log(error.response.data)
                });
        }
        else{
            console.log("Users details not stored in db");
        }
    }
    render() {
            return (
            <div>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
            <form onSubmit={this.onSubmit()}>
                <div>

                <label for="Otp">Enter Otp:</label>
                <input type="text" value={this.state.otp} onChange={this.onChangeotp}></input><br></br>
                <input type="submit" onClick = {this.update} value="Submit" />
                </div>
            </form>
            </div>
        )
    }
}


function mapStatetoProps(state) {
    console.log(state)
    return {
        authenticated : state.auth.authenticated,
        loading : state.auth.loading,
        accountCreated : state.auth.accountCreated
    }
}

export default connect(mapStatetoProps)(checkotp);