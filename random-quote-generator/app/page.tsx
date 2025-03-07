import QuoteGenerator from "@/components/quote-generator"

export default function Home() {
  return (
    <main className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center p-4 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 dark:from-slate-900 dark:via-purple-900 dark:to-slate-800">
      <div className="w-full max-w-md">
        <h1 className="text-center text-3xl font-bold text-white mb-6 drop-shadow-md">Daily Inspiration</h1>
        <QuoteGenerator />
      </div>
    </main>
  )
}

