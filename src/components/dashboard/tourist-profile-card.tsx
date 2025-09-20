import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { User, FileText, Phone, Map, Clock } from "lucide-react";
import type { Tourist } from "@/lib/types";
import { format } from 'date-fns';
import ClientOnlyTimestamp from "./client-only-timestamp";

interface TouristProfileCardProps {
    tourist: Tourist;
}

export default function TouristProfileCard({ tourist }: TouristProfileCardProps) {
  const lastLocation = tourist.locationHistory.at(-1);

  return (
    <Card className="sticky top-20">
      <CardHeader className="text-center">
        <div className="flex justify-center">
          <Avatar className="h-24 w-24 border-4 border-primary">
            <AvatarImage src={tourist.photoUrl} alt={tourist.name} data-ai-hint={tourist.photoHint}/>
            <AvatarFallback className="text-3xl">{tourist.name.substring(0,2)}</AvatarFallback>
          </Avatar>
        </div>
        <CardTitle className="pt-4">{tourist.name}</CardTitle>
        <CardDescription>{tourist.id}</CardDescription>
        <div className="pt-2">
            <Badge variant="secondary">Blockchain Verified</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Separator className="my-4" />
        <div className="space-y-4 text-sm">
            <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-muted-foreground" />
                <div className="font-medium">KYC: <span className="font-normal text-muted-foreground">{tourist.kyc}</span></div>
            </div>
             <div className="flex items-start gap-3">
                <Map className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                    <div className="font-medium">Trip Itinerary</div>
                    <div className="text-muted-foreground">
                        {tourist.itinerary.map(stop => <div key={stop}>- {stop}</div>)}
                    </div>
                </div>
            </div>
            <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                    <div className="font-medium">Emergency Contacts</div>
                     {tourist.emergencyContacts.map(contact => (
                         <div key={contact.name} className="text-muted-foreground">{contact.name} ({contact.phone})</div>
                     ))}
                </div>
            </div>
            {lastLocation && (
              <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                      <div className="font-medium">Last Known Location</div>
                      <div className="text-muted-foreground">
                          Lat: {lastLocation.latitude.toFixed(4)}, Lng: {lastLocation.longitude.toFixed(4)}
                      </div>
                        <div className="text-xs text-muted-foreground/70">
                          <ClientOnlyTimestamp timestamp={lastLocation.timestamp} format="MMM d, yyyy, h:mm a" />
                      </div>
                  </div>
              </div>
            )}
        </div>
      </CardContent>
    </Card>
  );
}
