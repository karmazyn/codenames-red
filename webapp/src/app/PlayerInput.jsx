import React, {Component} from "react";
import {InputAdornment} from "@material-ui/core";
import {Input} from "@material-ui/core";
import {PlusOne} from "@material-ui/icons";
import withStyles from "@material-ui/core/styles/withStyles";

const useStyles = theme => ({
    login: {
        margin: theme.spacing(1, 1.5),
    },
});

class PlayerInput extends Component {
    constructor(props) {
        super(props);
        this.state = {value: '', error: false};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event) {
        fetch("/api/players/" + this.state.value, {
            method: "POST"
        }).then((result) => {
                if(result.ok) {
                    this.setState({error: false})
                } else {
                    this.setState({error: true})
                }
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
                <Input id="input-login" className={classes.login} variant="outlined" placeholder={"Podaj imię"}
                       value={this.state.value} error={this.state.error} onChange={this.handleChange}
                       endAdornment={
                           <InputAdornment position={"end"}>
                               <PlusOne/>
                           </InputAdornment>
                       }
                />
            </form>
        );
    }
}

export default withStyles(useStyles)(PlayerInput);