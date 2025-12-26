import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface DetailSectionProps {
  icon: LucideIcon;
  header: string;
  subheader: string;
  bullets: string[];
  imagePosition: "left" | "right";
  imageSrc: string;
  index: number;
}

const DetailSection = ({
  icon: Icon,
  header,
  subheader,
  bullets,
  imagePosition,
  imageSrc,
  index,
}: DetailSectionProps) => {
  const isImageLeft = imagePosition === "left";

  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      {index % 2 === 0 && (
        <div className="absolute -left-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
      )}
      {index % 2 === 1 && (
        <div className="absolute -right-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-accent/5 blur-3xl" />
      )}

      <div className="container relative z-10 mx-auto px-6">
        <div
          className={`flex flex-col items-center gap-12 lg:gap-20 ${
            isImageLeft ? "lg:flex-row" : "lg:flex-row-reverse"
          }`}
        >
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: isImageLeft ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="flex-1 w-full"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/5" />
              <img
                src={imageSrc}
                alt={header}
                className="h-full w-full object-cover"
              />
              {/* Overlay Icon */}
              <div className="absolute bottom-6 left-6 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/90 shadow-lg shadow-primary/30">
                <Icon className="h-7 w-7 text-primary-foreground" />
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: isImageLeft ? 40 : -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex-1"
          >
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl lg:text-5xl leading-tight">
              {header}
            </h2>
            <p className="mb-8 text-lg text-muted-foreground leading-relaxed">
              {subheader}
            </p>

            <ul className="space-y-4">
              {bullets.map((bullet, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <span className="mt-2 flex h-2 w-2 flex-shrink-0 rounded-full bg-primary shadow-sm shadow-primary/50" />
                  <span className="text-foreground/90">{bullet}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DetailSection;
