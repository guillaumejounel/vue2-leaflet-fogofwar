# vue2-leaflet-polygonfogofwar

## Install

    npm install --save vue2-leaflet-polygonfogofwar

## Demo

Soon

## Usage

In `main.js`:

    import PolygonFogOfWar from "vue2-leaflet-polygonfogofwar";
    ...
    Vue.component("l-polygon-fog-of-war", PolygonFogOfWar);

In your component:

    <l-polygon-fog-of-war
      :latLngs="..."
      :opacity="0"
      :fillOpacity="0"
      fillColor="black"
      mask="mymask"
    />
    <l-polygon-fog-of-war
      :fillOpacity="0"
      :maskOpacity="0.7"
      :latLngs="..."
      fillColor="black"
      maskId="mymask"
    />

## Author

[guillaumejounel](https://github.com/guillaumejounel/)

## License

MIT
polygon fillpattern plugin extension for vue2-leaflet package
