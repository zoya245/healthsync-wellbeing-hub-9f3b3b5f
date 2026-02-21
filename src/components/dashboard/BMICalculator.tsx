import { motion } from 'framer-motion';
import { Calculator } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface BMICalculatorProps {
  weight: number;
  height: number;
  bmi: number;
  onUpdate: (field: 'weight' | 'height', val: number) => void;
}

const BMICalculator = ({ weight, height, bmi, onUpdate }: BMICalculatorProps) => {
  const category = bmi < 18.5 ? 'Underweight' : bmi < 25 ? 'Normal' : bmi < 30 ? 'Overweight' : 'Obese';
  const catColor = bmi < 18.5 ? 'text-health-blue' : bmi < 25 ? 'text-health-green' : bmi < 30 ? 'text-health-amber' : 'text-destructive';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="gradient-card rounded-2xl p-6 shadow-health-md border border-border"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-xl bg-health-mint">
          <Calculator className="w-5 h-5 text-health-teal" />
        </div>
        <h3 className="font-display font-semibold text-card-foreground">BMI Calculator</h3>
      </div>
      <div className="text-4xl font-display font-bold text-card-foreground mb-1">{bmi}</div>
      <p className={`text-sm font-semibold mb-4 ${catColor}`}>{category}</p>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label className="text-xs text-muted-foreground">Weight (kg)</Label>
          <Input
            type="number"
            value={weight}
            onChange={e => onUpdate('weight', parseFloat(e.target.value) || 0)}
            className="mt-1"
          />
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">Height (cm)</Label>
          <Input
            type="number"
            value={height}
            onChange={e => onUpdate('height', parseFloat(e.target.value) || 0)}
            className="mt-1"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default BMICalculator;
