export interface AIResponse {
  id: string;
  keywords: string[];
  response: string;
  action?: "navigate" | "scroll" | "highlight";
  target?: string;
}

// Keeping name for compatibility with component imports.

export const AI_RULES: AIResponse[] = [
  {
    id: "greeting_hello",
    keywords: ["hello", "hi", "hey", "greetings"],
    response:
      "Hello! I'm your assistant. Welcome to my portfolio! How can I guide you today?",
  },
  {
    id: "greeting_welcome",
    keywords: ["welcome", "introduce", "who are you"],
    response:
      "I'm your assistant, here to help you navigate this portfolio and find what you need.",
  },
  {
    id: "nav_projects",
    keywords: ["projects", "work", "github", "portfolio", "show me your work"],
    response:
      "My projects are in the Projects section. Would you like me to take you there?",
    action: "navigate",
    target: "/projects",
  },
  {
    id: "nav_cv",
    keywords: ["resume", "cv", "experience", "background", "education"],
    response:
      "My professional experience is detailed in the CV section. Let me show you.",
    action: "navigate",
    target: "/cv",
  },
  {
    id: "nav_contact",
    keywords: ["contact", "email", "reach out", "get in touch"],
    response:
      "You can find my contact information in the Contact section. I'll take you there.",
    action: "navigate",
    target: "/contact",
  },
  {
    id: "contact_send_message",
    keywords: [
      "send a message",
      "send message",
      "message you",
      "contact you",
      "contact form",
      "leave a message",
    ],
    response:
      "I can help you send a message. Tell me you want to contact us and I’ll collect your name, email, and message.",
  },
  {
    id: "nav_home",
    keywords: ["home", "main page", "go back"],
    response: "Taking you back to the homepage.",
    action: "navigate",
    target: "/",
  },
  {
    id: "help_what_can_you_do",
    keywords: ["what can you do", "help", "assist", "capabilities"],
    response:
      "I can guide you through this portfolio, navigate between sections, explain projects, and help you find information. Just ask!",
  },
  {
    id: "help_how_to_use",
    keywords: ["how to use", "instructions", "guide me"],
    response:
      'Simply speak naturally! Try "Show me your projects", "Take me to your CV", or "I want to send a message".',
  },
  {
    id: "fun_weather",
    keywords: ["weather", "temperature", "cold", "hot"],
    response:
      "I'm always at room temperature here in the digital world! Perfect conditions for browsing portfolios.",
  },
  {
    id: "fun_time",
    keywords: ["time", "what time", "clock"],
    response:
      "It's always the right time to explore great portfolios! But technically, I don't have access to a real-time clock.",
  },
  {
    id: "fallback",
    keywords: [],
    response:
      "I'm here to help you navigate this website. You can ask me about projects, CV, contact information, or how to use this site.",
  },
];

export function findBestMatch(input: string): AIResponse {
  const lowerInput = input.toLowerCase();

  for (const rule of AI_RULES) {
    for (const keyword of rule.keywords) {
      if (lowerInput.includes(keyword.toLowerCase())) {
        return rule;
      }
    }
  }

  return AI_RULES.find((rule) => rule.id === "fallback") || AI_RULES[0];
}
