import { useMap } from "react-leaflet";
import { useEffect } from "react";
import "leaflet.heat";

export default function Heatmap({ points = [] }) {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const heatLayer = window.L.heatLayer(points, {
      radius: 25,
      blur: 15,
      maxZoom: 17,
      gradient: {
        0.2: "#a855f7",
        0.4: "#3b82f6",
        0.6: "#06b6d4",
        0.8: "#22c55e",
        1.0: "#ef4444",
      }
    });

    heatLayer.addTo(map);

    return () => {
      map.removeLayer(heatLayer);
    };
  }, [map, points]);

  return null;
}
