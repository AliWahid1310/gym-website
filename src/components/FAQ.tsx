"use client";

import { useState } from "react";
import { faqs, FAQItem } from "@/data/faqs";

const categories: Array<"All" | FAQItem["category"]> = [
  "All",
  "General",
  "Ladies",
  "Membership",
  "Training",
  "Facilities",
];

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("" );
  const [openIds, setOpenIds] = useState<string[]>(["faq-1"]);
  const [copiedFaqId, setCopiedFaqId] = useState<string | null>(null);

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory = activeCategory === "All" || faq.category === activeCategory;
    const matchesSearch =
      searchQuery.trim() === "" ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleAccordion = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleExpandAll = () => {
    setOpenIds(filteredFaqs.map((f) => f.id));
  };

  const handleCollapseAll = () => {
    setOpenIds([]);
  };

  const handleCopyAnswer = (faq: FAQItem) => {
    navigator.clipboard.writeText(`Q: ${faq.question}\nA: ${faq.answer}`);
    setCopiedFaqId(faq.id);
    setTimeout(() => setCopiedFaqId(null), 2000);
  };

  return (
    <section id="faq" className="py-24 bg-[#0A0A0A] text-white relative">
      {/* Background glow */}
      <div className="absolute inset-0 bg-radial-glow opacity-30 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-10">
          <span className="text-[#D91E2A] text-xs uppercase tracking-widest font-bold">
            Frequently Asked Questions
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white mt-2 uppercase tracking-wide">
            Got Questions? We&apos;ve Got Answers
          </h2>
          <p className="text-neutral-400 mt-3 text-sm sm:text-base max-w-xl mx-auto">
            Everything you need to know about our memberships, ladies section, timings, trainers, and recovery facilities.
          </p>
        </div>

        {/* Real-time Search Filter Input */}
        <div className="relative max-w-xl mx-auto mb-8">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-400">
            🔍
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions (e.g., timings, ladies hours, fees, freeze)..."
            className="w-full pl-11 pr-4 py-3.5 bg-neutral-900 border border-neutral-800 rounded-2xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-red-500 transition-colors shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-xs text-neutral-400 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Pills & Expand/Collapse Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((category) => {
              const count =
                category === "All"
                  ? faqs.length
                  : faqs.filter((f) => f.category === category).length;
              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                    activeCategory === category
                      ? "bg-[#D91E2A] text-white shadow-md shadow-[#D91E2A]/30 scale-105"
                      : "bg-neutral-900 text-neutral-400 border border-neutral-800 hover:border-neutral-700 hover:text-white"
                  }`}
                >
                  <span>{category}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${activeCategory === category ? "bg-black/30 text-white" : "bg-neutral-800 text-neutral-400"}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 shrink-0 text-xs">
            <button
              onClick={handleExpandAll}
              className="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-800 transition"
            >
              Expand All
            </button>
            <button
              onClick={handleCollapseAll}
              className="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-800 transition"
            >
              Collapse All
            </button>
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3.5">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 bg-neutral-900/50 rounded-2xl border border-neutral-800">
              <p className="text-neutral-400 text-sm">
                No matching questions found for &ldquo;{searchQuery}&rdquo;.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("All");
                }}
                className="mt-3 text-xs text-red-400 font-bold hover:underline"
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = openIds.includes(faq.id);
              const isCopied = copiedFaqId === faq.id;

              return (
                <div
                  key={faq.id}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
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
                      <p>{faq.answer}</p>
                      <div className="mt-4 flex items-center justify-between pt-3 border-t border-neutral-800/40 text-xs">
                        <span className="text-neutral-500 font-mono">Category: {faq.category}</span>
                        <button
                          onClick={() => handleCopyAnswer(faq)}
                          className="text-neutral-400 hover:text-white transition flex items-center gap-1 font-medium"
                        >
                          {isCopied ? "✓ Copied to clipboard" : "📋 Copy answer"}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Still have questions CTA */}
        <div className="mt-12 text-center bg-neutral-950 border border-neutral-800 rounded-3xl p-6 sm:p-8">
          <p className="text-white font-bold text-base sm:text-lg mb-1">
            Didn&apos;t find your answer?
          </p>
          <p className="text-neutral-400 text-xs sm:text-sm mb-5">
            Our head coaches and front-desk team are ready to assist you right now.
          </p>
          <a
            href="https://wa.me/923001234567?text=Hi%20Power%20Fitness%20Zone!%20I%20have%20a%20question%20about%20your%20gym"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm transition-all shadow-lg shadow-emerald-900/30"
          >
            <span>💬 Chat Live with Head Coach on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}

