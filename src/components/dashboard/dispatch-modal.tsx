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
import type { Alert } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { patrolUnits } from "@/lib/data";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ShieldCheck } from "lucide-react";

interface DispatchModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  alert: Alert;
  onDispatch: () => void;
}

export function DispatchModal({ isOpen, setIsOpen, alert, onDispatch }: DispatchModalProps) {
  const { toast } = useToast();
  const [selectedUnit, setSelectedUnit] = useState<string | null>(null);

  const handleDispatch = () => {
    if (!selectedUnit) {
      toast({
        title: "No Unit Selected",
        description: "Please select a patrol unit to dispatch.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Unit Dispatched",
      description: `Patrol unit ${selectedUnit} dispatched to incident #${alert.id}.`,
    });
    onDispatch();
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Resource Dispatch</DialogTitle>
          <DialogDescription>
            Select a nearby patrol unit to respond to the alert.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <RadioGroup onValueChange={setSelectedUnit} className="grid gap-4">
            {patrolUnits.filter(u => u.status === 'Available' || u.status === 'On-duty').map(unit => (
              <Label key={unit.id} htmlFor={unit.id} className="flex items-center gap-4 rounded-md border p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary">
                <ShieldCheck className="h-6 w-6 text-green-600" />
                <div className="flex-1">
                  <p className="font-semibold">{unit.name}</p>
                  <p className="text-sm text-muted-foreground">Status: {unit.status}</p>
                </div>
                <RadioGroupItem value={unit.id} id={unit.id} />
              </Label>
            ))}
          </RadioGroup>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
          <Button onClick={handleDispatch}>Dispatch Unit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
