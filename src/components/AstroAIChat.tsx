import React, { useState } from "react";
import { UserProfile, LanguageCode } from "../types";
import { Bot, Send, Sparkles, X, MessageSquare, RefreshCw } from "lucide-react";

interface AstroAIChatProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile;
  selectedLanguage?: LanguageCode;
}

interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
}

export const AstroAIChat: React.FC<AstroAIChatProps> = ({ isOpen, onClose, userProfile, selectedLanguage = "en" }) => {
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg-1",
      sender: "ai",
      text: `Namaste ${userProfile?.name || "Seeker"}! I am Astro AI Companion, your personal spiritual intelligence guide. How may I decode your cosmic path today?`,
      timestamp: "Just now"
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSendMessage = async (textToSend?: string) => {
    const prompt = textToSend || inputMessage;
    if (!prompt.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: "user",
      text: prompt,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: prompt,
          language: selectedLanguage,
          context: {
            name: userProfile?.name || "Seeker",
            rashi: userProfile?.rashi || "Taurus",
            nakshatra: userProfile?.nakshatra || "Rohini",
            lagna: userProfile?.lagna || "Aries",
            dob: userProfile?.dob || "1995-08-15"
          },
          history: messages
        })
      });

      const data = await response.json();
      const aiReply = data.reply || "The stars suggest patient reflection.";

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: aiReply,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: "ai",
          text: "Forgive me, cosmic energy fluctuated briefly. Please try asking your question again.",
          timestamp: "Just now"
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const SUGGESTED_PROMPTS = [
    "Explain my D9 Navamsa Chart",
    "What is my Lucky Gemstone for Saturn?",
    "Is today good for financial agreements?",
    "Analyze my Chaldean Name Vibration"
  ];

  return (
    <div className="fixed bottom-4 right-4 z-50 w-full max-w-md h-[550px] bg-[#1E1B18] text-amber-100 rounded-3xl border-2 border-amber-500/40 shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5">
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-amber-950 via-[#2A241F] to-amber-950 border-b border-amber-500/20 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-amber-600/30 border border-amber-400/40 flex items-center justify-center text-amber-300">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="font-serif font-bold text-amber-200 text-sm flex items-center gap-1.5">
              Dev-Guru AI Companion
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <div className="text-[10px] text-amber-300/60">Powered by Dev-Guru Spiritual AI</div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1 rounded-lg text-amber-300/60 hover:text-amber-200 hover:bg-amber-900/40"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Chat Messages Body */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3.5 no-scrollbar bg-[#120F0D]">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed space-y-1 ${
                m.sender === "user"
                  ? "bg-amber-600 text-white rounded-br-none"
                  : "bg-[#25201C] text-amber-100 border border-amber-500/20 rounded-bl-none"
              }`}
            >
              <div className="whitespace-pre-wrap">{m.text}</div>
              <div className="text-[9px] text-right opacity-60">{m.timestamp}</div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-[#25201C] p-3 rounded-2xl text-xs text-amber-300 flex items-center gap-2 border border-amber-500/20">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-400" />
              <span>Consulting the ephemeris & Dev-Guru AI...</span>
            </div>
          </div>
        )}
      </div>

      {/* Suggested Chips */}
      <div className="px-3 py-2 bg-[#1A1715] border-t border-amber-500/10 flex items-center gap-1.5 overflow-x-auto no-scrollbar text-[10px]">
        {SUGGESTED_PROMPTS.map((prompt) => (
          <button
            key={prompt}
            onClick={() => handleSendMessage(prompt)}
            className="whitespace-nowrap px-2.5 py-1 rounded-lg bg-amber-950/60 text-amber-300 border border-amber-500/30 hover:bg-amber-900/60 transition-colors"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="p-3 bg-[#1E1B18] border-t border-amber-500/20 flex items-center gap-2"
      >
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Ask Astro AI about your Kundli, Dasha, Tarot..."
          className="flex-1 bg-[#120F0D] border border-amber-500/20 rounded-xl px-3.5 py-2 text-xs text-amber-100 placeholder-amber-200/30 focus:outline-none focus:border-amber-400"
        />
        <button
          type="submit"
          disabled={isLoading || !inputMessage.trim()}
          className="p-2 rounded-xl bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-white transition-colors"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
