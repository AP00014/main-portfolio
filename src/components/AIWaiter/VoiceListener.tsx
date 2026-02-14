"use client";

import { useEffect, useState } from "react";
import { Mic, MicOff } from "lucide-react";

interface VoiceListenerProps {
  onTranscript: (text: string) => void;
  onListeningChange: (isListening: boolean) => void;
  compact?: boolean;
  className?: string;
  iconClassName?: string;
}

export default function VoiceListener({
  onTranscript,
  onListeningChange,
  compact = false,
  className,
  iconClassName,
}: VoiceListenerProps) {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setIsSupported(false);
      return;
    }

    setIsSupported(true);
    const recognitionInstance = new SpeechRecognition();
    recognitionInstance.continuous = false;
    recognitionInstance.interimResults = false;
    recognitionInstance.lang = "en-US";

    recognitionInstance.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      onTranscript(transcript);
      setIsListening(false);
      onListeningChange(false);
    };

    recognitionInstance.onerror = () => {
      setIsListening(false);
      onListeningChange(false);
    };

    recognitionInstance.onend = () => {
      setIsListening(false);
      onListeningChange(false);
    };

    setRecognition(recognitionInstance);
  }, [onTranscript, onListeningChange]);

  const toggleListening = () => {
    if (!isSupported) {
      alert("Speech recognition is not supported in your browser.");
      return;
    }

    if (!isListening && recognition) {
      recognition.start();
      setIsListening(true);
      onListeningChange(true);
    } else if (recognition) {
      recognition.stop();
      setIsListening(false);
      onListeningChange(false);
    }
  };

  return (
    <div className={compact ? "contents" : "flex flex-col items-center"}>
      <button
        onClick={toggleListening}
        className={`rounded-full p-2 text-white shadow-lg ring-2 ring-transparent transition-all duration-300 ${
          isListening
            ? "animate-pulse-slow bg-red-500 ring-red-300/60"
            : "bg-[#1a73e8] hover:bg-[#1669d6] hover:shadow-xl hover:ring-[#1a73e8]/40"
        } ${className ?? ""}`}
        aria-label={isListening ? "Stop listening" : "Start listening"}
      >
        {isListening ? (
          <MicOff className={`h-4 w-4 text-white drop-shadow-sm ${iconClassName ?? ""}`} />
        ) : (
          <Mic className={`h-4 w-4 text-blue-100 drop-shadow-sm ${iconClassName ?? ""}`} />
        )}
      </button>
      {!compact && (
        <div className="mt-3 text-center">
          <p className="text-sm font-medium">
            {isListening ? "Listening... Speak now!" : "Click to speak"}
          </p>
          {!isSupported && (
            <p className="text-xs text-red-500">
              Voice recognition not supported. Try Chrome or Edge.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
