import React from 'react';

import { connect } from 'react-redux';

import { vessels } from './selectors';
import { fetchVessels } from './actions';

import Vessel from './Vessel';
import Loading from './Loading';

import { ListGroup } from 'react-bootstrap';

class VesselList extends React.Component
{
    componentDidMount()
    {
        this.props.fetchVessels();
    }

    render()
    {
        if (!this.props.vessels) { return <Loading/>; }

        const vessels =
            this.props.vessels.map((v)=>
                <Vessel key={v.id} vessel={v}/>
            );

        return (
            <ListGroup
                className="p-0 m-0"
                style={{ overflowY:"auto" }}>
                { vessels }
            </ListGroup>
        )
    }
}

export default connect(
    (store)=> Object.assign(vessels(store)),
    { fetchVessels }
)(VesselList)
