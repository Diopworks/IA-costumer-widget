import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

// Initialisation du SDK avec la clé API
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Message manquant" }, { status: 400 });
    }

    // Appel à l'API Gemini 2.5 Flash
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: message,
      // Le "systemInstruction" donne son rôle à l'IA
      config: {
      systemInstruction: 
        "Tu es l'assistant IA officiel du portfolio d'un Développeur Fullstack talentueux. " +
        "Ton but est d'aider les recruteurs et les visiteurs. Reste professionnel, courtois, " +
        "et réponds de manière concise (3 phrases maximum). Si on te demande des détails précis sur ses " +
        "projets ou ses expériences, dis gentiment que le projet est en cours de développement et qu'il " +
        "va bientôt ajouter toutes ces informations directement ici !",
      }  });

    const aiReply = response.text || "Désolé, je n'ai pas pu générer de réponse.";

    return NextResponse.json({ reply: aiReply });
  } catch (error) {
    console.error("Erreur API Gemini:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de la génération." },
      { status: 500 }
    );
  }
}