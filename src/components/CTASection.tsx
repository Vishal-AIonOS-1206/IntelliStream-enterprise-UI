import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar } from "lucide-react";

const CTASection = () => {
  return (
    <section className="relative py-24 md:py-32">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background" />

      {/* Glow Effects */}
      <div className="absolute left-1/2 top-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />

      <div className="container relative z-10 mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-4xl text-center"
        >
          <h2 className="mb-6 text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            Ready to Build <span className="text-gradient">Trust</span> in Your
            <br />
            Data and AI Systems?
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground">
            Join leading enterprises using IntelliStream to ensure reliable pipelines, 
            continuous governance, and explainable AI — all from one intelligent cockpit
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button variant="glow" size="xl" className="group">
              Start Free Trial
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="heroOutline" size="xl">
              <Calendar className="h-5 w-5" />
              Book a Demo
            </Button>
          </div>

          <p className="mt-8 text-sm text-muted-foreground">
            No credit card required • 14-day free trial • Full feature access
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
