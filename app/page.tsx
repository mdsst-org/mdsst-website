// app/page.tsx
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="w-full bg-gradient-to-b from-red-800 to-red-600 text-white text-center py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Maa Durga Seva Sansthan</h1>
          <p className="text-lg md:text-2xl max-w-2xl mx-auto">
            Serving humanity through devotion and compassion.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link href="/donate" className="inline-block bg-yellow-400 text-red-800 font-semibold px-6 py-3 rounded-lg shadow">
              Support Our Mission
            </Link>
            <Link href="/initiatives" className="inline-block border border-white px-6 py-3 rounded-lg">
              Our Initiatives
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto p-8 text-center">
        <h2 className="text-3xl font-semibold mb-6 text-red-800">Our Mission</h2>
        <p className="text-lg leading-relaxed">
          Maa Durga Seva Sansthan (MDSS) is a charitable trust devoted to uplifting underprivileged communities
          through education, healthcare, women empowerment, and cultural preservation. Guided by the spirit of
          Maa Durga, we aim to bring strength, wisdom, and compassion to every life we touch.
        </p>
      </section>

      <section className="w-full bg-gray-100 py-12 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-8 text-red-800">Key Initiatives</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-2xl shadow">
              <h3 className="font-semibold text-xl mb-2 text-red-700">Education for All</h3>
              <p>Supporting rural children with books, uniforms, and learning programs.</p>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow">
              <h3 className="font-semibold text-xl mb-2 text-red-700">Women Empowerment</h3>
              <p>Skill training and self-help initiatives for financial independence.</p>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow">
              <h3 className="font-semibold text-xl mb-2 text-red-700">Health & Relief</h3>
              <p>Medical camps, blood donation, and emergency relief for the needy.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
