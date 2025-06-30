import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Settings, 
  Plus, 
  Filter,
  Bell,
  Crown,
  Sparkles,
  Calendar,
  BarChart3
} from 'lucide-react';
import Header from '../components/layout/Header';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import SavingsCard from '../components/dashboard/SavingsCard';
import SubscriptionCard from '../components/dashboard/SubscriptionCard';
import { useUser } from '../contexts/UserContext';
import { mockSubscriptions, calculateTotalSavings, calculateMonthlyCost } from '../data/mockSubscriptions';
import { aiEngine } from '../lib/aiEngine';

export default function Dashboard() {
  const { user, updateUser } = useUser();
  const [subscriptions, setSubscriptions] = useState(mockSubscriptions);
  const [optimizingIds, setOptimizingIds] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState('all');
  const [showUpgrade, setShowUpgrade] = useState(false);

  const totalSavings = calculateTotalSavings(subscriptions);
  const monthlyCost = calculateMonthlyCost(subscriptions);
  const annualProjection = totalSavings * 12;
  const optimizationsCount = subscriptions.filter(sub => sub.recommendation).length;

  const handleOptimize = async (subscription: any) => {
    if (user?.plan === 'free' && optimizingIds.size >= 1) {
      setShowUpgrade(true);
      return;
    }

    setOptimizingIds(prev => new Set([...prev, subscription.id]));

    try {
      const result = await aiEngine.executeOptimization({
        subscriptionId: subscription.id,
        action: subscription.recommendation?.action,
        savings: subscription.recommendation?.savings
      });

      if (result.success) {
        // Update subscription status
        setSubscriptions(prev => prev.map(sub => 
          sub.id === subscription.id 
            ? { ...sub, status: 'active' as const, recommendation: undefined }
            : sub
        ));

        // Update user savings
        if (user) {
          updateUser({
            totalSaved: user.totalSaved + (subscription.recommendation?.savings || 0)
          });
        }
      }
    } catch (error) {
      console.error('Optimization failed:', error);
    } finally {
      setOptimizingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(subscription.id);
        return newSet;
      });
    }
  };

  const filteredSubscriptions = subscriptions.filter(sub => {
    if (filter === 'all') return true;
    if (filter === 'optimizable') return sub.recommendation;
    if (filter === 'active') return sub.status === 'active';
    if (filter === 'unused') return sub.status === 'unused';
    return true;
  });

  const handleUpgradeClick = () => {
    updateUser({ plan: 'pro' });
    setShowUpgrade(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-primary-900">
                Welcome back, {user?.name || 'User'}!
              </h1>
              <p className="text-primary-600 mt-1">
                AIDE is continuously monitoring and optimizing your subscriptions
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="ghost" icon={Bell} size="sm">
                Notifications
              </Button>
              <Button variant="ghost" icon={Settings} size="sm">
                Settings
              </Button>
            </div>
          </div>

          {user?.plan === 'free' && (
            <Card className="bg-gradient-to-r from-blue-500 to-emerald-500 text-white mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Crown size={24} />
                  <div>
                    <h3 className="font-semibold">Upgrade to Nexus Pro</h3>
                    <p className="text-blue-100 text-sm">
                      Unlimited optimizations, automatic execution, and advanced analytics
                    </p>
                  </div>
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => updateUser({ plan: 'pro' })}
                >
                  Upgrade $9.99/mo
                </Button>
              </div>
            </Card>
          )}
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-1">
            <SavingsCard
              totalSaved={user?.totalSaved || 0}
              monthlySavings={totalSavings}
              annualProjection={annualProjection}
              optimizationsCount={optimizationsCount}
            />
          </div>
          
          <div className="lg:col-span-2 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-primary-600">Monthly Spend</p>
                    <p className="text-2xl font-bold text-primary-900">
                      ${monthlyCost.toFixed(2)}
                    </p>
                  </div>
                  <BarChart3 size={24} className="text-blue-500" />
                </div>
              </Card>
              
              <Card>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-primary-600">Active Subscriptions</p>
                    <p className="text-2xl font-bold text-primary-900">
                      {subscriptions.length}
                    </p>
                  </div>
                  <Calendar size={24} className="text-emerald-500" />
                </div>
              </Card>
            </div>
            
            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-primary-900 mb-1">
                    Next Optimization Cycle
                  </h3>
                  <p className="text-sm text-primary-600">
                    AIDE will analyze new patterns in 5 days
                  </p>
                </div>
                <div className="flex items-center space-x-2 text-blue-600">
                  <Sparkles size={20} />
                  <span className="font-semibold">Auto-Running</span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Subscriptions Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-primary-900">
              Your Subscriptions
            </h2>
            <div className="flex items-center space-x-3">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Subscriptions</option>
                <option value="optimizable">Needs Optimization</option>
                <option value="active">Active</option>
                <option value="unused">Unused</option>
              </select>
              <Button variant="ghost" icon={Plus} size="sm">
                Add Subscription
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSubscriptions.map((subscription) => (
              <SubscriptionCard
                key={subscription.id}
                subscription={subscription}
                onOptimize={handleOptimize}
                isOptimizing={optimizingIds.has(subscription.id)}
              />
            ))}
          </div>
        </div>

        {/* Upgrade Modal */}
        {showUpgrade && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="max-w-md mx-4">
              <div className="text-center mb-6">
                <Crown size={48} className="text-yellow-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-primary-900 mb-2">
                  Upgrade to Pro
                </h3>
                <p className="text-primary-600">
                  Free plan allows 1 optimization per month. Upgrade for unlimited optimizations 
                  and automatic execution.
                </p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center text-primary-700">
                  <span className="w-4 h-4 bg-emerald-500 rounded-full mr-3"></span>
                  Unlimited optimizations
                </div>
                <div className="flex items-center text-primary-700">
                  <span className="w-4 h-4 bg-emerald-500 rounded-full mr-3"></span>
                  Automatic execution
                </div>
                <div className="flex items-center text-primary-700">
                  <span className="w-4 h-4 bg-emerald-500 rounded-full mr-3"></span>
                  Advanced analytics
                </div>
              </div>

              <div className="flex space-x-3">
                <Button
                  variant="secondary"
                  className="flex-1"
                  onClick={() => setShowUpgrade(false)}
                >
                  Maybe Later
                </Button>
                <Button
                  className="flex-1"
                  onClick={handleUpgradeClick}
                  icon={Crown}
                >
                  Upgrade $9.99/mo
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}