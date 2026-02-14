"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Bot, Send, X } from "lucide-react";
import VoiceListener from "./VoiceListener";
import VoiceSpeaker from "./VoiceSpeaker";
import { findBestMatch } from "@/lib/ai-config";
import { runCommand } from "./CommandProcessor";

type ChatMessage = {
  speaker: "user" | "ai";
  text: string;
};

type ContactDraft = {
  name: string;
  email: string;
  message: string;
};

export default function AIWaiter() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [conversation, setConversation] = useState<ChatMessage[]>([]);
  const [aiResponse, setAiResponse] = useState("");
  const [inputText, setInputText] = useState("");
  const conversationRef = useRef<ChatMessage[]>([]);
  const [isCollectingContact, setIsCollectingContact] = useState(false);
  const [contactStep, setContactStep] = useState<0 | 1 | 2>(0);
  const [contactDraft, setContactDraft] = useState<ContactDraft>({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited");
    if (!hasVisited) {
      setTimeout(() => {
        setIsOpen(true);
        setAiResponse(
          "Hello! I'm your assistant. Welcome to my portfolio! How can I guide you today?"
        );
        localStorage.setItem("hasVisited", "true");
      }, 1500);
    }
  }, []);

  useEffect(() => {
    conversationRef.current = conversation;
  }, [conversation]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === " ") {
        setIsOpen(true);
        setAiResponse("Hello! How can I assist you?");
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      if (!aiResponse) {
        setAiResponse("Hello! How can I assist you?");
      }
    };

    window.addEventListener("assistant:open", handleOpen);
    return () => window.removeEventListener("assistant:open", handleOpen);
  }, [aiResponse]);

  const requestAssistant = async (text: string, history: ChatMessage[]) => {
    const response = await fetch("/api/assistant", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: text,
        history: history.slice(-6),
      }),
    });

    if (!response.ok) {
      throw new Error("Assistant request failed.");
    }

    const data = (await response.json()) as { reply?: string };
    return data.reply?.trim() || "";
  };

  const startContactFlow = () => {
    setIsCollectingContact(true);
    setContactStep(0);
    setContactDraft({ name: "", email: "", message: "" });
    const prompt = "Sure — what is your name?";
    setAiResponse(prompt);
    setConversation((prev) => [...prev, { speaker: "ai", text: prompt }]);
  };

  const completeContactFlow = async (draft: ContactDraft) => {
    setIsThinking(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draft),
      });

      if (!response.ok) {
        throw new Error("Contact request failed.");
      }

      const confirm = "Message sent successfully.";
      setAiResponse(confirm);
      setConversation((prev) => [...prev, { speaker: "ai", text: confirm }]);
    } catch {
      const errorMsg =
        "Sorry, I couldn't send that message. Please try again.";
      setAiResponse(errorMsg);
      setConversation((prev) => [...prev, { speaker: "ai", text: errorMsg }]);
    } finally {
      setIsThinking(false);
      setIsCollectingContact(false);
      setContactStep(0);
      setContactDraft({ name: "", email: "", message: "" });
    }
  };

  const handleContactInput = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    if (trimmed.toLowerCase() === "cancel") {
      setIsCollectingContact(false);
      setContactStep(0);
      setContactDraft({ name: "", email: "", message: "" });
      const cancelMsg = "Contact request cancelled.";
      setAiResponse(cancelMsg);
      setConversation((prev) => [...prev, { speaker: "ai", text: cancelMsg }]);
      return;
    }

    if (contactStep === 0) {
      setContactDraft((prev) => ({ ...prev, name: trimmed }));
      setContactStep(1);
      const prompt = "Thanks. Please type your email address.";
      setAiResponse(prompt);
      setConversation((prev) => [...prev, { speaker: "ai", text: prompt }]);
      return;
    }

    if (contactStep === 1) {
      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
      if (!isValidEmail) {
        const prompt = "Please type a valid email address.";
        setAiResponse(prompt);
        setConversation((prev) => [...prev, { speaker: "ai", text: prompt }]);
        return;
      }
      setContactDraft((prev) => ({ ...prev, email: trimmed }));
      setContactStep(2);
      const prompt = "Got it. What message would you like to send?";
      setAiResponse(prompt);
      setConversation((prev) => [...prev, { speaker: "ai", text: prompt }]);
      return;
    }

    const nextDraft = { ...contactDraft, message: trimmed };
    setContactDraft(nextDraft);
    completeContactFlow(nextDraft);
  };

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    if (isCollectingContact) {
      const nextHistory: ChatMessage[] = [
        ...conversationRef.current,
        { speaker: "user", text: trimmed },
      ];
      setConversation(nextHistory);
      handleContactInput(trimmed);
      return;
    }
    const nextHistory: ChatMessage[] = [
      ...conversationRef.current,
      { speaker: "user", text: trimmed },
    ];
    setConversation(nextHistory);
    setIsThinking(true);

    try {
      if (/(contact|send message|reach out|email)/i.test(trimmed)) {
        setIsThinking(false);
        startContactFlow();
        return;
      }
      const reply = await requestAssistant(trimmed, nextHistory);
      if (reply) {
        setAiResponse(reply);
        setConversation((prev) => [...prev, { speaker: "ai", text: reply }]);
        setIsThinking(false);
        return;
      }
      throw new Error("Empty reply");
    } catch {
      const match = findBestMatch(trimmed);
      setAiResponse(match.response);
      setConversation((prev) => [...prev, { speaker: "ai", text: match.response }]);

      if (match.action) {
        setTimeout(() => runCommand({ response: match, router }), 800);
      }
    } finally {
      setIsThinking(false);
    }
  };

  const handleTranscript = async (text: string) => {
    await sendMessage(text);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await sendMessage(inputText);
    setInputText("");
  };

  const resetConversation = () => {
    setConversation([]);
    setAiResponse("");
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="assistant-fab"
        aria-label="Open Assistant"
      >
        <Bot className="assistant-fab-icon" />
      </button>
    );
  }

  return (
    <div
      className={`assistant-panel ${
        isListening || isThinking || isSpeaking ? "assistant-border-active" : ""
      }`}
    >
      <div className="assistant-header">
        <div className="assistant-header-main">
          <div className="assistant-badge">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <h3 className="assistant-title">Assistant</h3>
            <p className="assistant-subtitle">Your personal guide</p>
          </div>
        </div>
        <div className="assistant-actions">
          <button
            onClick={resetConversation}
            className="assistant-reset"
          >
            Reset
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="assistant-close"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="assistant-body">
        <div className="assistant-messages">
          {conversation.map((msg, index) => (
            <div
              key={`${msg.speaker}-${index}`}
              className={`assistant-message-row ${
                msg.speaker === "user"
                  ? "assistant-message-row-user"
                  : "assistant-message-row-ai"
              }`}
            >
              <div
                className={`assistant-message ${
                  msg.speaker === "user"
                    ? "assistant-message-user"
                    : "assistant-message-ai"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        <div className="assistant-footer">
          {isThinking && (
            <p className="assistant-thinking">
              Assistant is thinking...
            </p>
          )}

          {aiResponse && (
            <div className="mb-3">
              <VoiceSpeaker text={aiResponse} onSpeakingChange={setIsSpeaking} />
            </div>
          )}

          <form onSubmit={handleSubmit} className="assistant-form">
            <div
              className={`assistant-input-wrapper ${
                isCollectingContact && contactStep === 1
                  ? "assistant-input-waiting"
                  : ""
              }`}
            >
              <input
                value={inputText}
                onChange={(event) => setInputText(event.target.value)}
                placeholder="Type a message..."
                className="assistant-input"
              />
              <div className="assistant-input-actions">
                <VoiceListener
                  compact
                  onTranscript={handleTranscript}
                  onListeningChange={setIsListening}
                  className="assistant-mic"
                  iconClassName="assistant-mic-icon"
                />
                <button
                  type="submit"
                  disabled={isThinking || !inputText.trim()}
                  className="assistant-send"
                  aria-label="Send message"
                >
                  <Send className="assistant-send-icon" />
                </button>
              </div>
            </div>
          </form>

          <div className="assistant-status">
            <div className="assistant-status-item">
              <span
                className={`assistant-status-dot ${
                  isListening ? "animate-pulse bg-red-500" : "bg-gray-300"
                }`}
              />
              {isListening ? "Listening" : "Ready"}
            </div>
            <div className="assistant-status-item">
              <span
                className={`assistant-status-dot ${
                  isSpeaking ? "animate-pulse bg-green-500" : "bg-gray-300"
                }`}
              />
              {isSpeaking ? "Speaking" : "Silent"}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
