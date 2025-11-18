// components/Initiatives.tsx
"use client";

import { Book, Users, HeartHandshake } from "lucide-react";

export default function Initiatives() {
  const initiatives = [
    {
      icon: <HeartHandshake className="h-10 w-10 text-mdssRed" />,
      title: "Elder Care & Community Support",
      desc: "Care and assistance for vulnerable elders and families, ensuring they are treated with dignity and respect.",
    },
    {
      icon: <Users className="h-10 w-10 text-mdssRed" />,
      title: "Nutritious Meal Distribution",
      desc: "Fresh, nutritious meals for those in need, fighting hunger one plate at a time.",
    },
    {
      icon: <Book className="h-10 w-10 text-mdssRed" />,
      title: "Education Support",
      desc: "Support for children’s education through books, fees assistance and learning support.",
    },
    {
      icon: <Users className="h-10 w-10 text-mdssRed" />,
      title: "Women Empowerment",
      desc: "Skill development, livelihood training and awareness programs for women and young girls.",
    },
  ];

  const helpItems = [
    {
      title: "Join Us In The Mission",
      desc: "Volunteer your time and skills in our health, education or community programs.",
      cta: "Become a Volunteer",
      href: "mailto:info@mdsst.org",
    },
    {
      title: "Make A Contribution",
      desc: "Support our initiatives financially so we can reach more people in need.",
      cta: "Donate Now",
      href: "#donation",
    },
    {
      title: "Partner With Us",
      desc: "Collaborate with us through CSR projects or institutional partnerships.",
      cta: "Collaborate",
      href: "mailto:info@mdsst.org",
    },
  ];

  return (
    <section id="initiatives" className="bg-white py-16">
      <div className="mx-auto max-w-6xl space-y-12 px-4">
        <div>
          <h2 className="text-center text-3xl font-display font-bold text-mdssRed">
            Our Community Service Initiatives
          </h2>
          <p className="mt-3 text-center text-sm text-gray-700 md:text-base">
            Through a combination of health, education, nutrition and empowerment programs, Maa Durga
            Seva Sansthan Trust works to uplift vulnerable individuals and families.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-4">
            {initiatives.map((it, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-mdssBg p-6 shadow transition hover:shadow-lg"
              >
                <div className="mb-4">{it.icon}</div>
                <h3 className="text-lg font-semibold">{it.title}</h3>
                <p className="mt-2 text-sm text-gray-700">{it.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-10 md:grid-cols-2 md:items-center" id="support">
          <div className="md:pr-6">
            <h3 className="text-2xl font-display font-bold text-mdssRed">
              Heres How You Can Help
            </h3>
            <p className="mt-3 text-gray-700">
              Service to mankind is service to God. Whether you choose to volunteer, contribute
              financially or partner with us, your support strengthens our collective impact.
            </p>
          </div>
          <div className="space-y-4">
            {helpItems.map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-mdssBg p-5 shadow-sm ring-1 ring-red-100"
              >
                <h4 className="text-mdssRed text-lg font-semibold">{item.title}</h4>
                <p className="mt-1 text-sm text-gray-700">{item.desc}</p>
                {item.cta && (
                  <a
                    href={item.href}
                    className="mt-3 inline-block rounded-full bg-mdssRed px-4 py-2 text-xs font-semibold text-white hover:bg-mdssRed/90"
                  >
                    {item.cta}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
