import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";

const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20 glow-primary">
              <Zap className="h-5 w-5 text-primary" />
            </div>
            <span className="text-xl font-bold text-foreground">
              Intelli<span className="text-gradient">Stream</span>
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden items-center gap-8 md:flex">
            <a
              href="#features"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Features
            </a>
            <a
              href="#agents"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Agents
            </a>
            <a
              href="#pricing"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Pricing
            </a>
            <a
              href="#docs"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Docs
            </a>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" size="default">
                Log In
              </Button>
            </Link>
            <Link to="/signup">
              <Button variant="hero" size="default">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
