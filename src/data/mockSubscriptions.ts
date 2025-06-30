export interface Subscription {
  id: string;
  name: string;
  cost: number;
  icon: string;
  usageScore: number;
  lastUsed: string;
  plan: string;
  status: 'active' | 'unused' | 'duplicate' | 'optimizable';
  category: string;
  recommendation?: {
    action: string;
    savings: number;
    description: string;
  };
}

export const mockSubscriptions: Subscription[] = [
  {
    id: '1',
    name: 'Netflix',
    cost: 17.99,
    icon: '🎬',
    usageScore: 25,
    lastUsed: '45 days ago',
    plan: 'Premium',
    status: 'unused',
    category: 'Entertainment',
    recommendation: {
      action: 'Cancel subscription',
      savings: 17.99,
      description: 'No usage detected in the last 60 days. Consider canceling.'
    }
  },
  {
    id: '2',
    name: 'Spotify',
    cost: 10.99,
    icon: '🎵',
    usageScore: 95,
    lastUsed: 'Today',
    plan: 'Premium',
    status: 'active',
    category: 'Music'
  },
  {
    id: '3',
    name: 'Adobe Creative Cloud',
    cost: 54.99,
    icon: '🎨',
    usageScore: 78,
    lastUsed: '2 days ago',
    plan: 'All Apps',
    status: 'optimizable',
    category: 'Productivity',
    recommendation: {
      action: 'Switch to Photography plan',
      savings: 34.99,
      description: 'You primarily use Photoshop and Lightroom. Photography plan covers your needs.'
    }
  },
  {
    id: '4',
    name: 'Gym Membership',
    cost: 89.99,
    icon: '💪',
    usageScore: 35,
    lastUsed: '12 days ago',
    plan: 'Premium',
    status: 'optimizable',
    category: 'Health',
    recommendation: {
      action: 'Downgrade to Basic',
      savings: 40.00,
      description: 'Low usage of premium facilities. Basic plan covers your workout pattern.'
    }
  },
  {
    id: '5',
    name: 'Hulu',
    cost: 12.99,
    icon: '📺',
    usageScore: 15,
    lastUsed: '30 days ago',
    plan: 'No Ads',
    status: 'duplicate',
    category: 'Entertainment',
    recommendation: {
      action: 'Cancel duplicate service',
      savings: 12.99,
      description: 'You have Netflix and Disney+ covering similar content.'
    }
  },
  {
    id: '6',
    name: 'Microsoft 365',
    cost: 6.99,
    icon: '💼',
    usageScore: 88,
    lastUsed: 'Today',
    plan: 'Personal',
    status: 'active',
    category: 'Productivity'
  },
  {
    id: '7',
    name: 'Dropbox',
    cost: 11.99,
    icon: '☁️',
    usageScore: 45,
    lastUsed: '5 days ago',
    plan: 'Plus 2TB',
    status: 'optimizable',
    category: 'Storage',
    recommendation: {
      action: 'Switch to Google Drive',
      savings: 6.00,
      description: 'Google Drive offers similar features at lower cost with your usage pattern.'
    }
  },
  {
    id: '8',
    name: 'Disney+',
    cost: 7.99,
    icon: '🏰',
    usageScore: 65,
    lastUsed: '1 week ago',
    plan: 'Standard',
    status: 'active',
    category: 'Entertainment'
  },
  {
    id: '9',
    name: 'Notion',
    cost: 8.00,
    icon: '📝',
    usageScore: 92,
    lastUsed: 'Today',
    plan: 'Personal Pro',
    status: 'active',
    category: 'Productivity'
  },
  {
    id: '10',
    name: 'Amazon Prime',
    cost: 14.98,
    icon: '📦',
    usageScore: 70,
    lastUsed: '3 days ago',
    plan: 'Monthly',
    status: 'optimizable',
    category: 'Shopping',
    recommendation: {
      action: 'Switch to Annual',
      savings: 40.76,
      description: 'Annual plan saves $40+ per year with your usage pattern.'
    }
  }
];

export const calculateTotalSavings = (subscriptions: Subscription[]) => {
  return subscriptions.reduce((total, sub) => {
    return total + (sub.recommendation?.savings || 0);
  }, 0);
};

export const calculateMonthlyCost = (subscriptions: Subscription[]) => {
  return subscriptions.reduce((total, sub) => total + sub.cost, 0);
};

export const getSubscriptionsByStatus = (subscriptions: Subscription[], status: string) => {
  return subscriptions.filter(sub => sub.status === status);
};