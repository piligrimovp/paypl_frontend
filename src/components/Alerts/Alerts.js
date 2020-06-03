import React from "react";
import AlertSuccess from "./Success/AlertSuccess";
import AlertError from "./Error/AlertError";
import PropTypes from "prop-types"

export default function Alerts(props) {
    return <>{
        props.alerts.map((item, index) => {
            if (item.status === 'success') {
                return <AlertSuccess key={index} text={item.text} auto_close={item.close}
                                     close={() => props.close(index,props.alerts)}/>
            }
            if (item.status === 'error') {
                return <AlertError key={index} text={item.text} auto_close={item.close}
                                   close={() => props.close(index,props.alerts)}/>
            }
            return '';
        })
    }</>
}

Alerts.propTypes = {
    alerts: PropTypes.array.isRequired,
    close: PropTypes.func,
}