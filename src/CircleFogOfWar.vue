<template>
  <div style="display: none;"><slot v-if="ready" /></div>
</template>

<script>
import L from "leaflet";
import { LCircle, propsBinder, findRealParent } from "vue2-leaflet";

const props = {
  mask: {
    type: String,
    default: null
  },
  maskId: {
    type: String,
    default: null
  },
  maskOpacity: {
    type: Number,
    default: 0.7
  },
  latLng: {
    type: [Object, Array],
    default: () => [
      [90, -999000],
      [90, 999000],
      [-90, 999000],
      [-90, -999000],
      [90, -999000]
    ]
  },
  slope: {
    type: Number,
    default: 2
  },
  stdDeviation: {
    type: Number,
    default: 10
  }
};

export default {
  name: "CircleFogOfWar",
  mixins: [LCircle],
  props,
  mounted() {
    if (this.mask) {
      this.circleOptions.mask = this.mask;
    }
    if (this.maskId) {
      this.circleOptions.maskId = this.maskId;
      this.circleOptions.maskOpacity = this.maskOpacity;
    }
    if (this.slope) {
      this.circleOptions.slope = this.slope;
    }
    if (this.stdDeviation) {
      this.circleOptions.stdDeviation = this.stdDeviation;
    }
    this.mapObject = L.circle(this.latLng, this.circleOptions);
    L.DomEvent.on(this.mapObject, this.$listeners);
    propsBinder(this, this.mapObject, this.$options.props);
    this.ready = true;
    this.parentContainer = findRealParent(this.$parent);
    this.parentContainer.addLayer(this, !this.visible);
  },
  beforeDestroy() {
    this.parentContainer.removeLayer(this);
  }
};
</script>
