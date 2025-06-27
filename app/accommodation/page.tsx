'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  MapPin, 
  Star, 
  Wifi, 
  Car, 
  Utensils, 
  Shield, 
  Users,
  BedDouble,
  Search,
  Filter,
  Heart,
  Share
} from 'lucide-react';
import { useLocation } from '@/providers/LocationProvider';

const mockAccommodations = [
  {
    id: 1,
    name: 'Student Hostel Luna',
    type: 'Hostel',
    price: 15000,
    rating: 4.5,
    reviews: 120,
    distance: '0.8 km from University',
    image: 'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg',
    amenities: ['Wifi', 'Parking', 'Mess', 'Security'],
    rooms: 'Available',
    description: 'Clean and affordable hostel with all basic amenities'
  },
  {
    id: 2,
    name: 'Green Valley Apartments',
    type: 'Apartment',
    price: 25000,
    rating: 4.3,
    reviews: 85,
    distance: '1.2 km from University',
    image: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg',
    amenities: ['Wifi', 'Parking', 'Kitchen', 'Security'],
    rooms: '2 rooms left',
    description: 'Modern apartment with kitchen facilities'
  },
  {
    id: 3,
    name: 'Budget Stay Inn',
    type: 'Hostel',
    price: 12000,
    rating: 4.1,
    reviews: 200,
    distance: '1.5 km from University',
    image: 'https://images.pexels.com/photos/271619/pexels-photo-271619.jpeg',
    amenities: ['Wifi', 'Mess', 'Laundry'],
    rooms: 'Available',
    description: 'Economic option with basic facilities'
  },
  {
    id: 4,
    name: 'Elite Residency',
    type: 'Flat',
    price: 35000,
    rating: 4.7,
    reviews: 65,
    distance: '2.0 km from University',
    image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg',
    amenities: ['Wifi', 'Parking', 'Kitchen', 'Security', 'Gym'],
    rooms: '1 room left',
    description: 'Luxury flat with premium amenities'
  }
];

export default function AccommodationPage() {
  const { location } = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState('all');
  const [accommodationType, setAccommodationType] = useState('all');
  const [sortBy, setSortBy] = useState('price');
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fav => fav !== id)
        : [...prev, id]
    );
  };

  const filteredAccommodations = mockAccommodations.filter(acc => {
    const matchesSearch = acc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         acc.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = priceRange === 'all' || 
                        (priceRange === 'low' && acc.price < 20000) ||
                        (priceRange === 'medium' && acc.price >= 20000 && acc.price <= 30000) ||
                        (priceRange === 'high' && acc.price > 30000);
    const matchesType = accommodationType === 'all' || acc.type.toLowerCase() === accommodationType;
    
    return matchesSearch && matchesPrice && matchesType;
  });

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'wifi': return <Wifi className="w-4 h-4" />;
      case 'parking': return <Car className="w-4 h-4" />;
      case 'mess': return <Utensils className="w-4 h-4" />;
      case 'security': return <Shield className="w-4 h-4" />;
      case 'kitchen': return <Utensils className="w-4 h-4" />;
      default: return <Users className="w-4 h-4" />;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Find Accommodation</h1>
          <p className="text-gray-600 mt-2 flex items-center">
            <MapPin className="w-4 h-4 mr-1" />
            Showing results near {location?.city || 'your location'}
          </p>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="relative lg:col-span-2">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search accommodations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={accommodationType} onValueChange={setAccommodationType}>
                <SelectTrigger>
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="hostel">Hostel</SelectItem>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="flat">Flat</SelectItem>
                </SelectContent>
              </Select>

              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger>
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="low">Under ₨20,000</SelectItem>
                  <SelectItem value="medium">₨20,000 - ₨30,000</SelectItem>
                  <SelectItem value="high">Above ₨30,000</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="price">Price: Low to High</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="distance">Nearest First</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="grid lg:grid-cols-2 gap-6">
          {filteredAccommodations.map((accommodation) => (
            <Card key={accommodation.id} className="group hover:shadow-lg transition-all duration-300">
              <div className="relative">
                <img
                  src={accommodation.image}
                  alt={accommodation.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-white/90">
                    {accommodation.type}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4 flex space-x-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 w-8 p-0 bg-white/90 hover:bg-white"
                    onClick={() => toggleFavorite(accommodation.id)}
                  >
                    <Heart 
                      className={`w-4 h-4 ${
                        favorites.includes(accommodation.id) 
                          ? 'fill-red-500 text-red-500' 
                          : 'text-gray-600'
                      }`} 
                    />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 w-8 p-0 bg-white/90 hover:bg-white"
                  >
                    <Share className="w-4 h-4 text-gray-600" />
                  </Button>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {accommodation.name}
                  </h3>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-600">₨{accommodation.price.toLocaleString()}</p>
                    <p className="text-sm text-gray-500">per month</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 mb-3">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium ml-1">{accommodation.rating}</span>
                    <span className="text-sm text-gray-500 ml-1">({accommodation.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-1" />
                    {accommodation.distance}
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4">{accommodation.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {accommodation.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center space-x-1 bg-gray-50 px-2 py-1 rounded-full text-xs">
                      {getAmenityIcon(amenity)}
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <BedDouble className="w-4 h-4 mr-1 text-gray-600" />
                    <span className="text-sm text-gray-600">{accommodation.rooms}</span>
                  </div>
                  <div className="space-x-2">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      Contact
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredAccommodations.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No accommodations found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}