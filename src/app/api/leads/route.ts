import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email } = body;

    // Basic server-side validation
    if (!name || !phone || !email) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Log the lead (in production, send to CRM, email, or database)
    console.log("=== NEW LEAD ===");
    console.log(`Name:  ${name}`);
    console.log(`Phone: ${phone}`);
    console.log(`Email: ${email}`);
    console.log(`Time:  ${new Date().toISOString()}`);
    console.log("================");

    // For a real deployment, you could:
    // 1. Send an email notification via a free service (e.g., Resend free tier)
    // 2. Store in a free-tier database (e.g., Vercel KV, PlanetScale)
    // 3. Push to a Google Sheet via Apps Script webhook
    // All of these are optional and zero-cost.

    return NextResponse.json(
      { success: true, message: "Lead captured successfully" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
