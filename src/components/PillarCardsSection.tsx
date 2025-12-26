import { motion } from "framer-motion";
import { Shield, Eye, Brain } from "lucide-react";

const pillars = [
  {
    icon: Shield,
    title: "Reliability",
    description:
      "Autonomous agents that proactively monitor, diagnose, and resolve pipeline failures before they impact the business.",
  },
  {
    icon: Eye,
    title: "Governance",
    description:
      "Continuous data profiling, policy enforcement, and real-time trust measurement across all datasets.",
  },
  {
    icon: Brain,
    title: "Explainability",
    description:
      "Transparent AI decisions with end-to-end lineage, model explainability, and business-friendly narratives.",
  },
];

const PillarCardsSection = () => {
  return (
    <section className="relative py-20 md:py-28">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />

      <div className="container relative z-10 mx-auto px-6">
        <div className="grid gap-6 md:grid-cols-3">
          {pillars.map((pillar, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="group"
            >
              <div className="h-full rounded-2xl border border-border/50 bg-card/40 p-8 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:bg-card/60 hover:shadow-lg hover:shadow-primary/5">
                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary/20 group-hover:shadow-lg group-hover:shadow-primary/20">
                  <pillar.icon className="h-7 w-7" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-foreground">
                  {pillar.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PillarCardsSection;
