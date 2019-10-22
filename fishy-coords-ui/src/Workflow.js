import React from 'react';

import { connect } from 'react-redux';
import { reset, goToStage } from './actions';
import { stage } from './selectors';

import { Breadcrumb } from 'react-bootstrap';
import './bootstrap.min.css';

import VesselList from './VesselList';
import TripList from './TripList';
import ComplianceMap from './ComplianceMap';

class Workflow extends React.Component
{
    static Stages =
        {
            vessel: 0,
            trip: 1,
            map: 2
        }

    breadCrumbs()
    {
        var items = [];

        if (this.props.stage >= Workflow.Stages.vessel)
        {
            items.push(
                <Breadcrumb.Item
                    key="vessel"
                    active={ this.props.stage === Workflow.Stages.vessel }
                    onClick={()=> this.props.goToStage(Workflow.Stages.vessel)}>
                    Vessel
                </Breadcrumb.Item>
            );
        }

        if (this.props.stage >= Workflow.Stages.trip)
        {
            items.push(
                <Breadcrumb.Item
                    key="trip"
                    active={ this.props.stage === Workflow.Stages.trip }
                    onClick={()=> this.props.goToStage(Workflow.Stages.trip)}>
                    Trip
                </Breadcrumb.Item>
            );
        }

        if (this.props.stage === Workflow.Stages.map)
        {
            items.push(
                <Breadcrumb.Item key="map" active>
                    Trip Compliance Map
                </Breadcrumb.Item>
            );
        }

        return <Breadcrumb>{ items }</Breadcrumb>;
    }

    render()
    {
        var stage;

        switch (this.props.stage)
        {
            case Workflow.Stages.map:
                stage = <ComplianceMap/>;
                break;
            case Workflow.Stages.trip:
                stage = <TripList/>;
                break;
            case Workflow.Stages.vessel:
            default:
                stage = <VesselList/>;
        }

        return <>
            { this.breadCrumbs() }
            { stage }
        </>;
    }
}

export default connect(
    (store)=> Object.assign(stage(store)),
    { reset, goToStage }
)(Workflow)
