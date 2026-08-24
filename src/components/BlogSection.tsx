"use client";

import { useState } from "react";
import { articlesData, Article } from "@/data/articles";

export default function BlogSection() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [filter, setFilter] = useState<string>("All");

  const categories = ["All", "Nutrition", "Strength", "Cardio"];

  const filteredArticles = articlesData.filter(
    (a) => filter === "All" || a.category === filter
  );

  return (
    <section id="blog" className="py-24 bg-[#0A0A0A] text-white relative border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-red-950/80 text-red-400 border border-red-800/50 mb-4">
            Knowledge & Training Science
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            Fitness Insights & <span className="text-red-500">Guides</span>
          </h2>
          <p className="mt-4 text-neutral-400 text-base sm:text-lg">
            Evidence-based fitness, diet strategies, and technique breakdowns curated by our certified coaches.
          </p>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all border ${
                  filter === cat
                    ? "bg-red-600 border-red-500 text-white shadow-md shadow-red-600/30"
                    : "bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Article Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              className="bg-neutral-900/90 border border-neutral-800 rounded-3xl p-6 sm:p-7 flex flex-col justify-between hover:border-red-600/60 transition-all duration-300 group hover:-translate-y-1 shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="px-3 py-1 bg-red-950/70 text-red-400 text-xs font-bold rounded-full border border-red-800/40">
                    {article.category}
                  </span>
                  <span className="text-xs text-neutral-500 font-mono">{article.readTime}</span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-red-400 transition-colors leading-snug mb-3">
                  {article.title}
                </h3>

                <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed mb-6">
                  {article.excerpt}
                </p>
              </div>

              <div>
                <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between mb-4">
                  <div className="text-xs">
                    <span className="text-white font-semibold block">{article.author.name}</span>
                    <span className="text-neutral-500">{article.author.role}</span>
                  </div>
                  <span className="text-xs text-neutral-500">{article.date}</span>
                </div>

                <button
                  onClick={() => setSelectedArticle(article)}
                  className="w-full py-2.5 bg-neutral-800 hover:bg-red-600 text-neutral-200 hover:text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5"
                >
                  Read Full Guide →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Article Reader Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl">
            <div className="p-6 sm:p-8 max-h-[85vh] overflow-y-auto">
              <div className="flex items-center justify-between gap-4 mb-4">
                <span className="px-3 py-1 bg-red-950 text-red-400 text-xs font-bold rounded-full border border-red-800/50">
                  {selectedArticle.category} • {selectedArticle.readTime}
                </span>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-neutral-700 text-white font-bold flex items-center justify-center text-lg transition-colors"
                >
                  ×
                </button>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4 leading-snug">
                {selectedArticle.title}
              </h2>

              <div className="flex items-center gap-3 pb-6 border-b border-neutral-800 text-xs text-neutral-400">
                <span>By <strong className="text-neutral-200">{selectedArticle.author.name}</strong> ({selectedArticle.author.role})</span>
                <span>•</span>
                <span>{selectedArticle.date}</span>
              </div>

              {/* Key Takeaways */}
              <div className="my-6 p-4 rounded-2xl bg-red-950/30 border border-red-800/40">
                <h4 className="text-xs font-bold uppercase tracking-wider text-red-400 mb-2">Key Takeaways:</h4>
                <ul className="space-y-1.5 text-xs sm:text-sm text-neutral-300">
                  {selectedArticle.takeaways.map((t, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-red-500 font-bold">⚡</span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Article Content */}
              <div className="space-y-4 text-sm sm:text-base text-neutral-300 leading-relaxed">
                {selectedArticle.content.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-neutral-800 flex justify-end">
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-red-600/30"
                >
                  Close Reader
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
