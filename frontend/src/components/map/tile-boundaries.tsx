import { useMap } from "@/app/providers/map-provider";
import { useMapLayers } from "@/hooks/use-map-layer";
import { GeoJSONType } from "@/types";
import {
  getTileBoundariesGeoJSON,
  TILE_BOUNDARY_LAYER_ID,
  TILE_BOUNDARY_SOURCE_ID,
} from "@/utils";
import { GeoJSONSource } from "maplibre-gl";
import { useCallback, useEffect } from "react";

const TileBoundaries = () => {
  const { map } = useMap();

  useMapLayers(
    [
      {
        id: TILE_BOUNDARY_LAYER_ID,
        type: "line",
        source: TILE_BOUNDARY_SOURCE_ID,
        paint: {
          "line-color": "#FFF",
          "line-width": 1,
        },
        layout: { visibility: "visible" },
      },
    ],
    [
      {
        id: TILE_BOUNDARY_SOURCE_ID,
        spec: {
          type: "geojson",
          data: { type: "FeatureCollection", features: [] },
        },
      },
    ],
  );

  const updateTileBoundary = useCallback(() => {
    if (map) {
      if (map.getSource(TILE_BOUNDARY_SOURCE_ID)) {
        const tileBoundaries = getTileBoundariesGeoJSON(
          map,
          map.getZoom(),
        );
        const source = map.getSource(TILE_BOUNDARY_SOURCE_ID) as GeoJSONSource;
        source.setData(tileBoundaries as GeoJSONType);
      }
    }
  }, [map]);

  useEffect(() => {
    if (!map) return;
    map.on("moveend", updateTileBoundary);
    return () => {
      map.off("moveend", updateTileBoundary);
    };
  }, [map, updateTileBoundary]);

  return null;
};

export default TileBoundaries;
