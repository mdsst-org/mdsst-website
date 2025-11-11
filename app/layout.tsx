// app/layout.tsx
import "./globals.css";
import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Maa Durga Seva Sansthan",
  description: "Serving humanity through devotion and compassion.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-gray-800">
        {/* Header / Nav */}
        <header className="bg-red-800 text-white">
          <div className="max-w-5xl mx-auto flex items-center justify-between p-4">
            <Link href="/" className="flex items-center">
              {/* Put logo.png in /public and replace width/height as needed */}
              <Image src="/logo.png" alt="MDSS Logo" width={56} height={56} />
              <div className="ml-3">
                <div className="font-bold text-xl">Maa Durga Seva Sansthan</div>
                <div className="text-sm">Serving humanity through devotion</div>
              </div>
            </Link>

            <nav>
              <ul className="flex gap-4">
                <li><Link href="/" className="hover:underline">Home</Link></li>
                <li><Link href="/about" className="hover:underline">About</Link></li>
                <li><Link href="/initiatives" className="hover:underline">Initiatives</Link></li>
                <li><Link href="/donate" className="hover:underline">Donate</Link></li>
                <li><Link href="/contact" className="hover:underline">Contact</Link></li>
              </ul>
            </nav>
          </div>
        </header>

        {/* Page content */}
        <main>{children}</main>

        {/* Footer */}
        <footer className="bg-red-800 text-white mt-12">
          <div className="max-w-5xl mx-auto p-6 text-center text-sm">
            <div>© {new Date().getFullYear()} Maa Durga Seva Sansthan (MDSS)</div>
            <div className="mt-2">PAN: [your PAN] • 12A/80G: [certificate references]</div>
            <div className="mt-2">Email: <a href="mailto:info@mdsst.org" className="underline">info@mdsst.org</a></div>
          </div>
        </footer>
      </body>
    </html>
  );
}
