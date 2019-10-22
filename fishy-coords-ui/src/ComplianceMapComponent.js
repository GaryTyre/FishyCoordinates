import React from "react";
import { connect } from "react-redux";

import {
    currentCatches,
    currentPings,
    currentRegions,
    mapFocus,
    fishynessLevels
} from './selectors';

import { compose, withProps } from "recompose";

import * as geolib from 'geolib';

import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
    Polygon
} from "react-google-maps";

import FishynessJudge from './FishynessJudge';

function buildMarkers(pings, catches, fishynessLevels)
{
    let markers =
        pings.map((p)=>
            <Marker
                key={p.id}
                position={{
                    lat: p.location.latitude,
                    lng: p.location.longitude
                }}
                icon=' '
                label={{
                    fontFamily: "FontAwesome",
                    text: '\uf276',
                    color: "rgba(80,80,80,0.4)"
                }}
            />
        );

    markers = markers.concat(
        catches.map((c)=>
            <Marker
                key={c.id}
                position={{
                    lat: c.location.latitude,
                    lng: c.location.longitude
                }}
                icon=' '
                label={{
                    fontFamily: "FontAwesome",
                    text: '\uf578',
                    color:
                        FishynessJudge.colorForLevel(
                            fishynessLevels[c.id]
                        )
                }}
            />
        )
    );

    return markers;
}

function buildRegions(regions)
{
    return regions.map((r)=> {
        let path =
            r.polygon.map(
                (point)=> ({
                    lng: point.longitude,
                    lat: point.latitude,
                })
            );

        return <Polygon
            key={r.area}
            path={path}
            options={{
                fillColor: "#eeaa00",
                fillOpacity: 0.4,
                strokeColor: "#eeaa00",
                strokeOpacity: 1,
                strokeWeight: 1
            }}
            label={{ text: r.name }}
        />
    });
}

const ComplianceMapComponent =
    compose(
        withProps({
            googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCw1Cu5QmZqsFLWq-D7m12E3Qqjjj13xWY",
            loadingElement: <div style={{ height: `82vh` }} />,
            containerElement: <div style={{ height: `82vh` }} />,
            mapElement: <div style={{ height: `82vh` }} />,
        }),
        withScriptjs,
        withGoogleMap
    )((props) =>
    {
        let center = props.mapFocus;

        if (!center)
        {
            center =
                geolib.getCenter(
                    props.currentPings.map(
                        (p)=> p.location
                    ).concat(
                        props.currentCatches.map(
                            (c)=> c.location
                        )
                    )
                );
        }

        return <GoogleMap
            defaultZoom={6}
            defaultCenter={{
                lat: center.latitude,
                lng: center.longitude
            }}
            center={{
                lat: center.latitude,
                lng: center.longitude
            }}
        >
            {
                buildMarkers(
                    props.currentPings,
                    props.currentCatches,
                    props.fishynessLevels
                )
            }
            {
                buildRegions(
                    props.currentRegions
                )
            }
        </GoogleMap>
    });

export default connect(
    (store)=> Object.assign(
        currentPings(store),
        currentCatches(store),
        currentRegions(store),
        mapFocus(store),
        fishynessLevels(store)
    )
)(ComplianceMapComponent);
