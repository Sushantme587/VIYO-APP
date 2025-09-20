"use client";

import React, { createContext, useState, useContext, ReactNode } from 'react';

interface MapSettingsContextType {
  showTraffic: boolean;
  setShowTraffic: (show: boolean) => void;
}

const MapSettingsContext = createContext<MapSettingsContextType | undefined>(undefined);

export const MapSettingsProvider = ({ children }: { children: ReactNode }) => {
  const [showTraffic, setShowTraffic] = useState(false);

  return (
    <MapSettingsContext.Provider value={{ showTraffic, setShowTraffic }}>
      {children}
    </MapSettingsContext.Provider>
  );
};

export const useMapSettings = () => {
  const context = useContext(MapSettingsContext);
  if (context === undefined) {
    throw new Error('useMapSettings must be used within a MapSettingsProvider');
  }
  return context;
};
