<template>
  <div style="display: none;"><slot v-if="ready" /></div>
</template>

<script>
import L from "leaflet";
import { LPolygon, propsBinder, findRealParent } from "vue2-leaflet";

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
  latLngs: {
    type: Array,
    default: () => []
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
  name: "PolygonFogOfWar",
  mixins: [LPolygon],
  props,
  mounted() {
    if (this.mask) {
      this.mapObject.options.mask = this.mask;
    }
    if (this.maskId) {
      this.mapObject.options.maskId = this.maskId;
      this.mapObject.options.maskOpacity = this.maskOpacity;
    }
    if (this.slope) {
      this.mapObject.options.slope = this.slope;
    }
    if (this.stdDeviation) {
      this.mapObject.options.stdDeviation = this.stdDeviation;
    }
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
