"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Quote, RefreshCw, Share2, Heart, Twitter, Facebook, Linkedin, Copy, Check } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useAuth } from "./auth-provider"
import { useToast } from "@/components/ui/use-toast"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Sample quotes data
const quotes = [
  {
    id: "1",
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
  },
  {
    id: "2",
    text: "Life is what happens when you're busy making other plans.",
    author: "John Lennon",
  },
  {
    id: "3",
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
  },
  {
    id: "4",
    text: "In the end, it's not the years in your life that count. It's the life in your years.",
    author: "Abraham Lincoln",
  },
  {
    id: "5",
    text: "The purpose of our lives is to be happy.",
    author: "Dalai Lama",
  },
  {
    id: "6",
    text: "Get busy living or get busy dying.",
    author: "Stephen King",
  },
  {
    id: "7",
    text: "You only live once, but if you do it right, once is enough.",
    author: "Mae West",
  },
  {
    id: "8",
    text: "Many of life's failures are people who did not realize how close they were to success when they gave up.",
    author: "Thomas A. Edison",
  },
  {
    id: "9",
    text: "The mind is everything. What you think you become.",
    author: "Buddha",
  },
  {
    id: "10",
    text: "The best time to plant a tree was 20 years ago. The second best time is now.",
    author: "Chinese Proverb",
  },
]

export default function QuoteGenerator() {
  // State to hold the current quote
  const [currentQuote, setCurrentQuote] = useState(() => {
    // Start with a random quote
    const randomIndex = Math.floor(Math.random() * quotes.length)
    return quotes[randomIndex]
  })

  // State for loading animation
  const [isLoading, setIsLoading] = useState(false)

  // State for animation key
  const [animationKey, setAnimationKey] = useState(0)

  // State for saved quotes
  const [savedQuotes, setSavedQuotes] = useState<string[]>([])

  // State for copy button
  const [copied, setCopied] = useState(false)

  const { isAuthenticated } = useAuth()
  const { toast } = useToast()

  // Load saved quotes from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("savedQuotes")
    if (saved) {
      setSavedQuotes(JSON.parse(saved))
    }
  }, [])

  // Function to get a new random quote
  const getRandomQuote = () => {
    setIsLoading(true)

    // Simulate API call with timeout
    setTimeout(() => {
      let newIndex
      // Make sure we don't get the same quote twice in a row
      do {
        newIndex = Math.floor(Math.random() * quotes.length)
      } while (quotes[newIndex].id === currentQuote.id)

      setCurrentQuote(quotes[newIndex])
      setAnimationKey((prev) => prev + 1)
      setIsLoading(false)
    }, 600)
  }

  // Function to save a quote
  const saveQuote = () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please login to save quotes",
        variant: "destructive",
      })
      return
    }

    if (savedQuotes.includes(currentQuote.id)) {
      // Remove from saved
      const updated = savedQuotes.filter((id) => id !== currentQuote.id)
      setSavedQuotes(updated)
      localStorage.setItem("savedQuotes", JSON.stringify(updated))

      toast({
        title: "Quote removed",
        description: "Quote removed from your saved collection",
      })
    } else {
      // Add to saved
      const updated = [...savedQuotes, currentQuote.id]
      setSavedQuotes(updated)
      localStorage.setItem("savedQuotes", JSON.stringify(updated))

      toast({
        title: "Quote saved",
        description: "Quote added to your saved collection",
      })
    }
  }

  // Function to copy quote to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(`"${currentQuote.text}" — ${currentQuote.author}`)
    setCopied(true)

    toast({
      title: "Copied to clipboard",
      description: "Quote copied to clipboard",
    })

    setTimeout(() => setCopied(false), 2000)
  }

  // Share functions
  const shareOnTwitter = () => {
    const text = encodeURIComponent(`"${currentQuote.text}" — ${currentQuote.author}`)
    window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank")
  }

  const shareOnFacebook = () => {
    const url = encodeURIComponent(window.location.href)
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank")
  }

  const shareOnLinkedIn = () => {
    const url = encodeURIComponent(window.location.href)
    const title = encodeURIComponent("Inspirational Quote")
    const summary = encodeURIComponent(`"${currentQuote.text}" — ${currentQuote.author}`)
    window.open(
      `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}&summary=${summary}`,
      "_blank",
    )
  }

  const isSaved = savedQuotes.includes(currentQuote.id)

  return (
    <Card className="w-full backdrop-blur-sm bg-white/90 dark:bg-slate-900/90 border-none shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-xl overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

      <CardContent className="p-8 pt-10">
        <div className="absolute opacity-10 top-6 left-6">
          <Quote className="h-24 w-24 text-primary" />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={animationKey}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="min-h-[180px] flex flex-col justify-center relative z-10"
          >
            <blockquote className="text-2xl font-serif text-slate-800 dark:text-slate-100 leading-relaxed">
              "{currentQuote.text}"
            </blockquote>
            <footer className="mt-6 text-right">
              <p className="text-lg font-medium bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 text-transparent bg-clip-text">
                — {currentQuote.author}
              </p>
            </footer>
          </motion.div>
        </AnimatePresence>
      </CardContent>

      <CardFooter className="flex justify-between gap-4 p-6 pt-0">
        <Button
          onClick={getRandomQuote}
          disabled={isLoading}
          className="w-3/5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-md transition-all duration-300 hover:shadow-lg"
        >
          {isLoading ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Loading...
            </>
          ) : (
            <>
              <RefreshCw className="mr-2 h-4 w-4" />
              New Quote
            </>
          )}
        </Button>

        <Button
          onClick={saveQuote}
          variant="outline"
          className={`w-1/5 border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 ${
            isSaved ? "text-pink-500 hover:text-pink-600" : ""
          }`}
        >
          <Heart className={`h-4 w-4 ${isSaved ? "fill-current" : ""}`} />
          <span className="sr-only">{isSaved ? "Unsave" : "Save"}</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="w-1/5 border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300"
            >
              <Share2 className="h-4 w-4" />
              <span className="sr-only">Share</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={copyToClipboard}>
              {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
              <span>Copy to clipboard</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={shareOnTwitter}>
              <Twitter className="mr-2 h-4 w-4" />
              <span>Share on Twitter</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={shareOnFacebook}>
              <Facebook className="mr-2 h-4 w-4" />
              <span>Share on Facebook</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={shareOnLinkedIn}>
              <Linkedin className="mr-2 h-4 w-4" />
              <span>Share on LinkedIn</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
    </Card>
  )
}

