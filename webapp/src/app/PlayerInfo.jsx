import React, {Component} from 'react';

export default class PlayerInfo extends Component {

    render() {
        return (
            <React.Fragment>
                <span>Imię: {this.props.name}</span>
                <span>&nbsp;&nbsp;&nbsp;</span>
                <span>Rola: {this.props.role}</span>
                <span>&nbsp;&nbsp;&nbsp;</span>
                <span>Zespół: {this.props.team}</span>
            </React.Fragment>)
    }
}
