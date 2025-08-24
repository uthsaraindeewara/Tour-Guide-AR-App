import React, { useState, useRef } from "react";
import { Header } from "../components/Layout/Header";
import { BottomNav } from "../components/Layout/BottomNav";
import { Button } from "../components/UI/Button";
import { Card } from "../components/UI/Card";
import { MapPinIcon, ZoomInIcon, ZoomOutIcon, LayersIcon, XIcon } from "lucide-react";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import type { Map as LeafletMap, LatLngExpression, LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";

type ZoomControlsProps = {
  zoomIn: () => void;
  zoomOut: () => void;
};

function ZoomControls({ zoomIn, zoomOut }: ZoomControlsProps) {
  return (
    <div className="absolute top-4 right-4 flex flex-col space-y-2 z-20">
      <Button
        variant="secondary"
        className="w-10 h-10 rounded-full p-0 flex items-center justify-center"
        onClick={zoomIn}
      >
        <ZoomInIcon size={20} />
      </Button>
      <Button
        variant="secondary"
        className="w-10 h-10 rounded-full p-0 flex items-center justify-center"
        onClick={zoomOut}
      >
        <ZoomOutIcon size={20} />
      </Button>
    </div>
  );
}

function MapRefSetter({ mapRef }: { mapRef: React.MutableRefObject<LeafletMap | null> }) {
  const map = useMap();
  mapRef.current = map;
  return null;
}

export default function Map() {
  const [showFilters, setShowFilters] = useState(false);
  const mapRef = useRef<LeafletMap | null>(null);

  const handleZoomIn = () => mapRef.current?.zoomIn();
  const handleZoomOut = () => mapRef.current?.zoomOut();

  const center: LatLngExpression = [7.8731, 80.7718];

  // Landmarks to display
  const landmarks: { name: string; position: LatLngTuple }[] = [
    { name: "Sigiriya", position: [7.956, 80.760] },
    { name: "Temple of the Tooth", position: [7.2939, 80.6413] },
    { name: "Galle Fort", position: [6.032, 80.216] },
    { name: "Adam's Peak", position: [6.8093, 80.4992] },
  ];

  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Header */}
      <Header title="Explore Map" />

      {/* Map Container (bottom layer) */}
      <div className="relative flex-grow">
        <MapContainer
          center={center}
          zoom={7}
          className="h-full w-full z-0 absolute top-0 left-0"
        >
          <TileLayer
            {...({
              attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>',
              url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            } as any)}
          />

          {/* Add markers for landmarks */}
          {landmarks.map((lm) => (
            <Marker key={lm.name} position={lm.position}>
              <Popup>{lm.name}</Popup>
            </Marker>
          ))}

          {/* Set map ref safely */}
          <MapRefSetter mapRef={mapRef} />
        </MapContainer>

        {/* UI Controls (top layer) */}
        <ZoomControls zoomIn={handleZoomIn} zoomOut={handleZoomOut} />

        {/* Filters Button */}
        <div className="absolute top-4 right-20 z-20">
          <Button
            variant="secondary"
            className="w-10 h-10 rounded-full p-0 flex items-center justify-center"
            onClick={() => setShowFilters(!showFilters)}
          >
            <LayersIcon size={20} />
          </Button>
        </div>

        {/* Current Location Button */}
        <div className="absolute bottom-24 right-4 z-20">
          <Button
            variant="primary"
            className="w-12 h-12 rounded-full p-0 flex items-center justify-center"
          >
            <MapPinIcon size={20} />
          </Button>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="absolute top-4 left-4 right-16 animate-slide-up z-20">
            <Card className="p-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium">Map Filters</h3>
                <Button variant="ghost" className="p-1" onClick={() => setShowFilters(false)}>
                  <XIcon size={18} />
                </Button>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input type="checkbox" id="landmarks" className="mr-2" defaultChecked />
                  <label htmlFor="landmarks" className="text-sm">Landmarks</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="restaurants" className="mr-2" defaultChecked />
                  <label htmlFor="restaurants" className="text-sm">Restaurants</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="visited" className="mr-2" defaultChecked />
                  <label htmlFor="visited" className="text-sm">Visited Places</label>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>

      {/* Bottom nav always on top */}
      <div className="relative z-20">
        <BottomNav />
      </div>
    </div>
  );
}