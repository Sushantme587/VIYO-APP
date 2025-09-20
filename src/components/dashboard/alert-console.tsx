"use client";

import { useState, useEffect } from 'react';
import type { Alert, Tourist } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatDistanceToNow } from 'date-fns';
import { AlertCircle, CheckCircle, ShieldAlert, Siren } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ERIFModal } from './efir-modal';
import { DispatchModal } from './dispatch-modal';
import { checkForAnomalies } from '@/lib/actions';
import ClientOnlyTimestamp from './client-only-timestamp';

interface AlertConsoleProps {
  initialAlerts: Alert[];
  allTourists: Tourist[];
}

const severityMap = {
  Critical: { color: 'bg-red-500', icon: Siren },
  High: { color: 'bg-orange-500', icon: ShieldAlert },
  Medium: { color: 'bg-yellow-500', icon: AlertCircle },
  Low: { color: 'bg-blue-500', icon: CheckCircle },
};

export default function AlertConsole({ initialAlerts, allTourists }: AlertConsoleProps) {
  const [alerts, setAlerts] = useState<Alert[]>(initialAlerts);
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [isEfirModalOpen, setEfirModalOpen] = useState(false);
  const [isDispatchModalOpen, setDispatchModalOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const interval = setInterval(async () => {
      const randomTourist = allTourists[Math.floor(Math.random() * allTourists.length)];
      try {
        const result = await checkForAnomalies({
          touristId: randomTourist.id,
          locationHistory: randomTourist.locationHistory,
        });

        if (result.isAnomaly) {
          const newAlert: Alert = {
            id: `alert-${Date.now()}`,
            tourist: randomTourist,
            type: result.anomalyType || 'AI Anomaly',
            severity: result.anomalyScore && result.anomalyScore > 0.8 ? 'Critical' : 'High',
            timestamp: new Date().toISOString(),
            location: randomTourist.locationHistory[randomTourist.locationHistory.length - 1],
            details: result.explanation,
            status: 'New',
          };
          setAlerts(prev => [newAlert, ...prev]);
          toast({
            title: `🚨 AI Anomaly Detected!`,
            description: `Tourist: ${randomTourist.name}. ${result.explanation}`,
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Error checking for anomalies:", error);
      }
    }, 20000); // Check every 20 seconds

    return () => clearInterval(interval);
  }, [allTourists, toast]);

  const handleUpdateStatus = (alertId: string, status: Alert['status']) => {
    setAlerts(alerts.map(a => a.id === alertId ? { ...a, status } : a));
    toast({ title: "Alert Updated", description: `Alert ${alertId} status set to ${status}.` });
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Live Alert Console</CardTitle>
        <CardDescription>Real-time incidents and AI-detected anomalies.</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow overflow-hidden p-0">
        <ScrollArea className="h-full">
          <div className="p-6 pt-0 space-y-4">
            {alerts.map((alert) => {
              const SeverityIcon = severityMap[alert.severity].icon;
              return (
                <Card key={alert.id} className="overflow-hidden">
                  <div className={`p-4 flex items-start gap-4 bg-card`}>
                     <div className='flex items-center gap-4'>
                        <Avatar className="h-12 w-12 border">
                            <AvatarImage src={alert.tourist.photoUrl} alt={alert.tourist.name} data-ai-hint={alert.tourist.photoHint} />
                            <AvatarFallback>{alert.tourist.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div className="grid gap-1">
                            <p className="font-semibold">{alert.tourist.name}</p>
                            <p className="text-sm text-muted-foreground">{alert.tourist.id}</p>
                            <div className="flex items-center gap-2">
                                <SeverityIcon className={`h-4 w-4 ${severityMap[alert.severity].color.replace('bg-', 'text-')}`} />
                                <p className="text-sm font-medium">{alert.type}</p>
                            </div>
                        </div>
                    </div>
                    <div className="ml-auto text-right">
                        <Badge variant={alert.status === 'New' ? 'destructive' : 'secondary'}>{alert.status}</Badge>
                        <p className="text-xs text-muted-foreground mt-1">
                          <ClientOnlyTimestamp timestamp={alert.timestamp} />
                        </p>
                    </div>
                  </div>
                  <Separator />
                   <div className="p-4 text-sm text-muted-foreground">
                    {alert.details}
                  </div>
                  <Separator />
                  <div className="p-2 bg-muted/50 flex justify-end gap-2">
                    <Button variant="outline" size="sm" onClick={() => { setSelectedAlert(alert); setEfirModalOpen(true); }}>E-FIR</Button>
                    <Button variant="outline" size="sm" onClick={() => { setSelectedAlert(alert); setDispatchModalOpen(true); }}>Dispatch</Button>
                    <Button size="sm" onClick={() => handleUpdateStatus(alert.id, 'Acknowledged')}>Acknowledge</Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
      {selectedAlert && (
        <>
          <ERIFModal 
            isOpen={isEfirModalOpen} 
            setIsOpen={setEfirModalOpen} 
            alert={selectedAlert} 
            onGenerate={() => handleUpdateStatus(selectedAlert.id, 'Resolved')}
          />
          <DispatchModal 
            isOpen={isDispatchModalOpen} 
            setIsOpen={setDispatchModalOpen} 
            alert={selectedAlert} 
            onDispatch={() => handleUpdateStatus(selectedAlert.id, 'Dispatched')}
          />
        </>
      )}
    </Card>
  );
}
