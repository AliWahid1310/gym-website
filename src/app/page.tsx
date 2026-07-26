import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import SectionDivider from "@/components/SectionDivider";
import Programs from "@/components/Programs";
import Schedule from "@/components/Schedule";
import Trainers from "@/components/Trainers";
import Pricing from "@/components/Pricing";
import VirtualTour from "@/components/VirtualTour";
import Testimonials from "@/components/Testimonials";
import OwnerMessage from "@/components/OwnerMessage";
import LeadForm from "@/components/LeadForm";
import Footer from "@/components/Footer";
import MobileCTA from "@/components/MobileCTA";
import BranchModal from "@/components/BranchModal";

export default function Home() {
  return (
    <>
      {/* Branch selection modal — shown once per session */}
      <BranchModal />

      <Navbar />

      <main id="main-content">
        {/* 1. Hero */}
        <Hero />

        {/* 2. About / Value Proposition */}
        <About />

        {/* Divider: Dark → White */}
        <SectionDivider from="#0A0A0A" to="#FFFFFF" direction="right" height={80} />

        {/* 3. Featured Programs */}
        <Programs />

        {/* Divider: White → Off-white */}
        <SectionDivider from="#FFFFFF" to="#F5F5F5" direction="left" height={60} />

        {/* 4. Class Schedule */}
        <Schedule />

        {/* Divider: Off-white → Dark */}
        <SectionDivider from="#F5F5F5" to="#0A0A0A" direction="right" height={80} />

        {/* 5. Trainer Profiles */}
        <Trainers />

        {/* Divider: Dark → White */}
        <SectionDivider from="#0A0A0A" to="#FFFFFF" direction="left" height={80} />

        {/* 6. Membership / Pricing */}
        <Pricing />

        {/* 7. Virtual Tour */}
        <VirtualTour />

        {/* Divider: Dark → Off-white */}
        <SectionDivider from="#0A0A0A" to="#F5F5F5" direction="right" height={60} />

        {/* 8. Testimonials */}
        <Testimonials />

        {/* Divider: Off-white → Dark */}
        <SectionDivider from="#F5F5F5" to="#0A0A0A" direction="left" height={80} />

        {/* 9. Message from the Owner */}
        <OwnerMessage />

        {/* Divider: Dark → Red */}
        <SectionDivider from="#0A0A0A" to="#D91E2A" direction="right" height={80} />

        {/* 10. Lead Capture / Final CTA */}
        <LeadForm />
      </main>

      {/* 11. Footer */}
      <Footer />

      {/* Mobile Sticky CTA */}
      <MobileCTA />
    </>
  );
}
