'use client';

import { Button } from '@/components/ui/button';
import { MapPin, Home, Utensils, Bus, Wallet } from 'lucide-react';

interface HeroProps {
  onGetStarted: () => void;
}

export default function Hero({ onGetStarted }: HeroProps) {
  return (
    <div className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Your Perfect
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              {' '}Relocation{' '}
            </span>
            Companion
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Find accommodation, discover great restaurants, navigate public transport, 
            and manage your budget - all in one place. Make your move to a new city effortless.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="flex items-center space-x-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full">
              <Home className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium">Smart Accommodation</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full">
              <Utensils className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium">Quality Meals</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full">
              <Bus className="w-5 h-5 text-purple-600" />
              <span className="text-sm font-medium">Transport Routes</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full">
              <Wallet className="w-5 h-5 text-orange-600" />
              <span className="text-sm font-medium">Budget Tracking</span>
            </div>
          </div>

          <Button 
            size="lg" 
            className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-8 py-4 text-lg font-semibold"
            onClick={onGetStarted}
          >
            <MapPin className="w-5 h-5 mr-2" />
            Get Started Now
          </Button>
        </div>
      </div>
    </div>
  );
}