import React from "react";
import * as ol from "ol";

const MapContext = React.createContext<ol.Map>(new ol.Map({}));

export default MapContext;