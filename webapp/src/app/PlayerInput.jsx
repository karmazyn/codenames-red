import React, {Component} from "react";
import {Button, TextField} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import {connect} from "react-redux";
import {getPlayerName} from "./redux/Selectors";
import {assignPlayerName, loadPlayers} from "./redux/Actions";
import Grid from "@material-ui/core/Grid";

const useStyles = theme => ({
    loginRoot: {
        marginBottom: '1em',
        justify: 'center',
        alignItems: 'center'
    },
});

const initialState = {
    value: '',
    error: false,
    errorMessage: ''
};

class PlayerInput extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event) {
        fetch("/api/players/" + this.state.value, {
            method: "POST"
        }).then((result) => {
            if (result.ok) {
                this.props.assignPlayerName({name: this.state.value});
                result.json().then((players) => {
                        this.props.loadPlayers({players: players});
                    }
                )
                this.setState(initialState)
            } else if (result.status === 409) {
                this.setState({error: true, errorMessage: 'Gracz już istnieje'})
            } else {
                this.setState({error: true, errorMessage: 'Nie udało się'})
            }
        }).catch((error) => {
            this.setState({error: true, errorMessage: 'Nie udało się'})
        })
        event.preventDefault();
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    render() {
        const {classes} = this.props;
        return (
                <form onSubmit={this.handleSubmit}>
                    <Grid container spacing={2} direction={"column"} className={classes.loginRoot}>
                        <Grid item xs={12}>
                            <TextField
                                id="input-login"
                                value={this.state.value} error={this.state.error} onChange={this.handleChange}
                                placeholder={"Podaj imię"}
                                label="Gracz"
                                helperText={this.state.errorMessage}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" onClick={this.handleSubmit}>Dołącz</Button>
                        </Grid>
                    </Grid>
                </form>
        );
    }
}

const mapStateToProps = state => {
    return {
        name: getPlayerName(state),
    };
}

export default connect(mapStateToProps, {assignPlayerName, loadPlayers})(withStyles(useStyles)(PlayerInput));