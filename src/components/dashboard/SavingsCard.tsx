import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, Calendar, Target } from 'lucide-react';
import Card from '../ui/Card';
import CountUpNumber from '../ui/CountUpNumber';

interface SavingsCardProps {
  totalSaved: number;
  monthlySavings: number;
  annualProjection: number;
  optimizationsCount: number;
}

export default function SavingsCard({
  totalSaved,
  monthlySavings,
  annualProjection,
  optimizationsCount
}: SavingsCardProps) {
  return (
    <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold opacity-90">Total Savings</h3>
          <p className="text-emerald-100 text-sm">Money back in your pocket</p>
        </div>
        <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
          <DollarSign size={24} />
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <CountUpNumber
            end={totalSaved}
            prefix="$"
            className="text-3xl text-white"
            decimals={2}
          />
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ delay: 1, duration: 1 }}
            className="h-1 bg-white/30 rounded-full mt-2"
          />
        </div>

        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/20">
          <div className="text-center">
            <div className="flex items-center justify-center text-white/80 mb-1">
              <Calendar size={16} />
            </div>
            <CountUpNumber
              end={monthlySavings}
              prefix="$"
              className="text-lg text-white"
              decimals={0}
            />
            <p className="text-xs text-white/80">Monthly</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center text-white/80 mb-1">
              <TrendingUp size={16} />
            </div>
            <CountUpNumber
              end={annualProjection}
              prefix="$"
              className="text-lg text-white"
              decimals={0}
            />
            <p className="text-xs text-white/80">Annual</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center text-white/80 mb-1">
              <Target size={16} />
            </div>
            <CountUpNumber
              end={optimizationsCount}
              className="text-lg text-white"
              decimals={0}
            />
            <p className="text-xs text-white/80">Optimized</p>
          </div>
        </div>
      </div>
    </Card>
  );
}