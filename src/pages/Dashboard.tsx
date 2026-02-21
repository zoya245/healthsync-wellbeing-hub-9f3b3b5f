import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Activity, LogOut, Sun, Moon as MoonIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useHealthData } from '@/hooks/useHealthData';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/hooks/useTheme';
import WaterTracker from '@/components/dashboard/WaterTracker';
import StepsTracker from '@/components/dashboard/StepsTracker';
import SleepTracker from '@/components/dashboard/SleepTracker';
import BMICalculator from '@/components/dashboard/BMICalculator';
import MoodTracker from '@/components/dashboard/MoodTracker';
import WeeklyChart from '@/components/dashboard/WeeklyChart';
import HealthSuggestions from '@/components/dashboard/HealthSuggestions';
import FitnessGoals from '@/components/dashboard/FitnessGoals';
import Footer from '@/components/Footer';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { dark, toggle } = useTheme();
  const { todayRecord, weeklyData, goals, bmi, updateToday, updateGoal, addGoal, deleteGoal } = useHealthData();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-6 h-6 text-primary" />
            <span className="font-display font-bold text-xl text-foreground">HealthSync</span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={toggle} className="rounded-xl">
              {dark ? <Sun className="w-4 h-4" /> : <MoonIcon className="w-4 h-4" />}
            </Button>
            <span className="text-sm text-muted-foreground hidden sm:inline">Hi, {user?.name || 'User'}</span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-1" /> Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Dashboard content */}
      <main className="container mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-display text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Track your daily health metrics</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <WaterTracker
            water={todayRecord.water}
            goal={goals.find(g => g.category === 'water')?.target || 8}
            onUpdate={v => updateToday({ water: v })}
          />
          <StepsTracker
            steps={todayRecord.steps}
            goal={goals.find(g => g.category === 'steps')?.target || 10000}
            onUpdate={v => updateToday({ steps: v })}
          />
          <SleepTracker
            sleep={todayRecord.sleep}
            onUpdate={v => updateToday({ sleep: v })}
          />
          <BMICalculator
            weight={todayRecord.weight}
            height={todayRecord.height}
            bmi={bmi}
            onUpdate={(field, val) => updateToday({ [field]: val })}
          />
          <MoodTracker
            mood={todayRecord.mood}
            onUpdate={v => updateToday({ mood: v })}
          />
          <FitnessGoals
            goals={goals}
            onUpdate={updateGoal}
            onAdd={addGoal}
            onDelete={deleteGoal}
          />
          <WeeklyChart data={weeklyData} />
          <HealthSuggestions
            water={todayRecord.water}
            steps={todayRecord.steps}
            sleep={todayRecord.sleep}
            bmi={bmi}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
