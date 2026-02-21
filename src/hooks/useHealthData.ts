import { useState, useEffect, useCallback } from 'react';

export interface DailyRecord {
  id: string;
  date: string;
  water: number;
  steps: number;
  sleep: number;
  mood: string;
  weight: number;
  height: number;
}

export interface FitnessGoal {
  id: string;
  title: string;
  target: number;
  current: number;
  unit: string;
  category: 'water' | 'steps' | 'sleep' | 'weight';
}

const defaultRecord = (): DailyRecord => ({
  id: crypto.randomUUID(),
  date: new Date().toISOString().split('T')[0],
  water: 0,
  steps: 0,
  sleep: 0,
  mood: '😊',
  weight: 70,
  height: 170,
});

const defaultGoals: FitnessGoal[] = [
  { id: '1', title: 'Daily Water', target: 8, current: 0, unit: 'glasses', category: 'water' },
  { id: '2', title: 'Daily Steps', target: 10000, current: 0, unit: 'steps', category: 'steps' },
  { id: '3', title: 'Sleep Hours', target: 8, current: 0, unit: 'hours', category: 'sleep' },
  { id: '4', title: 'Target Weight', target: 65, current: 70, unit: 'kg', category: 'weight' },
];

export function useHealthData() {
  const [records, setRecords] = useState<DailyRecord[]>(() => {
    const saved = localStorage.getItem('healthsync-records');
    return saved ? JSON.parse(saved) : [defaultRecord()];
  });

  const [goals, setGoals] = useState<FitnessGoal[]>(() => {
    const saved = localStorage.getItem('healthsync-goals');
    return saved ? JSON.parse(saved) : defaultGoals;
  });

  const today = new Date().toISOString().split('T')[0];
  const todayRecord = records.find(r => r.date === today) || defaultRecord();

  useEffect(() => {
    localStorage.setItem('healthsync-records', JSON.stringify(records));
  }, [records]);

  useEffect(() => {
    localStorage.setItem('healthsync-goals', JSON.stringify(goals));
  }, [goals]);

  const updateToday = useCallback((updates: Partial<DailyRecord>) => {
    setRecords(prev => {
      const exists = prev.find(r => r.date === today);
      if (exists) {
        return prev.map(r => r.date === today ? { ...r, ...updates } : r);
      }
      return [...prev, { ...defaultRecord(), ...updates }];
    });
  }, [today]);

  const deleteRecord = useCallback((id: string) => {
    setRecords(prev => prev.filter(r => r.id !== id));
  }, []);

  const updateGoal = useCallback((id: string, updates: Partial<FitnessGoal>) => {
    setGoals(prev => prev.map(g => g.id === id ? { ...g, ...updates } : g));
  }, []);

  const addGoal = useCallback((goal: Omit<FitnessGoal, 'id'>) => {
    setGoals(prev => [...prev, { ...goal, id: crypto.randomUUID() }]);
  }, []);

  const deleteGoal = useCallback((id: string) => {
    setGoals(prev => prev.filter(g => g.id !== id));
  }, []);

  const weeklyData = records
    .filter(r => {
      const d = new Date(r.date);
      const now = new Date();
      const diff = (now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24);
      return diff <= 7;
    })
    .sort((a, b) => a.date.localeCompare(b.date));

  const bmi = todayRecord.height > 0
    ? (todayRecord.weight / ((todayRecord.height / 100) ** 2)).toFixed(1)
    : '0';

  return {
    records,
    todayRecord,
    weeklyData,
    goals,
    bmi: parseFloat(bmi),
    updateToday,
    deleteRecord,
    updateGoal,
    addGoal,
    deleteGoal,
  };
}
