"use client";

import { useState, useEffect, useRef } from "react";
import { Send } from "lucide-react";
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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Smooth scroll to bottom
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  };

  // Auto-scroll on new messages with a slight delay for smooth animation
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      scrollToBottom();
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [messages]);

  const generateMessageId = () =>
    `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

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

      const botMessage: Message = {
        role: "bot",
        content: data.response || "⚠️ No response from server.",
        id: generateMessageId(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        role: "bot",
        content: "⚠️ Server error. Please try again later.",
        id: generateMessageId(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  // Initialize with welcome message
  useEffect(() => {
    const welcomeMessage: Message = {
      role: "bot",
      content:
        "👋 Hello! I'm your AI Medical Assistant. How can I help you today? Please remember that I provide general information and cannot replace professional medical advice.",
      id: generateMessageId(),
    };

    setMessages([welcomeMessage]);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background transition-colors duration-300">
      <div className="w-full max-w-4xl mx-4 bg-card shadow-2xl rounded-3xl flex flex-col overflow-hidden border border-border backdrop-blur-sm">
        {/* Header - Removed theme toggle */}
        <div className="p-6 bg-primary text-primary-foreground">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <span className="text-2xl">🩺</span>
            </div>
            <div>
              <h1 className="font-bold text-xl">AI Medical Assistant</h1>
              <p className="text-primary-foreground/80 text-sm">
                Your health companion
              </p>
            </div>
          </div>
        </div>

        {/* Messages Container with improved scrolling */}
        <div
          ref={messagesContainerRef}
          className="flex-1 overflow-y-auto p-6 space-y-4 max-h-96 bg-gradient-to-b from-background/50 to-muted/30 scroll-smooth"
          style={{ scrollBehavior: "smooth" }}
        >
          <AnimatePresence mode="popLayout">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                layout
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    duration: 0.3,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  },
                }}
                exit={{
                  opacity: 0,
                  y: -10,
                  scale: 0.95,
                  transition: { duration: 0.2 },
                }}
                className={`flex items-end gap-3 ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.role === "bot" && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, type: "spring", stiffness: 300 }}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/80 to-secondary/80 flex items-center justify-center shadow-lg"
                  >
                    <span className="text-white text-sm">🤖</span>
                  </motion.div>
                )}

                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.05 }}
                  className={`px-5 py-3 rounded-2xl max-w-[85%] text-sm shadow-lg backdrop-blur-sm transition-all duration-200 hover:shadow-xl ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-md shadow-primary/20"
                      : "bg-card text-foreground rounded-bl-md border border-border/50"
                  }`}
                >
                  <p className="leading-relaxed whitespace-pre-wrap">
                    {msg.content}
                  </p>
                </motion.div>

                {msg.role === "user" && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, type: "spring", stiffness: 300 }}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-accent/80 to-secondary/80 flex items-center justify-center shadow-lg"
                  >
                    <span className="text-white text-sm">👤</span>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Improved loading animation */}
          <AnimatePresence>
            {loading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex justify-start items-center gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/60 to-secondary/60 flex items-center justify-center">
                  <span className="text-white text-sm">🤖</span>
                </div>
                <div className="bg-card px-4 py-3 rounded-2xl rounded-bl-md border border-border/50 shadow-lg">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 bg-primary/60 rounded-full"
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 1, 0.5],
                          }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            delay: i * 0.2,
                          }}
                        />
                      ))}
                    </div>
                    <span className="text-sm ml-1">Thinking...</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Scroll anchor */}
          <div ref={messagesEndRef} className="h-0" />
        </div>

        {/* Input Section */}
        <div className="p-6 bg-card/80 border-t border-border/50 backdrop-blur-sm">
          <div className="flex gap-3 items-end">
            <div className="flex-1 relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything about health... (English or Arabic)"
                className="w-full px-5 py-4 rounded-2xl border border-border bg-background/80 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-200 backdrop-blur-sm shadow-sm hover:shadow-md resize-none"
                disabled={loading}
                autoComplete="off"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="p-4 rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm flex items-center justify-center"
              aria-label="Send message"
            >
              <Send size={20} />
            </motion.button>
          </div>

          <p className="text-xs text-muted-foreground/70 mt-3 text-center">
            This AI provides general information only. Consult healthcare
            professionals for medical advice.
          </p>
        </div>
      </div>
    </div>
  );
}
