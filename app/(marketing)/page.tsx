import { Nav } from "@/components/marketing/Nav";
import { Hero } from "@/components/marketing/Hero";
import { AgentBureau } from "@/components/marketing/AgentBureau";
import { SafeActionLifecycle } from "@/components/marketing/SafeActionLifecycle";
import { Integrations } from "@/components/marketing/Integrations";
import { BeforeAfter } from "@/components/marketing/BeforeAfter";
import { BusinessFlowInfographic } from "@/components/marketing/BusinessFlowInfographic";
import { Pillars } from "@/components/marketing/Pillars";
import { Stats } from "@/components/marketing/Stats";
import { AuditCta } from "@/components/marketing/AuditCta";
import { Footer } from "@/components/marketing/Footer";

export default function LandingPage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <AgentBureau />
        {/* Supervised operation explained right after the team. */}
        <SafeActionLifecycle />
        <Integrations />
        <BeforeAfter />
        {/* Problem → prepared proposal → owner approval → log → organised business. */}
        <BusinessFlowInfographic />
        <Pillars />
        <Stats />
        <AuditCta />
      </main>
      <Footer />
    </>
  );
}
