import React from 'react';

import { Spinner } from 'react-bootstrap';
import './bootstrap.min.css';

class Loading extends React.Component
{
    render()
    {
        return(
            <div className="d-flex flex-row justify-content-center align-items-center"
                style={
                    Object.assign({ width: "100%", height: "100%" }, this.props.style)
                }>
                <h3>
                    <Spinner animation="border"/>
                    <span className="ml-2">Loading...</span>
                </h3>
            </div>
        );
    }
}

export default Loading;
