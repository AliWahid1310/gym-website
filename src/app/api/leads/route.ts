import { NextResponse } from "next/server";

interface LeadPayload {
  name?: string;
  phone?: string;
  email?: string;
  branch?: string;
  goal?: string;
  website?: string; // honeypot field
  botField?: string; // honeypot field
}

// In-memory sliding rate limiter (prevents API spam)
const ipRequestTimestamps = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = ipRequestTimestamps.get(ip) || [];
  const validTimestamps = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (validTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    ipRequestTimestamps.set(ip, validTimestamps);
    return true;
  }

  validTimestamps.push(now);
  ipRequestTimestamps.set(ip, validTimestamps);
  return false;
}

export async function POST(request: Request) {
  try {
    // 1. IP extraction & rate limiting check
    const clientIp =
      request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      request.headers.get("x-real-ip") ||
      "127.0.0.1";

    if (isRateLimited(clientIp)) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a minute before submitting again." },
        { status: 429 }
      );
    }

    const body: LeadPayload = await request.json();
    const { name, phone, email, branch, goal, website, botField } = body;

    // 2. Honeypot check for bots
    if (website || botField) {
      // Silently accept to trap bots without disclosing detection
      return NextResponse.json(
        { success: true, message: "Lead captured successfully" },
        { status: 200 }
      );
    }

    // 3. Required fields validation
    if (!name?.trim() || !phone?.trim() || !email?.trim()) {
      return NextResponse.json(
        { error: "Name, phone number, and email address are required." },
        { status: 400 }
      );
    }

    if (name.trim().length < 2 || name.trim().length > 70) {
      return NextResponse.json(
        { error: "Please enter a valid name (2 to 70 characters)." },
        { status: 400 }
      );
    }

    // 4. Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // 5. Phone validation (clean numbers, plus international / local Pakistani 10-15 digits)
    const cleanedPhone = phone.replace(/[\s\-\(\)]/g, "");
    if (!/^\+?[0-9]{10,15}$/.test(cleanedPhone)) {
      return NextResponse.json(
        { error: "Please enter a valid phone number with digits (10-15 characters)." },
        { status: 400 }
      );
    }

    // 6. Structured lead record
    const leadRecord = {
      name: name.trim(),
      phone: cleanedPhone,
      email: email.trim().toLowerCase(),
      branch: branch?.trim() || "F-7 Markaz (Main)",
      goal: goal?.trim() || "General Fitness",
      ip: clientIp,
      submittedAt: new Date().toISOString(),
    };

    // Log the lead
    console.log("=== NEW VALIDATED LEAD ===");
    console.log(JSON.stringify(leadRecord, null, 2));
    console.log("==========================");

    return NextResponse.json(
      {
        success: true,
        message: "Your VIP pass inquiry has been submitted! Our concierge team will reach out shortly.",
        timestamp: leadRecord.submittedAt,
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}
