import { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, Plus, Trash2, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { FitnessGoal } from '@/hooks/useHealthData';

interface FitnessGoalsProps {
  goals: FitnessGoal[];
  onUpdate: (id: string, updates: Partial<FitnessGoal>) => void;
  onAdd: (goal: Omit<FitnessGoal, 'id'>) => void;
  onDelete: (id: string) => void;
}

const FitnessGoals = ({ goals, onUpdate, onAdd, onDelete }: FitnessGoalsProps) => {
  const [adding, setAdding] = useState(false);
  const [newGoal, setNewGoal] = useState({ title: '', target: 0, unit: '', category: 'steps' as FitnessGoal['category'] });

  const handleAdd = () => {
    if (newGoal.title && newGoal.target > 0) {
      onAdd({ ...newGoal, current: 0 });
      setNewGoal({ title: '', target: 0, unit: '', category: 'steps' });
      setAdding(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="gradient-card rounded-2xl p-6 shadow-health-md border border-border"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl" style={{ background: 'hsl(12 80% 92%)' }}>
            <Target className="w-5 h-5 text-health-coral" />
          </div>
          <h3 className="font-display font-semibold text-card-foreground">Fitness Goals</h3>
        </div>
        <Button size="sm" variant="outline" onClick={() => setAdding(!adding)}>
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      {adding && (
        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="mb-4 p-3 bg-muted/50 rounded-xl space-y-2">
          <Input placeholder="Goal title" value={newGoal.title} onChange={e => setNewGoal(p => ({ ...p, title: e.target.value }))} />
          <div className="flex gap-2">
            <Input type="number" placeholder="Target" value={newGoal.target || ''} onChange={e => setNewGoal(p => ({ ...p, target: parseFloat(e.target.value) || 0 }))} />
            <Input placeholder="Unit" value={newGoal.unit} onChange={e => setNewGoal(p => ({ ...p, unit: e.target.value }))} />
          </div>
          <Select value={newGoal.category} onValueChange={(v: FitnessGoal['category']) => setNewGoal(p => ({ ...p, category: v }))}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="water">Water</SelectItem>
              <SelectItem value="steps">Steps</SelectItem>
              <SelectItem value="sleep">Sleep</SelectItem>
              <SelectItem value="weight">Weight</SelectItem>
            </SelectContent>
          </Select>
          <Button size="sm" className="gradient-primary text-primary-foreground w-full" onClick={handleAdd}>Add Goal</Button>
        </motion.div>
      )}

      <div className="space-y-3">
        {goals.map(goal => {
          const pct = Math.min((goal.current / goal.target) * 100, 100);
          const done = pct >= 100;
          return (
            <div key={goal.id} className="bg-muted/30 rounded-xl p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {done && <Check className="w-4 h-4 text-health-green" />}
                  <span className="text-sm font-medium text-card-foreground">{goal.title}</span>
                </div>
                <button onClick={() => onDelete(goal.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs text-muted-foreground">{goal.current} / {goal.target} {goal.unit}</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className={`h-full rounded-full ${done ? 'bg-health-green' : 'bg-health-coral'}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                />
              </div>
              <div className="flex gap-1 mt-2">
                <Input
                  type="number"
                  className="h-7 text-xs"
                  placeholder="Update progress"
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      const val = parseFloat((e.target as HTMLInputElement).value);
                      if (!isNaN(val)) {
                        onUpdate(goal.id, { current: val });
                        (e.target as HTMLInputElement).value = '';
                      }
                    }
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default FitnessGoals;
