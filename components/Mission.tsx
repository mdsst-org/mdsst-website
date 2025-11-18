// components/Mission.tsx
"use client";

import { motion } from "framer-motion";
import { Target, Globe2, HandHeart } from "lucide-react";

export default function Mission() {
  const cards = [
    { icon: <Target className="w-8 h-8 text-mdssGold" />, title: "Our Mission", text: "Build resilient communities through education, health and social programs." },
    { icon: <Globe2 className="w-8 h-8 text-mdssGold" />, title: "Our Vision", text: "A world where every individual has dignity and access to opportunities." },
    { icon: <HandHeart className="w-8 h-8 text-mdssGold" />, title: "Our Values", text: "Compassion, integrity and service guide all our actions." },
  ];

  return (
    <section id="mission" className="py-16 bg-mdssBg">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-display font-bold text-mdssRed mb-8">Mission & Values</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((c, i) => (
            <motion.div
              key={i}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.12 }}
              className="rounded-2xl bg-white shadow-md border border-slate-100 p-6"
            >
              <div className="flex items-center justify-center mb-4">{c.icon}</div>
              <h3 className="font-semibold text-xl mb-2">{c.title}</h3>
              <p className="text-gray-700">{c.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
