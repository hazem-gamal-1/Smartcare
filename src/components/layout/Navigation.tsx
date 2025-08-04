"use client";
import React, { useState, useEffect } from "react";
import { Button } from "../ui/Button";
import { Moon, Sun, Menu, X, Stethoscope } from "lucide-react";
import useThemeStore from "@/store/themeStore";
import { useRouter, usePathname } from "next/navigation";

export default function Navigation() {
  const router = useRouter();
  const currentPage = usePathname();

  // const [currentPage, setCurrentPage] = useState<string>("home");
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
  console.log(currentPage);
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => {
              router.push("/");
              // setCurrentPage("home");
            }}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Stethoscope className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold font-[Plus_Jakarta_Sans] text-foreground">
              AI-Clinic
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  router.push(item.url);
                  // setCurrentPage(item.id);
                }}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  currentPage === item.id
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right side controls */}
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

            <Button size="sm" className="hidden md:flex" onClick={() => true}>
              Sign In
            </Button>

            {/* Mobile menu button */}
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

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t bg-card/95 backdrop-blur">
            <div className="px-2 py-3 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
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
              <div className="flex items-center justify-between px-3 py-2">
                <span className="text-sm font-medium text-muted-foreground">
                  Dark Mode
                </span>
                <Button variant="ghost" size="sm" onClick={toggleTheme}>
                  {theme === "light" ? (
                    <Sun className="h-4 w-4" />
                  ) : (
                    <Moon className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <div className="px-3 py-2">
                <Button
                  size="sm"
                  className="w-full"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    router.push("auth")
                  }}
                >
                  Sign In
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
