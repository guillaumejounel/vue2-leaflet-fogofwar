# vue2-leaflet-fogofwar

## Install

    npm install --save vue2-leaflet-fogofwar

## Demo

Soon

## Usage

In `main.js`:

    import { PolygonFogOfWar, CircleFogOfWar } from "vue2-leaflet-fogofwar";
    ...
    Vue.component("l-polygon-fog-of-war", PolygonFogOfWar);
    Vue.component("l-circle-fog-of-war", CircleFogOfWar);

In your component:

    <l-polygon-fog-of-war
      :visible="..."
      :latLngs="..."
      :opacity="0"
      :fillOpacity="0"
      fillColor="black"
      mask="myMask"
    />
    <l-circle-fog-of-war
      :visible="..."
      :fillOpacity="0"
      :maskOpacity="0.7"
      :latLng="..."
      :radius="..."
      fillColor="black"
      maskId="myMask"
    />
    <l-polygon-fog-of-war
      :visible="..."
      :fillOpacity="0"
      :maskOpacity="0.7"
      :latLngs="..."
      fillColor="black"
      :opacity="0"
      maskId="myMask"
    />

## Author

[guillaumejounel](https://github.com/guillaumejounel/)

## License

MIT
fogofwar plugin extension for vue2-leaflet package
