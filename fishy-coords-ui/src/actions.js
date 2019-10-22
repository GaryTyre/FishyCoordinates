// TODO: This is all getting a bit heavy and needs a refactor

import { initialState } from './reducers';
import store from './store';

import FishynessJudge from './FishynessJudge';

export const reset = ()=> ({
    type: "reset",
    payload: initialState
});

export const goToStage = (stage)=> ({
    type: "goToStage",
    payload: { stage: stage }
});

let updateVesselCache = (vessels)=> ({
    type: "updateVesselCache",
    payload: { vessels: vessels }
});

export const fetchVessels = ()=>
    (dispatch)=> {
        let vesselCache = store.getState().vessels;
        if (vesselCache != null) { return; }
        fetch(store.getState().apiURI + '/vessels')
            .then((response) => response.json())
            .then((vessels) => {
                dispatch(updateVesselCache(vessels))
            });
    };

let updateCurrentVessel = (vessel)=> ({
    type: "updateCurrentVessel",
    payload: { currentVessel: vessel }
});

let updateTripCache = (tripCache)=> ({
    type: "updateTripCache",
    payload: { trips: tripCache }
});

export const chooseVessel = (vessel)=>
    (dispatch)=> {
        dispatch(updateCurrentVessel(vessel));
        dispatch(goToStage(1));

        let tripCache =
            Object.assign({}, store.getState().trips);

        if (tripCache[vessel.id]) { return; }

        fetch(
            `${store.getState().apiURI}/vessels/${vessel.id}/trips`
        )
        .then((response) => response.json())
        .then((trips) => {
            tripCache[vessel.id] = trips;
            dispatch(updateTripCache(tripCache));
        });
    }

let updateCurrentTrip = (trip)=> ({
    type: "updateCurrentTrip",
    payload: { currentTrip: trip }
});

let updateTripPingCache = (tripPings)=> ({
    type: "updateTripPingCache",
    payload: { tripPings: tripPings }
});

let updateCurrentPings = (pings)=> ({
    type: "updateCurrentPings",
    payload: { currentPings: pings }
});

let updateTripCatchesCache = (tripCatchesCache)=> ({
    type: "updateTripCatchesCache",
    payload: { tripCatches: tripCatchesCache }
});

let updateCurrentCatches = (catches)=> ({
    type: "updateCurrentCatches",
    payload: { currentCatches: catches }
});

let updateFishynessLevels = (updatedFishynessLevels)=> ({
    type: "updateFishynessLevels",
    payload: { fishynessLevels: updatedFishynessLevels }
});

// TODO: break up this big algorithm, move it out of here
export const recalculateFishyness =
    (tripId, catches, pings)=>
        (dispatch)=> {
            let fishynessLevels =
                Object.assign(
                    {},
                    store.getState().fishynessLevels
                );
            
            if (!catches || !pings || (catches.length === 0)) {
                return;
            }
        
            let uniqueCAs = uniqueCatchAreas(catches);

            if (!uniqueCAs.every((ca)=>
                    !!store.getState().regions[ca] 
                ))
            {
                return;
            }

            // Ok, now we have all catches, pings and regions
            // for the current case, and we can recalculate
            // the fishyness of each catch
            
            let sortedEvents =
                catches.map(
                    (c)=> [c.time, c, true]
                ).concat(
                    pings.map((p)=> [p.time, p, false])
                ).sort((x, y)=>
                    (x[0] > y[0]) ? 1 :
                        x[0] === y[0] ? 0 : -1
                );

            let prevPing = null;
            let nextPing = null;

            for (let i = 0; i < sortedEvents.length; i++)
            {
                let ev = sortedEvents[i];

                if ((i > 0) && (sortedEvents[i - 1][2] === false))
                {
                    prevPing = sortedEvents[i - 1][1];
                }

                if ((i < sortedEvents.length - 1) &&
                    sortedEvents[i + 1][2] === false)
                {
                    nextPing = sortedEvents[i + 1][1];
                }

                if (ev[2] === true)
                {
                    let _catch = ev[1];

                    let region = store.getState().regions[
                        _catch.catchArea 
                    ];

                    let level = new FishynessJudge(
                        _catch,
                        region,
                        prevPing,
                        nextPing
                    ).level();
                  
                    fishynessLevels[_catch.id] = level;
                }
            }

            dispatch(updateFishynessLevels(fishynessLevels));
        };

export const fetchTripPings = (trip)=>
    (dispatch)=> {
        let tripPings =
            Object.assign({}, store.getState().tripPings);

        if (tripPings[trip.id])
        {
            dispatch(updateCurrentPings(
                tripPings[trip.id]
            ));
            return;
        }

        fetch(
            store.getState().apiURI +
            `/vessels/${store.getState().currentVessel.id}` +
            `/trips/${trip.id}/pings`
        )
        .then((response) => response.json())
        .then((pings) => {
            tripPings[trip.id] = pings;
            dispatch(updateCurrentPings(pings));
            dispatch(updateTripPingCache(tripPings));
            dispatch(
                recalculateFishyness(
                    trip.id,
                    store.getState().tripCatches[trip.id],
                    pings
                )
            )
        });
    };

export const fetchTripCatches = (trip)=>
    (dispatch)=> {
        let tripCatchesCache =
            Object.assign({}, store.getState().tripCatches);

        if (tripCatchesCache[trip.id])
        {
            dispatch(updateCurrentCatches(
                tripCatchesCache[trip.id]
            ));
            return;
        }

        fetch(
            store.getState().apiURI +
            `/vessels/${store.getState().currentVessel.id}` +
            `/trips/${trip.id}/catches`
        )
        .then((response) => response.json())
        .then((catches) => {
            tripCatchesCache[trip.id] = catches;
            dispatch(fetchCatchRegions(catches));
            dispatch(updateCurrentCatches(catches));
            dispatch(updateTripCatchesCache(tripCatchesCache));
            dispatch(
                recalculateFishyness(
                    trip.id,
                    catches,
                    store.getState().tripPings[trip.id]
                )
            );
        });
    };

function uniqueCatchAreas(catches)
{
    if (catches.length === 0) { return []; }
    return [...new Set(catches.map((c)=> c.catchArea))];
}

let updateRegionsCache = (regionsCache)=> ({
    type: "updateRegionsCache",
    payload: { regions: regionsCache }
});

let updateCurrentRegions = (regions)=> ({
    type: "updateCurrentRegions",
    payload: { currentRegions: regions }
});

export const fetchCatchRegions = (catches)=>
    (dispatch)=> {
        let regionsCache =
            Object.assign({}, store.getState().regions);

        let unloadedCatchAreas = [];
        let currentRegions = [];

        uniqueCatchAreas(catches).forEach((ca)=> {
            let cachedRegion = regionsCache[ca];
            if (!cachedRegion)
            {
                unloadedCatchAreas.push(ca);
            }
            else
            {
                currentRegions.push(cachedRegion);
            }
        });

        if (unloadedCatchAreas.length === 0)
        {
            dispatch(updateCurrentRegions(currentRegions));
            return;
        }

        fetch(
            store.getState().apiURI +
            `/regions?catchAreas=${unloadedCatchAreas.join('-')}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            }
        )
        .then((response) => response.json())
        .then((regions) => {
            regions.forEach((r)=> {
                regionsCache[r.area] = r;
                currentRegions.push(r);
            });

            dispatch(updateCurrentRegions(currentRegions));
            dispatch(updateRegionsCache(regionsCache));

            if (store.getState().currentTrip)
            {
                let trip = store.getState().currentTrip;

                dispatch(
                    recalculateFishyness(
                        trip.id, 
                        store.getState().tripCatches[trip.id],
                        store.getState().tripPings[trip.id]
                    )
                )
            }
        });
    };

export const chooseTrip = (trip)=>
    (dispatch)=> {
        dispatch(updateCurrentTrip(trip));
        dispatch(fetchTripPings(trip));
        dispatch(fetchTripCatches(trip));
        dispatch(goToStage(2));
    };

export const changeMapFocus = (mapFocus)=> ({
    type: "mapFocus",
    payload: { mapFocus: mapFocus }
});

export const showPings = (show)=> ({
    type: "showPings",
    payload: { pingsShown: show }
});

