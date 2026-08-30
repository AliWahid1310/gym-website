import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import SectionDivider from "@/components/SectionDivider";
import Programs from "@/components/Programs";
import WorkoutGenerator from "@/components/WorkoutGenerator";
import IntervalTimer from "@/components/IntervalTimer";
import Schedule from "@/components/Schedule";
import GymLiveTracker from "@/components/GymLiveTracker";
import Trainers from "@/components/Trainers";
import CoachFinder from "@/components/CoachFinder";
import EquipmentGuide from "@/components/EquipmentGuide";
import Pricing from "@/components/Pricing";
import MembershipQuiz from "@/components/MembershipQuiz";
import MerchShowcase from "@/components/MerchShowcase";
import SupplementBuilder from "@/components/SupplementBuilder";
import MealPlanner from "@/components/MealPlanner";
import ProteinCostCalculator from "@/components/ProteinCostCalculator";
import BmiCalculator from "@/components/BmiCalculator";
import MacroCalculator from "@/components/MacroCalculator";
import OneRepMaxCalculator from "@/components/OneRepMaxCalculator";
import ProgressiveOverloadCalculator from "@/components/ProgressiveOverloadCalculator";
import CalorieBurnCalculator from "@/components/CalorieBurnCalculator";
import HydrationCalculator from "@/components/HydrationCalculator";
import BodyFatCalculator from "@/components/BodyFatCalculator";
import RecoveryTracker from "@/components/RecoveryTracker";
import FitnessGoalTimeline from "@/components/FitnessGoalTimeline";
import ChallengesSection from "@/components/ChallengesSection";
import GymEtiquetteGuide from "@/components/GymEtiquetteGuide";
import Amenities from "@/components/Amenities";
import BranchExplorer from "@/components/BranchExplorer";
import VirtualTour from "@/components/VirtualTour";
import Transformations from "@/components/Transformations";
import GymPlaylist from "@/components/GymPlaylist";
import Testimonials from "@/components/Testimonials";
import OwnerMessage from "@/components/OwnerMessage";
import ReferralProgram from "@/components/ReferralProgram";
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

        {/* HIIT & Tabata Gym Interval Training Timer */}
        <IntervalTimer />

        {/* Divider: White → Off-white */}
        <SectionDivider from="#FFFFFF" to="#F5F5F5" direction="left" height={60} />

        {/* 4. Class Schedule */}
        <Schedule />

        {/* Live Gym Capacity & Peak Hours Tracker */}
        <GymLiveTracker />

        {/* Divider: Off-white → Dark */}
        <SectionDivider from="#F5F5F5" to="#0A0A0A" direction="right" height={80} />

        {/* 5. Trainer Profiles */}
        <Trainers />

        {/* AI Coach Matcher Quiz */}
        <CoachFinder />

        {/* Commercial Gym Equipment & Technique Guide */}
        <EquipmentGuide />

        {/* Divider: Dark → White */}
        <SectionDivider from="#0A0A0A" to="#FFFFFF" direction="left" height={80} />

        {/* 6. Membership / Pricing */}
        <Pricing />

        {/* Interactive Membership Plan Finder & ROI Calculator */}
        <MembershipQuiz />

        {/* Official Merch & Certified Supplements */}
        <MerchShowcase />

        {/* Custom Supplement Stack Builder */}
        <SupplementBuilder />

        {/* Pakistani Gym Fuel & Meal Planner */}
        <MealPlanner />
        <ProteinCostCalculator />

        {/* Interactive Fitness Calculation & Performance Suite */}
        <BmiCalculator />
        <MacroCalculator />
        <OneRepMaxCalculator />
        <ProgressiveOverloadCalculator />
        <CalorieBurnCalculator />
        <HydrationCalculator />
        <BodyFatCalculator />
        <RecoveryTracker />
        <FitnessGoalTimeline />

        {/* Monthly Member Challenges & Badges */}
        <ChallengesSection />
        <GymEtiquetteGuide />

        {/* 7. Premium Amenities */}
        <Amenities />

        {/* Islamabad Branch Explorer */}
        <BranchExplorer />

        {/* 8. Virtual Tour */}
        <VirtualTour />

        {/* Member Transformations */}
        <Transformations />

        {/* Workout Energy Audio Beats */}
        <GymPlaylist />

        {/* Divider: Dark → Off-white */}
        <SectionDivider from="#0A0A0A" to="#F5F5F5" direction="right" height={60} />

        {/* 8. Testimonials */}
        <Testimonials />

        {/* Divider: Off-white → Dark */}
        <SectionDivider from="#F5F5F5" to="#0A0A0A" direction="left" height={80} />

        {/* 9. Message from the Owner */}
        <OwnerMessage />

        {/* Member Referral Program */}
        <ReferralProgram />

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
