"use client";

import { useState } from 'react';
import { Map, APIProvider, Polygon } from '@vis.gl/react-google-maps';
import type { Zone } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShieldCheck, PlusCircle } from 'lucide-react';

interface ZoneManagementProps {
  initialZones: Zone[];
}

const zoneTypeColors = {
  'Restricted': { fill: '#ff4d4d', stroke: '#cc0000' },
  'High-Traffic': { fill: '#ffc107', stroke: '#e69500' },
  'Scenic': { fill: '#4CAF50', stroke: '#388E3C' },
};

export default function ZoneManagement({ initialZones }: ZoneManagementProps) {
  const [zones, setZones] = useState<Zone[]>(initialZones);
  const [selectedZone, setSelectedZone] = useState<Zone | null>(zones[0] || null);

  const center = { lat: 25.5788, lng: 91.8933 };
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
    <div className="grid gap-6 md:grid-cols-3 h-[calc(100vh-12rem)]">
      <Card className="md:col-span-1 flex flex-col">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Defined Zones</CardTitle>
              <CardDescription>All monitored geo-fenced areas.</CardDescription>
            </div>
            <Button size="sm">
              <PlusCircle className="mr-2" />
              New Zone
            </Button>
          </div>
        </CardHeader>
        <CardContent className="flex-grow overflow-hidden p-0">
          <ScrollArea className="h-full">
            <div className="p-4 space-y-2">
              {zones.map(zone => (
                <Card 
                  key={zone.id} 
                  className={`cursor-pointer transition-all ${selectedZone?.id === zone.id ? 'border-primary' : ''}`}
                  onClick={() => setSelectedZone(zone)}
                >
                  <CardHeader className="p-4">
                    <CardTitle className="text-base flex justify-between items-center">
                      {zone.name}
                      <Badge variant={
                        zone.type === 'Restricted' ? 'destructive' : 
                        zone.type === 'High-Traffic' ? 'secondary' : 'default'
                      } style={zone.type === 'High-Traffic' ? {backgroundColor: 'hsl(var(--accent))'} : {}}>
                        {zone.type}
                      </Badge>
                    </CardTitle>
                    <CardDescription className="text-xs pt-1">{zone.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
      <div className="md:col-span-2 h-full">
         <Card className="h-full w-full">
            <APIProvider apiKey={apiKey}>
                <Map
                    style={{ width: '100%', height: '100%', borderRadius: '0.5rem' }}
                    defaultCenter={center}
                    defaultZoom={12}
                    gestureHandling={'greedy'}
                    disableDefaultUI={true}
                    mapId="suraksha-drishti-zones-map"
                >
                    {zones.map(zone => {
                        const colors = zoneTypeColors[zone.type];
                        return (
                             <Polygon
                                key={zone.id}
                                paths={zone.path}
                                fillColor={colors.fill}
                                strokeColor={colors.stroke}
                                fillOpacity={0.3}
                                strokeWeight={2}
                            />
                        )
                    })}
                </Map>
            </APIProvider>
        </Card>
      </div>
    </div>
  );
}
