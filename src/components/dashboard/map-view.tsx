"use client";

import { Map, Marker, InfoWindow, APIProvider } from '@vis.gl/react-google-maps';
import type { Tourist, PatrolUnit } from '@/lib/types';
import { useState } from 'react';
import { Card } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Phone, MapPin, ShieldCheck } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

interface MapViewProps {
  tourists: Tourist[];
  patrolUnits: PatrolUnit[];
}

export default function MapView({ tourists, patrolUnits }: MapViewProps) {
  const [selectedTourist, setSelectedTourist] = useState<Tourist | null>(null);

  const center = { lat: 25.5788, lng: 91.8933 }; // Shillong as default center
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

  if (!apiKey || apiKey === 'YOUR_API_KEY_HERE') {
    return (
        <Card className="h-full w-full flex items-center justify-center">
            <Alert variant="destructive" className="w-auto">
              <ShieldCheck className="h-4 w-4" />
              <AlertTitle>Google Maps API Key Missing</AlertTitle>
              <AlertDescription>
                Please add a valid Google Maps API key to the <b>.env</b> file to enable map functionality.
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
          defaultZoom={12}
          gestureHandling={'greedy'}
          disableDefaultUI={true}
        >
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
