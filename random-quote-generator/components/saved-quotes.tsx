"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2, ExternalLink } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

// Sample quotes data - same as in quote-generator.tsx
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

export default function SavedQuotes() {
  const [savedQuoteIds, setSavedQuoteIds] = useState<string[]>([])
  const { toast } = useToast()

  // Load saved quotes from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("savedQuotes")
    if (saved) {
      setSavedQuoteIds(JSON.parse(saved))
    }
  }, [])

  // Get the full quote objects for the saved IDs
  const savedQuotes = quotes.filter((quote) => savedQuoteIds.includes(quote.id))

  // Remove a quote from saved
  const removeQuote = (id: string) => {
    const updated = savedQuoteIds.filter((quoteId) => quoteId !== id)
    setSavedQuoteIds(updated)
    localStorage.setItem("savedQuotes", JSON.stringify(updated))

    toast({
      title: "Quote removed",
      description: "Quote removed from your saved collection",
    })
  }

  if (savedQuotes.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground mb-4">You haven't saved any quotes yet.</p>
        <Button asChild variant="outline">
          <a href="/">
            <ExternalLink className="mr-2 h-4 w-4" />
            Go find some quotes
          </a>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {savedQuotes.map((quote) => (
        <Card key={quote.id} className="overflow-hidden">
          <CardContent className="p-6">
            <div className="flex justify-between gap-4">
              <div>
                <blockquote className="text-lg font-serif italic mb-2">"{quote.text}"</blockquote>
                <p className="text-sm font-medium text-right">— {quote.author}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-destructive"
                onClick={() => removeQuote(quote.id)}
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Remove</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

