"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Quote, LogOut, User } from "lucide-react"
import { useAuth } from "./auth-provider"

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth()
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <Quote className="h-5 w-5" />
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">QuoteGen</span>
        </Link>

        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            href="/"
            className={`text-sm font-medium ${pathname === "/" ? "text-primary" : "text-muted-foreground"} transition-colors hover:text-primary`}
          >
            Home
          </Link>
          {!isAuthenticated && (
            <>
              <Link
                href="/login"
                className={`text-sm font-medium ${pathname === "/login" ? "text-primary" : "text-muted-foreground"} transition-colors hover:text-primary`}
              >
                Login
              </Link>
              <Link
                href="/signup"
                className={`text-sm font-medium ${pathname === "/signup" ? "text-primary" : "text-muted-foreground"} transition-colors hover:text-primary`}
              >
                Sign Up
              </Link>
            </>
          )}
        </nav>

        {isAuthenticated && user && (
          <div className="ml-4 flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="cursor-pointer flex w-full items-center">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer flex items-center text-red-600 focus:text-red-600"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </header>
  )
}

