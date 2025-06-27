'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MapPin, 
  Clock, 
  Navigation,
  Bus,
  Train,
  Car,
  Bike,
  ArrowRight,
  Star,
  Users,
  DollarSign
} from 'lucide-react';
import { useLocation } from '@/providers/LocationProvider';

const mockRoutes = [
  {
    id: 1,
    name: 'Metro Line 1',
    type: 'Metro',
    from: 'University Station',
    to: 'City Center',
    duration: '25 mins',
    fare: 30,
    frequency: '5 mins',
    stops: 8,
    rating: 4.2,
    crowdLevel: 'Moderate',
    icon: Train,
    color: 'text-blue-600'
  },
  {
    id: 2,
    name: 'Bus Route 15',
    type: 'Bus',
    from: 'University Gate',
    to: 'Mall Road',
    duration: '35 mins',
    fare: 20,
    frequency: '10 mins',
    stops: 12,
    rating: 3.8,
    crowdLevel: 'High',
    icon: Bus,
    color: 'text-green-600'
  },
  {
    id: 3,
    name: 'Ride Share Route',
    type: 'Rideshare',
    from: 'Your Location',
    to: 'Destination',
    duration: '15-20 mins',
    fare: 150,
    frequency: 'On-demand',
    stops: 0,
    rating: 4.5,
    crowdLevel: 'Low',
    icon: Car,
    color: 'text-purple-600'
  },
  {
    id: 4,
    name: 'Bike Route A',
    type: 'Cycling',
    from: 'University',
    to: 'City Center',
    duration: '40 mins',
    fare: 0,
    frequency: 'Anytime',
    stops: 0,
    rating: 4.0,
    crowdLevel: 'None',
    icon: Bike,
    color: 'text-orange-600'
  }
];

const popularDestinations = [
  { name: 'University Campus', distance: '0.5 km', routes: 3 },
  { name: 'City Center Mall', distance: '5.2 km', routes: 5 },
  { name: 'Railway Station', distance: '8.1 km', routes: 4 },
  { name: 'Airport', distance: '25.3 km', routes: 2 },
  { name: 'Hospital', distance: '3.8 km', routes: 3 },
  { name: 'Market Area', distance: '2.5 km', routes: 4 }
];

export default function TransportPage() {
  const { location } = useLocation();
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [selectedRoute, setSelectedRoute] = useState<number | null>(null);

  const getCrowdColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'low': return 'text-green-600 bg-green-50';
      case 'moderate': return 'text-yellow-600 bg-yellow-50';
      case 'high': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Public Transport</h1>
          <p className="text-gray-600 mt-2 flex items-center">
            <MapPin className="w-4 h-4 mr-1" />
            Transport routes in {location?.city || 'your city'}
          </p>
        </div>

        {/* Route Planner */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Navigation className="w-5 h-5 mr-2" />
              Plan Your Route
            </CardTitle>
            <CardDescription>Find the best way to get around the city</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">From</label>
                <Input
                  placeholder="Enter starting location"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">To</label>
                <Input
                  placeholder="Enter destination"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                />
              </div>
              <div className="flex items-end">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Find Routes
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Route Results */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Available Routes</h2>
            
            {mockRoutes.map((route) => (
              <Card 
                key={route.id} 
                className={`cursor-pointer transition-all duration-300 ${
                  selectedRoute === route.id 
                    ? 'ring-2 ring-blue-500 shadow-lg' 
                    : 'hover:shadow-md'
                }`}
                onClick={() => setSelectedRoute(route.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg bg-gray-50`}>
                        <route.icon className={`w-5 h-5 ${route.color}`} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{route.name}</h3>
                        <p className="text-sm text-gray-600">{route.type}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-600">₨{route.fare}</p>
                      <p className="text-sm text-gray-500">{route.duration}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 mb-4">
                    <span className="text-sm font-medium">{route.from}</span>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium">{route.to}</span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="text-center">
                      <Clock className="w-4 h-4 text-gray-400 mx-auto mb-1" />
                      <p className="text-xs text-gray-600">Frequency</p>
                      <p className="text-sm font-medium">{route.frequency}</p>
                    </div>
                    <div className="text-center">
                      <MapPin className="w-4 h-4 text-gray-400 mx-auto mb-1" />
                      <p className="text-xs text-gray-600">Stops</p>
                      <p className="text-sm font-medium">{route.stops}</p>
                    </div>
                    <div className="text-center">
                      <Star className="w-4 h-4 text-gray-400 mx-auto mb-1" />
                      <p className="text-xs text-gray-600">Rating</p>
                      <p className="text-sm font-medium">{route.rating}</p>
                    </div>
                    <div className="text-center">
                      <Users className="w-4 h-4 text-gray-400 mx-auto mb-1" />
                      <p className="text-xs text-gray-600">Crowd</p>
                      <Badge className={`text-xs ${getCrowdColor(route.crowdLevel)}`}>
                        {route.crowdLevel}
                      </Badge>
                    </div>
                  </div>

                  {selectedRoute === route.id && (
                    <div className="border-t pt-4">
                      <div className="flex space-x-2">
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          Get Directions
                        </Button>
                        <Button size="sm" variant="outline">
                          Save Route
                        </Button>
                        <Button size="sm" variant="outline">
                          Share
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Popular Destinations */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Popular Destinations</CardTitle>
                <CardDescription>Frequently visited places</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {popularDestinations.map((destination, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
                    >
                      <div>
                        <p className="font-medium text-gray-900">{destination.name}</p>
                        <p className="text-sm text-gray-600">{destination.distance} away</p>
                      </div>
                      <Badge variant="secondary">
                        {destination.routes} routes
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Transport Tips */}
            <Card>
              <CardHeader>
                <CardTitle>Transport Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm font-medium text-blue-900">Peak Hours</p>
                    <p className="text-xs text-blue-700">Avoid 8-10 AM and 5-7 PM for less crowded rides</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-sm font-medium text-green-900">Student Discount</p>
                    <p className="text-xs text-green-700">Show your student ID for 50% off on metro fares</p>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-lg">
                    <p className="text-sm font-medium text-orange-900">Mobile Apps</p>
                    <p className="text-xs text-orange-700">Download transit apps for real-time updates</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}