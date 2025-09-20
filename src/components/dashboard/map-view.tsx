"use client";

import { Map, AdvancedMarker, Pin, InfoWindow } from '@vis.gl/react-google-maps';
import type { Tourist, PatrolUnit } from '@/lib/types';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Phone, User, MapPin, ShieldCheck } from 'lucide-react';
import { Badge } from '../ui/badge';

interface MapViewProps {
  tourists: Tourist[];
  patrolUnits: PatrolUnit[];
}

// IMPORTANT: This component requires a Google Maps API key.
// Please create a .env.local file in the root of your project
// and add your API key like this:
// NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="YOUR_API_KEY"

export default function MapView({ tourists, patrolUnits }: MapViewProps) {
  const [selectedTourist, setSelectedTourist] = useState<Tourist | null>(null);

  const center = { lat: 25.5788, lng: 91.8933 }; // Shillong as default center

  return (
    <Card className="h-full w-full">
      <Map
        style={{ width: '100%', height: '100%', borderRadius: '0.5rem' }}
        defaultCenter={center}
        defaultZoom={12}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
        mapId={process.env.NEXT_PUBLIC_GOOGLE_MAP_ID || "DEMO_MAP_ID"}
      >
        {tourists.map((tourist) => {
          const location = tourist.locationHistory[tourist.locationHistory.length - 1];
          return (
            <AdvancedMarker
              key={tourist.id}
              position={{ lat: location.latitude, lng: location.longitude }}
              onClick={() => setSelectedTourist(tourist)}
            >
              <Pin
                background={'#3F51B5'}
                borderColor={'#FFFFFF'}
                glyphColor={'#FFFFFF'}
              >
                <User size={16} />
              </Pin>
            </AdvancedMarker>
          );
        })}

        {patrolUnits.map((unit) => (
            <AdvancedMarker
              key={unit.id}
              position={{ lat: unit.location.latitude, lng: unit.location.longitude }}
            >
                <Pin 
                    background={'#4CAF50'}
                    borderColor={'#FFFFFF'}
                    glyphColor={'#FFFFFF'}
                >
                    <ShieldCheck size={16}/>
                </Pin>
            </AdvancedMarker>
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
    </Card>
  );
}
