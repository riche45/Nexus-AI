import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  CheckCircle, 
  DollarSign, 
  Zap, 
  Shield, 
  TrendingUp,
  Star,
  Users,
  Brain,
  Target,
  Crown,
  Sparkles
} from 'lucide-react';
import Header from '../components/layout/Header';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import CountUpNumber from '../components/ui/CountUpNumber';

export default function Landing() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Brain,
      title: 'AIDE - Executive Agent',
      description: 'AI that executes tasks, not just provides information'
    },
    {
      icon: DollarSign,
      title: 'Automatic Optimization',
      description: 'Save money without lifting a finger'
    },
    {
      icon: Shield,
      title: 'Bank-Level Security',
      description: 'Your data is encrypted and protected'
    },
    {
      icon: Zap,
      title: 'Real-Time Execution',
      description: 'Changes happen automatically in real-time'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Product Manager',
      content: 'Saved $347 in my first month. The AI actually cancelled services I forgot about!',
      avatar: '👩‍💼'
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Entrepreneur',
      content: 'Finally, an AI that does more than chat. It actually gets things done.',
      avatar: '👨‍💻'
    },
    {
      name: 'Elena Popov',
      role: 'Designer',
      content: 'The execution economy is here. This is the future of AI assistance.',
      avatar: '👩‍🎨'
    }
  ];

  const upcomingAgents = [
    {
      name: 'StartGP',
      description: 'Personal Management Agent',
      features: ['Calendar optimization', 'Email management', 'Task automation'],
      icon: '📅',
      status: 'Coming Q2 2024'
    },
    {
      name: 'FINDAX',
      description: 'Financial Decision Agent',
      features: ['Investment optimization', 'Insurance comparison', 'Tax planning'],
      icon: '💰',
      status: 'Coming Q3 2024'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-emerald-50/30">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Sparkles size={16} className="mr-2" />
              Revolutionary AI Execution Platform
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-primary-900 mb-6 leading-tight">
              From <span className="gradient-text">Information</span>
              <br />
              to <span className="gradient-text">Execution</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-primary-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              While others give you information, we execute results. Meet AIDE - the first AI agent 
              that doesn't just analyze your subscriptions, it optimizes them automatically.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button
                size="lg"
                icon={ArrowRight}
                onClick={() => navigate('/onboarding')}
                className="min-w-[200px]"
              >
                Optimize Free Now
              </Button>
              <Button
                variant="secondary"
                size="lg"
                className="min-w-[200px]"
              >
                Watch Demo
              </Button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center justify-center space-x-8 text-primary-600">
              <div className="text-center">
                <CountUpNumber
                  end={2847}
                  className="text-2xl font-bold text-primary-900"
                />
                <p className="text-sm">Active Users</p>
              </div>
              <div className="text-center">
                <CountUpNumber
                  end={127890}
                  prefix="$"
                  className="text-2xl font-bold text-emerald-600"
                />
                <p className="text-sm">Total Saved</p>
              </div>
              <div className="text-center">
                <CountUpNumber
                  end={98}
                  suffix="%"
                  className="text-2xl font-bold text-blue-600"
                />
                <p className="text-sm">Success Rate</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-primary-900 mb-4">
              The Execution Economy is Here
            </h2>
            <p className="text-xl text-primary-600 max-w-3xl mx-auto">
              Stop managing subscriptions manually. Let AIDE handle the optimization 
              while you focus on what matters.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card hover className="text-center h-full">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <feature.icon size={24} className="text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-primary-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-primary-600">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-primary-900">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              A Subscription That Actually Saves Money
            </h2>
            <p className="text-xl text-blue-100">
              Unlike other subscriptions, ours pays for itself by optimizing your others.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Free Plan */}
            <Card className="relative">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-primary-900 mb-2">Free</h3>
                <div className="text-4xl font-bold text-primary-900 mb-4">$0/month</div>
                <p className="text-primary-600">Perfect for getting started</p>
              </div>

              <ul className="space-y-3 mb-8">
                {[
                  'Basic subscription analysis',
                  'Manual optimization suggestions',
                  'Up to 5 subscriptions',
                  'Monthly reports'
                ].map((feature) => (
                  <li key={feature} className="flex items-center">
                    <CheckCircle size={16} className="text-emerald-500 mr-3" />
                    <span className="text-primary-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button variant="secondary" className="w-full" size="lg">
                Start Free
              </Button>
            </Card>

            {/* Pro Plan */}
            <Card className="relative border-2 border-blue-500">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-r from-blue-500 to-emerald-500 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center">
                  <Crown size={14} className="mr-1" />
                  Most Popular
                </div>
              </div>

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-primary-900 mb-2">Nexus Pro</h3>
                <div className="text-4xl font-bold text-primary-900 mb-1">
                  $9.99<span className="text-lg text-primary-600">/month</span>
                </div>
                <p className="text-emerald-600 font-semibold">Typically saves $50+ monthly</p>
              </div>

              <ul className="space-y-3 mb-8">
                {[
                  'Unlimited subscriptions',
                  'Automatic execution of optimizations',
                  'Real-time monitoring & alerts',
                  'Advanced usage analytics',
                  'Priority customer support',
                  'Early access to new agents'
                ].map((feature) => (
                  <li key={feature} className="flex items-center">
                    <CheckCircle size={16} className="text-emerald-500 mr-3" />
                    <span className="text-primary-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button className="w-full" size="lg">
                Upgrade to Pro
              </Button>

              <div className="text-center mt-4">
                <p className="text-sm text-primary-600">
                  30-day money-back guarantee
                </p>
              </div>
            </Card>
          </div>

          <div className="text-center mt-12">
            <div className="inline-flex items-center bg-emerald-100 text-emerald-800 px-6 py-3 rounded-full">
              <TrendingUp size={20} className="mr-2" />
              <span className="font-semibold">
                Average user saves $67/month - Pro pays for itself 6x over
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-primary-900 mb-4">
              Users Love Real Results
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className="text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-primary-700 mb-4 italic">"{testimonial.content}"</p>
                  <div className="flex items-center">
                    <div className="text-2xl mr-3">{testimonial.avatar}</div>
                    <div>
                      <p className="font-semibold text-primary-900">{testimonial.name}</p>
                      <p className="text-sm text-primary-600">{testimonial.role}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Future Agents */}
      <section id="agents" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-emerald-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-primary-900 mb-4">
              The Future of AI Agents
            </h2>
            <p className="text-xl text-primary-600 max-w-3xl mx-auto">
              AIDE is just the beginning. We're building a complete ecosystem of AI agents 
              that execute real tasks across every aspect of your life.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {upcomingAgents.map((agent, index) => (
              <motion.div
                key={agent.name}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Card className="h-full">
                  <div className="flex items-center mb-4">
                    <div className="text-3xl mr-4">{agent.icon}</div>
                    <div>
                      <h3 className="text-xl font-bold text-primary-900">{agent.name}</h3>
                      <p className="text-primary-600">{agent.description}</p>
                    </div>
                  </div>
                  
                  <ul className="space-y-2 mb-6">
                    {agent.features.map((feature) => (
                      <li key={feature} className="flex items-center text-primary-700">
                        <CheckCircle size={14} className="text-emerald-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <div className="bg-gradient-to-r from-blue-100 to-emerald-100 rounded-lg p-3">
                    <p className="text-sm font-semibold text-primary-900">{agent.status}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Card className="inline-block">
              <div className="flex items-center space-x-4">
                <Users size={24} className="text-blue-500" />
                <div>
                  <p className="font-semibold text-primary-900 mb-1">Join the Beta Waitlist</p>
                  <p className="text-sm text-primary-600">Be first to try new agents</p>
                </div>
                <Button size="sm">
                  Join Waitlist
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary-900">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Enter the Execution Economy?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Stop managing subscriptions. Start saving money automatically.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                icon={ArrowRight}
                onClick={() => navigate('/onboarding')}
                className="bg-white text-primary-900 hover:bg-gray-100"
              >
                Start Optimizing Free
              </Button>
              <Button
                variant="ghost"
                size="lg"
                className="text-white border-white hover:bg-white/10"
              >
                Schedule Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}