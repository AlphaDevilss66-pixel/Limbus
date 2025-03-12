
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#33366d]/90 via-[#4447ad]/90 to-[#3a3c8d]/90 animate-gradient-shift bg-[length:200%_200%]">
      {/* Beautiful Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated Stars/Particles */}
        {[...Array(150)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              background: `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.2})`,
            }}
            animate={{
              y: [0, -Math.random() * 100 - 50],
              x: [0, (Math.random() - 0.5) * 40],
              opacity: [0.5, 0.8, 0],
              scale: [0, 1, 0.5],
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5,
            }}
          />
        ))}
        
        {/* Glowing Orbs */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={`orb-${i}`}
            className="absolute rounded-full blur-xl"
            style={{
              width: `${Math.random() * 300 + 150}px`,
              height: `${Math.random() * 300 + 150}px`,
              background: `radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, rgba(104, 71, 192, 0.08) 70%, transparent 100%)`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: Math.random() * 10 + 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
        
        {/* Glowing Lines */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full">
            {[...Array(6)].map((_, i) => (
              <div 
                key={`line-${i}`}
                className="absolute top-1/2 left-1/2 w-full h-0.5 bg-gradient-to-r from-transparent via-purple-400/30 to-transparent"
                style={{ 
                  transform: `translate(-50%, -50%) rotate(${i * 30}deg)`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
      
      <div className="relative container mx-auto px-4 py-8 z-10">
        <div className="flex justify-between items-center mb-8 max-w-md mx-auto">
          <Link to="/" className="flex items-center gap-2 text-white/80 hover:text-white transition-all duration-300 group">
            <div className="rounded-full p-1.5 bg-white/10 group-hover:bg-white/20 transition-all duration-300">
              <ArrowLeft className="h-4 w-4" />
            </div>
            <span className="text-sm font-medium">Torna alla home</span>
          </Link>
          <div className="flex items-center gap-2">
            <motion.div
              initial={{ rotate: -10 }}
              animate={{ rotate: 10 }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            >
              <MessageCircle className="h-7 w-7 text-purple-300" />
            </motion.div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">Limbus</h1>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-md mx-auto"
        >
          <div className="text-center mb-10">
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent animate-text-gradient-shift">
              <span className="block">Benvenuto nel</span>
              <span className="block">Limbus</span>
            </h2>
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
            className="backdrop-blur-md bg-white/10 rounded-2xl p-2 border border-white/20 shadow-[0_8px_30px_rgb(0,0,0,0.12)] shadow-purple-800/20"
          >
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
                  Accedi
                </TabsTrigger>
                <TabsTrigger 
                  value="register" 
                  className="text-base data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#4447ad] data-[state=active]:to-[#9b87f5] data-[state=active]:text-white rounded-lg py-2.5 transition-all duration-300"
                >
                  Registrati
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
                      <div className="p-3.5 rounded-full bg-gradient-to-br from-[#4447ad]/30 to-[#9b87f5]/30 border border-[#9b87f5]/40 shadow-glow">
                        <LogIn className="h-7 w-7 text-purple-200" />
                      </div>
                    </motion.div>
                    <div className="space-y-1.5 text-center">
                      <CardTitle className="text-2xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                        Accedi a Limbus
                      </CardTitle>
                      <CardDescription className="text-center text-purple-200/70">
                        Entra nel tuo spazio onirico personale
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <form onSubmit={handleLogin}>
                    <CardContent className="space-y-5 pb-6">
                      <div className="space-y-2.5">
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
                      </div>
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="password" className="text-purple-100">Password</Label>
                          <a href="#" className="text-xs text-purple-300 hover:text-white transition-colors">
                            Password dimenticata?
                          </a>
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
                      </div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-5 px-6 pb-7 pt-1">
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
                      <p className="text-sm text-center text-purple-200/70">
                        Non hai un account?{" "}
                        <button
                          type="button"
                          onClick={() => setActiveTab("register")}
                          className="text-purple-300 hover:text-white transition-colors font-medium"
                        >
                          Registrati
                        </button>
                      </p>
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
                      <div className="p-3.5 rounded-full bg-gradient-to-br from-[#4447ad]/30 to-[#9b87f5]/30 border border-[#9b87f5]/40 shadow-glow">
                        <UserPlus className="h-7 w-7 text-purple-200" />
                      </div>
                    </motion.div>
                    <div className="space-y-1.5 text-center">
                      <CardTitle className="text-2xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                        Crea un account
                      </CardTitle>
                      <CardDescription className="text-center text-purple-200/70">
                        Inizia il tuo viaggio nel limbo dei sussurri
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <form onSubmit={handleRegister}>
                    <CardContent className="space-y-5 pb-6">
                      <div className="space-y-2.5">
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
                      </div>
                      <div className="space-y-2.5">
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
                      </div>
                      <div className="space-y-2.5">
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
                      </div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-5 px-6 pb-7 pt-1">
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
                      <p className="text-sm text-center text-purple-200/70">
                        Hai già un account?{" "}
                        <button
                          type="button"
                          onClick={() => setActiveTab("login")}
                          className="text-purple-300 hover:text-white transition-colors font-medium"
                        >
                          Accedi
                        </button>
                      </p>
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
              <Sparkles className="h-4 w-4 text-purple-300/70" />
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
