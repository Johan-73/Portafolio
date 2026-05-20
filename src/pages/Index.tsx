import { TopNav } from "@/shared/components/TopNav";
import { Footer } from "@/shared/components/Footer";
import { Hero } from "@/features/hero/Hero";
import { ChatPanel } from "@/features/chat/ChatPanel";
import { EvalDashboard } from "@/features/eval-dashboard/EvalDashboard";
import { AboutPanel } from "@/features/about/AboutPanel";
import { ExperienceTimeline } from "@/features/experience/ExperienceTimeline";
import { ProjectGrid } from "@/features/projects/ProjectGrid";
import { StackGrid } from "@/features/stack/StackGrid";
import { ContactSection } from "@/features/contact/ContactSection";

export default function Index() {
  return (
    <div className="min-h-screen bg-ink text-foreground">
      <TopNav />
      <main className="pt-14">
        <Hero />
        <ChatPanel />
        <EvalDashboard />
        <ProjectGrid />
        <ExperienceTimeline />
        <AboutPanel />
        <StackGrid />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
