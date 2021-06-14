import axios from 'axios';
import React, { Component } from 'react';

class DataTable extends Component {
    render() {
        return (
            <tr>
                <td>
                    {this.props.obj._id}
                </td>
                <td>
                    {this.props.obj.email}
                </td>
                <td>
                    <button onclick={
                        axios.post(`http://localhost:5000/update/${this.props.obj.userid}`,{
                            "isverified" : true
                        })
                        .then((res)=>{
                            axios.post(`http://localhost:5000/delete/${this.props.obj._id}`)
                            .then((res)=>{
                            })
                        })
                    }>Accept</button>
                </td>
            </tr>
        );
    }
}

export default DataTable;