import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import SectionDivider from "@/components/SectionDivider";
import Programs from "@/components/Programs";
import WorkoutGenerator from "@/components/WorkoutGenerator";
import Schedule from "@/components/Schedule";
import Trainers from "@/components/Trainers";
import Pricing from "@/components/Pricing";
import BmiCalculator from "@/components/BmiCalculator";
import MacroCalculator from "@/components/MacroCalculator";
import OneRepMaxCalculator from "@/components/OneRepMaxCalculator";
import Amenities from "@/components/Amenities";
import BranchExplorer from "@/components/BranchExplorer";
import VirtualTour from "@/components/VirtualTour";
import Transformations from "@/components/Transformations";
import Testimonials from "@/components/Testimonials";
import OwnerMessage from "@/components/OwnerMessage";
import FAQ from "@/components/FAQ";
import BlogSection from "@/components/BlogSection";
import LeadForm from "@/components/LeadForm";
import Footer from "@/components/Footer";
import MobileCTA from "@/components/MobileCTA";
import BranchModal from "@/components/BranchModal";
import FreePassModal from "@/components/FreePassModal";
import BackToTop from "@/components/BackToTop";

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

        {/* Custom Workout Split Generator */}
        <WorkoutGenerator />

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

        {/* BMI Assessment Tool */}
        <BmiCalculator />

        {/* Custom Macro & TDEE Nutrition Calculator */}
        <MacroCalculator />

        {/* 1-Rep Max Strength Standards Calculator */}
        <OneRepMaxCalculator />

        {/* 7. Premium Amenities */}
        <Amenities />

        {/* Islamabad Branch Explorer */}
        <BranchExplorer />

        {/* 8. Virtual Tour */}
        <VirtualTour />

        {/* Member Transformations */}
        <Transformations />

        {/* Divider: Dark → Off-white */}
        <SectionDivider from="#0A0A0A" to="#F5F5F5" direction="right" height={60} />

        {/* 8. Testimonials */}
        <Testimonials />

        {/* Divider: Off-white → Dark */}
        <SectionDivider from="#F5F5F5" to="#0A0A0A" direction="left" height={80} />

        {/* 9. Message from the Owner */}
        <OwnerMessage />

        {/* 10. Frequently Asked Questions */}
        <FAQ />

        {/* 11. Fitness & Nutrition Guides */}
        <BlogSection />

        {/* Divider: Dark → Red */}
        <SectionDivider from="#0A0A0A" to="#D91E2A" direction="right" height={80} />

        {/* 11. Lead Capture / Final CTA */}
        <LeadForm />
      </main>

      {/* 11. Footer */}
      <Footer />

      {/* Mobile Sticky CTA */}
      <MobileCTA />

      {/* Free 1-Day Guest Pass Generator */}
      <FreePassModal />

      {/* Back To Top Button */}
      <BackToTop />
    </>
  );
}
