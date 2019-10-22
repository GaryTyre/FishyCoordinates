import React from 'react';
import { connect } from 'react-redux';
import { chooseTrip } from './actions';

import {
    ListGroup,
} from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCaretRight
} from '@fortawesome/free-solid-svg-icons';

import Moment from 'moment';

class Trip extends React.Component
{
    render()
    {
        return <ListGroup.Item onClick={()=>
            this.props.chooseTrip(this.props.trip)
        }>
            <div className="d-flex flex-row justify-content-between">
                <span style={{flexGrow:1}}>
                    {
                        new Moment(this.props.trip.start)
                                .format("MMMM Do YYYY, h:mm:ss a ZZ")
                    }
                </span>
                <span
                    className="mr-2 ml-2"
                    style={{ width: "2em" }}>
                    <FontAwesomeIcon icon={faCaretRight}/>
                </span>
                <span style={{flexGrow:1}}>
                    {
                        new Moment(this.props.trip.end)
                                .format("MMMM Do YYYY, h:mm:ss a ZZ")
                    }
                </span>
            </div>
        </ListGroup.Item>;
    }
}

export default connect(null, { chooseTrip })(Trip);
