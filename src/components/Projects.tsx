import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "./ui/button";

interface Project {
  name: string;
  description: string;
  stack: string[];
  demo: string;
  repo: string;
}

export const Projects = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const projects = t("projects.list", { returnObjects: true }) as Project[];

  return (
    <section id="projects" className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background"></div>

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl font-bold text-center mb-16"
        >
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {t("projects.title")}
          </span>
        </motion.h2>

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card border border-border rounded-2xl overflow-hidden shadow-card hover:shadow-glow hover:border-primary/50 transition-all duration-300 group"
            >
              {/* Project image placeholder with gradient */}
              <div className="h-48 bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_hsl(195_85%_55%_/_0.2),_transparent_70%)] group-hover:scale-110 transition-transform duration-500"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl font-bold text-primary/20 group-hover:scale-110 transition-transform duration-300">
                    {index + 1}
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {project.name}
                </h3>

                <p className="text-muted-foreground mb-4 leading-relaxed">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.stack.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full border border-primary/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 border-primary/50 hover:bg-primary/10 group/btn"
                  >
                    <ExternalLink className="mr-2 h-4 w-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    Demo
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 border-primary/50 hover:bg-primary/10 group/btn"
                  >
                    <Github className="mr-2 h-4 w-4 group-hover/btn:rotate-12 transition-transform" />
                    Code
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
