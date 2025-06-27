'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
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
  Clock, 
  Phone,
  Search,
  Heart,
  Share,
  ShieldCheck,
  Utensils,
  DollarSign
} from 'lucide-react';
import { useLocation } from '@/providers/LocationProvider';

const mockRestaurants = [
  {
    id: 1,
    name: 'Al-Rehman Mess',
    type: 'Mess',
    cuisine: 'Pakistani',
    price: 4500,
    priceType: 'monthly',
    rating: 4.2,
    reviews: 85,
    distance: '0.5 km',
    timing: '7:00 AM - 10:00 PM',
    phone: '+92 300 1234567',
    image: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg',
    hygieneRating: 'A',
    specialties: ['Home-style meals', 'Halal', 'Daily menu'],
    description: 'Traditional Pakistani home-style meals with excellent hygiene standards'
  },
  {
    id: 2,
    name: 'Student Bites Cafeteria',
    type: 'Restaurant',
    cuisine: 'Fast Food',
    price: 300,
    priceType: 'per meal',
    rating: 4.0,
    reviews: 156,
    distance: '0.8 km',
    timing: '11:00 AM - 11:00 PM',
    phone: '+92 300 2345678',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
    hygieneRating: 'B+',
    specialties: ['Burgers', 'Pizza', 'Student discounts'],
    description: 'Popular spot for quick bites with student-friendly prices'
  },
  {
    id: 3,
    name: 'Healthy Meals Co.',
    type: 'Mess',
    cuisine: 'Continental',
    price: 6000,
    priceType: 'monthly',
    rating: 4.5,
    reviews: 92,
    distance: '1.2 km',
    timing: '6:00 AM - 9:00 PM',
    phone: '+92 300 3456789',
    image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg',
    hygieneRating: 'A+',
    specialties: ['Organic', 'Nutrition focused', 'Diet plans'],
    description: 'Health-conscious meals with organic ingredients and nutritional balance'
  },
  {
    id: 4,
    name: 'Desi Dhaba',
    type: 'Restaurant',
    cuisine: 'Pakistani',
    price: 400,
    priceType: 'per meal',
    rating: 4.3,
    reviews: 203,
    distance: '1.5 km',
    timing: '12:00 PM - 12:00 AM',
    phone: '+92 300 4567890',
    image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg',
    hygieneRating: 'B',
    specialties: ['Karahi', 'BBQ', 'Traditional'],
    description: 'Authentic Pakistani cuisine with traditional cooking methods'
  }
];

export default function RestaurantsPage() {
  const { location } = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [cuisineType, setCuisineType] = useState('all');
  const [restaurantType, setRestaurantType] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('rating');
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fav => fav !== id)
        : [...prev, id]
    );
  };

  const filteredRestaurants = mockRestaurants.filter(restaurant => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         restaurant.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCuisine = cuisineType === 'all' || restaurant.cuisine.toLowerCase() === cuisineType;
    const matchesType = restaurantType === 'all' || restaurant.type.toLowerCase() === restaurantType;
    const matchesPrice = priceRange === 'all' || 
                        (priceRange === 'budget' && restaurant.price < 3000) ||
                        (priceRange === 'moderate' && restaurant.price >= 3000 && restaurant.price <= 6000) ||
                        (priceRange === 'premium' && restaurant.price > 6000);
    
    return matchesSearch && matchesCuisine && matchesType && matchesPrice;
  });

  const getHygieneColor = (rating: string) => {
    switch (rating) {
      case 'A+': return 'bg-green-500 text-white';
      case 'A': return 'bg-green-400 text-white';
      case 'B+': return 'bg-yellow-400 text-black';
      case 'B': return 'bg-yellow-300 text-black';
      default: return 'bg-gray-400 text-white';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Restaurants & Mess</h1>
          <p className="text-gray-600 mt-2 flex items-center">
            <MapPin className="w-4 h-4 mr-1" />
            Food options near {location?.city || 'your location'}
          </p>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="relative lg:col-span-2">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search restaurants and mess..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={restaurantType} onValueChange={setRestaurantType}>
                <SelectTrigger>
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="mess">Mess</SelectItem>
                  <SelectItem value="restaurant">Restaurant</SelectItem>
                </SelectContent>
              </Select>

              <Select value={cuisineType} onValueChange={setCuisineType}>
                <SelectTrigger>
                  <SelectValue placeholder="Cuisine" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Cuisines</SelectItem>
                  <SelectItem value="pakistani">Pakistani</SelectItem>
                  <SelectItem value="fast food">Fast Food</SelectItem>
                  <SelectItem value="continental">Continental</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="price">Price: Low to High</SelectItem>
                  <SelectItem value="distance">Nearest First</SelectItem>
                  <SelectItem value="hygiene">Hygiene Rating</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="grid lg:grid-cols-2 gap-6">
          {filteredRestaurants.map((restaurant) => (
            <Card key={restaurant.id} className="group hover:shadow-lg transition-all duration-300">
              <div className="relative">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="absolute top-4 left-4 flex space-x-2">
                  <Badge variant="secondary" className="bg-white/90">
                    {restaurant.type}
                  </Badge>
                  <Badge className={`${getHygieneColor(restaurant.hygieneRating)}`}>
                    Hygiene: {restaurant.hygieneRating}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4 flex space-x-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 w-8 p-0 bg-white/90 hover:bg-white"
                    onClick={() => toggleFavorite(restaurant.id)}
                  >
                    <Heart 
                      className={`w-4 h-4 ${
                        favorites.includes(restaurant.id) 
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
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {restaurant.name}
                    </h3>
                    <p className="text-sm text-gray-600">{restaurant.cuisine} Cuisine</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-600">₨{restaurant.price.toLocaleString()}</p>
                    <p className="text-sm text-gray-500">{restaurant.priceType}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 mb-3">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium ml-1">{restaurant.rating}</span>
                    <span className="text-sm text-gray-500 ml-1">({restaurant.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-1" />
                    {restaurant.distance}
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4">{restaurant.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {restaurant.specialties.map((specialty, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {specialty}
                    </Badge>
                  ))}
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    {restaurant.timing}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="w-4 h-4 mr-2" />
                    {restaurant.phone}
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <ShieldCheck className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-gray-600">Verified Quality</span>
                  </div>
                  <div className="space-x-2">
                    <Button variant="outline" size="sm">
                      View Menu
                    </Button>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      Order Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredRestaurants.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Utensils className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No restaurants found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}