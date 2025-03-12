
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogIn, UserPlus, ArrowLeft, MessageCircle, Loader2, Mail, Lock, Sparkles, Stars } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

const FloatingStars = ({ count = 200 }) => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden">
    {Array.from({ length: count }).map((_, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full bg-white"
        style={{
          width: `${Math.random() * 3 + 1}px`,
          height: `${Math.random() * 3 + 1}px`,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          opacity: Math.random() * 0.5 + 0.2,
        }}
        animate={{
          y: [0, -Math.random() * 150 - 50],
          x: [0, (Math.random() - 0.5) * 40],
          opacity: [0.3, 0.8, 0.3],
          scale: [0, 1, 0.5],
        }}
        transition={{
          duration: Math.random() * 20 + 10,
          repeat: Infinity,
          ease: "linear",
          delay: Math.random() * 5,
        }}
      />
    ))}
  </div>
);

const OrbitalCircle = ({ size = 300, duration = 30, clockwise = true }) => (
  <motion.div
    className="absolute rounded-full border border-purple-500/10"
    style={{
      width: size,
      height: size,
      top: '50%',
      left: '50%',
      marginLeft: -size / 2,
      marginTop: -size / 2,
    }}
    animate={{
      rotate: clockwise ? 360 : -360,
    }}
    transition={{
      duration,
      repeat: Infinity,
      ease: "linear",
    }}
  >
    <motion.div
      className="absolute w-4 h-4 rounded-full bg-purple-400/50 shadow-glow top-0 left-1/2 -ml-2 -mt-2"
      animate={{
        scale: [1, 1.3, 1],
        opacity: [0.5, 0.8, 0.5],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  </motion.div>
);

const GlowingOrb = ({ size = 50, color = "purple", delay = 0, x = 0, y = 0 }) => {
  const colors = {
    purple: "bg-purple-500/20 shadow-glow-purple",
    blue: "bg-blue-500/20 shadow-glow-blue",
    amber: "bg-amber-500/20 shadow-glow",
  };
  
  return (
    <motion.div
      className={`absolute rounded-full ${colors[color]} backdrop-blur-sm`}
      style={{
        width: size,
        height: size,
        x,
        y,
      }}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.6, 0.8, 0.6],
      }}
      transition={{
        duration: 4,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
};

const Auth = () => {
  const navigate = useNavigate();
  const { signIn, signUp, loading, user } = useAuth();

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("login");

  // Redirect to whispers page if user is already authenticated
  useEffect(() => {
    if (user) {
      navigate("/whispers");
    }
  }, [user, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      toast.error("Per favore, compila tutti i campi");
      return;
    }

    try {
      setAuthLoading(true);
      await signIn(loginEmail, loginPassword);
      navigate("/whispers");
    } catch (error) {
      console.error("Errore durante l'accesso:", error);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!registerEmail || !registerPassword || !confirmPassword) {
      toast.error("Per favore, compila tutti i campi");
      return;
    }

    if (registerPassword !== confirmPassword) {
      toast.error("Le password non coincidono");
      return;
    }

    if (registerPassword.length < 6) {
      toast.error("La password deve contenere almeno 6 caratteri");
      return;
    }

    try {
      setAuthLoading(true);
      await signUp(registerEmail, registerPassword);
      toast.success("Registrazione completata! Controlla la tua email per confermare l'account");
      navigate("/whispers");
    } catch (error) {
      console.error("Errore durante la registrazione:", error);
    } finally {
      setAuthLoading(false);
    }
  };

  // Early return if user is authenticated
  if (user) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-purple-900 to-slate-900 animate-gradient-shift bg-[length:200%_200%] overflow-hidden">
      {/* Animated Background Elements */}
      <FloatingStars count={200} />
      
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
        <OrbitalCircle size={400} duration={40} />
        <OrbitalCircle size={600} duration={60} clockwise={false} />
        <OrbitalCircle size={800} duration={80} />
        
        <GlowingOrb size={80} color="purple" x={-200} y={-150} />
        <GlowingOrb size={60} color="blue" x={250} y={200} delay={1} />
        <GlowingOrb size={100} color="amber" x={300} y={-250} delay={2} />
        <GlowingOrb size={40} color="purple" x={-300} y={250} delay={1.5} />
        
        {/* Animated Nebula */}
        <motion.div
          className="absolute opacity-30 rounded-full w-[800px] h-[800px] bg-gradient-to-br from-purple-800/40 via-indigo-700/20 to-blue-800/30 blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
      
      <div className="relative container mx-auto px-4 py-8 z-10">
        <div className="flex justify-between items-center mb-8 max-w-md mx-auto">
          <Link to="/" className="flex items-center gap-2 text-white/80 hover:text-white transition-all duration-300 group">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="rounded-full p-1.5 bg-white/10 group-hover:bg-white/20 transition-all duration-300"
            >
              <ArrowLeft className="h-4 w-4" />
            </motion.div>
            <span className="text-sm font-medium">Torna alla home</span>
          </Link>
          <motion.div 
            className="flex items-center gap-2"
            animate={{ y: [0, -5, 0], rotate: [0, 2, 0, -2, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.div
              animate={{ rotate: [-10, 10] }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            >
              <MessageCircle className="h-7 w-7 text-purple-300" />
            </motion.div>
            <motion.h1 
              className="text-2xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent"
              animate={{ 
                backgroundPosition: ['0% center', '100% center', '0% center'], 
                textShadow: ['0 0 5px rgba(139, 92, 246, 0.3)', '0 0 10px rgba(139, 92, 246, 0.5)', '0 0 5px rgba(139, 92, 246, 0.3)'] 
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              Limbus
            </motion.h1>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-md mx-auto"
        >
          <div className="text-center mb-10">
            <motion.h2 
              className="text-5xl font-bold mb-4 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent"
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                textShadow: ['0 0 20px rgba(139, 92, 246, 0.5)', '0 0 40px rgba(139, 92, 246, 0.8)', '0 0 20px rgba(139, 92, 246, 0.5)']
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <motion.span 
                className="block"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Benvenuto nel
              </motion.span>
              <motion.span 
                className="block"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Limbus
              </motion.span>
            </motion.h2>
            
            <motion.div 
              className="w-32 h-1 mx-auto bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mb-5"
              animate={{ width: ['8rem', '10rem', '8rem'] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            
            <motion.p 
              className="text-indigo-200/90 max-w-xs mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              Il luogo dove i tuoi pensieri prendono vita e si fondono con l'etere
            </motion.p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="backdrop-blur-xl bg-white/10 rounded-2xl p-2 border border-purple-500/30 shadow-[0_8px_30px_rgb(0,0,0,0.12)] shadow-purple-800/20 relative overflow-hidden"
          >
            {/* Card Background Animation */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-blue-900/5 to-purple-900/10 pointer-events-none"
              animate={{ 
                backgroundPosition: ['0% 0%', '100% 100%'], 
                scale: [1, 1.05, 1],
              }}
              transition={{ 
                backgroundPosition: { duration: 10, repeat: Infinity, ease: "linear" },
                scale: { duration: 5, repeat: Infinity, ease: "easeInOut" }
              }}
            />
            
            <Tabs 
              defaultValue="login" 
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 mb-7 p-1.5 bg-black/20 backdrop-blur-sm rounded-xl">
                <TabsTrigger 
                  value="login" 
                  className="text-base data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#4447ad] data-[state=active]:to-[#9b87f5] data-[state=active]:text-white rounded-lg py-2.5 transition-all duration-300"
                >
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Accedi
                  </motion.span>
                </TabsTrigger>
                <TabsTrigger 
                  value="register" 
                  className="text-base data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#4447ad] data-[state=active]:to-[#9b87f5] data-[state=active]:text-white rounded-lg py-2.5 transition-all duration-300"
                >
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Registrati
                  </motion.span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="login" className="mt-2">
                <Card className="border-0 shadow-none bg-transparent text-white">
                  <CardHeader className="pb-4 space-y-4">
                    <motion.div 
                      className="flex justify-center"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                    >
                      <motion.div 
                        className="p-3.5 rounded-full bg-gradient-to-br from-[#4447ad]/30 to-[#9b87f5]/30 border border-[#9b87f5]/40 shadow-glow"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        animate={{ 
                          boxShadow: ['0 0 15px rgba(139, 92, 246, 0.3)', '0 0 25px rgba(139, 92, 246, 0.5)', '0 0 15px rgba(139, 92, 246, 0.3)'] 
                        }}
                        transition={{ boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" } }}
                      >
                        <LogIn className="h-7 w-7 text-purple-200" />
                      </motion.div>
                    </motion.div>
                    <div className="space-y-1.5 text-center">
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.3 }}
                      >
                        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                          Accedi a Limbus
                        </CardTitle>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.3 }}
                      >
                        <CardDescription className="text-center text-purple-200/70">
                          Entra nel tuo spazio onirico personale
                        </CardDescription>
                      </motion.div>
                    </div>
                  </CardHeader>
                  <form onSubmit={handleLogin}>
                    <CardContent className="space-y-5 pb-6">
                      <motion.div 
                        className="space-y-2.5"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.3 }}
                      >
                        <Label htmlFor="email" className="text-purple-100">Email</Label>
                        <div className="relative group">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-300 h-4 w-4 transition-colors group-hover:text-white" />
                          <Input
                            id="email"
                            type="email"
                            placeholder="nome@esempio.com"
                            value={loginEmail}
                            onChange={(e) => setLoginEmail(e.target.value)}
                            required
                            className="pl-10 bg-white/10 border-purple-400/30 focus:border-purple-400/70 text-white placeholder:text-purple-200/50 rounded-lg transition-all"
                          />
                        </div>
                      </motion.div>
                      <motion.div 
                        className="space-y-2.5"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.3 }}
                      >
                        <div className="flex items-center justify-between">
                          <Label htmlFor="password" className="text-purple-100">Password</Label>
                          <motion.a 
                            href="#" 
                            className="text-xs text-purple-300 hover:text-white transition-colors"
                            whileHover={{ scale: 1.05, x: 2 }}
                          >
                            Password dimenticata?
                          </motion.a>
                        </div>
                        <div className="relative group">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-300 h-4 w-4 transition-colors group-hover:text-white" />
                          <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                            required
                            className="pl-10 bg-white/10 border-purple-400/30 focus:border-purple-400/70 text-white placeholder:text-purple-200/50 rounded-lg transition-all"
                          />
                        </div>
                      </motion.div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-5 px-6 pb-7 pt-1">
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.3 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button 
                          type="submit" 
                          className="w-full relative bg-gradient-to-r from-[#4447ad] to-[#9b87f5] hover:from-[#4f55bf] hover:to-[#a586fb] shadow-lg shadow-purple-900/20 hover:shadow-purple-900/30 transition-all rounded-lg h-11 overflow-hidden"
                          disabled={authLoading || loading}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[100%] animate-shimmer"></div>
                          {(authLoading || loading) ? (
                            <Loader2 className="h-5 w-5 animate-spin mr-2" />
                          ) : (
                            <LogIn className="h-5 w-5 mr-2" />
                          )}
                          Accedi
                        </Button>
                      </motion.div>
                      <motion.p 
                        className="text-sm text-center text-purple-200/70"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.9, duration: 0.3 }}
                      >
                        Non hai un account?{" "}
                        <motion.button
                          type="button"
                          onClick={() => setActiveTab("register")}
                          className="text-purple-300 hover:text-white transition-colors font-medium"
                          whileHover={{ scale: 1.05 }}
                        >
                          Registrati
                        </motion.button>
                      </motion.p>
                    </CardFooter>
                  </form>
                </Card>
              </TabsContent>
              
              <TabsContent value="register" className="mt-2">
                <Card className="border-0 shadow-none bg-transparent text-white">
                  <CardHeader className="pb-4 space-y-4">
                    <motion.div 
                      className="flex justify-center"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                    >
                      <motion.div 
                        className="p-3.5 rounded-full bg-gradient-to-br from-[#4447ad]/30 to-[#9b87f5]/30 border border-[#9b87f5]/40 shadow-glow"
                        whileHover={{ scale: 1.1, rotate: -5 }}
                        animate={{ 
                          boxShadow: ['0 0 15px rgba(139, 92, 246, 0.3)', '0 0 25px rgba(139, 92, 246, 0.5)', '0 0 15px rgba(139, 92, 246, 0.3)'] 
                        }}
                        transition={{ boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" } }}
                      >
                        <UserPlus className="h-7 w-7 text-purple-200" />
                      </motion.div>
                    </motion.div>
                    <div className="space-y-1.5 text-center">
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.3 }}
                      >
                        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                          Crea un account
                        </CardTitle>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.3 }}
                      >
                        <CardDescription className="text-center text-purple-200/70">
                          Inizia il tuo viaggio nel limbo dei sussurri
                        </CardDescription>
                      </motion.div>
                    </div>
                  </CardHeader>
                  <form onSubmit={handleRegister}>
                    <CardContent className="space-y-5 pb-6">
                      <motion.div 
                        className="space-y-2.5"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.3 }}
                      >
                        <Label htmlFor="register-email" className="text-purple-100">Email</Label>
                        <div className="relative group">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-300 h-4 w-4 transition-colors group-hover:text-white" />
                          <Input
                            id="register-email"
                            type="email"
                            placeholder="nome@esempio.com"
                            value={registerEmail}
                            onChange={(e) => setRegisterEmail(e.target.value)}
                            required
                            className="pl-10 bg-white/10 border-purple-400/30 focus:border-purple-400/70 text-white placeholder:text-purple-200/50 rounded-lg transition-all"
                          />
                        </div>
                      </motion.div>
                      <motion.div 
                        className="space-y-2.5"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.3 }}
                      >
                        <Label htmlFor="register-password" className="text-purple-100">Password</Label>
                        <div className="relative group">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-300 h-4 w-4 transition-colors group-hover:text-white" />
                          <Input
                            id="register-password"
                            type="password"
                            placeholder="••••••••"
                            value={registerPassword}
                            onChange={(e) => setRegisterPassword(e.target.value)}
                            required
                            className="pl-10 bg-white/10 border-purple-400/30 focus:border-purple-400/70 text-white placeholder:text-purple-200/50 rounded-lg transition-all"
                          />
                        </div>
                      </motion.div>
                      <motion.div 
                        className="space-y-2.5"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.3 }}
                      >
                        <Label htmlFor="confirm-password" className="text-purple-100">Conferma Password</Label>
                        <div className="relative group">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-300 h-4 w-4 transition-colors group-hover:text-white" />
                          <Input
                            id="confirm-password"
                            type="password"
                            placeholder="••••••••"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="pl-10 bg-white/10 border-purple-400/30 focus:border-purple-400/70 text-white placeholder:text-purple-200/50 rounded-lg transition-all"
                          />
                        </div>
                      </motion.div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-5 px-6 pb-7 pt-1">
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9, duration: 0.3 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button 
                          type="submit" 
                          className="w-full relative bg-gradient-to-r from-[#4447ad] to-[#9b87f5] hover:from-[#4f55bf] hover:to-[#a586fb] shadow-lg shadow-purple-900/20 hover:shadow-purple-900/30 transition-all rounded-lg h-11 overflow-hidden"
                          disabled={authLoading || loading}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[100%] animate-shimmer"></div>
                          {(authLoading || loading) ? (
                            <Loader2 className="h-5 w-5 animate-spin mr-2" />
                          ) : (
                            <UserPlus className="h-5 w-5 mr-2" />
                          )}
                          Registrati
                        </Button>
                      </motion.div>
                      <motion.p 
                        className="text-sm text-center text-purple-200/70"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 0.3 }}
                      >
                        Hai già un account?{" "}
                        <motion.button
                          type="button"
                          onClick={() => setActiveTab("login")}
                          className="text-purple-300 hover:text-white transition-colors font-medium"
                          whileHover={{ scale: 1.05 }}
                        >
                          Accedi
                        </motion.button>
                      </motion.p>
                    </CardFooter>
                  </form>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
          
          <div className="mt-12 pt-7 border-t border-white/10 text-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="flex items-center justify-center space-x-2"
            >
              <motion.div
                animate={{ 
                  rotate: [0, 20, 0, -20, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 5, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
                <Sparkles className="h-4 w-4 text-purple-300/70" />
              </motion.div>
              <p className="text-sm text-purple-200/70">
                Sussurri nell'Etere — Un viaggio tra sogno e realtà
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Auth;
