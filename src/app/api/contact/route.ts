import { NextResponse } from "next/server";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";

type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
};

const getEnvVar = async (key: string) => {
  const direct = process.env[key]?.trim();
  if (direct) return direct;

  try {
    const envPath = path.join(process.cwd(), ".env.local");
    const raw = await readFile(envPath, "utf-8");
    const line = raw
      .split(/\r?\n/)
      .map((entry) => entry.trim())
      .find((entry) => entry.startsWith(`${key}=`));
    if (!line) return undefined;
    return line.replace(`${key}=`, "").replace(/^"|"$/g, "").trim();
  } catch {
    return undefined;
  }
};

export async function POST(request: Request) {
  try {
    const { name, email, message } = (await request.json()) as ContactPayload;

    const dataDir = path.join(process.cwd(), "src", "data");
    const filePath = path.join(dataDir, "contact-messages.json");
    await mkdir(dataDir, { recursive: true });

    const newEntry = {
      id: crypto.randomUUID(),
      name,
      email,
      message,
      createdAt: new Date().toISOString(),
    };

    let existing: typeof newEntry[] = [];
    try {
      const raw = await readFile(filePath, "utf-8");
      existing = JSON.parse(raw) as typeof newEntry[];
    } catch {
      existing = [];
    }

    existing.push(newEntry);
    await writeFile(filePath, JSON.stringify(existing, null, 2), "utf-8");

    const resendApiKey =
      (await getEnvVar("RESEND_API_KEY")) ||
      (await getEnvVar("NEXT_PUBLIC_RESEND_API_KEY"));
    const toEmail = process.env.CONTACT_TO_EMAIL || "studiosynergize@gmail.com";
    const fromEmail =
      process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev";

    if (resendApiKey) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [toEmail],
          subject: `New contact message from ${name}`,
          text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
          reply_to: email,
        }),
      });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Unexpected error." },
      { status: 500 }
    );
  }
}
