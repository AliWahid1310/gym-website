"use client";

import { useState } from "react";
import { faqs, FAQItem } from "@/data/faqs";

const categories: Array<"All" | FAQItem["category"]> = [
  "All",
  "General",
  "Membership",
  "Training",
  "Facilities",
];

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [openIndex, setOpenIndex] = useState<string | null>("faq-1");

  const filteredFaqs =
    activeCategory === "All"
      ? faqs
      : faqs.filter((faq) => faq.category === activeCategory);

  const toggleAccordion = (id: string) => {
    setOpenIndex((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-24 bg-[#0A0A0A] text-white relative">
      {/* Background glow */}
      <div className="absolute inset-0 bg-radial-glow opacity-30 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <span className="text-[#D91E2A] text-xs uppercase tracking-widest font-bold">
            Frequently Asked Questions
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-white mt-2 uppercase tracking-wide">
            Got Questions? We&apos;ve Got Answers
          </h2>
          <p className="text-neutral-400 mt-3 text-sm sm:text-base max-w-xl mx-auto">
            Everything you need to know about our memberships, training programs, timings, and world-class facilities.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                activeCategory === category
                  ? "bg-[#D91E2A] text-white shadow-md shadow-[#D91E2A]/30 scale-105"
                  : "bg-neutral-900 text-neutral-400 border border-neutral-800 hover:border-neutral-700 hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.map((faq) => {
            const isOpen = openIndex === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "bg-[#141414] border-[#D91E2A]/40 shadow-lg shadow-black/40"
                    : "bg-[#111111] border-neutral-800/80 hover:border-neutral-700"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <span className="font-semibold text-base sm:text-lg text-white pr-2">
                    {faq.question}
                  </span>
                  <span
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 ${
                      isOpen
                        ? "bg-[#D91E2A] border-[#D91E2A] text-white rotate-45"
                        : "bg-neutral-900 border-neutral-700 text-neutral-400 rotate-0"
                    }`}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </span>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-neutral-300 leading-relaxed border-t border-neutral-800/60 animate-fadeIn">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions CTA */}
        <div className="mt-12 text-center bg-neutral-950 border border-neutral-800 rounded-2xl p-6 sm:p-8">
          <p className="text-white font-medium text-base mb-1">
            Still have more questions?
          </p>
          <p className="text-neutral-400 text-xs sm:text-sm mb-4">
            Our fitness consultants are available 24/7 on WhatsApp or call.
          </p>
          <a
            href="https://wa.me/923001234567?text=Hi%2C%20I%20have%20a%20question%20about%20Power%20Fitness%20Zone"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#25D366] text-white font-semibold text-sm hover:bg-[#20bd5a] transition-colors shadow-md"
          >
            <svg
              className="w-4 h-4 fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
            </svg>
            Chat with an Advisor
          </a>
        </div>
      </div>
    </section>
  );
}
