import { NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import path from "node:path";

type ChatMessage = {
  speaker: "user" | "ai";
  text: string;
};

const GEMINI_MODEL = "gemini-1.5-flash";
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;
const SITE_CONTEXT_HEADER = `
You are the assistant for the Snergize Studio portfolio site.
Tone: professional, concise, helpful.
Behavior:
- Answer questions using only the site data provided below.
- If the answer is not in the data, say you don't have that info yet.
- Keep responses short and relevant.
- Do not greet unless the user greets first.
`;

type SiteInfo = {
  brand?: {
    name?: string;
    tagline?: string;
    founder?: string;
  };
  sections?: {
    projects?: { description?: string; tabs?: string[] };
    timeline?: Array<{ year?: string }>;
    about?: { summary?: string; pillars?: string[] };
    contact?: {
      headline?: string;
      summary?: string;
      email?: string;
      phone?: string;
      location?: string;
      availability?: string;
    };
  };
  links?: {
    github?: string;
  };
};

const buildSiteAnswer = (message: string, siteInfo: SiteInfo) => {
  const lower = message.toLowerCase();
  const brand = siteInfo?.brand ?? {};
  const contact = siteInfo?.sections?.contact ?? {};
  const about = siteInfo?.sections?.about ?? {};
  const projects = siteInfo?.sections?.projects ?? {};
  const timeline = siteInfo?.sections?.timeline ?? [];
  const github = siteInfo?.links?.github;

  if (/\b(founder|ceo|owner|who runs|who is behind)\b/.test(lower)) {
    return brand?.founder
      ? `The founder is ${brand.founder}.`
      : "I don't have that info yet.";
  }

  if (/\b(location|address|where are you)\b/.test(lower)) {
    return contact?.location
      ? `We are based in ${contact.location}.`
      : "I don't have that info yet.";
  }

  if (/\b(phone|call|contact number|number)\b/.test(lower)) {
    return contact?.phone
      ? `You can reach us at ${contact.phone}.`
      : "I don't have that info yet.";
  }

  if (/\b(email|mail)\b/.test(lower)) {
    return contact?.email
      ? `You can email us at ${contact.email}.`
      : "I don't have that info yet.";
  }

  if (/\b(services|what do you do|offerings)\b/.test(lower)) {
    const pillars = about?.pillars?.join(", ");
    return pillars
      ? `We offer ${pillars}.`
      : "I don't have that info yet.";
  }

  if (/\b(projects|work|portfolio)\b/.test(lower)) {
    const tabs = projects?.tabs?.join(" and ");
    return tabs
      ? `The Projects section has ${tabs} tabs for hosted case studies and GitHub repos.`
      : "You can explore projects in the Projects section.";
  }

  if (/\b(timeline|journey|highlights|history)\b/.test(lower)) {
    if (Array.isArray(timeline) && timeline.length > 0) {
      const years = timeline.map((item) => item.year).join(", ");
      return `Timeline highlights include ${years}.`;
    }
    return "I don't have that info yet.";
  }

  if (/\b(about|who are you|company)\b/.test(lower)) {
    return about?.summary
      ? about.summary
      : "We are Snergize Studio, a professional IT services and product engineering team.";
  }

  if (/\b(github|repository|repo)\b/.test(lower)) {
    return github
      ? `Our GitHub is ${github}.`
      : "I don't have that info yet.";
  }

  return null;
};

export async function POST(request: Request) {
  try {
    const { message, history } = (await request.json()) as {
      message?: string;
      history?: ChatMessage[];
    };

    if (!message) {
      return NextResponse.json(
        { error: "Message is required." },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Missing GEMINI_API_KEY." },
        { status: 500 }
      );
    }

    const contents = [
      ...(history ?? []).map((entry) => ({
        role: entry.speaker === "user" ? "user" : "model",
        parts: [{ text: entry.text }],
      })),
      {
        role: "user",
        parts: [{ text: message }],
      },
    ];

    const siteInfoPath = path.join(process.cwd(), "src", "data", "site-info.json");
    const siteInfoRaw = await readFile(siteInfoPath, "utf-8");
    const siteInfo = JSON.parse(siteInfoRaw);
    const siteContext = `${SITE_CONTEXT_HEADER}\nSite data:\n${JSON.stringify(
      siteInfo,
      null,
      2
    )}`;

    const lowerMessage = message.toLowerCase();
    const directAnswer = buildSiteAnswer(message, siteInfo);
    if (directAnswer) {
      return NextResponse.json({ reply: directAnswer });
    }

    const response = await fetch(`${GEMINI_ENDPOINT}?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: {
          role: "system",
          parts: [{ text: siteContext }],
        },
        contents,
        generationConfig: {
          temperature: 0.4,
          maxOutputTokens: 400,
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: errorText || "Gemini request failed." },
        { status: response.status }
      );
    }

    const data = (await response.json()) as {
      candidates?: Array<{
        content?: { parts?: Array<{ text?: string }> };
      }>;
    };

    let reply = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";
    const isGreeting =
      /\b(hello|hi|hey|greetings|good morning|good afternoon|good evening)\b/.test(
        lowerMessage
      );

    if (!isGreeting && reply.toLowerCase().includes("welcome to my portfolio")) {
      reply =
        "I can help with sections like Projects, Timeline, About, and Contact. What would you like to know?";
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Assistant API error:", error);
    return NextResponse.json(
      { error: "Unexpected error." },
      { status: 500 }
    );
  }
}
