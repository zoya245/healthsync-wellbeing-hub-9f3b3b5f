import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Activity, Mail, Lock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { lovable } from '@/integrations/lovable';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const { register } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast({ title: 'Please fill in all fields', variant: 'destructive' });
      return;
    }
    if (password.length < 6) {
      toast({ title: 'Password must be at least 6 characters', variant: 'destructive' });
      return;
    }
    setIsLoading(true);
    try {
      await register(name, email, password);
      setEmailSent(true);
      toast({ title: 'Check your email!', description: 'We sent you a verification link.' });
    } catch (error: any) {
      toast({
        title: 'Registration failed',
        description: error.message || 'Something went wrong',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setIsLoading(true);
    try {
      const result = await lovable.auth.signInWithOAuth('google', {
        redirect_uri: `${window.location.origin}/auth/callback`,
      });
      if (result.error) {
        toast({ title: 'Google sign-in failed', description: String(result.error), variant: 'destructive' });
      }
    } catch (error: any) {
      toast({ title: 'Google sign-in failed', description: error.message, variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  if (emailSent) {
    return (
      <div className="min-h-screen gradient-hero flex items-center justify-center px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md text-center">
          <div className="gradient-card rounded-2xl p-8 shadow-health-lg border border-border">
            <Mail className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="font-display text-2xl font-bold text-foreground mb-2">Verify your email</h2>
            <p className="text-muted-foreground mb-4">
              We've sent a verification link to <span className="font-medium text-foreground">{email}</span>. Please check your inbox and click the link to activate your account.
            </p>
            <Link to="/login">
              <Button variant="outline">Back to login</Button>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <Activity className="w-8 h-8 text-primary" />
            <span className="font-display font-bold text-2xl text-foreground">HealthSync</span>
          </Link>
          <h1 className="font-display text-2xl font-bold text-foreground">Create account</h1>
          <p className="text-muted-foreground text-sm mt-1">Start your health journey today</p>
        </div>

        <form onSubmit={handleSubmit} className="gradient-card rounded-2xl p-8 shadow-health-lg border border-border space-y-5">
          <div>
            <Label className="text-sm text-foreground">Name</Label>
            <div className="relative mt-1.5">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Your name" className="pl-10" value={name} onChange={e => setName(e.target.value)} disabled={isLoading} />
            </div>
          </div>
          <div>
            <Label className="text-sm text-foreground">Email</Label>
            <div className="relative mt-1.5">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input type="email" placeholder="you@example.com" className="pl-10" value={email} onChange={e => setEmail(e.target.value)} disabled={isLoading} />
            </div>
          </div>
          <div>
            <Label className="text-sm text-foreground">Password</Label>
            <div className="relative mt-1.5">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input type="password" placeholder="••••••••" className="pl-10" value={password} onChange={e => setPassword(e.target.value)} disabled={isLoading} />
            </div>
          </div>
          <Button type="submit" className="w-full gradient-primary text-primary-foreground shadow-health-glow" disabled={isLoading}>
            {isLoading ? 'Creating account...' : 'Create account'}
          </Button>

          <div className="relative my-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">or continue with</span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={handleGoogleSignup}
            disabled={isLoading}
          >
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continue with Google
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link to="/login" className="text-primary font-medium hover:underline">Sign in</Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default Register;
