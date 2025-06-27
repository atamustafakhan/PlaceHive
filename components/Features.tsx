'use client';

import { Home, Utensils, Bus, Wallet, Shield, Zap } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const features = [
  {
    icon: Home,
    title: 'Smart Accommodation Search',
    description: 'Find verified hostels, flats, and apartments based on your location, budget, and preferences with detailed reviews.',
    color: 'text-blue-600'
  },
  {
    icon: Utensils,
    title: 'Quality Meal Suggestions',
    description: 'Discover restaurants and mess options with hygiene ratings, dietary preferences, and budget-friendly choices.',
    color: 'text-green-600'
  },
  {
    icon: Bus,
    title: 'Public Transport Routes',
    description: 'Navigate your new city easily with comprehensive public transport information and route planning.',
    color: 'text-purple-600'
  },
  {
    icon: Wallet,
    title: 'Budget Management',
    description: 'Track your expenses and get personalized budget suggestions to manage your finances effectively.',
    color: 'text-orange-600'
  },
  {
    icon: Shield,
    title: 'Verified Reviews',
    description: 'Make informed decisions with authentic, verified reviews from real users, not just word-of-mouth.',
    color: 'text-red-600'
  },
  {
    icon: Zap,
    title: 'Personalized Recommendations',
    description: 'Get tailored suggestions based on your preferences, lifestyle, and budget for the best experience.',
    color: 'text-indigo-600'
  }
];

export default function Features() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Everything You Need for a Smooth Relocation
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            PlaceHive combines all essential relocation services into one powerful platform, 
            making your move to a new city stress-free and organized.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-gray-100 hover:border-gray-200">
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}