"use client";
import React from "react";
import { Stethoscope, Facebook, Linkedin, Mail, Phone } from "lucide-react";
import { Button } from "../ui/Button";
import {
  FaSquareXTwitter,
  FaTelegram,
  FaSquareWhatsapp,
} from "react-icons/fa6";

import { useHandleNavigation } from "@/hooks/useHandleNavigation";

export default function Footer() {
  const { handleNavigation } = useHandleNavigation();
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 lg:col-span-2">
            <div
              className="flex items-center space-x-2 mb-4"
              onClick={() => handleNavigation("/")}
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Stethoscope className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold font-[Plus_Jakarta_Sans] text-foreground">
                Smartcare
              </span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              Revolutionizing healthcare with AI-powered tools and expert
              medical consultations. Your health, our priority.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4">
              <Button
                variant="outline"
                size="sm"
                className="h-10 w-10 p-0 text-primary"
                onClick={() =>
                  window.open("https://www.facebook.com/hazemg99", "_blank")
                }
              >
                <Facebook className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-10 w-10 p-0 text-primary"
                onClick={() => window.open("https://x.com/hazemg99", "_blank")}
              >
                <FaSquareXTwitter className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-10 w-10 p-0 text-primary"
                onClick={() =>
                  window.open("https://t.me/hazem223311", "_blank")
                }
              >
                <FaTelegram className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-10 w-10 p-0 text-primary"
                onClick={() =>
                  window.open(
                    "https://www.linkedin.com/in/hazemgamal1",
                    "_blank"
                  )
                }
              >
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-10 w-10 p-0 text-primary"
                onClick={() =>
                  window.open("https://wa.me/201003165658", "_blank")
                }
              >
                <FaSquareWhatsapp className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { label: "Home", id: "/", url: "/" },
                {
                  label: "Find Doctors",
                  id: "/specialties",
                  url: "specialties",
                },
                { label: "AI Tools", id: "/ai-tools", url: "ai-tools" },
                { label: "About Us", id: "/about", url: "about" },
                { label: "Contact", id: "/contact", url: "contact" },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => {
                      handleNavigation(link.id);
                    }}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li
                className="flex items-center space-x-2 text-sm text-muted-foreground"
                onClick={() =>
                  (window.location.href = "mailto:hazemgamal223311@gmail.com")
                }
              >
                <Mail className="h-4 w-4" />
                <span>hazemgamal223311@gmail.com</span>
              </li>
              <li
                className="flex items-center space-x-2 text-sm text-muted-foreground"
                onClick={() => (window.location.href = "tel:+201003165658")}
              >
                <Phone className="h-4 w-4" />
                <span>+20 100 316 5658</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          {/* Left side: Copyright */}
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            © 2025 Smartcare. All rights reserved.
          </p>

          {/* Right side: Built by + social links */}
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
            <p className="text-sm text-muted-foreground">
              Built with ❤️ by Hazem Gamal
            </p>
            <div className="flex space-x-3">
              <Button
                variant="outline"
                size="sm"
                className="h-10 w-10 p-0 text-primary"
                onClick={() =>
                  window.open("https://www.facebook.com/hazemg99", "_blank")
                }
              >
                <Facebook className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-10 w-10 p-0 text-primary"
                onClick={() => window.open("https://x.com/hazemg99", "_blank")}
              >
                <FaSquareXTwitter className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-10 w-10 p-0 text-primary"
                onClick={() =>
                  window.open(
                    "https://www.linkedin.com/in/hazemgamal1",
                    "_blank"
                  )
                }
              >
                <Linkedin className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
