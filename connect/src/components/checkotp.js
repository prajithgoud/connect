import React, { Component } from 'react';
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
        var recotp = parseInt(st)
        var otp = parseInt(this.state.otp)
        if (recotp != otp) {
            console.log("false");
        }
        else{
            console.log("true");
        }
    }
    render() {
    const st  = this.props.location.state
            return (
            <div>
            <form onSubmit={this.onSubmit(st)}>
                <div>
                <label for="Otp">Enter Otp:</label>
                <input type="text" value={this.state.enteredotp} onChange={this.onChangeotp}></input><br></br>
                <input type="submit" value="Submit" />
                </div>
            </form>
            </div>
        )
    }
}