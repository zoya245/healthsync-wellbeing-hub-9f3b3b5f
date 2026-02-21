import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { TrendingUp } from 'lucide-react';
import type { DailyRecord } from '@/hooks/useHealthData';

interface WeeklyChartProps {
  data: DailyRecord[];
}

const WeeklyChart = ({ data }: WeeklyChartProps) => {
  const chartData = data.map(d => ({
    date: new Date(d.date).toLocaleDateString('en', { weekday: 'short' }),
    water: d.water,
    steps: d.steps / 1000,
    sleep: d.sleep,
  }));

  // Pad to 7 days if needed
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const padded = days.map(day => {
    const existing = chartData.find(d => d.date === day);
    return existing || { date: day, water: 0, steps: 0, sleep: 0 };
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="gradient-card rounded-2xl p-6 shadow-health-md border border-border col-span-full lg:col-span-2"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-health-mint">
          <TrendingUp className="w-5 h-5 text-health-green" />
        </div>
        <h3 className="font-display font-semibold text-card-foreground">Weekly Analytics</h3>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <p className="text-xs text-muted-foreground mb-2 font-medium">Steps (thousands) & Water</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={padded}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(160 15% 90%)" />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: 'hsl(200 15% 50%)' }} />
              <YAxis tick={{ fontSize: 11, fill: 'hsl(200 15% 50%)' }} />
              <Tooltip />
              <Bar dataKey="steps" fill="hsl(160 55% 45%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="water" fill="hsl(200 65% 50%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-2 font-medium">Sleep Hours</p>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={padded}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(160 15% 90%)" />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: 'hsl(200 15% 50%)' }} />
              <YAxis tick={{ fontSize: 11, fill: 'hsl(200 15% 50%)' }} />
              <Tooltip />
              <Line type="monotone" dataKey="sleep" stroke="hsl(260 50% 58%)" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
};

export default WeeklyChart;
