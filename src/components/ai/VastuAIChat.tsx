"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { MessageCircle, X, Send, Sparkles, Loader2, Compass, Bot, Trash2 } from "lucide-react";

interface Message {
    role: "user" | "assistant";
    content: string;
}

// Professional "Act as" prompt
const SYSTEM_PROMPT = `Act as VastuGPT, a senior Vastu Shastra consultant with 25+ years of experience in traditional Indian architecture and energy science.

YOUR EXPERTISE:
- Vastu Shastra principles for residential and commercial spaces
- Direction-based room placement for optimal energy flow
- Dosha (defect) identification and remedies
- Integration of modern architecture with ancient wisdom

CORE VASTU KNOWLEDGE:

DIRECTIONAL ZONES (Mandala):
• NORTH-EAST (Ishaan) - Water element, most sacred
  → Puja room, water tank, open space, entrance
  → Colors: Light blue, white
  
• EAST (Poorva) - Sun energy, health & prosperity
  → Main entrance, living room, study
  → Colors: Green, brown
  
• SOUTH-EAST (Agneya) - Fire element
  → Kitchen (cook facing East), electrical room
  → Colors: Orange, pink, red
  
• SOUTH (Dakshina) - Earth element
  → Storeroom, guest bedroom
  → Colors: Orange, red
  
• SOUTH-WEST (Nairutya) - Stability & strength
  → Master bedroom, heavy furniture, safe
  → Colors: Brown, yellow, gold
  
• WEST (Paschim) - Air movement
  → Dining room, children's room, study
  → Colors: Blue, white
  
• NORTH-WEST (Vayavya) - Air element
  → Guest room, bathroom, garage, unmarried girls
  → Colors: White, cream
  
• NORTH (Uttara) - Water & wealth
  → Living room, treasury, cash locker
  → Colors: Green, blue

COMMON DOSHAS & REMEDIES:
1. Toilet in NE: Major dosha - Use rock salt, keep door closed, place green plants
2. Kitchen in NE: Financial issues - Use copper vessels, pyramid
3. Bedroom in SE: Health problems - Use green/blue colors, avoid red
4. Cut in NE corner: Install mirror to extend, use water fountain
5. Staircase in center: Family discord - Heavy chandelier, pyramid

RESPONSE STYLE:
- Be specific with directions (avoid "depends" answers)
- Use bullet points for clarity
- Include practical remedies
- Keep responses concise but informative
- Reference compass directions precisely`;

const quickPrompts = [
    "Best direction for main entrance?",
    "Where should kitchen be placed?",
    "Master bedroom placement?",
    "My toilet is in NE, what to do?",
    "Puja room best location?",
    "Which direction for study room?"
];

export default function VastuAIChat() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [puterReady, setPuterReady] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Initialize Puter.js
    useEffect(() => {
        if (typeof window !== "undefined" && window.puter) {
            setPuterReady(true);
        }
    }, [isOpen]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = async (text: string) => {
        if (!text.trim() || isLoading || !puterReady) return;

        const userMessage: Message = { role: "user", content: text };
        setMessages(prev => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        try {
            // Build conversation context (last 8 messages)
            const recentHistory = messages.slice(-8).map(msg =>
                `${msg.role === "user" ? "User" : "VastuGPT"}: ${msg.content}`
            ).join("\n\n");

            const fullPrompt = `${SYSTEM_PROMPT}

---
CONVERSATION HISTORY:
${recentHistory || "No previous messages."}

---
USER QUESTION: ${text}

---
Provide a helpful, specific Vastu response. Be concise but thorough:`;

            const response = await window.puter.ai.chat(fullPrompt);

            let aiResponse = "";
            if (typeof response === "string") {
                aiResponse = response;
            } else if (response?.message?.content) {
                aiResponse = response.message.content;
            }

            if (!aiResponse) {
                throw new Error("Empty response");
            }

            setMessages(prev => [...prev, { role: "assistant", content: aiResponse }]);
        } catch (error) {
            console.error("Chat error:", error);
            setMessages(prev => [...prev, {
                role: "assistant",
                content: "I apologize, I'm having trouble connecting right now. Please try again in a moment, or call our expert at +91 98765 43210."
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const clearChat = () => {
        setMessages([]);
    };

    return (
        <>
            {/* Floating Button */}
            <div className="fixed bottom-6 right-6" style={{ zIndex: 99998 }}>
                {!isOpen && (
                    <div className="absolute inset-0 bg-primary/30 rounded-full animate-ping" />
                )}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={cn(
                        "relative w-14 h-14 rounded-full flex items-center justify-center shadow-2xl",
                        "bg-gradient-to-br from-primary to-secondary text-background",
                        "hover:scale-110 transition-transform duration-300"
                    )}
                    aria-label={isOpen ? "Close chat" : "Ask VastuGPT"}
                >
                    {isOpen ? <X size={22} /> : <Bot size={22} />}
                </button>
            </div>

            {/* Chat Panel */}
            {isOpen && (
                <div
                    className="fixed bottom-24 right-6 w-[380px] max-w-[calc(100vw-48px)] h-[520px] max-h-[75vh] bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-scale-in"
                    style={{ zIndex: 99998 }}
                >
                    {/* Header */}
                    <div className="px-4 py-3 bg-gradient-to-r from-primary to-secondary text-background flex-shrink-0">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                                    <Compass size={20} className="animate-[spin_10s_linear_infinite]" />
                                </div>
                                <div>
                                    <h3 className="font-black text-base">VastuGPT</h3>
                                    <p className="text-xs text-background/70 flex items-center gap-1">
                                        <span className={cn(
                                            "w-2 h-2 rounded-full",
                                            puterReady ? "bg-green-400" : "bg-yellow-400"
                                        )} />
                                        {puterReady ? "Online" : "Connecting..."}
                                    </p>
                                </div>
                            </div>
                            {messages.length > 0 && (
                                <button
                                    onClick={clearChat}
                                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                                    title="Clear chat"
                                >
                                    <Trash2 size={16} />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-background">
                        {messages.length === 0 && (
                            <div className="text-center py-4">
                                <div className="w-14 h-14 mx-auto mb-3 rounded-xl bg-primary/10 flex items-center justify-center">
                                    <Compass size={28} className="text-primary" />
                                </div>
                                <h4 className="font-bold text-foreground text-sm mb-1">Ask About Vastu</h4>
                                <p className="text-foreground/50 text-xs mb-4 max-w-[220px] mx-auto">
                                    Room placements, directions, doshas & remedies
                                </p>
                                <div className="grid grid-cols-2 gap-2">
                                    {quickPrompts.slice(0, 4).map((prompt, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => sendMessage(prompt)}
                                            disabled={!puterReady}
                                            className="p-2.5 text-xs text-left bg-card border border-border rounded-lg hover:border-primary/50 transition-all disabled:opacity-50"
                                        >
                                            {prompt}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {messages.map((msg, idx) => (
                            <div
                                key={idx}
                                className={cn(
                                    "max-w-[85%] p-3 rounded-2xl",
                                    msg.role === "user"
                                        ? "ml-auto bg-gradient-to-r from-primary to-secondary text-background rounded-br-sm"
                                        : "mr-auto bg-card border border-border rounded-bl-sm"
                                )}
                            >
                                <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                            </div>
                        ))}

                        {isLoading && (
                            <div className="flex items-center gap-2 p-3 bg-card border border-border rounded-2xl rounded-bl-sm max-w-[85%]">
                                <Loader2 size={14} className="animate-spin text-primary" />
                                <span className="text-xs text-foreground/60">Consulting Vastu wisdom...</span>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="p-3 border-t border-border bg-card flex-shrink-0">
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                sendMessage(input);
                            }}
                            className="flex items-center gap-2"
                        >
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder={puterReady ? "Ask about Vastu..." : "Connecting..."}
                                className="flex-1 px-4 py-3 bg-background border border-border rounded-xl text-sm outline-none focus:border-primary transition-colors"
                                disabled={isLoading || !puterReady}
                            />
                            <button
                                type="submit"
                                disabled={isLoading || !input.trim() || !puterReady}
                                className="w-11 h-11 rounded-xl bg-gradient-to-r from-primary to-secondary text-background flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-50"
                            >
                                <Send size={18} />
                            </button>
                        </form>
                        <p className="text-[10px] text-center text-foreground/40 mt-2">
                            Powered by Puter.js AI • Free & unlimited
                        </p>
                    </div>
                </div>
            )}
        </>
    );
}
