// ── Central Map & Layer Registry ──
// Provides map reference to all modules without circular imports

let _map = null;
let _markers = [];
let _polygonLayers = [];
let _spotLayerGroups = {};
let _spotMarkerByKey = new Map();
let _markerByKey = new Map();

export function registerMap(map) { _map = map; }
export function getMap() { return _map; }

export function registerMarkers(markers) { _markers = markers; }
export function getMarkers() { return _markers; }

export function registerPolygonLayers(layers) { _polygonLayers = layers; }
export function getPolygonLayers() { return _polygonLayers; }

export function registerSpotLayerGroups(groups) { _spotLayerGroups = groups; }
export function getSpotLayerGroups() { return _spotLayerGroups; }

export function registerMarkerByKey(m) { _markerByKey = m; }
export function getMarkerByKey() { return _markerByKey; }

export function registerSpotMarkerByKey(m) { _spotMarkerByKey = m; }
export function getSpotMarkerByKey() { return _spotMarkerByKey; }

// Layer registration for features to add their own layers
const _featureLayers = new Map();

export function registerFeatureLayer(key, layerGroup) {
  _featureLayers.set(key, layerGroup);
}

export function getFeatureLayer(key) {
  return _featureLayers.get(key);
}

export function removeFeatureLayer(key) {
  const layer = _featureLayers.get(key);
  if (layer && _map && _map.hasLayer(layer)) _map.removeLayer(layer);
  _featureLayers.delete(key);
}
