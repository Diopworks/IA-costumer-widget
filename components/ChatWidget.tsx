"use client";

import React, { useState } from "react";
import { MessageSquare, X, Send, Bot, User } from "lucide-react";

// Structure d'un message
interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  createdAt: Date;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  
  // Historique des messages avec un message de bienvenue par défaut
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Bonjour ! Comment puis-je vous aider aujourd'hui ?",
      sender: "ai",
      createdAt: new Date(),
    },
  ]);
  
  // État de chargement (simulera l'attente de l'API IA)
  const [isLoading, setIsLoading] = useState(false);

  // Fonction déclenchée lors de l'envoi du formulaire
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return; // Évite d'envoyer du vide

    // 1. Créer et ajouter le message de l'utilisateur
    const userMessage: Message = {
      id: Math.random().toString(36).substring(7),
      text: inputMessage,
      sender: "user",
      createdAt: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentQuery = inputMessage; // On garde une copie
    setInputMessage(""); // On vide le champ de texte
    setIsLoading(true);  // On active l'animation de chargement

    // 2. SIMULATION DE L'OPTION 2 (En attendant de brancher la vraie API)
    setTimeout(() => {
      const aiResponse: Message = {
        id: Math.random().toString(36).substring(7),
        text: `Vous avez dit : "${currentQuery}". Mon cerveau IA sera totalement connecté à l'étape suivante !`,
        sender: "ai",
        createdAt: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false); // On arrête le chargement
    }, 1500); // Faux délai de 1.5 secondes
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
      
      {/* FENÊTRE DE CHAT */}
      {isOpen && (
        <div className="mb-4 flex h-[500px] w-[360px] flex-col rounded-2xl border border-gray-200 bg-white shadow-2xl transition-all duration-300">
          
          {/* Entête */}
          <div className="flex items-center justify-between rounded-t-2xl bg-indigo-600 p-4 text-white">
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
              <div>
                <h3 className="font-semibold text-sm">Assistant IA</h3>
                <p className="text-xs text-indigo-200">En ligne</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="rounded-full p-1 hover:bg-indigo-700 transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Zone de discussion dynamique */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 max-w-[85%] rounded-xl p-3 text-sm shadow-sm ${
                  msg.sender === "user"
                    ? "ml-auto bg-indigo-600 text-white rounded-br-none"
                    : "bg-white text-gray-800 border border-gray-100 rounded-bl-none"
                }`}
              >
                {msg.sender === "ai" && <Bot size={16} className="text-indigo-600 shrink-0 mt-0.5" />}
                <p className="leading-relaxed">{msg.text}</p>
              </div>
            ))}

            {/* Animation "L'IA réfléchit..." */}
            {isLoading && (
              <div className="flex items-center gap-2 max-w-[50%] rounded-xl bg-white p-3 border border-gray-100 shadow-sm rounded-bl-none">
                <Bot size={16} className="text-indigo-600 animate-bounce" />
                <div className="flex gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="h-1.5 w-1.5 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="h-1.5 w-1.5 rounded-full bg-gray-400 animate-bounce"></span>
                </div>
              </div>
            )}
          </div>

          {/* Formulaire d'envoi */}
          <div className="border-t border-gray-100 p-3 bg-white rounded-b-2xl">
            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Écrivez votre message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                disabled={isLoading}
                className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none disabled:bg-gray-50 disabled:text-gray-400"
              />
              <button
                type="submit"
                disabled={isLoading || !inputMessage.trim()}
                className="rounded-lg bg-indigo-600 p-2 text-white hover:bg-indigo-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                <Send size={16} />
              </button>
            </form>
          </div>

        </div>
      )}

      {/* BOUTON FLOTTANT */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-600 text-white shadow-xl hover:bg-indigo-700 hover:scale-105 transition-all duration-200"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>

    </div>
  );
}