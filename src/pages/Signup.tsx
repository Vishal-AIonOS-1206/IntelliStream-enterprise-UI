
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Zap, ArrowLeft } from "lucide-react";

const Signup = () => {
    const navigate = useNavigate();
    const [orgEmail, setOrgEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate signup
        setTimeout(() => {
            setIsLoading(false);
            console.log("Signup with:", orgEmail, password);
            navigate("/workspace-selection");
        }, 1500);
    };

    return (
        <div className="min-h-screen w-full flex bg-background">
            {/* Left Column - Form */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-4 sm:px-12 relative">
                <div className="absolute top-8 left-8">
                    <Link
                        to="/"
                        className="group flex items-center gap-2 px-4 py-2 rounded-lg text-muted-foreground hover:text-foreground transition-all duration-300"
                    >
                        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                        <span className="font-medium">Back to Home</span>
                    </Link>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-sm space-y-8"
                >
                    <div className="text-center space-y-2">
                        <div className="flex justify-center mb-6">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                <Zap className="h-6 w-6" />
                            </div>
                        </div>
                        <h1 className="text-4xl font-bold tracking-tight">Create an account</h1>
                        <p className="text-lg text-muted-foreground">Enter your organization details to get started</p>
                    </div>



                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="org-email" className="text-md">Organization Email</Label>
                            <Input
                                id="org-email"
                                type="email"
                                placeholder="name@company.com"
                                value={orgEmail}
                                onChange={(e) => setOrgEmail(e.target.value)}
                                required
                                className="bg-background/50 h-12 text-lg"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-md">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="bg-background/50 h-12 text-lg"
                            />
                            <p className="text-[0.9rem] text-muted-foreground">
                                Must be at least 8 characters long
                            </p>
                        </div>
                        <Button
                            type="submit"
                            className="w-full bg-primary hover:bg-primary/90 h-12 text-lg"
                            disabled={isLoading}
                        >
                            {isLoading ? "Creating account..." : "Create Account"}
                        </Button>
                    </form>

                    <p className="px-8 text-center text-sm text-muted-foreground">
                        Already have an account?{" "}
                        <Link to="/login" className="underline underline-offset-4 hover:text-primary">
                            Sign in
                        </Link>
                    </p>
                </motion.div>
            </div>

            {/* Right Column - Visual/Testimonials */}
            <div className="hidden lg:flex w-1/2 bg-muted/10 relative overflow-hidden flex-col justify-between p-12 text-white/90">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black order-last z-0" />
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay z-0" />

                <div className="relative z-10">
                    <div className="flex items-center gap-2 text-lg font-bold">
                        <Zap className="h-5 w-5" />
                        IntelliStream
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative z-10 max-w-lg"
                >
                    <div className="space-y-6">
                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <Zap key={i} className="h-4 w-4 text-green-400 fill-green-400" />
                            ))}
                        </div>
                        <blockquote className="space-y-2">
                            <p className="text-2xl font-medium leading-relaxed">
                                "The speed at which we can now deploy and monitor our data infrastructure is unparalleled. Highly recommended for scaling teams."
                            </p>
                            <footer className="text-sm">
                                <cite className="font-semibold not-italic block text-white">Alex Chen</cite>
                                <span className="opacity-70">VP of Data Science at TechCorp</span>
                            </footer>
                        </blockquote>
                    </div>
                </motion.div>

                <div className="relative z-10 text-xs opacity-70">
                    © 2024 IntelliStream Inc. All rights reserved.
                </div>
            </div>
        </div>
    );
};

export default Signup;
