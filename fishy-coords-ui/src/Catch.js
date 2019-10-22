import React from 'react';

import { connect } from 'react-redux';
import { changeMapFocus } from './actions';
import { fishynessLevels } from './selectors';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFish,
    faCalendarAlt,
    faGlobe,
    faWeight,
    faCheck,
    faTimes
} from '@fortawesome/free-solid-svg-icons';

import {
    ListGroup,
    ButtonGroup,
    Button,
} from 'react-bootstrap';

import Moment from 'moment';

import FishynessJudge from './FishynessJudge';
import Loading from './Loading';

const Catch = (props)=>
{
    if (props.fishynessLevels[props._catch.id] === null ||
        props.fishynessLevels[props._catch.id] === undefined)
    {
        return (
            <ListGroup.Item
                onClick={()=>
                    props.changeMapFocus(props._catch.location)
                }
            >
                <Loading/>   
            </ListGroup.Item>
        );
    }
    
    return <ListGroup.Item
        onClick={()=>
            props.changeMapFocus(props._catch.location)
        }
        style={{
            background:
                FishynessJudge.colorForLevel(
                    props.fishynessLevels[props._catch.id],
                    0.33
                )
        }}
    >
        <div className="d-flex flex-row justify-items-between">
            <div style={{width: "2em"}}>
                <FontAwesomeIcon icon={faFish}/>
            </div>
            <div className="d-flex flex-column justify-items-around"
                style={{flexGrow:1}}>
                <div style={{width: "100%"}}>
                    <FontAwesomeIcon
                        className="mr-2"
                        icon={faCalendarAlt}
                    />
                    { new Moment(props._catch.time)
                           .format("MMMM Do YYYY, h:mm:ss a ZZ") }
                </div>
                <div style={{width: "100%"}}>
                    <FontAwesomeIcon
                        className="mr-2"
                        icon={faGlobe}
                    />
                    <span className="mr-1">Latitude:</span>
                    <span className="mr-1">
                        { props._catch.location.latitude }
                    </span>
                    <span className="mr-1">/</span>
                    <span className="mr-1">Longitude:</span>
                    <span className="mr-1">
                        { props._catch.location.longitude }
                     </span>
                </div>
                <div style={{width: "100%"}}>
                    <FontAwesomeIcon
                        className="mr-2"
                        icon={faWeight}
                    />
                    <span className="mr-1">
                        { props._catch.quantity }
                    </span>
                    <span>kg</span>
                </div>
                <div style={{width: "100%"}}>
                    <span
                        style={{ fontWeight:900 }}
                        className="mr-1">
                        LGTIN
                    </span>
                    <span>{ props._catch.lgtin }</span>
                </div>
                <div style={{width: "100%"}}>
                    <span className="d-flex flex-row justify-content-end">
                        <ButtonGroup size="sm">
                            <Button variant="success">
                                <FontAwesomeIcon
                                    className="mr-1"
                                    icon={faCheck}/>
                                Event Ok
                            </Button>
                            <Button variant="danger">
                                <FontAwesomeIcon
                                    className="mr-1"
                                    icon={faTimes}/>
                                Reject Event
                            </Button>
                        </ButtonGroup>
                    </span>
                </div>
            </div>
        </div>
    </ListGroup.Item>
}

export default connect(
    (store)=> fishynessLevels(store),
    { changeMapFocus }
)(Catch);
