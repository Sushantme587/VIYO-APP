"use client";

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

interface ERIFModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  alert: Alert;
  onGenerate: () => void;
}

export function ERIFModal({ isOpen, setIsOpen, alert, onGenerate }: ERIFModalProps) {
  const { toast } = useToast();

  const handleSubmit = () => {
    toast({
      title: "E-FIR Generated",
      description: `E-FIR for incident #${alert.id} has been successfully created and logged.`,
    });
    onGenerate();
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Automated E-FIR Generation</DialogTitle>
          <DialogDescription>
            Review and confirm the details for the Electronic First Information Report.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="tourist-name" className="text-right">
              Tourist Name
            </Label>
            <Input id="tourist-name" value={alert.tourist.name} className="col-span-3" readOnly />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="tourist-id" className="text-right">
              Tourist ID
            </Label>
            <Input id="tourist-id" value={alert.tourist.id} className="col-span-3" readOnly />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="incident-type" className="text-right">
              Incident Type
            </Label>
            <Input id="incident-type" value={alert.type} className="col-span-3" readOnly />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="location" className="text-right">
              Last Known Location
            </Label>
            <Input id="location" value={`${alert.location.latitude.toFixed(4)}, ${alert.location.longitude.toFixed(4)}`} className="col-span-3" readOnly />
          </div>
           <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="details" className="text-right">
              Incident Details
            </Label>
            <Textarea id="details" defaultValue={alert.details} className="col-span-3" rows={4} />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit}>Generate E-FIR</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
