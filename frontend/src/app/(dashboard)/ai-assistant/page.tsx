"use client";

import { useState, useRef, useEffect } from 'react';
import { useChat } from '@/hooks/useAI';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  citations?: { transaction_id: string; merchant: string; amount: number; date: string }[];
  timestamp: Date;
}

const SUGGESTED_PROMPTS = [
  {
    title: "Food & Dining Spend",
    text: "Am I spending too much on food and dining this month?",
    icon: "restaurant"
  },
  {
    title: "Monthly Savings Plan",
    text: "How much can I realistically save this month based on my income and expenses?",
    icon: "savings"
  },
  {
    title: "Subscription Leak Check",
    text: "Find recurring subscriptions or hidden charges I might not be using.",
    icon: "search_off"
  },
  {
    title: "Top Merchant Analysis",
    text: "Which merchant did I spend the most money on recently?",
    icon: "storefront"
  },
  {
    title: "Spending Forecast",
    text: "Predict my next month's spending velocity based on my transaction history.",
    icon: "timeline"
  }
];

export default function AiAssistantPage() {
  const chatMutation = useChat();

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // API Key modal & state
  const [isKeyModalOpen, setIsKeyModalOpen] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [provider, setProvider] = useState<'gemini' | 'openrouter'>('gemini');
  const [keySavedToast, setKeySavedToast] = useState(false);

  useEffect(() => {
    const savedKey = localStorage.getItem('spendsense_ai_key') || '';
    const savedProvider = (localStorage.getItem('spendsense_ai_provider') as 'gemini' | 'openrouter') || 'gemini';
    setApiKey(savedKey);
    if (savedProvider === 'gemini' || savedProvider === 'openrouter') {
      setProvider(savedProvider);
    }
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, chatMutation.isPending]);

  const handleSaveKey = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('spendsense_ai_key', apiKey.trim());
    localStorage.setItem('spendsense_ai_provider', provider);
    setIsKeyModalOpen(false);
    setKeySavedToast(true);
    setTimeout(() => setKeySavedToast(false), 3500);
  };

  const handleClearKey = () => {
    localStorage.removeItem('spendsense_ai_key');
    localStorage.removeItem('spendsense_ai_provider');
    setApiKey('');
    setIsKeyModalOpen(false);
  };

  const handleSend = async (messageText?: string) => {
    const text = messageText ?? input.trim();
    if (!text || chatMutation.isPending) return;

    const userMsg: ChatMessage = { role: 'user', content: text, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    if (!messageText) setInput('');

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
        content: 'Sorry, I encountered an error communicating with the AI service. Please verify your network or check if your API key is active.',
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
    e.target.style.height = `${Math.min(e.target.scrollHeight, 130)}px`;
  };

  return (
    <div className="flex flex-col w-full h-[calc(100vh-64px)] overflow-hidden bg-surface relative">
      {/* Top Navbar */}
      <header className="flex items-center justify-between px-4 md:px-8 py-3.5 bg-surface-container/60 backdrop-blur-xl border-b border-outline-variant/30 shrink-0 z-20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-md shadow-primary/20 text-on-primary">
            <span className="material-symbols-outlined text-[24px]">smart_toy</span>
          </div>
          <div className="flex flex-col">
            <h1 className="font-headline-md text-lg text-on-surface font-bold flex items-center gap-2">
              SpendSense AI Copilot
            </h1>
            <div className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${apiKey ? 'bg-secondary animate-pulse' : 'bg-tertiary'}`}></span>
              <span className="font-label-sm text-xs text-on-surface-variant">
                {apiKey ? `Connected to ${provider === 'gemini' ? 'Google Gemini' : 'OpenRouter'}` : 'Default / Stub Mode (No API Key Set)'}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {messages.length > 0 && (
            <button
              onClick={() => setMessages([])}
              className="px-3 py-1.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface text-xs font-semibold transition-colors flex items-center gap-1.5 border border-outline-variant/20 shadow-sm"
              title="Clear chat history"
            >
              <span className="material-symbols-outlined text-[16px]">delete_sweep</span>
              Clear Chat
            </button>
          )}
          <button
            onClick={() => setIsKeyModalOpen(true)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 shadow-sm ${
              apiKey 
                ? 'bg-secondary/15 hover:bg-secondary/25 text-secondary border border-secondary/30' 
                : 'bg-primary text-on-primary hover:bg-primary-fixed shadow-primary/20 animate-pulse'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">key</span>
            {apiKey ? 'API Key Configured' : 'Connect AI Key'}
          </button>
        </div>
      </header>

      {/* Toast Notification */}
      {keySavedToast && (
        <div className="absolute top-16 right-6 z-50 bg-secondary text-on-secondary px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 animate-fade-in-down font-label-md text-xs font-bold">
          <span className="material-symbols-outlined text-[18px]">check_circle</span>
          AI API Key successfully updated!
        </div>
      )}

      {/* Main Chat Container */}
      <main ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 md:p-8 flex flex-col gap-6 z-10 scroll-smooth max-w-4xl mx-auto w-full">
        {/* Missing API Key Warning Banner */}
        {!apiKey && (
          <div className="bg-gradient-to-r from-primary/15 via-tertiary/15 to-secondary/15 p-4 rounded-2xl border border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm shrink-0 animate-fade-in">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined text-[24px]">vpn_key</span>
              </div>
              <div>
                <h3 className="font-headline-sm text-sm font-bold text-on-surface">Unlock Live Financial Intelligence</h3>
                <p className="font-body-sm text-xs text-on-surface-variant">Connect your free Gemini or OpenRouter API key to enable personalized transaction reasoning and leak detection.</p>
              </div>
            </div>
            <button
              onClick={() => setIsKeyModalOpen(true)}
              className="px-4 py-2 bg-primary text-on-primary hover:bg-primary-fixed rounded-xl font-label-md text-xs font-bold transition-all shrink-0 shadow-md"
            >
              Configure API Key
            </button>
          </div>
        )}

        {/* Empty State */}
        {messages.length === 0 ? (
          <div className="flex flex-col justify-center flex-1 w-full gap-4 text-center py-8 my-auto animate-fade-in">
            <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-tr from-primary/20 via-secondary/20 to-tertiary/20 flex items-center justify-center mb-1 shadow-inner border border-outline-variant/20">
              <span className="material-symbols-outlined text-primary text-[44px]">auto_awesome</span>
            </div>
            <h2 className="text-xl md:text-2xl text-on-surface font-bold max-w-[32rem] mx-auto w-full">
              How can I help you optimize your money today?
            </h2>
            <p className="font-body-md text-sm text-on-surface-variant max-w-[28rem] mx-auto w-full">
              Ask me questions about your spending trends, hidden subscription leaks, or custom budgeting strategies.
            </p>

            {/* Prompt Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-2xl mt-4 mx-auto">
              {SUGGESTED_PROMPTS.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(item.text)}
                  disabled={chatMutation.isPending}
                  className="bg-surface-container-low hover:bg-surface-container p-4 rounded-2xl border border-outline-variant/30 hover:border-primary/50 transition-all text-left flex items-start gap-3 group shadow-sm hover:shadow-md disabled:opacity-50"
                >
                  <div className="w-9 h-9 rounded-xl bg-surface-container-highest group-hover:bg-primary/10 text-primary flex items-center justify-center shrink-0 transition-colors">
                    <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="font-label-md text-sm font-semibold text-on-surface group-hover:text-primary transition-colors">{item.title}</span>
                    <span className="font-body-sm text-xs text-on-surface-variant line-clamp-1">{item.text}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Messages List */
          <div className="flex flex-col gap-6 py-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start gap-3'} animate-fade-in`}>
                {msg.role === 'assistant' && (
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/20 flex items-center justify-center shadow-sm shrink-0 mt-1">
                    <span className="material-symbols-outlined text-primary text-[20px]">smart_toy</span>
                  </div>
                )}
                <div className={`max-w-[85%] md:max-w-[75%] flex flex-col gap-2`}>
                  <div className={`rounded-2xl p-4 shadow-md ${
                    msg.role === 'user'
                      ? 'bg-primary text-on-primary rounded-tr-sm font-body-md text-sm'
                      : 'bg-surface-container-low backdrop-blur-xl border border-outline-variant/30 text-on-surface rounded-tl-sm font-body-md text-sm'
                  }`}>
                    <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                  </div>

                  {/* Citations */}
                  {msg.role === 'assistant' && msg.citations && msg.citations.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                      {msg.citations.map((cit, ci) => (
                        <div key={ci} className="bg-surface-container-high/60 flex flex-col gap-1 p-3 rounded-xl border border-outline-variant/20 hover:border-primary/40 transition-all text-xs">
                          <div className="flex justify-between items-center text-on-surface-variant font-mono text-[11px]">
                            <span className="flex items-center gap-1">
                              <span className="material-symbols-outlined text-[14px]">receipt</span>
                              {cit.transaction_id.substring(0, 8)}
                            </span>
                            <span>{new Date(cit.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
                          </div>
                          <div className="flex justify-between items-center mt-0.5">
                            <span className="font-semibold text-on-surface truncate pr-2">{cit.merchant}</span>
                            <span className="font-bold text-error whitespace-nowrap">-₹{cit.amount.toLocaleString()}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <span className="font-label-sm text-[10px] text-on-surface-variant/60 font-mono self-end px-1">
                    {msg.timestamp.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {chatMutation.isPending && (
              <div className="flex justify-start w-full gap-3 animate-fade-in">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/20 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary text-[20px] animate-spin">sync</span>
                </div>
                <div className="bg-surface-container-low backdrop-blur-xl border border-outline-variant/30 rounded-2xl rounded-tl-sm px-5 py-3.5 flex items-center gap-1.5 shadow-sm">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  <span className="text-xs text-on-surface-variant ml-2 font-medium">Analyzing financials...</span>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer Input Bar */}
      <footer className="p-4 md:p-6 bg-surface-container-low/80 backdrop-blur-2xl border-t border-outline-variant/30 z-20">
        <div className="max-w-4xl mx-auto w-full flex flex-col gap-2">
          {/* Quick Pill prompt scroll if chat started */}
          {messages.length > 0 && (
            <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
              {SUGGESTED_PROMPTS.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(item.text)}
                  disabled={chatMutation.isPending}
                  className="shrink-0 bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface text-xs font-medium px-3 py-1.5 rounded-full border border-outline-variant/20 transition-all whitespace-nowrap shadow-sm disabled:opacity-50 flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[14px] text-primary">{item.icon}</span>
                  {item.title}
                </button>
              ))}
            </div>
          )}

          <div className="relative flex items-end gap-2 bg-surface-container-lowest border border-outline-variant/50 rounded-2xl p-2 shadow-lg focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all">
            <textarea
              ref={textareaRef}
              className="w-full bg-transparent border-none focus:ring-0 text-body-md font-body-md text-on-surface placeholder:text-on-surface-variant/60 resize-none py-2 px-3 max-h-32 overflow-y-auto outline-none text-sm"
              id="chat-input"
              placeholder="Ask anything about your spending, budgets, or subscription leaks..."
              rows={1}
              value={input}
              onChange={handleTextareaInput}
              onKeyDown={handleKeyDown}
              disabled={chatMutation.isPending}
            />
            <button
              onClick={() => handleSend()}
              disabled={chatMutation.isPending || !input.trim()}
              className="p-2.5 bg-primary text-on-primary hover:bg-primary-fixed transition-all rounded-xl h-10 w-10 flex items-center justify-center shrink-0 shadow-md disabled:opacity-40 disabled:cursor-not-allowed group"
              id="send-btn"
              title="Send message"
            >
              <span className="material-symbols-outlined text-[20px] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">send</span>
            </button>
          </div>
          <div className="text-center mt-1">
            <span className="font-label-sm text-[11px] text-on-surface-variant/60">
              ⚡ Powered by SpendSense AI Copilot • AI responses should be verified against actual records.
            </span>
          </div>
        </div>
      </footer>

      {/* API Key Modal */}
      {isKeyModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-surface-container w-full min-w-[320px] sm:w-[450px] max-w-lg rounded-3xl p-6 md:p-8 shadow-2xl border border-outline-variant/20 animate-fade-in-up flex flex-col gap-6">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[26px]">key</span>
                </div>
                <div>
                  <h3 className="font-headline-md text-lg font-bold text-on-surface">Configure AI API Key</h3>
                  <p className="font-body-sm text-xs text-on-surface-variant">Connect your free API key for real-time AI reasoning</p>
                </div>
              </div>
              <button onClick={() => setIsKeyModalOpen(false)} className="text-on-surface-variant hover:text-on-surface p-1 rounded-full hover:bg-surface-container-highest">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleSaveKey} className="flex flex-col gap-5">
              {/* Provider Selection */}
              <div className="flex flex-col gap-2">
                <label className="font-label-md text-xs uppercase tracking-wider text-on-surface-variant font-bold">Select AI Provider</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setProvider('gemini')}
                    className={`p-3 rounded-2xl border flex flex-col items-center gap-1 transition-all ${
                      provider === 'gemini' 
                        ? 'bg-primary/15 border-primary text-primary shadow-sm font-bold' 
                        : 'bg-surface-container-low border-outline-variant/30 text-on-surface-variant hover:border-outline-variant'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[22px]">auto_awesome</span>
                    <span className="text-xs">Google Gemini</span>
                    <span className="text-[10px] opacity-70">Free & Fast</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setProvider('openrouter')}
                    className={`p-3 rounded-2xl border flex flex-col items-center gap-1 transition-all ${
                      provider === 'openrouter' 
                        ? 'bg-primary/15 border-primary text-primary shadow-sm font-bold' 
                        : 'bg-surface-container-low border-outline-variant/30 text-on-surface-variant hover:border-outline-variant'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[22px]">hub</span>
                    <span className="text-xs">OpenRouter</span>
                    <span className="text-[10px] opacity-70">Multi-Model LLM</span>
                  </button>
                </div>
              </div>

              {/* API Key Input */}
              <div className="flex flex-col gap-2">
                <label className="font-label-md text-xs uppercase tracking-wider text-on-surface-variant font-bold flex justify-between">
                  <span>API Key</span>
                  <a 
                    href={provider === 'gemini' ? 'https://aistudio.google.com' : 'https://openrouter.ai/keys'} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline lowercase font-normal flex items-center gap-0.5"
                  >
                    Get free key <span className="material-symbols-outlined text-[12px]">open_in_new</span>
                  </a>
                </label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    placeholder={provider === 'gemini' ? 'AIzaSy...' : 'sk-or-v1-...'}
                    className="w-full bg-surface-container-highest p-3.5 rounded-xl text-sm font-mono text-on-surface border border-outline-variant/30 focus:border-primary outline-none transition-all pr-10"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                  />
                  {apiKey && (
                    <button
                      type="button"
                      onClick={() => setApiKey('')}
                      className="absolute right-3 top-3.5 text-on-surface-variant hover:text-error"
                    >
                      <span className="material-symbols-outlined text-[18px]">clear</span>
                    </button>
                  )}
                </div>
                <p className="text-[11px] text-on-surface-variant/80 leading-relaxed">
                  Your API key is stored securely in your browser's local storage and is never saved on our servers.
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between gap-3 pt-2">
                {apiKey ? (
                  <button
                    type="button"
                    onClick={handleClearKey}
                    className="px-4 py-2.5 rounded-xl bg-error/10 text-error hover:bg-error/20 text-xs font-semibold transition-colors flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[16px]">delete</span>
                    Remove Key
                  </button>
                ) : <div></div>}
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsKeyModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl bg-surface-container-highest hover:bg-surface-container-high text-on-surface text-xs font-semibold transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary-fixed text-on-primary text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-[16px]">check</span>
                    Save & Activate
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
