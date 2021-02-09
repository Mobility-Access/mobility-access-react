import React, { useEffect, useState } from "react"
import "./Map.css";
import { Coordinate } from "ol/coordinate";
import OLMap from "ol/Map";
import OLView from "ol/View";
import TileLayer from "ol/layer/Tile";
import Source from "ol/source/OSM";

import "ol/ol.css";
import "./Map.css";

const Map = () => {
    const [center, setCenter] = useState<Coordinate>([0,0]);
    const [zoom, setZoom] = useState<number>(1);

    const map = new OLMap({
        layers: [
            new TileLayer({
                source: new Source()
            })
        ],
        view: new OLView({
            center: [0, 0],
            zoom: 1,
        })
    })


    // const updateMap = () => {
    //     map.getView().setCenter(center);
    //     map.getView().setZoom(zoom);
    // }

    useEffect(() => {
        if (map.getTarget() === undefined) {
            map.setTarget("map");
        }
    });

    return (
        <div id="map" style={{width: "100%", height: "100%"}}>
        </div>

    )
}

export default Map;

// interface MapProps {
//     children: any,
//     zoom: any,
//     center: any,
// }

// const Map = (props: MapProps) => {
//     // const mapRef = useRef<HTMLElement>();
//     const [map, setMap] = useState<ol.Map>();

//     useEffect(() => {
//         let options = {
//           view: new ol.View({ zoom: props.zoom, center: props.zoom }),
//           layers: [],
//           controls: [],
//           overlays: []
//         };

//         let mapObject = new ol.Map(options);
//         // mapObject.setTarget(mapRef);
//         setMap(mapObject);

//         return () => mapObject.setTarget(undefined);
//         }, []
//     );

//     useEffect(() => {
//         if (!map) {
//             return;
//         }

//         map.getView().setZoom(props.zoom);
//         }, [props.zoom]
//     );

//     useEffect(() => {
//         if (!map) {
//             return;
//         }

//         map.getView().setCenter(props.center)
//         }, [props.center]
//     );

//     const { children } = props;
    
//     return (
//         <MapContext.Provider value={{ map }}>
//           <div className="ol-map">
//             {children}
//           </div>
//         </MapContext.Provider>
//       )

// }

// export default Map;