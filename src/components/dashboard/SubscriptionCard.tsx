import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import ProgressRing from '../ui/ProgressRing';

interface Subscription {
  id: string;
  name: string;
  cost: number;
  icon: string;
  usageScore: number;
  lastUsed: string;
  plan: string;
  status: 'active' | 'unused' | 'duplicate' | 'optimizable';
  recommendation?: {
    action: string;
    savings: number;
    description: string;
  };
}

interface SubscriptionCardProps {
  subscription: Subscription;
  onOptimize: (subscription: Subscription) => void;
  isOptimizing?: boolean;
}

export default function SubscriptionCard({ 
  subscription, 
  onOptimize, 
  isOptimizing = false 
}: SubscriptionCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-emerald-500';
      case 'unused': return 'text-red-500';
      case 'duplicate': return 'text-orange-500';
      case 'optimizable': return 'text-blue-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return CheckCircle;
      case 'unused': return AlertTriangle;
      case 'duplicate': return AlertTriangle;
      case 'optimizable': return Clock;
      default: return Clock;
    }
  };

  const StatusIcon = getStatusIcon(subscription.status);

  return (
    <Card hover className="relative overflow-hidden">
      {subscription.status === 'unused' && (
        <div className="absolute top-0 right-0 w-0 h-0 border-l-[30px] border-l-transparent border-t-[30px] border-t-red-500">
          <AlertTriangle size={12} className="absolute -top-5 -right-4 text-white" />
        </div>
      )}

      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
            {subscription.icon}
          </div>
          <div>
            <h3 className="font-semibold text-primary-900">{subscription.name}</h3>
            <p className="text-sm text-primary-600">{subscription.plan}</p>
          </div>
        </div>
        
        <div className="text-right">
          <p className="font-mono font-bold text-lg text-primary-900">
            ${subscription.cost}/mo
          </p>
          <div className={`flex items-center text-sm ${getStatusColor(subscription.status)}`}>
            <StatusIcon size={14} className="mr-1" />
            <span className="capitalize">{subscription.status}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm text-primary-600 mb-1">Usage Efficiency</p>
          <p className="text-xs text-primary-500">Last used: {subscription.lastUsed}</p>
        </div>
        <ProgressRing
          progress={subscription.usageScore}
          size={60}
          strokeWidth={4}
          color={subscription.usageScore > 70 ? '#10b981' : subscription.usageScore > 40 ? '#f59e0b' : '#ef4444'}
        />
      </div>

      {subscription.recommendation && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="border-t border-gray-100 pt-4"
        >
          <div className="bg-blue-50 rounded-lg p-3 mb-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-blue-900">
                {subscription.recommendation.action}
              </span>
              <span className="text-sm font-bold text-emerald-600">
                Save ${subscription.recommendation.savings}/mo
              </span>
            </div>
            <p className="text-xs text-blue-700 mb-3">
              {subscription.recommendation.description}
            </p>
            <Button
              size="sm"
              loading={isOptimizing}
              onClick={() => onOptimize(subscription)}
              className="w-full"
            >
              {isOptimizing ? 'Optimizing...' : 'Execute Optimization'}
            </Button>
          </div>
        </motion.div>
      )}

      <div className="flex items-center justify-between text-xs text-primary-500">
        <span>Auto-detected</span>
        <ExternalLink size={12} className="opacity-50" />
      </div>
    </Card>
  );
}