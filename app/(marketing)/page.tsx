import { Nav } from "@/components/marketing/Nav";
import { Hero } from "@/components/marketing/Hero";
import { AgentBureau } from "@/components/marketing/AgentBureau";
import { Integrations } from "@/components/marketing/Integrations";
import { BeforeAfter } from "@/components/marketing/BeforeAfter";
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
        <Integrations />
        <BeforeAfter />
        <Pillars />
        <Stats />
        <AuditCta />
      </main>
      <Footer />
    </>
  );
}
