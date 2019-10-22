import React from 'react';

import { connect } from 'react-redux';
import { changeMapFocus } from './actions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faMapMarkerAlt,
    faCalendarAlt,
    faGlobe,
} from '@fortawesome/free-solid-svg-icons';

import {
    ListGroup,
} from 'react-bootstrap';

import Moment from 'moment';

const Ping = (props)=>
{
    return <ListGroup.Item
        onClick={()=> props.changeMapFocus(
            props.ping.location
        )}
    >
        <div className="d-flex flex-row justify-items-between">
            <div style={{width: "2em"}}>
                <FontAwesomeIcon icon={faMapMarkerAlt}/>
            </div>
            <div className="d-flex flex-column justify-items-around"
                style={{flexGrow:1}}>
                <div style={{width: "100%"}}>
                    <FontAwesomeIcon
                        className="mr-2"
                        icon={faCalendarAlt}
                    />
                    { new Moment(props.ping.time)
                           .format("MMMM Do YYYY, h:mm:ss a ZZ") }
                </div>
                <div style={{width: "100%"}}>
                    <FontAwesomeIcon
                        className="mr-2"
                        icon={faGlobe}
                    />
                    <span className="mr-1">Latitude:</span>
                    <span className="mr-1">
                        { props.ping.location.latitude }
                    </span>
                    <span className="mr-1">/</span>
                    <span className="mr-1">Longitude:</span>
                    <span className="mr-1">
                        { props.ping.location.longitude }
                     </span>
                </div>
            </div>
        </div>
    </ListGroup.Item>
}

export default connect(
    null,
    { changeMapFocus }
)(Ping);
