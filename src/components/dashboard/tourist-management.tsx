"use client";

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, ChevronDown } from 'lucide-react';
import type { Tourist } from '@/lib/types';
import TouristProfileCard from './tourist-profile-card';

interface TouristManagementProps {
  tourists: Tourist[];
}

export default function TouristManagement({ tourists }: TouristManagementProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTourist, setSelectedTourist] = useState<Tourist | null>(tourists[0] || null);

  const filteredTourists = tourists.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectTourist = (tourist: Tourist) => {
    setSelectedTourist(tourist);
  };

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div className="md:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Tourist Database</CardTitle>
            <CardDescription>Search and manage tourist profiles.</CardDescription>
            <div className="relative pt-4">
              <Search className="absolute left-2.5 top-6 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search by name or ID..." 
                className="pl-8" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tourist</TableHead>
                  <TableHead>ID</TableHead>
                  <TableHead>Itinerary</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTourists.map((tourist) => (
                  <TableRow key={tourist.id} className="cursor-pointer" onClick={() => handleSelectTourist(tourist)}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={tourist.photoUrl} alt={tourist.name} data-ai-hint={tourist.photoHint} />
                          <AvatarFallback>{tourist.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{tourist.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{tourist.id}</TableCell>
                    <TableCell>{tourist.itinerary.join(', ')}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); handleSelectTourist(tourist); }}>
                        View Profile
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      <div className="md:col-span-1">
        {selectedTourist ? (
          <TouristProfileCard tourist={selectedTourist} />
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>No Tourist Selected</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Please select a tourist from the list to view their profile.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
