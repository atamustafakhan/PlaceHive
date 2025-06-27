'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Wallet, 
  Home, 
  Utensils, 
  Bus, 
  ShoppingCart,
  TrendingUp,
  TrendingDown,
  Plus,
  Edit,
  Trash2,
  PieChart
} from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const mockBudgetData = {
  monthlyIncome: 50000,
  totalExpenses: 42000,
  categories: [
    { name: 'Accommodation', budgeted: 20000, spent: 18000, icon: Home, color: 'bg-blue-500' },
    { name: 'Food', budgeted: 10000, spent: 12000, icon: Utensils, color: 'bg-green-500' },
    { name: 'Transport', budgeted: 5000, spent: 4200, icon: Bus, color: 'bg-purple-500' },
    { name: 'Shopping', budgeted: 8000, spent: 6500, icon: ShoppingCart, color: 'bg-orange-500' },
    { name: 'Others', budgeted: 5000, spent: 1300, icon: Wallet, color: 'bg-gray-500' }
  ]
};

const recentTransactions = [
  { id: 1, description: 'Hostel Rent', amount: -18000, category: 'Accommodation', date: 'Today', type: 'expense' },
  { id: 2, description: 'Grocery Shopping', amount: -1500, category: 'Food', date: 'Yesterday', type: 'expense' },
  { id: 3, description: 'Metro Card Recharge', amount: -500, category: 'Transport', date: '2 days ago', type: 'expense' },
  { id: 4, description: 'Monthly Allowance', amount: 50000, category: 'Income', date: '3 days ago', type: 'income' },
  { id: 5, description: 'Restaurant Bill', amount: -800, category: 'Food', date: '3 days ago', type: 'expense' }
];

export default function BudgetPage() {
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [newExpense, setNewExpense] = useState({
    description: '',
    amount: '',
    category: 'food'
  });

  const remainingBudget = mockBudgetData.monthlyIncome - mockBudgetData.totalExpenses;
  const budgetUtilization = (mockBudgetData.totalExpenses / mockBudgetData.monthlyIncome) * 100;

  const handleAddExpense = () => {
    // Here you would normally add the expense to your data
    console.log('Adding expense:', newExpense);
    setNewExpense({ description: '', amount: '', category: 'food' });
    setShowAddExpense(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Budget Tracker</h1>
            <p className="text-gray-600 mt-2">Manage your monthly expenses and track spending</p>
          </div>
          <Dialog open={showAddExpense} onOpenChange={setShowAddExpense}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Expense
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Expense</DialogTitle>
                <DialogDescription>
                  Record a new expense to track your spending
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    placeholder="Enter expense description"
                    value={newExpense.description}
                    onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount (₨)</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="Enter amount"
                    value={newExpense.amount}
                    onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={newExpense.category} onValueChange={(value) => setNewExpense({...newExpense, category: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="accommodation">Accommodation</SelectItem>
                      <SelectItem value="food">Food</SelectItem>
                      <SelectItem value="transport">Transport</SelectItem>
                      <SelectItem value="shopping">Shopping</SelectItem>
                      <SelectItem value="others">Others</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleAddExpense} className="w-full">
                  Add Expense
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Budget Overview */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Monthly Income</p>
                  <p className="text-2xl font-bold text-green-600">₨{mockBudgetData.monthlyIncome.toLocaleString()}</p>
                </div>
                <div className="p-3 rounded-lg bg-green-50">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Expenses</p>
                  <p className="text-2xl font-bold text-red-600">₨{mockBudgetData.totalExpenses.toLocaleString()}</p>
                </div>
                <div className="p-3 rounded-lg bg-red-50">
                  <TrendingDown className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Remaining Budget</p>
                  <p className={`text-2xl font-bold ${remainingBudget >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    ₨{remainingBudget.toLocaleString()}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-blue-50">
                  <Wallet className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Budget Utilization */}
        <Card>
          <CardHeader>
            <CardTitle>Budget Utilization</CardTitle>
            <CardDescription>
              You've used {budgetUtilization.toFixed(1)}% of your monthly budget
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={budgetUtilization} className="h-3" />
          </CardContent>
        </Card>

        <Tabs defaultValue="categories" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
          </TabsList>

          <TabsContent value="categories" className="space-y-6">
            {/* Category Breakdown */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockBudgetData.categories.map((category, index) => {
                const percentage = (category.spent / category.budgeted) * 100;
                const isOverBudget = category.spent > category.budgeted;
                
                return (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-lg ${category.color}/10`}>
                            <category.icon className={`w-5 h-5 text-white`} style={{color: category.color.replace('bg-', '').replace('-500', '')}} />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{category.name}</h3>
                            <p className="text-sm text-gray-600">
                              ₨{category.spent.toLocaleString()} / ₨{category.budgeted.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{percentage.toFixed(1)}% used</span>
                          <span className={isOverBudget ? 'text-red-600' : 'text-green-600'}>
                            {isOverBudget ? 'Over budget' : 'On track'}
                          </span>
                        </div>
                        <Progress 
                          value={Math.min(percentage, 100)} 
                          className={`h-2 ${isOverBudget ? '[&>div]:bg-red-500' : '[&>div]:bg-green-500'}`} 
                        />
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Budget Suggestions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PieChart className="w-5 h-5 mr-2" />
                  Budget Suggestions
                </CardTitle>
                <CardDescription>AI-powered recommendations to optimize your spending</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <h4 className="font-medium text-yellow-900">Food Budget Alert</h4>
                    <p className="text-sm text-yellow-800 mt-1">
                      You've exceeded your food budget by ₨2,000. Consider meal planning to reduce costs.
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h4 className="font-medium text-green-900">Great Savings!</h4>
                    <p className="text-sm text-green-800 mt-1">
                      You're doing well with transport costs. You've saved ₨800 this month.
                    </p>
                  </div>
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-medium text-blue-900">Optimization Tip</h4>
                    <p className="text-sm text-blue-800 mt-1">
                      Consider finding a mess subscription to reduce your monthly food expenses by up to 40%.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            {/* Recent Transactions */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Your latest income and expenses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <div className="flex items-center space-x-3">
                        <div className={`w-2 h-2 rounded-full ${transaction.type === 'income' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        <div>
                          <p className="font-medium text-gray-900">{transaction.description}</p>
                          <p className="text-sm text-gray-600">{transaction.category} • {transaction.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-semibold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                          {transaction.type === 'income' ? '+' : ''}₨{Math.abs(transaction.amount).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}