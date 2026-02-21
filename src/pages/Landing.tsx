import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Activity, Droplets, Footprints, Moon, Target, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Footer from '@/components/Footer';
import heroImage from '@/assets/hero-health.jpg';

const features = [
  { icon: Droplets, title: 'Water Tracking', desc: 'Monitor your daily water intake with smart reminders', color: 'text-health-blue', bg: 'bg-health-sky' },
  { icon: Footprints, title: 'Step Counter', desc: 'Track your daily steps and stay active', color: 'text-health-green', bg: 'bg-health-mint' },
  { icon: Moon, title: 'Sleep Analysis', desc: 'Log sleep hours and improve your rest quality', color: 'text-health-purple', bg: '' },
  { icon: Target, title: 'Fitness Goals', desc: 'Set and achieve your personal fitness milestones', color: 'text-health-coral', bg: '' },
];

const Landing = () => (
  <div className="min-h-screen bg-background">
    {/* Nav */}
    <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-background/80 border-b border-border">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity className="w-6 h-6 text-primary" />
          <span className="font-display font-bold text-xl text-foreground">HealthSync</span>
        </div>
        <div className="flex gap-3">
          <Link to="/login">
            <Button variant="ghost" size="sm">Log in</Button>
          </Link>
          <Link to="/register">
            <Button size="sm" className="gradient-primary text-primary-foreground">Sign up</Button>
          </Link>
        </div>
      </div>
    </nav>

    {/* Hero */}
    <section className="pt-32 pb-20 px-6">
      <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            Smart Health Dashboard
          </span>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-foreground leading-tight mb-6">
            Track your health.{' '}
            <span className="text-gradient">Improve your life.</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-lg leading-relaxed">
            Your all-in-one health companion. Monitor water intake, steps, sleep, BMI, mood, and set fitness goals — all in one beautiful dashboard.
          </p>
          <div className="flex gap-4">
            <Link to="/register">
              <Button size="lg" className="gradient-primary text-primary-foreground px-8 shadow-health-glow">
                Get Started <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline">Log in</Button>
            </Link>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <div className="rounded-3xl overflow-hidden shadow-health-lg">
            <img src={heroImage} alt="Health tracking illustration" className="w-full h-auto" />
          </div>
          <div className="absolute -bottom-4 -left-4 bg-card rounded-2xl p-4 shadow-health-md border border-border animate-float">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-health-green animate-pulse-gentle" />
              <span className="text-sm font-medium text-card-foreground">2,847 steps today</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>

    {/* Features */}
    <section className="py-20 px-6 bg-muted/30">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">Everything you need</h2>
          <p className="text-muted-foreground max-w-md mx-auto">Comprehensive health tracking tools designed to help you live a healthier life.</p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="gradient-card rounded-2xl p-6 shadow-health-sm border border-border hover:shadow-health-md transition-shadow"
            >
              <div className={`p-3 rounded-xl ${f.bg || 'bg-muted'} w-fit mb-4`}>
                <f.icon className={`w-6 h-6 ${f.color}`} />
              </div>
              <h3 className="font-display font-semibold text-card-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <Footer />
  </div>
);

export default Landing;
