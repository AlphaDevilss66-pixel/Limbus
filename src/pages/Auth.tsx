
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogIn, UserPlus, ArrowLeft, MessageCircle, Loader2, Mail, Lock, Sparkles } from "lucide-react";
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

  // Se l'utente è già autenticato, reindirizzalo alla pagina principale
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
      // Reindirizza alla pagina di login dopo la registrazione
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900/90 via-limbus-800/90 to-blue-900/90 animate-gradient-shift bg-[length:200%_200%]">
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated particles */}
        {[...Array(100)].map((_, i) => (
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
              x: [0, (Math.random() - 0.5) * 30],
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
        
        {/* Light orbs */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`orb-${i}`}
            className="absolute rounded-full blur-xl"
            style={{
              width: `${Math.random() * 300 + 100}px`,
              height: `${Math.random() * 300 + 100}px`,
              background: `radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, rgba(104, 71, 192, 0.05) 70%, transparent 100%)`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: Math.random() * 8 + 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      
      <div className="relative container mx-auto px-4 py-8 z-10">
        <div className="flex justify-between items-center mb-6 max-w-md mx-auto">
          <Link to="/" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors">
            <ArrowLeft className="h-5 w-5" />
            <span>Torna alla home</span>
          </Link>
          <div className="flex items-center gap-2">
            <MessageCircle className="h-7 w-7 text-purple-300/80" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">Limbus</h1>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto"
        >
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-3 bg-gradient-to-r from-white via-purple-100 to-indigo-200 bg-clip-text text-transparent">
              <span className="inline-block">Benvenuto </span>
              <span className="inline-block">su Limbus</span>
            </h2>
            <p className="text-indigo-200/80">Il luogo dove i tuoi pensieri prendono vita</p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="backdrop-blur-md bg-white/10 rounded-2xl p-1.5 border border-white/20 shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
          >
            <Tabs 
              defaultValue="login" 
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 mb-6 p-1.5 bg-black/20 backdrop-blur-sm rounded-xl">
                <TabsTrigger 
                  value="login" 
                  className="text-base data-[state=active]:bg-gradient-to-r data-[state=active]:from-limbus-500 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg py-2.5"
                >
                  Accedi
                </TabsTrigger>
                <TabsTrigger 
                  value="register" 
                  className="text-base data-[state=active]:bg-gradient-to-r data-[state=active]:from-limbus-500 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg py-2.5"
                >
                  Registrati
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <Card className="border-0 shadow-none bg-transparent text-white">
                  <CardHeader className="pb-4">
                    <div className="flex justify-center mb-2">
                      <div className="p-3 rounded-full bg-gradient-to-br from-limbus-500/20 to-purple-500/20 border border-purple-500/30">
                        <LogIn className="h-7 w-7 text-purple-200" />
                      </div>
                    </div>
                    <CardTitle className="text-2xl text-center bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                      Accedi a Limbus
                    </CardTitle>
                    <CardDescription className="text-center text-purple-200/70">
                      Inserisci le tue credenziali per accedere
                    </CardDescription>
                  </CardHeader>
                  <form onSubmit={handleLogin}>
                    <CardContent className="space-y-4 pb-6">
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-purple-100">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-300 h-4 w-4" />
                          <Input
                            id="email"
                            type="email"
                            placeholder="nome@esempio.com"
                            value={loginEmail}
                            onChange={(e) => setLoginEmail(e.target.value)}
                            required
                            className="pl-10 bg-white/10 border-purple-400/30 focus:border-purple-400/60 text-white placeholder:text-purple-200/50 rounded-lg"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="password" className="text-purple-100">Password</Label>
                        </div>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-300 h-4 w-4" />
                          <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                            required
                            className="pl-10 bg-white/10 border-purple-400/30 focus:border-purple-400/60 text-white placeholder:text-purple-200/50 rounded-lg"
                          />
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-4 px-6 pb-6">
                      <Button 
                        type="submit" 
                        className="w-full bg-gradient-to-r from-limbus-500 to-purple-600 hover:from-limbus-600 hover:to-purple-700 shadow-lg shadow-purple-900/20 hover:shadow-purple-900/30 transition-all rounded-lg h-11"
                        disabled={authLoading || loading}
                      >
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
                          className="text-purple-300 hover:text-white transition-colors"
                        >
                          Registrati
                        </button>
                      </p>
                    </CardFooter>
                  </form>
                </Card>
              </TabsContent>
              
              <TabsContent value="register">
                <Card className="border-0 shadow-none bg-transparent text-white">
                  <CardHeader className="pb-4">
                    <div className="flex justify-center mb-2">
                      <div className="p-3 rounded-full bg-gradient-to-br from-limbus-500/20 to-purple-500/20 border border-purple-500/30">
                        <UserPlus className="h-7 w-7 text-purple-200" />
                      </div>
                    </div>
                    <CardTitle className="text-2xl text-center bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                      Crea un account
                    </CardTitle>
                    <CardDescription className="text-center text-purple-200/70">
                      Registrati per iniziare a condividere i tuoi sussurri
                    </CardDescription>
                  </CardHeader>
                  <form onSubmit={handleRegister}>
                    <CardContent className="space-y-4 pb-6">
                      <div className="space-y-2">
                        <Label htmlFor="register-email" className="text-purple-100">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-300 h-4 w-4" />
                          <Input
                            id="register-email"
                            type="email"
                            placeholder="nome@esempio.com"
                            value={registerEmail}
                            onChange={(e) => setRegisterEmail(e.target.value)}
                            required
                            className="pl-10 bg-white/10 border-purple-400/30 focus:border-purple-400/60 text-white placeholder:text-purple-200/50 rounded-lg"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="register-password" className="text-purple-100">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-300 h-4 w-4" />
                          <Input
                            id="register-password"
                            type="password"
                            placeholder="••••••••"
                            value={registerPassword}
                            onChange={(e) => setRegisterPassword(e.target.value)}
                            required
                            className="pl-10 bg-white/10 border-purple-400/30 focus:border-purple-400/60 text-white placeholder:text-purple-200/50 rounded-lg"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password" className="text-purple-100">Conferma Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-300 h-4 w-4" />
                          <Input
                            id="confirm-password"
                            type="password"
                            placeholder="••••••••"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="pl-10 bg-white/10 border-purple-400/30 focus:border-purple-400/60 text-white placeholder:text-purple-200/50 rounded-lg"
                          />
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-4 px-6 pb-6">
                      <Button 
                        type="submit" 
                        className="w-full bg-gradient-to-r from-limbus-500 to-purple-600 hover:from-limbus-600 hover:to-purple-700 shadow-lg shadow-purple-900/20 hover:shadow-purple-900/30 transition-all rounded-lg h-11"
                        disabled={authLoading || loading}
                      >
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
                          className="text-purple-300 hover:text-white transition-colors"
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
          
          <div className="mt-10 pt-6 border-t border-white/10 text-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex items-center justify-center space-x-2"
            >
              <Sparkles className="h-4 w-4 text-purple-300/60" />
              <p className="text-sm text-purple-200/60">
                Sussurri nell'Etere - Un'esperienza immersiva di condivisione
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Auth;
