import React, { Component } from 'react';
import axios from 'axios';
import { hideaccountCreated, showaccountCreated } from '../actions';
import { connect } from 'react-redux';
class checkotp extends Component {

    update = () => {
        this.props.dispatch((showaccountCreated()))
        setTimeout(() => {
            this.props.dispatch(hideaccountCreated())
        },5000);
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

        var uid = ""

            // setTimeout(() => {
            //     if (st.detail.role === "Professors") {
            //         axios.get('http://localhost:5000/find',
            //             {
            //                 "Name": st.detail.Name
            //             })
            //             .then((res) => {
            //                 console.log(res)
            //                 console.log(res.data[0]._id)
            //                 axios.post("http://localhost:5000/verifyroles", {
            //                     name: st.detail.Name,
            //                     email: st.detail.Email,
            //                     userid: res.data[0]._id
            //                 }).then((res) => {
            //                         console.log('hello')
            //                     })
            //             })
            //     }
            // }, 4000);

            setTimeout(() => {
                if (st.detail.role !== "Student") {
                    axios.post('http://localhost:5000/find',
                        {
                            "Email": st.detail.Email
                        })
                        .then((res) => {
                            var resp = res
                            axios.post("http://localhost:5000/verifyroles", {
                                name: resp.data[0].Name,
                                email: resp.data[0].Email,
                                userid: resp.data[0]._id
                            }).
                                then((res) => {
                                    console.log('hello')
                                })
                        })
                }
            }, 4000);
        
    }
    render() {
        const st = this.props.location.state
            return (
            <div>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
            <form onSubmit={this.onSubmit(st)}>
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