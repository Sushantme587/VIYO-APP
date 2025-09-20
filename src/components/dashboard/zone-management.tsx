
"use client";

import { useState, useMemo, useEffect } from 'react';
import { Map, APIProvider, useMap } from '@vis.gl/react-google-maps';
import type { Zone } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShieldCheck, PlusCircle, Trash2 } from 'lucide-react';
import { NewZoneModal } from './new-zone-modal';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface ZoneManagementProps {
  initialZones: Zone[];
}

const zoneTypeColors = {
  'Restricted': { stroke: '#00008B' },
  'High-Traffic': { stroke: '#00008B' },
  'Scenic': { stroke: '#00008B' },
};

// Helper function to calculate the center of a polygon
const getPolygonCenter = (path: { lat: number; lng: number }[]) => {
    if (!path || path.length === 0) return { lat: 25.5788, lng: 91.8933 }; // Default center
    const bounds = new google.maps.LatLngBounds();
    path.forEach(point => bounds.extend(new google.maps.LatLng(point.lat, point.lng)));
    const center = bounds.getCenter();
    return { lat: center.lat(), lng: center.lng() };
}

// A new component to handle drawing polygons
function Polygons({ zones, selectedZone }: { zones: Zone[], selectedZone: Zone | null }) {
  const map = useMap();

  useEffect(() => {
    if (!map || !zones.length) return;

    // Create an array to hold all polygon instances for cleanup
    const polygonInstances: google.maps.Polygon[] = [];

    zones.forEach(zone => {
      const colors = zoneTypeColors[zone.type];
      const isSelected = selectedZone?.id === zone.id;

      const polygon = new google.maps.Polygon({
        paths: zone.path,
        map: map,
        strokeColor: colors.stroke,
        fillOpacity: 0,
        strokeWeight: isSelected ? 3 : 2,
      });
      
      polygonInstances.push(polygon);
    });

    // Cleanup function to remove polygons when component unmounts or dependencies change
    return () => {
      polygonInstances.forEach(p => p.setMap(null));
    };

  }, [map, zones, selectedZone]);

  return null; // This component does not render any JSX itself
}


export default function ZoneManagement({ initialZones }: ZoneManagementProps) {
  const [zones, setZones] = useState<Zone[]>(initialZones);
  const [selectedZone, setSelectedZone] = useState<Zone | null>(zones[0] || null);
  const [mapCenter, setMapCenter] = useState(getPolygonCenter(zones[0]?.path));
  const [isNewZoneModalOpen, setNewZoneModalOpen] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    if (selectedZone) {
      setMapCenter(getPolygonCenter(selectedZone.path));
    }
  }, [selectedZone]);
  
  const handleAddZone = (newZone: Omit<Zone, 'id' | 'path'>) => {
    const zoneToAdd: Zone = {
      ...newZone,
      id: `zone-${Date.now()}`,
      path: [
        { lat: mapCenter.lat + 0.005, lng: mapCenter.lng + 0.005 },
        { lat: mapCenter.lat + 0.005, lng: mapCenter.lng - 0.005 },
        { lat: mapCenter.lat - 0.005, lng: mapCenter.lng - 0.005 },
        { lat: mapCenter.lat - 0.005, lng: mapCenter.lng + 0.005 },
      ]
    };
    setZones(prev => [zoneToAdd, ...prev]);
    setSelectedZone(zoneToAdd);
    toast({
      title: 'Zone Created',
      description: `The new zone "${zoneToAdd.name}" has been added.`,
    });
  };

  const handleDeleteZone = (zoneId: string) => {
    const zoneToDelete = zones.find(z => z.id === zoneId);
    setZones(prev => prev.filter(z => z.id !== zoneId));
    if (selectedZone?.id === zoneId) {
      setSelectedZone(zones.length > 1 ? zones.filter(z => z.id !== zoneId)[0] : null);
    }
    toast({
      title: 'Zone Deleted',
      description: `Zone "${zoneToDelete?.name}" has been removed.`,
      variant: 'destructive',
    });
  };

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
    <>
      <div className="grid gap-6 md:grid-cols-3 h-[calc(100vh-12rem)]">
        <Card className="md:col-span-1 flex flex-col">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Defined Zones</CardTitle>
                <CardDescription>All monitored geo-fenced areas.</CardDescription>
              </div>
              <Button size="sm" onClick={() => setNewZoneModalOpen(true)}>
                <PlusCircle className="mr-2 h-4 w-4" />
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
                    className={`cursor-pointer transition-all group relative ${selectedZone?.id === zone.id ? 'border-primary' : ''}`}
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
                     <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2 h-7 w-7 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete Zone</span>
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the <strong>{zone.name}</strong> zone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteZone(zone.id);
                            }}
                            className="bg-destructive hover:bg-destructive/90"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
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
                      key={selectedZone?.id} // Force re-render on selection change
                      style={{ width: '100%', height: '100%', borderRadius: '0.5rem' }}
                      center={mapCenter}
                      zoom={14}
                      gestureHandling={'greedy'}
                      disableDefaultUI={true}
                      mapId="suraksha-drishti-zones-map"
                      onCenterChanged={(e) => setMapCenter({ lat: e.detail.center.lat, lng: e.detail.center.lng })}
                  >
                    <Polygons zones={zones} selectedZone={selectedZone} />
                  </Map>
              </APIProvider>
          </Card>
        </div>
      </div>
      <NewZoneModal 
        isOpen={isNewZoneModalOpen}
        setIsOpen={setNewZoneModalOpen}
        onAddZone={handleAddZone}
      />
    </>
  );
}
