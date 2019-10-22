import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFish,
    faSatelliteDish
} from '@fortawesome/free-solid-svg-icons';

const FishyIcon = (props)=>
{
    return (
        <span {...props}>
            <FontAwesomeIcon icon={faFish} size="lg"/>
            <FontAwesomeIcon
                icon={faSatelliteDish}
                style={{
                    position: "relative",
                    top: "-0.6em",
                    left: "-0.35em"
                }}
            />
        </span>
    );
}

export default FishyIcon;
