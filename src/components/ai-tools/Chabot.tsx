"use client";

import { useState, useEffect, useRef } from "react";
import { Send, Bot, User, Snowflake } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  role: "user" | "bot";
  content: string;
  id: string;
}

export default function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Ref for the scrollable chat container
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const generateMessageId = () =>
    `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  // Scroll chat container to bottom
  const scrollToBottom = () => {
    const container = messagesContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  };

  // Auto-scroll when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      role: "user",
      content: input.trim(),
      id: generateMessageId(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input.trim();
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: currentInput }),
      });

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content: data.response || "⚠️ No response from server.",
          id: generateMessageId(),
        },
      ]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content: "⚠️ Server error. Please try again later.",
          id: generateMessageId(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setMessages([
      {
        role: "bot",
        content:
          "👋 Hello! I'm your AI Medical Assistant. How can I help you today? Please remember that I provide general information and cannot replace professional medical advice.",
        id: generateMessageId(),
      },
    ]);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] w-full sm:max-w-xl md:max-w-4xl lg:max-w-6xl mx-auto bg-card/90 shadow-2xl border border-border backdrop-blur-lg rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden sm:mt-2 mb-5 mt-0 rounded-none ">
      {/* Header */}
      <div className="sticky top-0 z-10 p-4 sm:p-6 bg-primary/90 backdrop-blur-md text-primary-foreground shadow-md flex items-center gap-3 flex-shrink-0 rounded-t-xl sm:rounded-t-2xl md:rounded-t-3xl">
        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
          <Snowflake size={22} />
        </div>
        <div>
          <h1 className="font-bold text-lg sm:text-xl">AI Medical Assistant</h1>
          <p className="text-primary-foreground/80 text-xs sm:text-sm">
            Your health companion
          </p>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-gradient-to-b from-background/50 to-muted/30 scroll-smooth
                   scrollbar-thin scrollbar-thumb-primary/50 scrollbar-track-background/20"
      >
        <AnimatePresence mode="popLayout">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              layout
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className={`flex items-end gap-3 ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.role === "bot" && (
                <div className="w-8 h-8 rounded-full bg-primary/70 flex items-center justify-center shadow-lg">
                  <Bot size={16} className="text-white" />
                </div>
              )}
              <div
                className={`px-4 py-3 rounded-2xl max-w-[80%] sm:max-w-[70%] text-sm shadow-md ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground rounded-br-md"
                    : "bg-card text-foreground border border-border/50 rounded-bl-md"
                }`}
              >
                {msg.content}
              </div>
              {msg.role === "user" && (
                <div className="w-8 h-8 rounded-full bg-secondary/70 flex items-center justify-center shadow-lg">
                  <User size={16} className="text-white" />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Loading */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-primary/70 flex items-center justify-center shadow-lg">
                <Bot size={16} className="text-white" />
              </div>
              <div className="bg-card px-4 py-3 rounded-2xl border border-border/50 shadow-md">
                <span className="text-sm text-muted-foreground animate-pulse">
                  Thinking...
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input */}
      <div className="p-4 sm:p-6 bg-card/90 border-t border-border/50 backdrop-blur-md flex-shrink-0 rounded-b-xl sm:rounded-b-2xl md:rounded-b-3xl">
        <div className="flex gap-3 items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything about health..."
            className="flex-1 px-4 py-3 rounded-2xl border border-border bg-background/80 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
            disabled={loading}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            className="p-3 rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-lg disabled:opacity-50 flex items-center justify-center"
          >
            <Send size={18} />
          </motion.button>
        </div>
        <p className="text-xs text-muted-foreground mt-3 text-center">
          This AI provides general information only. Consult healthcare
          professionals for medical advice.
        </p>
      </div>
    </div>
  );
}
