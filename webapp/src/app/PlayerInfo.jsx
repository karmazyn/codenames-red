import React, {Component} from 'react';

export default class PlayerInfo extends Component {
    render() {
        return <span>Imię: {this.props.name}</span>;
    }
}
