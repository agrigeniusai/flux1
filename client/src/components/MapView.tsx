import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, useMapEvents, Marker, Popup } from 'react-leaflet';
import { Point } from '../App';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({ iconUrl, shadowUrl: iconShadow, iconSize: [25, 41], iconAnchor: [12, 41] });
L.Marker.prototype.options.icon = DefaultIcon;

interface Props {
  selectedPoint: Point | null;
  onPointChange: (p: Point) => void;
}

export default function MapView({ selectedPoint, onPointChange }: Props) {
  const mapRef = useRef<L.Map>(null);

  function ClickHandler() {
    useMapEvents({
      click(e) {
        onPointChange({ lat: e.latlng.lat, lon: e.latlng.lng });
      }
    });
    return null;
  }

  return (
    <MapContainer
      ref={mapRef}
      center={[20, 0]}
      zoom={2}
      className="flex-1"
      scrollWheelZoom
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ClickHandler />
      {selectedPoint && (
        <Marker position={[selectedPoint.lat, selectedPoint.lon]}>
          <Popup>Lat: {selectedPoint.lat.toFixed(4)}<br />Lon: {selectedPoint.lon.toFixed(4)}</Popup>
        </Marker>
      )}
    </MapContainer>
  );
} 