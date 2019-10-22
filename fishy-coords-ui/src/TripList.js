import React from 'react';

import { connect } from 'react-redux';
import { trips, currentVessel } from './selectors';

import Trip from './Trip';
import Loading from './Loading';

import { ListGroup } from 'react-bootstrap';

class TripList extends React.Component
{
    render()
    {
        if (!this.props.currentVessel ||
            !this.props.trips ||
            !this.props.trips[this.props.currentVessel.id]) {
            return <Loading/>;
        }

        let trips =
            this.props.trips[this.props.currentVessel.id];

        let tripList = trips.map((t)=>
            <Trip key={t.id} trip={t}/>
        );

        return (
            <ListGroup
                className="p-0 m-0"
                style={{ overflowY:"auto" }}>
                { tripList }
            </ListGroup>
        );
    }
}

export default connect(
    (store)=>
        Object.assign(
            trips(store),
            currentVessel(store)
        )
)(TripList);
