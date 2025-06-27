'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, Search, Loader2 } from 'lucide-react';
import { useLocation } from '@/providers/LocationProvider';
import { toast } from 'sonner';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLocationSelected: () => void;
}

export default function LocationModal({ isOpen, onClose, onLocationSelected }: LocationModalProps) {
  const { setLocation } = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestedCities] = useState([
    'Lahore, Pakistan',
    'Karachi, Pakistan', 
    'Islamabad, Pakistan',
    'Faisalabad, Pakistan',
    'Rawalpindi, Pakistan'
  ]);

  const handleLocationDetection = async () => {
    setIsLoading(true);
    try {
      if (!navigator.geolocation) {
        throw new Error('Geolocation is not supported by this browser');
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          // Simulate reverse geocoding
          const locationData = {
            latitude,
            longitude,
            city: 'Lahore',
            country: 'Pakistan',
            address: 'Lahore, Punjab, Pakistan'
          };
          
          setLocation(locationData);
          toast.success('Location detected successfully!');
          onLocationSelected();
          setIsLoading(false);
        },
        () => {
          toast.error('Unable to detect location. Please select manually.');
          setIsLoading(false);
        }
      );
    } catch (error) {
      toast.error('Location detection failed. Please select manually.');
      setIsLoading(false);
    }
  };

  const handleCitySelect = (city: string) => {
    const [cityName, country] = city.split(', ');
    const locationData = {
      latitude: Math.random() * 180 - 90,
      longitude: Math.random() * 360 - 180,
      city: cityName,
      country,
      address: city
    };
    
    setLocation(locationData);
    toast.success(`Location set to ${city}`);
    onLocationSelected();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-blue-600" />
            <span>Set Your Location</span>
          </DialogTitle>
          <DialogDescription>
            We need your location to show relevant accommodations, restaurants, and transport options near you.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <Button 
            onClick={handleLocationDetection}
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <MapPin className="w-4 h-4 mr-2" />
            )}
            Detect My Location
          </Button>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search for a city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">Popular Cities:</p>
            {suggestedCities
              .filter(city => 
                searchQuery === '' || 
                city.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((city, index) => (
                <button
                  key={index}
                  onClick={() => handleCitySelect(city)}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-sm"
                >
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span>{city}</span>
                  </div>
                </button>
              ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}