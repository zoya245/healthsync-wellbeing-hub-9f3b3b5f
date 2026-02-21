import { motion } from 'framer-motion';
import { Smile } from 'lucide-react';

interface MoodTrackerProps {
  mood: string;
  onUpdate: (mood: string) => void;
}

const moods = [
  { emoji: '😄', label: 'Great' },
  { emoji: '😊', label: 'Good' },
  { emoji: '😐', label: 'Okay' },
  { emoji: '😔', label: 'Low' },
  { emoji: '😢', label: 'Bad' },
];

const MoodTracker = ({ mood, onUpdate }: MoodTrackerProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.4 }}
    className="gradient-card rounded-2xl p-6 shadow-health-md border border-border"
  >
    <div className="flex items-center gap-3 mb-4">
      <div className="p-2 rounded-xl" style={{ background: 'hsl(38 90% 92%)' }}>
        <Smile className="w-5 h-5 text-health-amber" />
      </div>
      <h3 className="font-display font-semibold text-card-foreground">Mood</h3>
    </div>
    <div className="text-5xl mb-3 text-center">{mood}</div>
    <div className="flex justify-between gap-2">
      {moods.map(m => (
        <button
          key={m.emoji}
          onClick={() => onUpdate(m.emoji)}
          className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
            mood === m.emoji ? 'bg-primary/10 scale-110 shadow-health-glow' : 'hover:bg-muted'
          }`}
        >
          <span className="text-2xl">{m.emoji}</span>
          <span className="text-[10px] text-muted-foreground">{m.label}</span>
        </button>
      ))}
    </div>
  </motion.div>
);

export default MoodTracker;
