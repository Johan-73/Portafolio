import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Database, Cloud, TestTube, Wrench, Layout } from "lucide-react";

export const Skills = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const categories = [
    {
      key: "backend",
      icon: Code2,
      color: "text-blue-400",
      bgColor: "bg-blue-400/10",
    },
    {
      key: "frontend",
      icon: Layout,
      color: "text-cyan-400",
      bgColor: "bg-cyan-400/10",
    },
    {
      key: "databases",
      icon: Database,
      color: "text-green-400",
      bgColor: "bg-green-400/10",
    },
    {
      key: "devops",
      icon: Cloud,
      color: "text-purple-400",
      bgColor: "bg-purple-400/10",
    },
    {
      key: "testing",
      icon: TestTube,
      color: "text-orange-400",
      bgColor: "bg-orange-400/10",
    },
    {
      key: "tools",
      icon: Wrench,
      color: "text-pink-400",
      bgColor: "bg-pink-400/10",
    },
  ];

  return (
    <section id="skills" className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background"></div>

      {/* Floating animated circles */}
      <div className="absolute top-1/4 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }}></div>

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl font-bold text-center mb-16"
        >
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {t("skills.title")}
          </span>
        </motion.h2>

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            const skills = t(`skills.${category.key}_list`, { returnObjects: true }) as string[];

            return (
              <motion.div
                key={category.key}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card border border-border rounded-2xl p-6 shadow-card hover:shadow-glow hover:border-primary/50 transition-all duration-300 group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`${category.bgColor} p-3 rounded-lg group-hover:scale-110 transition-transform`}>
                    <Icon className={`h-6 w-6 ${category.color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">
                    {t(`skills.categories.${category.key}`)}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, skillIndex) => (
                    <motion.span
                      key={skillIndex}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.3, delay: index * 0.1 + skillIndex * 0.05 }}
                      className="text-xs md:text-sm px-3 py-1.5 bg-secondary/50 text-foreground rounded-full border border-border hover:border-primary/50 hover:bg-primary/10 transition-all cursor-default"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
