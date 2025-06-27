'use client';

import { useAuth } from '@/providers/AuthProvider';
import { useLocation } from '@/providers/LocationProvider';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Home, Utensils, Bus, Wallet, MapPin, Star, Users, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const { user } = useAuth();
  const { location } = useLocation();

  const stats = [
    { label: 'Accommodations Found', value: '124', icon: Home, color: 'text-blue-600' },
    { label: 'Restaurants Nearby', value: '89', icon: Utensils, color: 'text-green-600' },
    { label: 'Transport Routes', value: '15', icon: Bus, color: 'text-purple-600' },
    { label: 'Budget Saved', value: '₨12,000', icon: Wallet, color: 'text-orange-600' }
  ];

  const quickActions = [
    {
      title: 'Find Accommodation',
      description: 'Search for hostels, apartments, and rooms',
      href: '/accommodation',
      icon: Home,
      color: 'bg-blue-50 text-blue-600 hover:bg-blue-100'
    },
    {
      title: 'Discover Food',
      description: 'Find restaurants and mess options',
      href: '/restaurants',
      icon: Utensils,
      color: 'bg-green-50 text-green-600 hover:bg-green-100'
    },
    {
      title: 'Transport Routes',
      description: 'Plan your daily commute',
      href: '/transport',
      icon: Bus,
      color: 'bg-purple-50 text-purple-600 hover:bg-purple-100'
    },
    {
      title: 'Budget Tracker',
      description: 'Manage your expenses',
      href: '/budget',
      icon: Wallet,
      color: 'bg-orange-50 text-orange-600 hover:bg-orange-100'
    }
  ];

  const recentActivities = [
    { action: 'Viewed Hostel Luna', time: '2 hours ago', type: 'accommodation' },
    { action: 'Saved Al-Madina Restaurant', time: '4 hours ago', type: 'restaurant' },
    { action: 'Added Metro Route 15', time: '1 day ago', type: 'transport' },
    { action: 'Updated monthly budget', time: '2 days ago', type: 'budget' }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome back, {user?.name}! 👋
              </h1>
              <p className="text-gray-600 mt-1 flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                {location?.address || 'Location not set'}
              </p>
            </div>
            <div className="hidden md:block">
              <div className="text-right">
                <p className="text-sm text-gray-600">Today's Date</p>
                <p className="font-semibold">{new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg bg-gray-50`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Link key={index} href={action.href}>
                <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 rounded-lg ${action.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <action.icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{action.title}</h3>
                    <p className="text-sm text-gray-600">{action.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity & Recommendations */}
        <div className="grid lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Recent Activity
              </CardTitle>
              <CardDescription>Your latest interactions on PlaceHive</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Star className="w-5 h-5 mr-2" />
                Recommendations for You
              </CardTitle>
              <CardDescription>Based on your location and preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-gray-900">Student Hostel Near University</h4>
                  <p className="text-sm text-gray-600 mt-1">₨15,000/month • 2km from campus</p>
                  <div className="flex items-center mt-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600 ml-1">4.5 (120 reviews)</span>
                  </div>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-gray-900">Al-Rehman Mess</h4>
                  <p className="text-sm text-gray-600 mt-1">₨4,500/month • Hygienic home-style meals</p>
                  <div className="flex items-center mt-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600 ml-1">4.2 (85 reviews)</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}