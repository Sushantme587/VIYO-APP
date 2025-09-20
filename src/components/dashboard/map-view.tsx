
"use client";

import { Map, Marker, InfoWindow, APIProvider, useMap } from '@vis.gl/react-google-maps';
import type { Tourist, PatrolUnit, Zone } from '@/lib/types';
import { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Phone, MapPin, ShieldCheck } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { useMapSettings } from '@/contexts/map-settings-context';
import { useAssignedZone } from '@/contexts/assigned-zone-context';

interface MapViewProps {
  tourists: Tourist[];
  patrolUnits: PatrolUnit[];
  zones: Zone[];
}

const zoneTypeColors = {
  'Restricted': { fill: '#ff4d4d', stroke: '#00008B' }, // Red fill, Dark Blue stroke
  'High-Traffic': { fill: '#ffc107', stroke: '#00008B' }, // Yellow fill, Dark Blue stroke
  'Scenic': { fill: '#4CAF50', stroke: '#00008B' }, // Green fill, Dark Blue stroke
};

// Helper to calculate center of a polygon
const getPolygonCenter = (path: { lat: number; lng: number }[]) => {
    if (!path || path.length === 0) return { lat: 25.5788, lng: 91.8933 }; // Default center
    const bounds = new google.maps.LatLngBounds();
    path.forEach(point => bounds.extend(new google.maps.LatLng(point.lat, point.lng)));
    const center = bounds.getCenter();
    return { lat: center.lat(), lng: center.lng() };
}

// Helper component to manage the traffic layer
function Traffic() {
  const map = useMap();
  const { showTraffic } = useMapSettings();

  useEffect(() => {
    if (!map) return;
    
    const trafficLayer = new google.maps.TrafficLayer();
    if (showTraffic) {
      trafficLayer.setMap(map);
    } else {
      trafficLayer.setMap(null);
    }

    return () => {
      trafficLayer.setMap(null);
    };
  }, [map, showTraffic]);

  return null;
}

// Helper component to draw polygons for zones
function ZonePolygons({ zones }: { zones: Zone[] }) {
  const map = useMap();

  useEffect(() => {
    if (!map || !zones.length) return;

    const polygonInstances: google.maps.Polygon[] = [];

    zones.forEach(zone => {
      const colors = zoneTypeColors[zone.type];
      const polygon = new google.maps.Polygon({
        paths: zone.path,
        map: map,
        fillColor: colors.fill,
        strokeColor: colors.stroke,
        fillOpacity: 0.3,
        strokeWeight: 2,
      });
      
      polygonInstances.push(polygon);
    });

    return () => {
      polygonInstances.forEach(p => p.setMap(null));
    };

  }, [map, zones]);

  return null;
}

export default function MapView({ tourists, patrolUnits, zones }: MapViewProps) {
  const [selectedTourist, setSelectedTourist] = useState<Tourist | null>(null);
  const { zoneId } = useAssignedZone();

  const assignedZone = zones.find(z => z.id === zoneId);
  const center = assignedZone ? getPolygonCenter(assignedZone.path) : { lat: 25.5788, lng: 91.8933 };
  const initialZoom = assignedZone ? 14 : 12;

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return (
        <Card className="h-full w-full flex items-center justify-center">
            <Alert variant="destructive" className="w-auto">
              <ShieldCheck className="h-4 w-4" />
              <AlertTitle>Google Maps API Key Missing</AlertTitle>
              <AlertDescription>
                Please add your valid Google Maps API key to the <b>.env</b> file to enable map functionality. The variable should be named NEXT_PUBLIC_GOOGLE_MAPS_API_KEY.
              </AlertDescription>
            </Alert>
        </Card>
    );
  }

  return (
    <Card className="h-full w-full">
      <APIProvider apiKey={apiKey}>
        <Map
          key={zoneId} // Re-center map when zone changes
          style={{ width: '100%', height: '100%', borderRadius: '0.5rem' }}
          defaultCenter={center}
          defaultZoom={initialZoom}
          minZoom={3}
          maxZoom={20}
          zoomControl={true}
          gestureHandling={'greedy'}
          disableDefaultUI={true}
          mapId="suraksha-drishti-map"
        >
          <Traffic />
          <ZonePolygons zones={zones} />

          {tourists.map((tourist) => {
            const location = tourist.locationHistory[tourist.locationHistory.length - 1];
            return (
              <Marker
                key={tourist.id}
                position={{ lat: location.latitude, lng: location.longitude }}
                onClick={() => setSelectedTourist(tourist)}
              />
            );
          })}

          {patrolUnits.map((unit) => (
              <Marker
                key={unit.id}
                position={{ lat: unit.location.latitude, lng: unit.location.longitude }}
                icon={{
                  path: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
                  fillColor: '#4CAF50',
                  fillOpacity: 1,
                  strokeWeight: 0,
                  scale: 1,
                }}
              />
          ))}

          {selectedTourist && (
            <InfoWindow
              position={{ 
                  lat: selectedTourist.locationHistory[selectedTourist.locationHistory.length - 1].latitude, 
                  lng: selectedTourist.locationHistory[selectedTourist.locationHistory.length - 1].longitude 
              }}
              onCloseClick={() => setSelectedTourist(null)}
              pixelOffset={[0, -40]}
            >
              <div className="p-2 w-64">
                  <div className="flex items-center gap-4">
                      <Avatar>
                          <AvatarImage src={selectedTourist.photoUrl} alt={selectedTourist.name} data-ai-hint={selectedTourist.photoHint}/>
                          <AvatarFallback>{selectedTourist.name.substring(0,2)}</AvatarFallback>
                      </Avatar>
                      <div>
                          <h4 className="font-semibold">{selectedTourist.name}</h4>
                          <p className="text-sm text-muted-foreground">{selectedTourist.id}</p>
                      </div>
                  </div>
                  <div className="mt-4 text-sm space-y-2">
                      <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground"/>
                          <span>{selectedTourist.itinerary.join(', ')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground"/>
                          <span>{selectedTourist.emergencyContacts[0].name}: {selectedTourist.emergencyContacts[0].phone}</span>
                      </div>
                  </div>
              </div>
            </InfoWindow>
          )}
        </Map>
      </APIProvider>
    </Card>
  );
}
