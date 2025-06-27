'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface LocationData {
  latitude: number;
  longitude: number;
  city: string;
  country: string;
  address: string;
}

interface LocationContextType {
  location: LocationData | null;
  setLocation: (location: LocationData) => void;
  requestLocation: () => Promise<void>;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export function LocationProvider({ children }: { children: ReactNode }) {
  const [location, setLocationState] = useState<LocationData | null>(null);

  const setLocation = (newLocation: LocationData) => {
    setLocationState(newLocation);
    localStorage.setItem('placehive-location', JSON.stringify(newLocation));
  };

  const requestLocation = async () => {
    // This would typically handle location permission requests
    // For now, we'll just check if we have stored location data
    const stored = localStorage.getItem('placehive-location');
    if (stored) {
      setLocationState(JSON.parse(stored));
    }
  };

  return (
    <LocationContext.Provider value={{ location, setLocation, requestLocation }}>
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
}