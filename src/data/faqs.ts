export interface FAQItem {
  id: string;
  category: "General" | "Membership" | "Training" | "Facilities" | "Ladies";
  question: string;
  answer: string;
}

export const faqs: FAQItem[] = [
  {
    id: "faq-1",
    category: "General",
    question: "What are the gym opening hours?",
    answer:
      "We are open Monday through Saturday from 6:00 AM to 11:30 PM, and on Sundays from 10:00 AM to 8:00 PM. F-10 branch remains open until 12:00 midnight for night lifters.",
  },
  {
    id: "faq-2",
    category: "General",
    question: "Do you offer a free trial pass?",
    answer:
      "Yes! First-time visitors can generate an instant 1-day VIP trial pass directly on our website to test our equipment, locker facilities, and group classes with zero commitment.",
  },
  {
    id: "faq-3",
    category: "Ladies",
    question: "Are there dedicated female-only hours and private studios?",
    answer:
      "Yes! We offer dedicated women-only studio hours coached by certified female trainers with 100% privacy, private entry, and separate changing suites.",
  },
  {
    id: "faq-4",
    category: "Membership",
    question: "Can I freeze or pause my membership if I travel?",
    answer:
      "Yes. Pro and VIP members can freeze their membership for up to 30 days per calendar year in case of travel, exams, or medical reasons with zero penalty fees.",
  },
  {
    id: "faq-5",
    category: "Membership",
    question: "What payment methods do you accept?",
    answer:
      "We accept cash at desk, all major credit/debit cards (Visa, MasterCard, UnionPay), online bank transfers, and mobile wallets (JazzCash & EasyPaisa). Monthly installments are available for annual plans.",
  },
  {
    id: "faq-6",
    category: "Membership",
    question: "Do you offer Student & Corporate discounts?",
    answer:
      "Yes! We offer a 15% discount for active students with valid university/college IDs, and special group packages for corporate teams of 3+ members.",
  },
  {
    id: "faq-7",
    category: "Training",
    question: "Are certified personal trainers included in membership?",
    answer:
      "All members receive initial fitness assessments, body composition scans, and machine floor orientation. Dedicated 1-on-1 personal coaching is available in Pro/Elite plans.",
  },
  {
    id: "faq-8",
    category: "Training",
    question: "Do I need prior experience to join group classes?",
    answer:
      "Not at all! Our group fitness classes (HIIT, Boxing, Spinning, Calisthenics) are beginner-friendly with certified coaches offering scalable intensity options for all experience levels.",
  },
  {
    id: "faq-9",
    category: "Facilities",
    question: "Is there secure parking available at all branches?",
    answer:
      "Yes, we provide complimentary on-site parking and valet service across F-8, G-8, and F-10 locations in Islamabad with 24/7 CCTV surveillance.",
  },
  {
    id: "faq-10",
    category: "Facilities",
    question: "What hygiene and recovery facilities do you provide?",
    answer:
      "We offer electronic RFID lockers, luxury rain showers, traditional Finnish sauna, steam rooms, cold plunge, and medical-grade air filtration.",
  },
];
