"use client";

import React, { createContext, useState, useContext, ReactNode } from 'react';

interface AssignedZoneContextType {
  zoneId: string | null;
  setZoneId: (zoneId: string) => void;
}

const AssignedZoneContext = createContext<AssignedZoneContextType | undefined>(undefined);

export const AssignedZoneProvider = ({ children }: { children: ReactNode }) => {
  const [zoneId, setZoneId] = useState<string | null>(null);

  const handleSetZone = (newZoneId: string) => {
    if (newZoneId === 'none') {
        setZoneId(null);
    } else {
        setZoneId(newZoneId);
    }
  }

  return (
    <AssignedZoneContext.Provider value={{ zoneId, setZoneId: handleSetZone }}>
      {children}
    </AssignedZoneContext.Provider>
  );
};

export const useAssignedZone = () => {
  const context = useContext(AssignedZoneContext);
  if (context === undefined) {
    throw new Error('useAssignedZone must be used within a AssignedZoneProvider');
  }
  return context;
};
