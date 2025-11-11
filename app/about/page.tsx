// app/about/page.tsx
export const metadata = {
  title: "About — Maa Durga Seva Sansthan Trust",
  description: "Learn about MDSST, our mission, trustees, and registration details.",
};

export default function About() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-6">
      <h1 className="text-4xl font-bold text-red-800 mb-6">About Us</h1>
      <p className="text-lg mb-4">
        Maa Durga Seva Sansthan Trust(MDSST) was founded with the vision to bring sustainable social change inspired by
        the divine values of Maa Durga — strength, compassion, and justice.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Our Mission</h2>
      <p>To serve society through spiritual, educational, and social initiatives inspired by Maa Durga.</p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Trustees</h2>
      <ul className="list-disc ml-6">
        <li>Shri Mrinal Kant Choubey — Secretary</li>
        <li>Dr Bhabesh Choubey — President</li>
        <li>Shri Akash Kumar - Treasurer</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Registration & Legal Info</h2>
      <p>PAN: [AAKTM1699R]. 12A & 80G: Approved (valid till 2029). Darpan ID: JH/2025/0684825. Registered trust under Indian Trust Act 1882.</p>
    </div>
  );
}
