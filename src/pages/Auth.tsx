
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogIn, UserPlus, ArrowLeft, MessageCircle, Loader2, Mail, Lock } from "lucide-react";
import { toast } from "sonner";

const Auth = () => {
  const navigate = useNavigate();
  const { signIn, signUp, loading, user } = useAuth();

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  // Se l'utente è già autenticato, reindirizzalo alla pagina principale
  if (user) {
    navigate("/whispers");
    return null;
  }

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

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-200/90 via-limbus-100/80 to-blue-200/90 bg-fixed">
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-white/40 animate-pulse-opacity"
            style={{
              width: `${Math.random() * 10 + 2}px`,
              height: `${Math.random() * 10 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 5 + 3}s`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="flex justify-between items-center mb-8">
          <Link to="/" className="flex items-center gap-2 text-limbus-800 hover:text-limbus-600 transition-colors">
            <ArrowLeft className="h-5 w-5" />
            <span>Torna alla home</span>
          </Link>
          <div className="flex items-center gap-2">
            <MessageCircle className="h-6 w-6 text-limbus-600" />
            <h1 className="text-2xl font-bold text-limbus-900">Limbus</h1>
          </div>
        </div>

        <div className="max-w-md mx-auto my-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-limbus-800 mb-3 animate-fade-in shadow-sm">Benvenuto su Limbus</h2>
            <p className="text-limbus-600">Il luogo dove i tuoi pensieri prendono vita</p>
          </div>
          
          <div className="glass-card p-1 shadow-glow animate-fade-in" style={{animationDelay: "0.2s"}}>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8 bg-white/70 backdrop-blur-sm">
                <TabsTrigger value="login" className="text-base data-[state=active]:bg-limbus-500 data-[state=active]:text-white">Accedi</TabsTrigger>
                <TabsTrigger value="register" className="text-base data-[state=active]:bg-limbus-500 data-[state=active]:text-white">Registrati</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <Card className="border-0 shadow-none bg-transparent">
                  <CardHeader>
                    <CardTitle className="text-2xl text-center text-limbus-800">Accedi a Limbus</CardTitle>
                    <CardDescription className="text-center text-limbus-600">
                      Inserisci le tue credenziali per accedere al tuo account
                    </CardDescription>
                  </CardHeader>
                  <form onSubmit={handleLogin}>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-limbus-700">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-limbus-400 h-4 w-4" />
                          <Input
                            id="email"
                            type="email"
                            placeholder="nome@esempio.com"
                            value={loginEmail}
                            onChange={(e) => setLoginEmail(e.target.value)}
                            required
                            className="pl-10 bg-white/70 backdrop-blur-sm border-limbus-200 focus:border-limbus-400 transition-all"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="password" className="text-limbus-700">Password</Label>
                        </div>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-limbus-400 h-4 w-4" />
                          <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                            required
                            className="pl-10 bg-white/70 backdrop-blur-sm border-limbus-200 focus:border-limbus-400 transition-all"
                          />
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        type="submit" 
                        className="w-full bg-gradient-to-r from-limbus-500 to-limbus-700 hover:from-limbus-600 hover:to-limbus-800 shadow-md hover:shadow-lg transition-all"
                        disabled={authLoading || loading}
                      >
                        {(authLoading || loading) ? (
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        ) : (
                          <LogIn className="h-4 w-4 mr-2" />
                        )}
                        Accedi
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              </TabsContent>
              
              <TabsContent value="register">
                <Card className="border-0 shadow-none bg-transparent">
                  <CardHeader>
                    <CardTitle className="text-2xl text-center text-limbus-800">Crea un account</CardTitle>
                    <CardDescription className="text-center text-limbus-600">
                      Registrati per iniziare a condividere i tuoi sussurri
                    </CardDescription>
                  </CardHeader>
                  <form onSubmit={handleRegister}>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="register-email" className="text-limbus-700">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-limbus-400 h-4 w-4" />
                          <Input
                            id="register-email"
                            type="email"
                            placeholder="nome@esempio.com"
                            value={registerEmail}
                            onChange={(e) => setRegisterEmail(e.target.value)}
                            required
                            className="pl-10 bg-white/70 backdrop-blur-sm border-limbus-200 focus:border-limbus-400 transition-all"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="register-password" className="text-limbus-700">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-limbus-400 h-4 w-4" />
                          <Input
                            id="register-password"
                            type="password"
                            placeholder="••••••••"
                            value={registerPassword}
                            onChange={(e) => setRegisterPassword(e.target.value)}
                            required
                            className="pl-10 bg-white/70 backdrop-blur-sm border-limbus-200 focus:border-limbus-400 transition-all"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password" className="text-limbus-700">Conferma Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-limbus-400 h-4 w-4" />
                          <Input
                            id="confirm-password"
                            type="password"
                            placeholder="••••••••"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="pl-10 bg-white/70 backdrop-blur-sm border-limbus-200 focus:border-limbus-400 transition-all"
                          />
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        type="submit" 
                        className="w-full bg-gradient-to-r from-limbus-500 to-limbus-700 hover:from-limbus-600 hover:to-limbus-800 shadow-md hover:shadow-lg transition-all"
                        disabled={authLoading || loading}
                      >
                        {(authLoading || loading) ? (
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        ) : (
                          <UserPlus className="h-4 w-4 mr-2" />
                        )}
                        Registrati
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="text-center mt-8 text-sm text-limbus-700 animate-fade-in" style={{animationDelay: "0.4s"}}>
            <p>Unisciti a Limbus e scopri un nuovo modo di connettere pensieri e idee</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
