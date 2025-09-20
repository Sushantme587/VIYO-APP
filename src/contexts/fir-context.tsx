
"use client";

import React, { createContext, useState, useContext, ReactNode } from 'react';
import type { FIR } from '@/lib/types';

interface FIRContextType {
  firs: FIR[];
  addFIR: (fir: Omit<FIR, 'id'>) => void;
}

const FIRContext = createContext<FIRContextType | undefined>(undefined);

export const FIRProvider = ({ children }: { children: ReactNode }) => {
  const [firs, setFIRs] = useState<FIR[]>([]);

  const addFIR = (newFIR: Omit<FIR, 'id'>) => {
    const firToAdd: FIR = {
      id: `FIR-${Date.now()}`,
      ...newFIR,
    };
    setFIRs(prevFIRs => [firToAdd, ...prevFIRs]);
  };

  return (
    <FIRContext.Provider value={{ firs, addFIR }}>
      {children}
    </FIRContext.Provider>
  );
};

export const useFIRs = () => {
  const context = useContext(FIRContext);
  if (context === undefined) {
    throw new Error('useFIRs must be used within a FIRProvider');
  }
  return context;
};
