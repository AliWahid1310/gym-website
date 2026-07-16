"use client";

import { useState, type FormEvent } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import Button from "@/components/ui/Button";

interface FormData {
  name: string;
  phone: string;
  email: string;
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
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [ref, isVisible] = useScrollReveal<HTMLElement>({ threshold: 0.1 });

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
      setStatus("success");
      setFormData({ name: "", phone: "", email: "" });
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
              <div className="bg-white/10 backdrop-blur-sm p-10 text-center border border-white/20">
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
                <p className="text-white/70 font-body text-sm">
                  We&apos;ll be in touch within 24 hours to book your free
                  trial class. Get ready to work.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white/10 backdrop-blur-sm p-8 sm:p-10 border border-white/20"
                noValidate
              >
                <div className="space-y-5">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="lead-name"
                      className="block text-white/80 text-xs font-semibold uppercase tracking-widest font-body mb-2"
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
                      className={`w-full bg-white/10 border text-white placeholder-white/30 px-5 py-3.5 font-body text-sm focus:outline-none focus:border-white transition-colors duration-300 ${
                        errors.name
                          ? "border-yellow-300"
                          : "border-white/20 focus:border-white"
                      }`}
                      placeholder="e.g. Ahmed Khan"
                      autoComplete="name"
                    />
                    {errors.name && (
                      <p className="text-yellow-200 text-xs mt-1.5 font-body">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label
                      htmlFor="lead-phone"
                      className="block text-white/80 text-xs font-semibold uppercase tracking-widest font-body mb-2"
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
                      className={`w-full bg-white/10 border text-white placeholder-white/30 px-5 py-3.5 font-body text-sm focus:outline-none focus:border-white transition-colors duration-300 ${
                        errors.phone
                          ? "border-yellow-300"
                          : "border-white/20 focus:border-white"
                      }`}
                      placeholder="e.g. 0300 1234567"
                      autoComplete="tel"
                    />
                    {errors.phone && (
                      <p className="text-yellow-200 text-xs mt-1.5 font-body">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="lead-email"
                      className="block text-white/80 text-xs font-semibold uppercase tracking-widest font-body mb-2"
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
                      className={`w-full bg-white/10 border text-white placeholder-white/30 px-5 py-3.5 font-body text-sm focus:outline-none focus:border-white transition-colors duration-300 ${
                        errors.email
                          ? "border-yellow-300"
                          : "border-white/20 focus:border-white"
                      }`}
                      placeholder="e.g. ahmed@email.com"
                      autoComplete="email"
                    />
                    {errors.email && (
                      <p className="text-yellow-200 text-xs mt-1.5 font-body">
                        {errors.email}
                      </p>
                    )}
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
