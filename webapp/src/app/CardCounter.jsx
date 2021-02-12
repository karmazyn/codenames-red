import React from "react";
import {useSelector} from 'react-redux'

export const CardCounter = (props) => {

    return <span> {props.teamName} : {useSelector(state => props.getNumberOfCardsFunction(state))} </span>

}