export const initialState = {
    stage: 0,
    apiURI: process.env.API_URI ?
        process.env.API_URI : "http://localhost:62741/api"
    ,
    vessels: null, // List of vessels
    currentVessel: null,
    trips: {}, // Object mapping vessel to trip list
    currentTrip: null,
    tripPings: {}, // Object mapping trip to ping list
    currentPings: null,
    tripCatches: {}, // Object mapping trip to catch list
    currentCatches: null,
    regions: {}, // Object mapping region id to region data
    currentRegions: null,
    mapFocus: null,
    fishynessLevels: {},
    pingsShown: true
};

function fishyCoordsApp(state = initialState, action)
{
    return Object.assign({}, state, action.payload);
}

export default fishyCoordsApp;
