import { motion } from 'framer-motion';
import { Moon } from 'lucide-react';
import { Slider } from '@/components/ui/slider';

interface SleepTrackerProps {
  sleep: number;
  onUpdate: (val: number) => void;
}

const SleepTracker = ({ sleep, onUpdate }: SleepTrackerProps) => {
  const quality = sleep >= 8 ? 'Excellent' : sleep >= 6 ? 'Good' : sleep >= 4 ? 'Fair' : 'Poor';
  const qualityColor = sleep >= 8 ? 'text-health-green' : sleep >= 6 ? 'text-health-blue' : sleep >= 4 ? 'text-health-amber' : 'text-destructive';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="gradient-card rounded-2xl p-6 shadow-health-md border border-border"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-xl" style={{ background: 'hsl(260 50% 92%)' }}>
          <Moon className="w-5 h-5 text-health-purple" />
        </div>
        <h3 className="font-display font-semibold text-card-foreground">Sleep</h3>
      </div>
      <div className="text-3xl font-display font-bold text-card-foreground mb-1">
        {sleep} <span className="text-base font-normal text-muted-foreground">hours</span>
      </div>
      <p className={`text-sm font-medium mb-4 ${qualityColor}`}>{quality}</p>
      <Slider
        value={[sleep]}
        onValueChange={([v]) => onUpdate(v)}
        max={12}
        min={0}
        step={0.5}
        className="w-full"
      />
    </motion.div>
  );
};

export default SleepTracker;
