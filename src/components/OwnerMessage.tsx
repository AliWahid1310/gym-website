"use client";

import Image from "next/image";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function OwnerMessage() {
  const [ref, isVisible] = useScrollReveal<HTMLElement>({ threshold: 0.1 });

  return (
    <section
      id="owner"
      ref={ref}
      className="relative bg-brand-black py-24 sm:py-32 lg:py-40 overflow-hidden"
    >
      {/* Decorative red accent */}
      <div
        className="absolute top-0 right-0 w-[300px] h-[300px] bg-brand-red/5"
        style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
        aria-hidden="true"
      />

      <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-20 items-center">
          {/* Left: Owner Photo */}
          <div
            className={`lg:col-span-2 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-12"
            }`}
          >
            <div className="relative">
              {/* Red frame accent */}
              <div
                className="absolute -top-4 -left-4 w-full h-full border-2 border-brand-red"
                aria-hidden="true"
              />
              <div className="relative aspect-[4/5] overflow-hidden bg-brand-gray">
                <Image
                  src="/images/owner-portrait.jpg"
                  alt="Founder and owner of Power Fitness Zone"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                />
              </div>
            </div>
          </div>

          {/* Right: Message */}
          <div
            className={`lg:col-span-3 transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-12"
            }`}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-[2px] bg-brand-red" />
              <span className="text-brand-red text-xs font-semibold uppercase tracking-[0.25em] font-body">
                A Personal Message
              </span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white uppercase leading-[0.95] mb-8">
              From The
              <br />
              <span className="text-brand-red">Founder</span>
            </h2>

            <blockquote className="relative">
              <p className="text-white/70 text-lg sm:text-xl leading-relaxed font-body font-light mb-6">
                &ldquo;I started Power Fitness Zone because I was tired of
                gyms that treated members like numbers. I wanted to build a
                place where a first-timer gets the same respect and attention
                as someone deadlifting 200kg. A place where trainers are
                invested in your journey, not just your renewal date.&rdquo;
              </p>
              <p className="text-white/70 text-lg sm:text-xl leading-relaxed font-body font-light mb-8">
                &ldquo;Every piece of equipment, every program, every hire
                — it all comes back to one question: does this make our
                members better? If the answer isn&apos;t a clear yes, it
                doesn&apos;t make the cut. This gym is my life&apos;s work,
                and I want you to feel that the moment you walk in.&rdquo;
              </p>
            </blockquote>

            <div className="flex items-center gap-6">
              <div>
                {/* Signature placeholder — replace with SVG signature */}
                <span className="text-2xl text-white italic font-body" style={{ fontFamily: "Georgia, serif" }}>
                  Qaim
                </span>
                <span className="block text-white/40 text-xs font-body uppercase tracking-widest mt-1">
                  Founder &amp; CEO, Power Fitness Zone
                </span>
              </div>
            </div>

            <div className="w-20 h-[2px] bg-brand-red mt-8" />
          </div>
        </div>
      </div>
    </section>
  );
}
