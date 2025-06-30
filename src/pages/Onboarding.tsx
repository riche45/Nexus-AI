import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  ArrowLeft, 
  Shield, 
  Scan, 
  Brain, 
  CheckCircle,
  Loader,
  CreditCard,
  Search,
  Zap
} from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { useUser } from '../contexts/UserContext';
import { aiEngine } from '../lib/aiEngine';

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  component: React.ComponentType<{ onNext: () => void; onBack: () => void }>;
}

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const { setUser } = useUser();
  const navigate = useNavigate();

  const steps: OnboardingStep[] = [
    {
      id: 'connect',
      title: 'Connect Your Bank',
      description: 'Securely connect your bank account to detect subscriptions',
      component: ConnectBankStep
    },
    {
      id: 'scan',
      title: 'Scanning Subscriptions',
      description: 'AI is analyzing your transaction history',
      component: ScanningStep
    },
    {
      id: 'analyze',
      title: 'Usage Analysis',
      description: 'Understanding your subscription usage patterns',
      component: AnalysisStep
    },
    {
      id: 'results',
      title: 'Optimization Results',
      description: 'Here are your personalized recommendations',
      component: ResultsStep
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const StepComponent = steps[currentStep].component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-emerald-50/30 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`flex items-center ${index < steps.length - 1 ? 'flex-1' : ''}`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    index <= currentStep
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {index < currentStep ? (
                    <CheckCircle size={20} />
                  ) : (
                    index + 1
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-4 rounded ${
                      index < currentStep ? 'bg-blue-500' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-primary-900 mb-2">
              {steps[currentStep].title}
            </h2>
            <p className="text-primary-600">{steps[currentStep].description}</p>
          </div>
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <StepComponent onNext={handleNext} onBack={handleBack} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// Step Components
function ConnectBankStep({ onNext }: { onNext: () => void; onBack: () => void }) {
  const [selectedBank, setSelectedBank] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const isMountedRef = useRef(true);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const banks = [
    { id: 'chase', name: 'Chase Bank', logo: '🏦' },
    { id: 'bofa', name: 'Bank of America', logo: '🏛️' },
    { id: 'wells', name: 'Wells Fargo', logo: '🏪' },
    { id: 'citi', name: 'Citibank', logo: '🏢' },
    { id: 'other', name: 'Other Bank', logo: '💳' }
  ];

  const handleConnect = async () => {
    if (!selectedBank) return;
    
    setIsConnecting(true);
    // Simulate connection process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Only update state if component is still mounted
    if (isMountedRef.current) {
      setIsConnecting(false);
      // Small delay to allow framer-motion to complete its state updates
      setTimeout(() => {
        if (isMountedRef.current) {
          onNext();
        }
      }, 100);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Shield size={32} className="text-white" />
        </div>
        <h3 className="text-xl font-semibold text-primary-900 mb-2">
          Secure Bank Connection
        </h3>
        <p className="text-primary-600">
          We use bank-level encryption to safely analyze your subscriptions. 
          We never store your banking credentials.
        </p>
      </div>

      <div className="space-y-3 mb-8">
        {banks.map((bank) => (
          <button
            key={bank.id}
            onClick={() => setSelectedBank(bank.id)}
            className={`w-full p-4 rounded-lg border-2 transition-all ${
              selectedBank === bank.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center">
              <span className="text-2xl mr-3">{bank.logo}</span>
              <span className="font-medium text-primary-900">{bank.name}</span>
            </div>
          </button>
        ))}
      </div>

      <div className="flex items-center justify-center space-x-2 text-sm text-primary-600 mb-6">
        <Shield size={16} />
        <span>256-bit SSL encryption • SOC 2 compliant • Never stored</span>
      </div>

      <Button
        className="w-full"
        size="lg"
        onClick={handleConnect}
        disabled={!selectedBank}
        loading={isConnecting}
        icon={isConnecting ? undefined : CreditCard}
      >
        {isConnecting ? 'Connecting Securely...' : 'Connect Bank Account'}
      </Button>
    </Card>
  );
}

function ScanningStep({ onNext }: { onNext: () => void; onBack: () => void }) {
  const [progress, setProgress] = useState(0);
  const [currentAction, setCurrentAction] = useState('Connecting to your bank...');

  const actions = [
    'Connecting to your bank...',
    'Downloading transaction history...',
    'Identifying subscription patterns...',
    'Detecting recurring payments...',
    'Analyzing payment frequencies...',
    'Categorizing subscriptions...',
    'Almost done...'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + (Math.random() * 15) + 5;
        const actionIndex = Math.floor((newProgress / 100) * actions.length);
        setCurrentAction(actions[Math.min(actionIndex, actions.length - 1)]);
        
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(onNext, 1000);
          return 100;
        }
        return newProgress;
      });
    }, 800);

    return () => clearInterval(interval);
  }, [onNext]);

  return (
    <Card className="max-w-2xl mx-auto text-center">
      <div className="mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Scan size={32} className="text-white animate-pulse" />
        </div>
        <h3 className="text-xl font-semibold text-primary-900 mb-2">
          AI Scanning in Progress
        </h3>
        <p className="text-primary-600">
          Our advanced AI is analyzing your transaction history to identify all subscriptions
        </p>
      </div>

      <div className="mb-8">
        <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
          <motion.div
            className="bg-gradient-to-r from-blue-500 to-emerald-500 h-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <div className="flex justify-between text-sm text-primary-600 mb-4">
          <span>{Math.round(progress)}% Complete</span>
          <span>Est. 2-3 minutes</span>
        </div>
        <p className="text-primary-700 font-medium">{currentAction}</p>
      </div>

      <div className="bg-blue-50 rounded-lg p-4">
        <div className="flex items-center justify-center space-x-2 text-blue-800">
          <Loader size={16} className="animate-spin" />
          <span className="text-sm">Processing {Math.floor(Math.random() * 1000) + 500} transactions...</span>
        </div>
      </div>
    </Card>
  );
}

function AnalysisStep({ onNext }: { onNext: () => void; onBack: () => void }) {
  const [analysisComplete, setAnalysisComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnalysisComplete(true);
      setTimeout(onNext, 2000);
    }, 3000);

    return () => clearTimeout(timer);
  }, [onNext]);

  return (
    <Card className="max-w-2xl mx-auto text-center">
      <div className="mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Brain size={32} className="text-white" />
        </div>
        <h3 className="text-xl font-semibold text-primary-900 mb-2">
          Advanced Usage Analysis
        </h3>
        <p className="text-primary-600">
          Analyzing your usage patterns to identify optimization opportunities
        </p>
      </div>

      <div className="space-y-4 mb-8">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <span className="text-primary-700">Subscription detection</span>
          <CheckCircle size={20} className="text-emerald-500" />
        </div>
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <span className="text-primary-700">Usage pattern analysis</span>
          {analysisComplete ? (
            <CheckCircle size={20} className="text-emerald-500" />
          ) : (
            <Loader size={20} className="text-blue-500 animate-spin" />
          )}
        </div>
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <span className="text-primary-700">Optimization recommendations</span>
          {analysisComplete ? (
            <CheckCircle size={20} className="text-emerald-500" />
          ) : (
            <Loader size={20} className="text-gray-400 animate-spin" />
          )}
        </div>
      </div>

      {analysisComplete && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-emerald-50 rounded-lg p-4"
        >
          <div className="flex items-center justify-center space-x-2 text-emerald-800">
            <CheckCircle size={20} />
            <span className="font-semibold">Analysis Complete!</span>
          </div>
          <p className="text-sm text-emerald-700 mt-1">
            Found significant optimization opportunities
          </p>
        </motion.div>
      )}
    </Card>
  );
}

function ResultsStep({ onNext }: { onNext: () => void; onBack: () => void }) {
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleGetStarted = () => {
    // Create demo user
    setUser({
      id: 'demo-user',
      name: 'Demo User',
      email: 'demo@nexusai.com',
      plan: 'free',
      totalSaved: 0,
      subscriptions: [],
      onboardingComplete: true
    });
    
    navigate('/dashboard');
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Zap size={32} className="text-white" />
        </div>
        <h3 className="text-xl font-semibold text-primary-900 mb-2">
          Optimization Complete!
        </h3>
        <p className="text-primary-600">
          AIDE has analyzed your subscriptions and found significant savings opportunities
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="text-center p-4 bg-emerald-50 rounded-lg">
          <div className="text-2xl font-bold text-emerald-600">12</div>
          <div className="text-sm text-emerald-700">Subscriptions Found</div>
        </div>
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">$87</div>
          <div className="text-sm text-blue-700">Monthly Savings</div>
        </div>
        <div className="text-center p-4 bg-orange-50 rounded-lg">
          <div className="text-2xl font-bold text-orange-600">5</div>
          <div className="text-sm text-orange-700">Optimizations</div>
        </div>
      </div>

      <div className="space-y-3 mb-8">
        <div className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center">
            <span className="mr-3">🎬</span>
            <div>
              <div className="font-medium text-primary-900">Netflix Premium</div>
              <div className="text-sm text-primary-600">Unused for 45 days</div>
            </div>
          </div>
          <div className="text-red-600 font-semibold">-$18/mo</div>
        </div>
        
        <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center">
            <span className="mr-3">🎨</span>
            <div>
              <div className="font-medium text-primary-900">Adobe Creative</div>
              <div className="text-sm text-primary-600">Switch to Photography plan</div>
            </div>
          </div>
          <div className="text-blue-600 font-semibold">-$35/mo</div>
        </div>
        
        <div className="flex items-center justify-between p-3 bg-orange-50 border border-orange-200 rounded-lg">
          <div className="flex items-center">
            <span className="mr-3">💪</span>
            <div>
              <div className="font-medium text-primary-900">Gym Membership</div>
              <div className="text-sm text-primary-600">Downgrade to Basic</div>
            </div>
          </div>
          <div className="text-orange-600 font-semibold">-$40/mo</div>
        </div>
      </div>

      <Button
        className="w-full"
        size="lg"
        onClick={handleGetStarted}
        icon={ArrowRight}
      >
        View Full Dashboard
      </Button>
    </Card>
  );
}