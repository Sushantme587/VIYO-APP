
"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import type { FIR } from '@/lib/types';

interface FIRContextType {
  firs: FIR[];
  addFIR: (fir: Omit<FIR, 'id'>) => void;
}

const FIRContext = createContext<FIRContextType | undefined>(undefined);

export const FIRProvider = ({ children }: { children: ReactNode }) => {
  const [firs, setFIRs] = useState<FIR[]>([]);

  useEffect(() => {
    // On initial load, try to get FIRs from localStorage
    try {
      const savedFIRs = localStorage.getItem('firs');
      if (savedFIRs) {
        setFIRs(JSON.parse(savedFIRs));
      }
    } catch (error) {
        console.error("Could not load FIRs from localStorage", error);
    }
  }, []);

  const addFIR = (newFIR: Omit<FIR, 'id'>) => {
    const firToAdd: FIR = {
      id: `FIR-${Date.now()}`,
      ...newFIR,
    };
    
    setFIRs(prevFIRs => {
        const updatedFIRs = [firToAdd, ...prevFIRs];
        // Save updated FIRs to localStorage
        try {
            localStorage.setItem('firs', JSON.stringify(updatedFIRs));
        } catch (error) {
            console.error("Could not save FIRs to localStorage", error);
        }
        return updatedFIRs;
    });
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
