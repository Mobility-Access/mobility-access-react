import { Fill, RegularShape, Stroke, Style } from 'ol/style';

import Colors from "../../Colors";

export const squareMarker = () => {
    return new Style({
        image: new RegularShape({
            fill: new Fill({ color: Colors.contrastRed }),
            points: 4
        }),
        stroke: new Stroke({
            color: Colors.contrast,
            width: 2,
        }),
    })
};