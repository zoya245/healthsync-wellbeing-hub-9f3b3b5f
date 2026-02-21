import { motion } from 'framer-motion';
import { Lightbulb } from 'lucide-react';

interface HealthSuggestionsProps {
  water: number;
  steps: number;
  sleep: number;
  bmi: number;
}

const HealthSuggestions = ({ water, steps, sleep, bmi }: HealthSuggestionsProps) => {
  const tips: string[] = [];

  if (water < 6) tips.push('💧 Try to drink at least 8 glasses of water daily for optimal hydration.');
  if (steps < 5000) tips.push('🚶 Aim for at least 10,000 steps daily. Try a short walk after meals!');
  if (sleep < 7) tips.push('😴 You need more sleep! Aim for 7-9 hours for better recovery.');
  if (bmi > 25) tips.push('⚖️ Consider a balanced diet and regular exercise to maintain a healthy BMI.');
  if (bmi < 18.5) tips.push('🍎 Your BMI is low. Ensure you\'re eating enough nutritious meals.');
  if (tips.length === 0) tips.push('🌟 Great job! You\'re on track with your health goals today!');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="gradient-card rounded-2xl p-6 shadow-health-md border border-border"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-xl" style={{ background: 'hsl(38 90% 92%)' }}>
          <Lightbulb className="w-5 h-5 text-health-amber" />
        </div>
        <h3 className="font-display font-semibold text-card-foreground">Health Tips</h3>
      </div>
      <ul className="space-y-3">
        {tips.map((tip, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 + i * 0.1 }}
            className="text-sm text-card-foreground leading-relaxed bg-muted/50 rounded-xl p-3"
          >
            {tip}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

export default HealthSuggestions;
