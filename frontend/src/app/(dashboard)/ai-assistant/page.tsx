"use client";

import { useState, useRef, useEffect } from 'react';
import { useInsights, useCoach, useChat } from '@/hooks/useAI';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  citations?: { transaction_id: string; merchant: string; amount: number; date: string }[];
  timestamp: Date;
}

const SUGGESTED_PROMPTS = [
  "Am I spending too much on food this month?",
  "How much can I save this month?",
  "Find recurring subscriptions I don't use",
  "Which merchant did I spend the most on?",
  "Predict my next month's spending",
];

export default function AiAssistantPage() {
  const { data: insightsData } = useInsights();
  const { data: coachData } = useCoach();
  const chatMutation = useChat();

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const insights = insightsData?.insights ?? [];
  const suggestions = coachData?.suggestions ?? [];

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (messageText?: string) => {
    const text = messageText ?? input.trim();
    if (!text) return;

    const userMsg: ChatMessage = { role: 'user', content: text, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    try {
      const result = await chatMutation.mutateAsync(text);
      const assistantMsg: ChatMessage = {
        role: 'assistant',
        content: result.response,
        citations: result.citations ?? [],
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMsg]);
    } catch {
      const errorMsg: ChatMessage = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMsg]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleTextareaInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 128)}px`;
  };

  const severityColor: Record<string, string> = {
    high: 'text-error',
    medium: 'text-tertiary',
    low: 'text-secondary',
    info: 'text-primary',
  };

  const typeIcon: Record<string, string> = {
    leak: 'receipt_long',
    alert: 'warning',
    tip: 'lightbulb',
    prediction: 'online_prediction',
    savings: 'savings',
    spending_pattern: 'monitoring',
  };

  return (
    <>
      <div className="flex flex-col w-full h-[calc(100vh-64px)] overflow-hidden">
        <div className="flex flex-1 overflow-hidden relative">

          {/* Sidebar: Insights & Coach */}
          <aside className="hidden lg:flex flex-col w-80 bg-surface-container/30 backdrop-blur-md border-r border-outline-variant/30 overflow-y-auto p-md gap-md">
            <div className="flex items-center gap-sm mb-sm">
              <span className="material-symbols-outlined text-primary text-[24px]">psychology</span>
              <h2 className="font-headline-md text-headline-md text-on-surface">Insights Coach</h2>
            </div>

            {/* AI Insights */}
            {insights.length > 0 && (
              <div className="flex flex-col gap-sm">
                <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Latest Insights</p>
                {insights.slice(0, 3).map((insight: any) => (
                  <div key={insight.id} className="relative bg-surface-container rounded-xl p-md shadow-sm flex flex-col gap-sm hover:bg-surface-container-high transition-colors cursor-pointer group">
                    <div className="flex items-start justify-between">
                      <span className={`font-label-md text-label-md uppercase tracking-widest ${severityColor[insight.severity] ?? 'text-primary'}`}>
                        {insight.type ?? 'Insight'}
                      </span>
                      <span className={`material-symbols-outlined text-[18px] ${severityColor[insight.severity] ?? 'text-primary'}`}>
                        {typeIcon[insight.type] ?? 'lightbulb'}
                      </span>
                    </div>
                    <p className="font-body-md text-body-md text-on-surface">{insight.description}</p>
                    <button
                      onClick={() => handleSend(`Tell me more about: ${insight.title}`)}
                      className="text-left font-label-md text-label-md text-primary hover:text-primary-fixed transition-colors mt-xs flex items-center gap-xs"
                    >
                      Analyze pattern <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Coach Suggestions */}
            {suggestions.length > 0 && (
              <div className="flex flex-col gap-sm">
                <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Coach Tips</p>
                {suggestions.slice(0, 2).map((sug: any, i: number) => (
                  <div key={i} className="relative bg-surface-container rounded-xl p-md shadow-sm flex flex-col gap-sm hover:bg-surface-container-high transition-colors cursor-pointer group">
                    <div className="flex items-start justify-between">
                      <span className="font-label-md text-label-md text-secondary uppercase tracking-widest">Opportunity</span>
                      <span className="material-symbols-outlined text-secondary text-[18px]">savings</span>
                    </div>
                    <p className="font-body-md text-body-md text-on-surface">{sug.description}</p>
                    {sug.potential_savings && (
                      <span className="font-label-sm text-label-sm text-secondary">Save ₹{sug.potential_savings.toLocaleString()}/mo</span>
                    )}
                    <div className="h-1 w-0 bg-secondary rounded-full mt-xs group-hover:w-full transition-all duration-500"></div>
                  </div>
                ))}
              </div>
            )}

            {insights.length === 0 && suggestions.length === 0 && (
              <div className="flex flex-col items-center justify-center flex-1 gap-sm text-on-surface-variant">
                <span className="material-symbols-outlined text-[48px]">auto_awesome</span>
                <p className="text-center text-sm font-body-md">Start chatting to get personalized insights!</p>
              </div>
            )}

            <div className="mt-auto pt-md border-t border-outline-variant/30 flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-on-surface-variant">AI Financial Copilot</span>
              <span className="flex items-center gap-xs text-secondary">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                <span className="font-label-sm text-label-sm">Active</span>
              </span>
            </div>
          </aside>

          {/* Chat Main */}
          <main className="flex-1 flex flex-col relative bg-surface">

            <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-md md:p-xl flex flex-col gap-lg z-10 scroll-smooth" id="chat-container">

              {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full w-full gap-md text-center py-xl">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-sm">
                    <span className="material-symbols-outlined text-primary text-[40px]">smart_toy</span>
                  </div>
                  <h3 className="font-headline-lg text-headline-lg text-on-surface whitespace-nowrap">AI Financial Copilot</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant max-w-[448px] mx-auto">
                    Ask me anything about your finances — spending patterns, budget advice, subscription leaks, and more.
                  </p>
                </div>
              )}

              {messages.map((msg, i) => (
                <div key={i} className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start gap-sm'}`}>
                  {msg.role === 'assistant' && (
                    <div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center shadow-sm shrink-0 mt-1">
                      <span className="material-symbols-outlined text-primary text-[18px]">smart_toy</span>
                    </div>
                  )}
                  <div className={`max-w-[85%] md:max-w-[75%] flex flex-col gap-sm ${msg.role === 'user' ? '' : ''}`}>
                    <div className={`rounded-2xl p-md shadow-md ${
                      msg.role === 'user'
                        ? 'bg-primary text-on-primary rounded-tr-sm'
                        : 'bg-surface-container-low backdrop-blur-xl border border-outline-variant/30 text-on-surface rounded-tl-sm'
                    }`}>
                      <p className="font-body-md text-body-md leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                    </div>

                    {/* Citations */}
                    {msg.role === 'assistant' && msg.citations && msg.citations.length > 0 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-sm">
                        {msg.citations.map((cit, ci) => (
                          <div key={ci} className="bg-surface-container flex flex-col gap-xs p-sm rounded-xl border border-outline-variant/20 hover:border-primary/50 transition-colors cursor-pointer shadow-sm">
                            <div className="flex justify-between items-start">
                              <div className="flex items-center gap-xs text-on-surface-variant font-mono text-[10px]">
                                <span className="material-symbols-outlined text-[14px]">receipt_long</span>
                                {cit.transaction_id.substring(0, 8)}
                              </div>
                              <span className="font-label-sm text-label-sm text-on-surface-variant">
                                {new Date(cit.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                              </span>
                            </div>
                            <div className="flex justify-between items-center mt-xs">
                              <span className="font-label-md text-label-md text-on-surface font-semibold truncate pr-2">{cit.merchant}</span>
                              <span className="font-headline-md text-headline-md text-error whitespace-nowrap">-₹{cit.amount.toLocaleString()}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    <span className="font-label-sm text-[10px] text-on-surface-variant/60 font-mono self-end">
                      {msg.timestamp.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {chatMutation.isPending && (
                <div className="flex justify-start w-full gap-sm">
                  <div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-primary text-[18px]">smart_toy</span>
                  </div>
                  <div className="bg-surface-container-low backdrop-blur-xl border border-outline-variant/30 rounded-2xl rounded-tl-sm px-md py-sm flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-on-surface-variant rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-1.5 h-1.5 bg-on-surface-variant rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-1.5 h-1.5 bg-on-surface-variant rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              )}

              <div className="h-4 w-full shrink-0"></div>
            </div>

            {/* Input Area */}
            <div className="p-md bg-surface/80 backdrop-blur-2xl border-t border-outline-variant/30 z-20">

              <div className="flex gap-sm overflow-x-auto pb-sm mb-sm no-scrollbar">
                {SUGGESTED_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => handleSend(prompt)}
                    disabled={chatMutation.isPending}
                    className="shrink-0 bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md px-md py-sm rounded-full border border-outline-variant/20 transition-all whitespace-nowrap shadow-sm disabled:opacity-50"
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              <div className="relative flex items-end gap-sm bg-surface-container-lowest border border-outline-variant/50 rounded-2xl p-sm shadow-md focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/50 transition-all">
                <textarea
                  ref={textareaRef}
                  className="w-full bg-transparent border-none focus:ring-0 text-body-md font-body-md text-on-surface placeholder:text-on-surface-variant/50 resize-none py-sm max-h-32 overflow-y-auto"
                  id="chat-input"
                  placeholder="Ask anything about your finances..."
                  rows={1}
                  value={input}
                  onChange={handleTextareaInput}
                  onKeyDown={handleKeyDown}
                  disabled={chatMutation.isPending}
                />
                <button
                  onClick={() => handleSend()}
                  disabled={chatMutation.isPending || !input.trim()}
                  className="p-sm bg-primary text-on-primary hover:bg-primary-fixed transition-colors rounded-xl h-10 w-10 flex items-center justify-center shrink-0 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  id="send-btn"
                >
                  <span className="material-symbols-outlined text-[20px]">send</span>
                </button>
              </div>
              <div className="text-center mt-xs">
                <span className="font-label-sm text-label-sm text-on-surface-variant/60">AI can make mistakes. Verify important financial data.</span>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
