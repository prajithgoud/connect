import axios from 'axios';
import React, { Component } from 'react';

class Searchtable extends Component {
    render() {
        console.log(this.props.obj.name)
        return (
            <tr>
                <td>
                    {this.props.obj.name}
                </td>
            </tr>
        );
    }
}

export default Searchtable;
