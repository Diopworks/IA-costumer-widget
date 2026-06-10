import ChatWidget from "@/components/ChatWidget";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-24">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
          Mon Portfolio Moderne
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Le widget dassistance IA est disponible en bas à droite de lécran.
        </p>
      </div>

      {/* Intégration du Widget */}
      <ChatWidget />
    </main>
  );
}