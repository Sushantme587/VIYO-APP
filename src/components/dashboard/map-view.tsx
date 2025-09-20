
"use client";

import { Map, Marker, InfoWindow, APIProvider, useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
import type { Tourist, PatrolUnit } from '@/lib/types';
import { useState, useEffect, useMemo } from 'react';
import { Card } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Phone, MapPin, ShieldCheck } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { useMapSettings } from '@/contexts/map-settings-context';

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

// Helper component for the heatmap layer
function HeatmapLayer({ tourists }: { tourists: Tourist[] }) {
    const map = useMap();
    const visualization = useMapsLibrary('visualization');
    
    const heatmapData = useMemo(() => {
        if (!visualization) return [];
        return tourists.map(tourist => {
            const loc = tourist.locationHistory[tourist.locationHistory.length - 1];
            return new google.maps.LatLng(loc.latitude, loc.longitude);
        });
    }, [tourists, visualization]);

    useEffect(() => {
        if (!map || !visualization || !heatmapData.length) return;

        const newHeatmap = new visualization.HeatmapLayer({
            data: heatmapData,
            map: map,
            radius: 40,
            opacity: 0.8
        });

        return () => {
            newHeatmap.setMap(null);
        }
    }, [map, visualization, heatmapData]);

    return null;
}

interface MapViewProps {
  tourists: Tourist[];
  patrolUnits: PatrolUnit[];
}

export default function MapView({ tourists, patrolUnits }: MapViewProps) {
  const [selectedTourist, setSelectedTourist] = useState<Tourist | null>(null);
  const { showTraffic } = useMapSettings();

  const center = { lat: 20.5937, lng: 78.9629 };
  const initialZoom = 5;

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const touristsInIndia = useMemo(() => {
    return tourists.filter(tourist => {
      const loc = tourist.locationHistory[tourist.locationHistory.length - 1];
      // Approximate coordinates for India
      const is_in_india = loc.latitude > 6.5 && loc.latitude < 35.5 && loc.longitude > 68.0 && loc.longitude < 97.5;
      return is_in_india;
    });
  }, [tourists]);

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
          {showTraffic ? <Traffic /> : null}

          {/* Render heatmap if toggled on */}
          <HeatmapLayer tourists={touristsInIndia} />
          
          {touristsInIndia.map((tourist) => {
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
