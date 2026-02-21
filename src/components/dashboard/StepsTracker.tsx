import { motion } from 'framer-motion';
import { Footprints, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface StepsTrackerProps {
  steps: number;
  goal: number;
  onUpdate: (val: number) => void;
}

const StepsTracker = ({ steps, goal, onUpdate }: StepsTrackerProps) => {
  const pct = Math.min((steps / goal) * 100, 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="gradient-card rounded-2xl p-6 shadow-health-md border border-border"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-xl bg-health-mint">
          <Footprints className="w-5 h-5 text-health-green" />
        </div>
        <h3 className="font-display font-semibold text-card-foreground">Steps</h3>
      </div>
      <div className="text-3xl font-display font-bold text-card-foreground mb-1">
        {steps.toLocaleString()} <span className="text-base font-normal text-muted-foreground">/ {goal.toLocaleString()}</span>
      </div>
      <div className="w-full h-3 bg-muted rounded-full mt-3 mb-4 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-health-green"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
      <div className="flex gap-2">
        <Button size="sm" variant="outline" onClick={() => onUpdate(Math.max(0, steps - 500))}>
          <Minus className="w-4 h-4" />
        </Button>
        <Button size="sm" className="gradient-primary text-primary-foreground" onClick={() => onUpdate(steps + 500)}>
          <Plus className="w-4 h-4" />
        </Button>
      </div>
    </motion.div>
  );
};

export default StepsTracker;
