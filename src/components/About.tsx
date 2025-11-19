import { useTranslation } from "react-i18next";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export const About = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const highlights = t("about.highlights", { returnObjects: true }) as string[];

  return (
    <section id="about" className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-background"></div>
      
      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {t("about.title")}
            </span>
          </h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-card border border-border rounded-2xl p-8 md:p-12 shadow-card hover:shadow-glow transition-all duration-300"
          >
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-8">
              {t("about.description")}
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              {highlights.map((highlight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-3 group"
                >
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="text-foreground text-sm md:text-base">{highlight}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
