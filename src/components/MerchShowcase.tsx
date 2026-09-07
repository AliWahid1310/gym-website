"use client";

import { useState } from "react";
import { merchData, MerchItem } from "@/data/merch";

export default function MerchShowcase() {
  const [filter, setFilter] = useState<string>("all");
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({
    "pump-cover-tee": "L (Oversized)",
    "leather-lever-belt": "Medium (32-36 in)",
    "whey-isolate": "Rich Chocolate Fudge",
    "creatine-monohydrate": "Unflavored 200-Mesh",
    "pre-workout-ignite": "Sour Green Apple",
    "steel-shaker": "Matte Stealth Black",
  });

  const filteredItems = merchData.filter(
    (item) => filter === "all" || item.category === filter
  );

  const getVariants = (item: MerchItem) => {
    if (item.category === "apparel") {
      return ["M (Athletic)", "L (Oversized)", "XL (Loose)", "XXL (Heavy Drop)"];
    } else if (item.id === "leather-lever-belt") {
      return ["Small (28-32 in)", "Medium (32-36 in)", "Large (36-40 in)"];
    } else if (item.category === "supplements") {
      if (item.id === "whey-isolate") return ["Rich Chocolate Fudge", "Vanilla Ice Cream", "Gourmet Strawberry"];
      if (item.id === "pre-workout-ignite") return ["Sour Green Apple", "Blue Raspberry", "Watermelon Surge"];
      return ["Unflavored 200-Mesh"];
    }
    return ["Matte Stealth Black", "Crimson Red Edition"];
  };

  const setVariant = (itemId: string, variant: string) => {
    setSelectedVariants((prev) => ({ ...prev, [itemId]: variant }));
  };

  const getWhatsAppOrderLink = (item: MerchItem) => {
    const variant = selectedVariants[item.id] || "Standard";
    const msg = encodeURIComponent(
      `Hi Power Fitness Zone! I would like to reserve merchandise at the front desk:\n\n🛍️ Product: ${item.name}\n🏷️ Selected Option: ${variant}\n💰 Price: PKR ${item.pricePKR.toLocaleString("en-PK")}\n\nPlease confirm availability for pickup today!`
    );
    return `https://wa.me/923001234567?text=${msg}`;
  };

  return (
    <section id="merchandise" className="py-24 bg-[#0A0A0A] text-white relative overflow-hidden border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-red-950/80 text-red-400 border border-red-800/50 mb-4">
            Official Brand Store
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight font-display">
            Gym Gear & <span className="text-red-500">Pure Supplements</span>
          </h2>
          <p className="mt-4 text-neutral-400 text-base sm:text-lg font-body">
            High-grade lifting accessories, apparel, and third-party certified supplements available for immediate counter pickup.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {[
              { id: "all", label: "All Items" },
              { id: "apparel", label: "👕 Apparel" },
              { id: "gear", label: "🏋️ Lifting Gear" },
              { id: "supplements", label: "⚡ Supplements" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${
                  filter === tab.id
                    ? "bg-red-600 border-red-500 text-white shadow-md shadow-red-600/30"
                    : "bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => {
            const variants = getVariants(item);
            const currentVariant = selectedVariants[item.id] || variants[0];

            return (
              <div
                key={item.id}
                className="bg-neutral-900/90 border border-neutral-800/90 rounded-3xl p-6 sm:p-7 flex flex-col justify-between hover:border-red-600/50 transition-all duration-300 group hover:-translate-y-1 shadow-xl relative"
              >
                {item.tag && (
                  <span className="absolute top-5 right-5 text-[10px] font-black uppercase px-2.5 py-1 bg-red-600 text-white rounded-full tracking-wider shadow">
                    {item.tag}
                  </span>
                )}

                <div>
                  <span className="text-xs uppercase font-bold text-red-400 tracking-wider block mb-2">
                    {item.categoryLabel}
                  </span>
                  <h3 className="text-xl font-bold text-white group-hover:text-red-400 transition-colors leading-snug mb-3">
                    {item.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-400 mb-5 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Variant Selection Chips */}
                  <div className="mb-5">
                    <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block mb-2">
                      Choose Option: <strong className="text-white normal-case">{currentVariant}</strong>
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {variants.map((v) => (
                        <button
                          key={v}
                          type="button"
                          onClick={() => setVariant(item.id, v)}
                          className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg transition-colors border ${
                            currentVariant === v
                              ? "bg-red-600/30 border-red-500 text-red-300"
                              : "bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200"
                          }`}
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5 mb-6 pt-4 border-t border-neutral-800">
                    {item.specs.map((spec, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-neutral-300">
                        <span className="text-red-500 font-bold">✓</span>
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between py-4 border-t border-neutral-800 mb-4">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-neutral-500 block">Price</span>
                      <span className="text-xl font-mono font-black text-white">
                        PKR {item.pricePKR.toLocaleString("en-PK")}
                      </span>
                    </div>
                    <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
                      In Stock at Counter
                    </span>
                  </div>

                  <a
                    href={getWhatsAppOrderLink(item)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 bg-neutral-800 group-hover:bg-red-600 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 shadow-md"
                  >
                    💬 Reserve on WhatsApp
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

