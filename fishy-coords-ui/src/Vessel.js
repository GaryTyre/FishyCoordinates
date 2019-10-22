import React from 'react';
import { connect } from 'react-redux';
import { chooseVessel } from './actions';

import {
    ListGroup,
} from 'react-bootstrap';

class Vessel extends React.Component
{
    render()
    {
        let countryCode = "_unknown";
        let countryName = this.props.vessel.flag;

        let splitFlag =
           this.props.vessel.flag.split(' ');

        if (splitFlag.length === 2)
        {
            countryCode = splitFlag[0];
            countryName = splitFlag[1];
        }

        return <ListGroup.Item onClick={()=>
            this.props.chooseVessel(this.props.vessel)
        }>
            <div className="d-flex flex-column justify-content-between">
                <div className="d-flex flex-row justify-content-between">
                    <span style={{
                        width: "10em",
                    }}>
                        <span className="mr-1">
                            { countryCode }
                        </span>
                        <span>{ countryName }</span>
                    </span>
                    <span style={{flexGrow:1}}>
                        { this.props.vessel.name }
                    </span>
                </div>
                <div className="d-flex flex-row justify-content-between">
                    <span style={{
                        width: "10em",
                        fontWeight: 600
                    }}>
                        Registration Number
                    </span>
                    <span style={{flexGrow:1}}>
                        { this.props.vessel.registrationNumber }
                    </span>
                </div>
                <div className="d-flex flex-row justify-content-between">
                    <span style={{
                        width: "10em",
                        fontWeight: 600
                    }}>
                        IMO Number
                    </span>
                    <span style={{flexGrow:1}}>
                        { this.props.vessel.imoNumber }
                    </span>
                </div>
            </div>
        </ListGroup.Item>;
    }
}

export default connect(
    null,
    { chooseVessel }
)(Vessel);
