import React, { useEffect, useState } from "react";
import { YMaps, Map, Placemark } from "react-yandex-maps";

function AreaMap({ location = null, data1 = null }) {
    console.log(location);

    function showMap(data) {
        return (
            <YMaps>
                <Map
                    defaultState={{
                        center: [40.7, 70.2],
                        zoom: 11,
                    }}
                    width="100%"
                    height="400px"
                >
                    {data.map((row) => {
                        console.log(row.lat, row.lng);
                        return <Placemark geometry={[row.lat, row.lng]} />;
                    })}
                </Map>
            </YMaps>
        )
    }
    console.log(location, data1);
    if (location && location.hasOwnProperty(0)) {
        return showMap(location);
    } else if (data1) {
        return showMap(data1);
    }
}
export default AreaMap;
