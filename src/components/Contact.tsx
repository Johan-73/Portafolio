import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useToast } from "@/hooks/use-toast";

export const Contact = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast({
        title: t("contact.form.validation.nameRequired"),
        variant: "destructive",
      });
      return false;
    }
    if (!formData.email.trim()) {
      toast({
        title: t("contact.form.validation.emailRequired"),
        variant: "destructive",
      });
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast({
        title: t("contact.form.validation.emailInvalid"),
        variant: "destructive",
      });
      return false;
    }
    if (!formData.subject.trim()) {
      toast({
        title: t("contact.form.validation.subjectRequired"),
        variant: "destructive",
      });
      return false;
    }
    if (!formData.message.trim()) {
      toast({
        title: t("contact.form.validation.messageRequired"),
        variant: "destructive",
      });
      return false;
    }
    if (formData.message.trim().length < 10) {
      toast({
        title: t("contact.form.validation.messageMin"),
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: t("contact.form.success"),
      description: formData.name,
    });

    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-background"></div>

      {/* Animated background elements */}
      <div className="absolute top-1/4 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-1/4 left-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "1.5s" }}></div>

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-4">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {t("contact.title")}
            </span>
          </h2>

          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            {t("contact.subtitle")}
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Contact info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <div className="bg-card border border-border rounded-2xl p-6 shadow-card hover:shadow-glow hover:border-primary/50 transition-all duration-300 group">
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Email</h3>
                <p className="text-muted-foreground text-sm break-all">johan.perez@example.com</p>
              </div>

              <div className="bg-card border border-border rounded-2xl p-6 shadow-card hover:shadow-glow hover:border-primary/50 transition-all duration-300 group">
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Location</h3>
                <p className="text-muted-foreground text-sm">Medellín, Colombia</p>
              </div>

              <div className="bg-card border border-border rounded-2xl p-6 shadow-card hover:shadow-glow hover:border-primary/50 transition-all duration-300 group">
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Phone</h3>
                <p className="text-muted-foreground text-sm">+57 123 456 7890</p>
              </div>
            </motion.div>

            {/* Contact form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="md:col-span-2"
            >
              <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-8 shadow-card hover:shadow-glow transition-all duration-300">
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-foreground">
                      {t("contact.form.name")}
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="bg-background border-border focus:border-primary transition-all"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-foreground">
                      {t("contact.form.email")}
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="bg-background border-border focus:border-primary transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  <label htmlFor="subject" className="text-sm font-medium text-foreground">
                    {t("contact.form.subject")}
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="bg-background border-border focus:border-primary transition-all"
                    required
                  />
                </div>

                <div className="space-y-2 mb-6">
                  <label htmlFor="message" className="text-sm font-medium text-foreground">
                    {t("contact.form.message")}
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="bg-background border-border focus:border-primary transition-all resize-none"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-primary/50 transition-all duration-300 group"
                  size="lg"
                >
                  {isSubmitting ? (
                    t("contact.form.sending")
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      {t("contact.form.send")}
                    </>
                  )}
                </Button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
