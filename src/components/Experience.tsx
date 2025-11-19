import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, CheckCircle2 } from "lucide-react";

interface Job {
  company: string;
  role: string;
  period: string;
  description: string;
  achievements: string[];
}

export const Experience = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const jobs = t("experience.jobs", { returnObjects: true }) as Job[];

  return (
    <section id="experience" className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-background"></div>

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl font-bold text-center mb-16"
        >
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {t("experience.title")}
          </span>
        </motion.h2>

        <div className="max-w-5xl mx-auto">
          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary/20"></div>

            {jobs.map((job, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`relative mb-12 ${
                  index % 2 === 0 ? "md:pr-1/2 md:text-right" : "md:pl-1/2 md:ml-auto"
                } pl-20 md:pl-0 md:pr-0`}
              >
                {/* Timeline dot */}
                <div className="absolute left-8 md:left-1/2 top-0 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-glow -ml-2 animate-glow-pulse"></div>
                
                {/* Icon */}
                <div className="absolute left-0 md:left-auto top-0 flex items-center justify-center">
                  <div className={`${index % 2 === 0 ? "md:mr-auto" : "md:ml-auto"} bg-primary/20 p-2 rounded-lg`}>
                    <Briefcase className="h-5 w-5 text-primary" />
                  </div>
                </div>

                <div
                  className={`bg-card border border-border rounded-2xl p-6 shadow-card hover:shadow-glow hover:border-primary/50 transition-all duration-300 ${
                    index % 2 === 0 ? "md:mr-12" : "md:ml-12"
                  }`}
                >
                  <div className="flex flex-col md:items-start mb-4">
                    <h3 className="text-xl md:text-2xl font-bold text-foreground mb-1">{job.role}</h3>
                    <p className="text-primary font-semibold text-lg">{job.company}</p>
                    <span className="text-sm text-muted-foreground mt-1">{job.period}</span>
                  </div>

                  <p className="text-muted-foreground mb-4 leading-relaxed">{job.description}</p>

                  <div className="space-y-2">
                    {job.achievements.map((achievement, achievementIndex) => (
                      <div key={achievementIndex} className="flex items-start gap-2 group">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" />
                        <span className="text-sm text-foreground">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
