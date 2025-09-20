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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { Zone } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

interface NewZoneModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onAddZone: (newZone: Omit<Zone, 'id' | 'path'>) => void;
}

export function NewZoneModal({ isOpen, setIsOpen, onAddZone }: NewZoneModalProps) {
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<Zone['type'] | ''>('');

  const handleSubmit = () => {
    if (!name || !description || !type) {
      toast({
        title: "Incomplete Form",
        description: "Please fill out all fields to create a new zone.",
        variant: "destructive",
      });
      return;
    }
    
    onAddZone({ name, description, type });
    setIsOpen(false);
    
    // Reset form
    setName('');
    setDescription('');
    setType('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Zone</DialogTitle>
          <DialogDescription>
            Define a new geo-fenced area for monitoring. The zone will be created at the current map center.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="zone-name">Zone Name</Label>
            <Input 
              id="zone-name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Downtown Market" 
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="zone-description">Description</Label>
            <Textarea 
              id="zone-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the zone's characteristics" 
            />
          </div>
          <div className="grid gap-2">
             <Label htmlFor="zone-type">Zone Type</Label>
             <Select onValueChange={(value: Zone['type']) => setType(value)} value={type}>
                <SelectTrigger id="zone-type">
                  <SelectValue placeholder="Select a zone type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Restricted">Restricted</SelectItem>
                  <SelectItem value="High-Traffic">High-Traffic</SelectItem>
                  <SelectItem value="Scenic">Scenic</SelectItem>
                </SelectContent>
              </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit}>Create Zone</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
