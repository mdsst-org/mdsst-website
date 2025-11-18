// components/About.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
        <motion.div initial={{ x: -20, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 0.6 }}>
          <Image src="/images/about.jpg" alt="about" width={800} height={520} className="rounded-2xl object-cover shadow-lg" />
        </motion.div>

        <motion.div
          initial={{ x: 20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-4 text-3xl font-display font-bold text-mdssRed">
            The Story of Maa Durga Seva Sansthan Trust
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Maa Durga Seva Sansthan Trust is a charitable organisation based in Nayadih, Baliapur,
            Dhanbad, Jharkhand. Guided by the belief that empowering people is a divine duty, we work
            with children, women and families so that no one is denied basic health care, education or
            dignity.
          </p>
          <p className="mt-3 text-gray-700 leading-relaxed">
            Through health initiatives, education support, women empowerment and community welfare
            activities, we aim to bring hope and opportunity to those who are often left on the
            margins of society.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-gray-700">
            <li>• Grassroots programs in health, education, women empowerment and community welfare.</li>
            <li>• Transparent operations with audited accounts and responsible stewardship of funds.</li>
            <li>• Registered charitable trust with PAN: AAKTM1699R and DARPAN ID: JH/2025/0684825.</li>
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#initiatives"
              className="inline-block rounded-full bg-mdssRed px-5 py-2 text-sm font-semibold text-white"
            >
              Explore Our Initiatives
            </a>
            <a
              href="#donation"
              className="inline-block rounded-full border border-mdssRed px-5 py-2 text-sm font-semibold text-mdssRed"
            >
              Support Our Work
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
