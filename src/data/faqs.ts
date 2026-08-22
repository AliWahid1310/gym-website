export interface FAQItem {
  id: string;
  category: "General" | "Membership" | "Training" | "Facilities";
  question: string;
  answer: string;
}

export const faqs: FAQItem[] = [
  {
    id: "faq-1",
    category: "General",
    question: "What are the gym opening hours?",
    answer:
      "We are open Monday through Saturday from 6:00 AM to 11:00 PM, and on Sundays from 8:00 AM to 8:00 PM. Dedicated women-only slots are available from 10:00 AM to 1:00 PM on Monday, Wednesday, and Friday.",
  },
  {
    id: "faq-2",
    category: "General",
    question: "Do you offer a free trial pass?",
    answer:
      "Yes! First-time visitors can claim a 1-day free trial pass to experience our equipment, locker facilities, and group classes with zero commitment. Just submit your details via our online lead form.",
  },
  {
    id: "faq-3",
    category: "Membership",
    question: "Can I freeze or pause my membership?",
    answer:
      "Yes. Pro and VIP members can freeze their membership for up to 30 days per calendar year in case of travel, medical reasons, or emergencies without any extra charges.",
  },
  {
    id: "faq-4",
    category: "Membership",
    question: "What payment methods do you accept?",
    answer:
      "We accept cash, all major credit/debit cards (Visa, MasterCard, UnionPay), online bank transfers, and mobile wallets (JazzCash & EasyPaisa). Monthly installments are available for annual packages.",
  },
  {
    id: "faq-5",
    category: "Training",
    question: "Are certified personal trainers included in membership?",
    answer:
      "Basic floor assistance and initial fitness assessments are included for all members. Dedicated 1-on-1 personal training packages with customized workout & nutrition plans are available as add-ons or included in the VIP Elite tier.",
  },
  {
    id: "faq-6",
    category: "Training",
    question: "Do I need prior experience to join group classes?",
    answer:
      "Not at all! Our group fitness classes (HIIT, Yoga, Boxing, Spinning) cater to all fitness levels with modified progressions provided by our certified instructors for beginners.",
  },
  {
    id: "faq-7",
    category: "Facilities",
    question: "Is there dedicated parking available?",
    answer:
      "Yes, we provide free on-site valet and secure parking for all members and visitors across both our Model Town and DHA branches.",
  },
  {
    id: "faq-8",
    category: "Facilities",
    question: "What hygiene and locker room facilities do you provide?",
    answer:
      "We offer electronic RFID lockers, luxury rain showers, steam/sauna rooms, filtered drinking water stations, and continuous air purification systems.",
  },
];
