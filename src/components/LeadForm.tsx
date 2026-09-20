"use client";

import { useState, useEffect, type FormEvent } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import Button from "@/components/ui/Button";

interface FormData {
  name: string;
  phone: string;
  email: string;
  branch: string;
  goal: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
}

export default function LeadForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    branch: "F-8 Markaz Flagship",
    goal: "Weight Loss & Conditioning",
  });
  const [submittedLead, setSubmittedLead] = useState<FormData | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [ref, isVisible] = useScrollReveal<HTMLElement>({ threshold: 0.1 });

  useEffect(() => {
    try {
      const savedBranch = sessionStorage.getItem("pfz_branch");
      if (savedBranch === "g8") {
        setFormData((prev) => ({ ...prev, branch: "G-8 Community Center" }));
      } else if (savedBranch === "f10") {
        setFormData((prev) => ({ ...prev, branch: "F-10 Premium Club" }));
      } else if (savedBranch === "f8") {
        setFormData((prev) => ({ ...prev, branch: "F-8 Markaz Flagship" }));
      }
    } catch {
      // Ignore sessionStorage exceptions in private browsing
    }
  }, []);

  function validate(): FormErrors {
    const errs: FormErrors = {};
    if (!formData.name.trim()) errs.name = "Name is required";
    if (!formData.phone.trim()) errs.phone = "Phone number is required";
    else if (!/^[\d\s+\-()]{7,15}$/.test(formData.phone.trim()))
      errs.phone = "Enter a valid phone number";
    if (!formData.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim()))
      errs.email = "Enter a valid email address";
    return errs;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setStatus("submitting");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Failed to submit");
      setSubmittedLead({ ...formData });
      setStatus("success");
      setFormData({
        name: "",
        phone: "",
        email: "",
        branch: "F-8 Markaz Flagship",
        goal: "Weight Loss & Conditioning",
      });
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      id="contact"
      ref={ref}
      className="relative bg-brand-red py-24 sm:py-32 lg:py-40 overflow-hidden"
    >
      {/* Geometric accent */}
      <div
        className="absolute top-0 right-0 w-[40%] h-full bg-brand-red-dark/30 hidden lg:block"
        style={{ clipPath: "polygon(30% 0, 100% 0, 100% 100%, 0% 100%)" }}
        aria-hidden="true"
      />

      <div className="relative max-w-[1400px] mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Copy */}
          <div
            className={`transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-12"
            }`}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-[2px] bg-white/40" />
              <span className="text-white/80 text-xs font-semibold uppercase tracking-[0.25em] font-body">
                Get Started Today
              </span>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white uppercase leading-[0.95] mb-6">
              Start Your
              <br />
              Free Trial.
            </h2>

            <p className="text-white/70 text-lg font-body font-light leading-relaxed mb-8 max-w-md">
              No commitment. No pressure. Just one session to see why 500+
              members call Power Fitness Zone home. Fill out the form and
              we&apos;ll get you booked within 24 hours.
            </p>

            <div className="flex items-center gap-6 text-white/50 text-sm font-body">
              <div className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M3 8L6.5 11.5L13 4.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="square"
                  />
                </svg>
                No credit card
              </div>
              <div className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M3 8L6.5 11.5L13 4.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="square"
                  />
                </svg>
                Cancel anytime
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div
            className={`transition-all duration-1000 delay-200 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-12"
            }`}
          >
            {status === "success" ? (
              <div className="bg-white/10 backdrop-blur-sm p-8 sm:p-10 text-center border border-white/20">
                <div className="w-16 h-16 bg-white flex items-center justify-center mx-auto mb-6">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M3 8L6.5 11.5L13 4.5"
                      stroke="#D91E2A"
                      strokeWidth="2.5"
                      strokeLinecap="square"
                    />
                  </svg>
                </div>
                <h3 className="font-display text-2xl font-bold text-white uppercase mb-3">
                  You&apos;re In!
                </h3>
                <p className="text-white/80 font-body text-sm mb-6">
                  We&apos;ve registered your 1-day pass for <span className="text-yellow-300 font-bold">{submittedLead?.branch || "Islamabad"}</span>. Our membership concierge is ready to schedule your session!
                </p>
                {submittedLead && (
                  <a
                    href={`https://wa.me/923335557890?text=${encodeURIComponent(
                      `Hi Power Fitness Zone team! I just registered for a free trial pass on your website.\n\nName: ${submittedLead.name}\nBranch: ${submittedLead.branch}\nPrimary Goal: ${submittedLead.goal}\nPhone: ${submittedLead.phone}\n\nPlease confirm my workout slot!`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-emerald-900/40"
                  >
                    Chat with Concierge on WhatsApp
                  </a>
                )}
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white/10 backdrop-blur-sm p-8 sm:p-10 border border-white/20"
                noValidate
              >
                <div className="space-y-4">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="lead-name"
                      className="block text-white/80 text-xs font-semibold uppercase tracking-widest font-body mb-1.5"
                    >
                      Full Name
                    </label>
                    <input
                      id="lead-name"
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className={`w-full bg-white/10 border text-white placeholder-white/30 px-4 py-3 font-body text-sm focus:outline-none focus:border-white transition-colors duration-300 ${
                        errors.name
                          ? "border-yellow-300"
                          : "border-white/20 focus:border-white"
                      }`}
                      placeholder="e.g. Ahmed Khan"
                      autoComplete="name"
                    />
                    {errors.name && (
                      <p className="text-yellow-200 text-xs mt-1 font-body">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label
                      htmlFor="lead-phone"
                      className="block text-white/80 text-xs font-semibold uppercase tracking-widest font-body mb-1.5"
                    >
                      Phone Number
                    </label>
                    <input
                      id="lead-phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className={`w-full bg-white/10 border text-white placeholder-white/30 px-4 py-3 font-body text-sm focus:outline-none focus:border-white transition-colors duration-300 ${
                        errors.phone
                          ? "border-yellow-300"
                          : "border-white/20 focus:border-white"
                      }`}
                      placeholder="e.g. 0300 1234567"
                      autoComplete="tel"
                    />
                    {errors.phone && (
                      <p className="text-yellow-200 text-xs mt-1 font-body">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="lead-email"
                      className="block text-white/80 text-xs font-semibold uppercase tracking-widest font-body mb-1.5"
                    >
                      Email Address
                    </label>
                    <input
                      id="lead-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className={`w-full bg-white/10 border text-white placeholder-white/30 px-4 py-3 font-body text-sm focus:outline-none focus:border-white transition-colors duration-300 ${
                        errors.email
                          ? "border-yellow-300"
                          : "border-white/20 focus:border-white"
                      }`}
                      placeholder="e.g. ahmed@email.com"
                      autoComplete="email"
                    />
                    {errors.email && (
                      <p className="text-yellow-200 text-xs mt-1 font-body">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Branch & Goal Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="lead-branch"
                        className="block text-white/80 text-xs font-semibold uppercase tracking-widest font-body mb-1.5"
                      >
                        Preferred Branch
                      </label>
                      <select
                        id="lead-branch"
                        value={formData.branch}
                        onChange={(e) =>
                          setFormData({ ...formData, branch: e.target.value })
                        }
                        className="w-full bg-black/40 border border-white/20 text-white px-3 py-3 font-body text-xs focus:outline-none focus:border-white transition-colors"
                      >
                        <option value="F-8 Markaz Flagship" className="bg-neutral-900 text-white">F-8 Markaz Flagship</option>
                        <option value="G-8 Community Center" className="bg-neutral-900 text-white">G-8 Community Center</option>
                        <option value="F-10 Premium Club" className="bg-neutral-900 text-white">F-10 Premium Club</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="lead-goal"
                        className="block text-white/80 text-xs font-semibold uppercase tracking-widest font-body mb-1.5"
                      >
                        Fitness Goal
                      </label>
                      <select
                        id="lead-goal"
                        value={formData.goal}
                        onChange={(e) =>
                          setFormData({ ...formData, goal: e.target.value })
                        }
                        className="w-full bg-black/40 border border-white/20 text-white px-3 py-3 font-body text-xs focus:outline-none focus:border-white transition-colors"
                      >
                        <option value="Weight Loss & Conditioning" className="bg-neutral-900 text-white">Weight Loss & Conditioning</option>
                        <option value="Muscle Building & Hypertrophy" className="bg-neutral-900 text-white">Muscle Building & Hypertrophy</option>
                        <option value="Strength & Powerlifting" className="bg-neutral-900 text-white">Strength & Powerlifting</option>
                        <option value="Ladies Exclusive Training" className="bg-neutral-900 text-white">Ladies Exclusive Training</option>
                      </select>
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="white"
                  size="lg"
                  className="w-full mt-8"
                  disabled={status === "submitting"}
                >
                  {status === "submitting"
                    ? "Submitting..."
                    : "Claim Your Free Trial"}
                </Button>

                {status === "error" && (
                  <p className="text-yellow-200 text-xs text-center mt-3 font-body">
                    Something went wrong. Please try again.
                  </p>
                )}

                <p className="text-white/30 text-[11px] font-body text-center mt-4">
                  By submitting, you agree to receive communications from
                  Power Fitness Zone. We respect your privacy.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
