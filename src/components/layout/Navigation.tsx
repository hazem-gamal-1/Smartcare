"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Moon, Sun, Menu, X, Stethoscope } from "lucide-react";
import { Button } from "../ui/Button";
import useThemeStore from "@/store/themeStore";
import { SignInButton, UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { useHandleNavigation } from "@/hooks/useHandleNavigation";

export default function Navigation() {
  const { handleNavigation } = useHandleNavigation();
  const router = useRouter();
  const currentPage = usePathname();

  const { loadTheme, toggleTheme, theme } = useThemeStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    loadTheme();
  }, [loadTheme]);

  const navItems = [
    { id: "/", label: "Home", url: "/" },
    { id: "/specialties", label: "Find Doctors", url: "/specialties" },
    { id: "/ai-tools", label: "AI Tools", url: "/ai-tools" },
    { id: "/about", label: "About", url: "/about" },
    { id: "/contact", label: "Contact", url: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => router.push("/")}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Stethoscope className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold font-[Plus_Jakarta_Sans] text-foreground">
              AI-Clinic
            </span>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  currentPage === item.id
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {item.label}
              </button>
            ))}

            {/* Dashboard link for signed-in users */}
            <SignedIn>
              <button
                onClick={() => handleNavigation("/dashboard")}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  currentPage === "/dashboard"
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                My Appointments
              </button>
            </SignedIn>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="hidden sm:flex"
            >
              {theme === "light" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>

            {/* Clerk Auth Buttons */}
            <SignedOut>
              <SignInButton mode="modal">
                <Button size="sm" className="hidden md:flex">
                  Sign In
                </Button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>

            {/* Mobile menu toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden"
            >
              {isMobileMenuOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t bg-card/95 backdrop-blur">
            <div className="px-2 py-3 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleNavigation(item.id);
                  }}
                  className={`block w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentPage === item.id
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {item.label}
                </button>
              ))}

              {/* Dashboard link for signed-in users */}
              <SignedIn>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleNavigation("/dashboard");
                  }}
                  className={`block w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentPage === "/dashboard"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  My Appointments
                </button>
              </SignedIn>

              {/* Theme toggle */}
              <div className="flex items-center justify-between px-3 py-2">
                <span className="text-sm font-medium text-muted-foreground">
                  {theme}
                </span>
                <Button variant="ghost" size="sm" onClick={toggleTheme}>
                  {theme === "light" ? (
                    <Sun className="h-4 w-4" />
                  ) : (
                    <Moon className="h-4 w-4" />
                  )}
                </Button>
              </div>

              {/* Mobile auth buttons */}
              <div className="px-3 py-2">
                <SignedOut>
                  <SignInButton mode="modal">
                    <Button size="sm" className="w-full">
                      Sign In
                    </Button>
                  </SignInButton>
                </SignedOut>
                <SignedIn>
                  <UserButton afterSignOutUrl="/" />
                </SignedIn>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
