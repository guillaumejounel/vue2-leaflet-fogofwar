/**
 *  Extends SVG drawing to support masks
 *  Usage: mask, maskId and maskOpacity attributes
 *  Author: gjounel[at]gmail.com for vue2-leaflet
 */
import L from "leaflet";

(function(window, document) {
  if (L.Browser.svg) {
    L.SVG.include({
      __setMask: function(layer) {
        let path = layer._path;
        path.setAttribute("mask", `url(#mask_${layer.options.maskId})`);
        path.setAttribute("fill", "black");
        path.setAttribute("fill-opacity", layer.options.maskOpacity);
      },

      __mask: function(layer) {
        let path = layer._path,
          maskId = layer.options.mask;
        if (!this._defs) {
          this._defs = L.SVG.create("defs");
          this._container.appendChild(this._defs);
        }
        let _ref_id = "m_" + layer._leaflet_id;

        // Create the shadow filter and add it to defs
        let _f = document.getElementById(`filter_${maskId}`);
        if (!_f) {
          _f = L.SVG.create("filter");
          _f.setAttribute("id", `filter_${maskId}`);
          _f.setAttribute("height", "200%");
          _f.setAttribute("width", "200%");

          let _f1 = L.SVG.create("feGaussianBlur");
          _f1.setAttribute("in", "SourceAlpha");
          _f1.setAttribute("stdDeviation", layer.options.stdDeviation);
          _f.appendChild(_f1);

          let _f2 = L.SVG.create("feComponentTransfer");
          let _f21 = L.SVG.create("feFuncA");
          _f21.setAttribute("type", "linear");
          _f21.setAttribute("slope", layer.options.slope);
          _f2.appendChild(_f21);
          _f.appendChild(_f2);

          let _f3 = L.SVG.create("feMerge");
          let _f31 = L.SVG.create("feMergeNode");
          let _f32 = L.SVG.create("feMergeNode");
          _f32.setAttribute("in", "SourceGraphic");
          _f3.appendChild(_f31);
          _f3.appendChild(_f32);
          _f.appendChild(_f3);

          this._defs.appendChild(_f);
        }

        // Create the mask
        let _m = document.getElementById(`mask_${maskId}`);
        if (!_m) {
          _m = L.SVG.create("mask");
          _m.setAttribute("id", `mask_${maskId}`);

          // White background
          let _whitePath = L.SVG.create("path");
          _whitePath.setAttribute("id", `whitePath_${maskId}`);
          _whitePath.setAttribute("fill", "white");
          _m.appendChild(_whitePath);

          this._defs.appendChild(_m);
        }
        // Black path
        let _path = L.SVG.create("path");
        for (let att of Object.values(path.attributes)) {
          _path.setAttribute(att.localName, att.value);
        }
        _path.setAttribute("id", _ref_id);
        _path.setAttribute("fill", "black");
        _path.setAttribute("fill-opacity", "1");
        _path.setAttribute(
          "style",
          _path.getAttribute("style")
            ? `filter:url(#filter_${maskId});` + _path.getAttribute("style")
            : `filter:url(#filter_${maskId})`
        );
        _m.appendChild(_path);
      }
    });

    L.SVG.addInitHook(function() {
      let _old_updateStyle = this._updateStyle;
      this._updateStyle = function(layer) {
        _old_updateStyle.apply(this, arguments);
        if (layer.options.mask) {
          this.__mask(layer);
        } else if (layer.options.maskId) {
          this.__setMask(layer);
        }
      };

      let _old_setPath = this._setPath;
      this._setPath = function(layer, path) {
        if (layer.options.mask || layer.options.maskId) {
          let _ref_id = "m_" + layer._leaflet_id;
          let mask = layer.options.mask,
            maskId = layer.options.maskId;

          let paths =
            this._defs && this._defs.children[`mask_${mask || maskId}`];
          let maskPath = paths && paths.getElementsByTagName("path");

          if (mask && maskPath && maskPath[_ref_id]) {
            maskPath[_ref_id].setAttribute("d", path);
            layer._path.setAttribute("d", path);
          } else {
            if (maskId && maskPath && maskPath[`whitePath_${maskId}`]) {
              maskPath[`whitePath_${maskId}`].setAttribute("d", path);
            }
            _old_setPath.apply(this, arguments);
          }
        } else {
          _old_setPath.apply(this, arguments);
        }
      };

      let _old_removePath = this._removePath;
      this._removePath = function(layer) {

        if ((layer.options.mask || layer.options.maskId) && layer._leaflet_id) {
            let mask = layer.options.mask,
              maskId = layer.options.maskId;
            if (this._defs && this._defs.children[`mask_${mask || maskId}`])
              this._defs.children[`mask_${mask || maskId}`].remove();
            if (this._defs && this._defs.children[`filter_${mask || maskId}`])
              this._defs.children[`filter_${mask || maskId}`].remove();
        }
        _old_removePath.apply(this, arguments);
      };
    });
  }
})(this, document);
