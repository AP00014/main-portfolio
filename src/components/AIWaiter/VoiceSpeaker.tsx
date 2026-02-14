"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

interface VoiceSpeakerProps {
  text: string;
  onSpeakingChange?: (isSpeaking: boolean) => void;
  autoSpeak?: boolean;
}

export default function VoiceSpeaker({
  text,
  onSpeakingChange,
  autoSpeak = true,
}: VoiceSpeakerProps) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const lastSpokenRef = useRef<string>("");

  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      setIsSupported(true);
      const loadVoices = () => {
        setVoices(window.speechSynthesis.getVoices());
      };
      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  const pickFemaleVoice = (availableVoices: SpeechSynthesisVoice[]) => {
    const femaleKeywords = [
      "female",
      "woman",
      "zira",
      "susan",
      "samantha",
      "victoria",
      "karen",
      "lisa",
      "julie",
      "google uk english female",
      "google us english female",
    ];

    return (
      availableVoices.find((voice) =>
        femaleKeywords.some((keyword) =>
          voice.name.toLowerCase().includes(keyword)
        )
      ) ||
      availableVoices.find(
        (voice) =>
          voice.lang.toLowerCase().startsWith("en") &&
          voice.name.toLowerCase().includes("google")
      ) ||
      availableVoices.find((voice) =>
        voice.lang.toLowerCase().startsWith("en")
      )
    );
  };

  const speak = () => {
    if (!isSupported || !text) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onstart = () => {
      setIsSpeaking(true);
      onSpeakingChange?.(true);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      onSpeakingChange?.(false);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      onSpeakingChange?.(false);
    };

    const preferredVoice = pickFemaleVoice(voices);
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (!autoSpeak || !isSupported || !text) return;
    if (lastSpokenRef.current === text) return;
    lastSpokenRef.current = text;
    speak();
  }, [autoSpeak, isSupported, text]);

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    onSpeakingChange?.(false);
  };

  return (
    <div className="flex items-center gap-4">
      <div className="flex-1 rounded-lg bg-gray-100 p-4 text-sm text-gray-700 dark:bg-gray-800 dark:text-gray-300">
        {text}
      </div>
      <button
        onClick={isSpeaking ? stopSpeaking : speak}
        disabled={!isSupported || !text}
        className={`rounded-full p-3 transition-opacity ${
          isSpeaking
            ? "bg-red-100 text-red-600"
            : "bg-blue-100 text-blue-600"
        } hover:opacity-80 disabled:opacity-50`}
        aria-label={isSpeaking ? "Stop speaking" : "Speak response"}
      >
        {isSpeaking ? (
          <VolumeX className="h-5 w-5" />
        ) : (
          <Volume2 className="h-5 w-5" />
        )}
      </button>
      {!isSupported && (
        <p className="text-xs text-red-500">Text-to-speech not supported</p>
      )}
    </div>
  );
}
