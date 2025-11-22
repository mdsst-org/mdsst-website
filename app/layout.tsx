"use client";

import "./globals.css";
import type { ReactNode } from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/#campaigns", label: "Campaigns" },
  { href: "/#news", label: "News" },
  { href: "/#volunteer", label: "Volunteer" },
  { href: "/#contact", label: "Contact" },
];

export default function RootLayout({ children }: { children: ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <title>Maa Durga Seva Sansthan Trust | Empowering Lives</title>
        <meta
          name="description"
          content="A charitable trust dedicated to health, education, and community welfare in Jharkhand."
        />
      </head>
      <body className="bg-pureWhite text-charcoal">
        {/* Navigation */}
        <motion.header
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="fixed top-0 left-0 right-0 z-50 shadow-lg transition-all duration-300"
          style={{
            background: 'linear-gradient(to right, #1a1a1a, rgba(26, 26, 26, 0.95), #1a1a1a)',
            backgroundImage: 'linear-gradient(to right, #1a1a1a, rgba(26, 26, 26, 0.95), #1a1a1a), url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.03"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            borderBottom: isScrolled ? '1px solid rgba(220, 20, 60, 0.2)' : 'none'
          }}
        >
          <nav className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex h-24 items-center justify-between">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-3 group">
                <div className="relative h-16 w-16 overflow-hidden rounded-full">
                  <Image
                    src="/logo.png"
                    alt="MDSST Logo"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="hidden sm:block">
                  <div className="text-base font-semibold tracking-tight leading-tight" style={{ color: '#FFFFFF' }}>
                    Maa Durga Seva Sansthan Trust
                  </div>
                  <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Serving Humanity with Compassion</div>
                </div>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-8">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-sm font-medium transition-colors duration-200"
                    style={{ color: 'rgba(255, 255, 255, 0.9)' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#DC143C'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.9)'}
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  href="/#donate"
                  className="rounded-full bg-silkRed px-6 py-2.5 text-sm font-medium text-pureWhite hover:bg-silkRedDark transition-all duration-200 hover:shadow-lg"
                >
                  Donate
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 transition-colors"
                style={{ color: '#FFFFFF' }}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </nav>

          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden bg-pureWhite border-t border-lightGray"
              >
                <div className="px-6 py-4 space-y-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-base font-medium text-charcoal hover:text-silkRed transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                  <Link
                    href="/#donate"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full text-center rounded-full bg-silkRed px-6 py-3 text-base font-medium text-pureWhite"
                  >
                    Donate Now
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>

        {/* Main Content */}
        <main className="pt-20">{children}</main>

        {/* Footer */}
        <footer className="bg-deepBlack text-pureWhite">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* About */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative h-10 w-10 overflow-hidden rounded-full">
                    <Image
                      src="/logo.png"
                      alt="MDSST Logo"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="text-lg font-semibold text-silkRed">MDSST</div>
                </div>
                <p className="text-sm text-pureWhite/70 leading-relaxed">
                  Maa Durga Seva Sansthan Trust is dedicated to creating positive
                  change through health, education, and community welfare programs.
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-sm font-semibold mb-4 text-pureWhite">Quick Links</h3>
                <ul className="space-y-2">
                  {navItems.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-sm text-pureWhite/70 hover:text-silkRed transition-colors"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h3 className="text-sm font-semibold mb-4 text-pureWhite">Contact Us</h3>
                <div className="space-y-2 text-sm text-pureWhite/70">
                  <p>Nayadih, Keliasole, Dhanbad</p>
                  <p>Jharkhand - 828201, India</p>
                  <p className="pt-2">
                    <a
                      href="tel:+919431390575"
                      className="hover:text-silkRed transition-colors"
                    >
                      +91 9431390575
                    </a>
                  </p>
                  <p>
                    <a
                      href="mailto:info@mdsst.org"
                      className="hover:text-silkRed transition-colors"
                    >
                      info@mdsst.org
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-pureWhite/10 text-center text-sm text-pureWhite/50">
              <p>© {new Date().getFullYear()} Maa Durga Seva Sansthan Trust. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
