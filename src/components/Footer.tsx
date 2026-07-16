"use client";

import Image from "next/image";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const quickLinks = [
  { label: "Programs", href: "#programs" },
  { label: "Schedule", href: "#schedule" },
  { label: "Trainers", href: "#trainers" },
  { label: "Pricing", href: "#pricing" },
  { label: "Reviews", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

const hours = [
  { days: "Monday – Friday", time: "5:00 AM – 11:00 PM" },
  { days: "Saturday", time: "6:00 AM – 10:00 PM" },
  { days: "Sunday", time: "7:00 AM – 8:00 PM" },
];

const socialLinks = [
  {
    label: "Instagram",
    href: "https://instagram.com/powerfitzone",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://facebook.com/powerfitzone",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://youtube.com/powerfitzone",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 001.94-2A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "https://tiktok.com/@powerfitzone",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.11V9a6.27 6.27 0 00-.79-.05A6.34 6.34 0 003.15 15.3a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V9.26a8.35 8.35 0 004.76 1.49v-3.4a4.85 4.85 0 01-1-.66z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const [ref, isVisible] = useScrollReveal<HTMLElement>({ threshold: 0.05 });

  return (
    <footer
      ref={ref}
      className="relative bg-brand-black pt-20 pb-8 overflow-hidden"
      role="contentinfo"
    >
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16 transition-all duration-1000 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          {/* Col 1: About + Social */}
          <div>
            <div className="flex items-center mb-6">
              <Image
                src="/images/logo.png"
                alt="Power Fitness Zone logo"
                width={120}
                height={48}
                className="h-12 w-auto object-contain"
                style={{ width: "auto", height: "auto" }}
              />
            </div>
            <p className="text-white/40 text-sm font-body leading-relaxed mb-6">
              Premium gym and training facility. Where discipline meets
              community — building stronger bodies and sharper minds since
              2016.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/5 flex items-center justify-center text-white/40 hover:bg-brand-red hover:text-white transition-all duration-300"
                  aria-label={`Follow us on ${social.label}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="font-display text-white text-sm font-bold uppercase tracking-wider mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-white/40 text-sm font-body hover:text-brand-red transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Hours */}
          <div>
            <h4 className="font-display text-white text-sm font-bold uppercase tracking-wider mb-6">
              Opening Hours
            </h4>
            <ul className="space-y-3">
              {hours.map((item) => (
                <li key={item.days}>
                  <span className="text-white/60 text-sm font-body block">
                    {item.days}
                  </span>
                  <span className="text-white/40 text-sm font-body">
                    {item.time}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div>
            <h4 className="font-display text-white text-sm font-bold uppercase tracking-wider mb-6">
              Contact Us
            </h4>
            <address className="not-italic space-y-3">
              <div className="text-white/40 text-sm font-body">
                <span className="text-white/60 block mb-0.5">Address</span>
                123 Fitness Boulevard, Block C
                <br />
                Lahore, Punjab 54000
              </div>
              <div className="text-white/40 text-sm font-body">
                <span className="text-white/60 block mb-0.5">Phone</span>
                <a
                  href="tel:+923001234567"
                  className="hover:text-brand-red transition-colors duration-300"
                >
                  +92 300 1234567
                </a>
              </div>
              <div className="text-white/40 text-sm font-body">
                <span className="text-white/60 block mb-0.5">Email</span>
                <a
                  href="mailto:info@powerfitzone.com"
                  className="hover:text-brand-red transition-colors duration-300"
                >
                  info@powerfitzone.com
                </a>
              </div>
            </address>
          </div>
        </div>

        {/* Map Embed */}
        <div
          className={`mb-12 transition-all duration-1000 delay-300 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <div className="relative w-full h-[250px] bg-brand-gray overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3402.5!2d74.3587!3d31.5204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDMxJzEzLjQiTiA3NMKwMjEnMzEuMyJF!5e0!3m2!1sen!2spk!4v1600000000000!5m2!1sen!2spk"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "grayscale(1) invert(1) contrast(0.8) opacity(0.5)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Power Fitness Zone location on Google Maps"
            />
            {/* Red overlay accent */}
            <div className="absolute top-0 left-0 w-1 h-full bg-brand-red" aria-hidden="true" />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs font-body">
            © {new Date().getFullYear()} Power Fitness Zone. All rights
            reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-white/30 text-xs font-body hover:text-white/60 transition-colors duration-300"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-white/30 text-xs font-body hover:text-white/60 transition-colors duration-300"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
