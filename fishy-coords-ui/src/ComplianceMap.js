import React from 'react';
import { connect } from 'react-redux';
import * as geolib from 'geolib';

import {
    currentPings,
    currentCatches,
    currentRegions,
    pingsShown
} from './selectors';

import {
    showPings
} from './actions';

import {
    ListGroup,
    Button
} from 'react-bootstrap';

import ComplianceMapComponent from './ComplianceMapComponent';

import Catch from './Catch';
import Ping from './Ping';
import Loading from './Loading';

class ComplianceMap extends React.Component
{
    eventHistory = ()=>
    {
        let catches =
            this.props.currentCatches.map((c)=>
               [c.time, <Catch key={c.id} _catch={c}/>]
            );

        let pings =
            this.props.pingsShown ? 
                this.props.currentPings.map((p)=>
                   [p.time, <Ping key={p.id} ping={p}/>]
                ) : [];

        let sortedEvents =
            catches
                .concat(pings)
                .sort((x, y)=>
                    (x[0] > y[0]) ? 1 :
                        x[0] === y[0] ? 0 : -1
                ).map((e)=> e[1]);

        return sortedEvents;
    }

    render()
    {
        if (!this.props.currentCatches ||
            !this.props.currentPings ||
            !this.props.currentRegions)
        {
            return <Loading/>;
        }

        return (
            <div className="d-flex flex-row justify-content-between"
                style={{
                    height:"82vh",
                    width:"100vw"
                }}
            >
                <span
                    className="mr-2 d-flex flex-column"
                    style={{
                        height: "82vh",
                        width: "45vw",
                        overflowX: "hidden"
                    }}>
                    <div className="m-1">
                        <Button
                            size="sm"
                            onClick={()=>
                                this.props.showPings(
                                    !this.props.pingsShown 
                                )}
                        >
                            {
                                this.props.pingsShown ? 
                                "Hide Pings" : "Show Pings"
                            }
                        </Button>
                    </div>
                    <ListGroup
                        style={{
                            flexGrow: 1,
                            overflowY:"auto"
                        }} 
                    >
                        { this.eventHistory() }
                    </ListGroup>
                </span>
                <span style={{
                    height: "82vh",
                    flexGrow:1
                }}>
                    <ComplianceMapComponent/>
                </span>
            </div>
        );
    }
}

export default connect(
    (store)=> Object.assign(
        currentPings(store),
        currentCatches(store),
        currentRegions(store),
        pingsShown(store)
    ),
    { showPings }
)(ComplianceMap);
