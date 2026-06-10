"use client";

import React, { useState } from "react";
import { MessageSquare, X, Send } from "lucide-react";

export default function ChatWidget() {
  // État pour savoir si la fenêtre de chat est ouverte ou fermée
  const [isOpen, setIsOpen] = useState(false);
  // État pour stocker le message que l'utilisateur est en train d'écrire
  const [inputMessage, setInputMessage] = useState("");

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
      
      {/* 1. LA FENÊTRE DE CHAT (Visible uniquement si isOpen est true) */}
      {isOpen && (
        <div className="mb-4 flex h-[500px] w-[360px] flex-col rounded-2xl border border-gray-200 bg-white shadow-2xl transition-all duration-300">
          
          {/* Entête du chat */}
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

          {/* Zone des messages (Zone de discussion) */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
            <div className="flex gap-2 max-w-[80%] rounded-xl bg-white p-3 text-sm text-gray-800 shadow-sm border border-gray-100">
              Bonjour ! Comment puis-je vous aider aujourdhui ?
            </div>
          </div>

          {/* Formulaire d'envoi du message */}
          <div className="border-t border-gray-100 p-3 bg-white rounded-b-2xl">
            <form className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Écrivez votre message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-lg bg-indigo-600 p-2 text-white hover:bg-indigo-700 transition-colors"
              >
                <Send size={16} />
              </button>
            </form>
          </div>

        </div>
      )}

      {/* 2. LE BOUTON FLOTTANT (La bulle) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-600 text-white shadow-xl hover:bg-indigo-700 hover:scale-105 transition-all duration-200"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>

    </div>
  );
}