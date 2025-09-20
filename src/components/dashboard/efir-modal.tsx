
"use client";

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { Alert } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { generateEFIR } from '@/ai/flows/generate-efir';
import { Loader2 } from 'lucide-react';
import { ScrollArea } from '../ui/scroll-area';
import { useFIRs } from '@/contexts/fir-context';


interface ERIFModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  alert: Alert;
  onGenerate: () => void;
}

export function ERIFModal({ isOpen, setIsOpen, alert, onGenerate }: ERIFModalProps) {
  const { toast } = useToast();
  const { addFIR } = useFIRs();
  const [isLoading, setIsLoading] = useState(false);
  const [firText, setFirText] = useState('');
  const [isGenerated, setIsGenerated] = useState(false);

  const handleGenerate = async () => {
    setIsLoading(true);
    setFirText('');
    try {
      const result = await generateEFIR({
        alertId: alert.id,
        timestamp: alert.timestamp,
        touristName: alert.tourist.name,
        touristId: alert.tourist.id,
        incidentType: alert.type,
        location: alert.location,
        details: alert.details,
        officerName: 'Inspector John Doe', // This could be dynamic in a real app
      });
      
      if (result.firText) {
        setFirText(result.firText);
        setIsGenerated(true);
      } else {
        throw new Error('Failed to generate FIR text.');
      }

    } catch (error) {
      console.error("Failed to generate E-FIR:", error);
      toast({
        title: "Generation Failed",
        description: "The AI failed to generate the report. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    // Reset state after a short delay to allow the dialog to close
    setTimeout(() => {
        setIsLoading(false);
        setFirText('');
        setIsGenerated(false);
    }, 300);
  }

  const handleFileReport = () => {
    addFIR({
        alertId: alert.id,
        touristName: alert.tourist.name,
        incidentType: alert.type,
        timestamp: alert.timestamp,
        firText: firText,
    });
    toast({
      title: "E-FIR Filed",
      description: `E-FIR for incident #${alert.id} has been logged.`,
    });
    onGenerate();
    handleClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Automated E-FIR Generation</DialogTitle>
          <DialogDescription>
            {isGenerated 
                ? "Review the AI-generated report below and file it." 
                : "Generate an Electronic First Information Report using AI."
            }
          </DialogDescription>
        </DialogHeader>
        
        {!isGenerated ? (
            <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="tourist-name" className="text-right">
                Tourist Name
                </Label>
                <Input id="tourist-name" value={alert.tourist.name} className="col-span-3" readOnly />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="incident-type" className="text-right">
                Incident Type
                </Label>
                <Input id="incident-type" value={alert.type} className="col-span-3" readOnly />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="details" className="text-right">
                Initial Details
                </Label>
                <Textarea id="details" defaultValue={alert.details} className="col-span-3" rows={4} readOnly/>
            </div>
            </div>
        ) : (
            <ScrollArea className="max-h-[50vh] my-4">
                <div className="bg-muted p-4 rounded-md whitespace-pre-wrap font-mono text-sm">
                    {firText}
                </div>
            </ScrollArea>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>Cancel</Button>
          {isGenerated ? (
            <Button onClick={handleFileReport}>File Report</Button>
          ) : (
            <Button onClick={handleGenerate} disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Generate E-FIR
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
