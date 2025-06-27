'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';
import { useLocation } from '@/providers/LocationProvider';
import LocationModal from '@/components/LocationModal';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import { Button } from '@/components/ui/button';

export default function Home() {
  const { user } = useAuth();
  const { location, requestLocation } = useLocation();
  const [showLocationModal, setShowLocationModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (user && !location) {
      setShowLocationModal(true);
    } else if (user && location) {
      router.push('/dashboard');
    }
  }, [user, location, router]);

  const handleGetStarted = () => {
    if (user) {
      if (!location) {
        setShowLocationModal(true);
      } else {
        router.push('/dashboard');
      }
    } else {
      router.push('/auth/login');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <nav className="flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-sm border-b">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">P</span>
          </div>
          <span className="text-xl font-bold text-gray-900">PlaceHive</span>
        </div>
        <div className="flex items-center space-x-4">
          {user ? (
            <Button onClick={() => router.push('/dashboard')} className="bg-blue-600 hover:bg-blue-700">
              Dashboard
            </Button>
          ) : (
            <>
              <Button variant="ghost" onClick={() => router.push('/auth/login')}>
                Sign In
              </Button>
              <Button onClick={() => router.push('/auth/register')} className="bg-blue-600 hover:bg-blue-700">
                Get Started
              </Button>
            </>
          )}
        </div>
      </nav>

      <Hero onGetStarted={handleGetStarted} />
      <Features />

      <LocationModal 
        isOpen={showLocationModal} 
        onClose={() => setShowLocationModal(false)}
        onLocationSelected={() => {
          setShowLocationModal(false);
          router.push('/dashboard');
        }}
      />
    </div>
  );
}