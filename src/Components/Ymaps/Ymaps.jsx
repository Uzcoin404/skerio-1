import React, { useEffect, useState } from "react";
import { YMaps, Map, Placemark } from "react-yandex-maps";

function AreaMap() {

    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('http://skerio.uz/public/api/complexFind', {method: "GET"})
        .then((response) => {
            let res = JSON.parse(response);
            console.log(res);
        })
    }, [])

    // if (data) {
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
                    <Placemark geometry={[40.7, 70.2]} />
                </Map>
            </YMaps>
        );
    // }
}
export default AreaMap;
