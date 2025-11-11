// app/initiatives/page.tsx
export const metadata = {
  title: "Initiatives — MDSS",
  description: "Our community programs, health camps, education drives, and more.",
};

export default function Initiatives() {
  return (
    <div className="max-w-6xl mx-auto py-16 px-6">
      <h1 className="text-4xl font-bold text-red-800 mb-8">Our Initiatives</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold">Education Program</h2>
        <p>Details about scholarships, school supplies, and coaching support.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold">Health Camps</h2>
        <p>Free health checkups, blood donation camps, and medical aid for needy communities.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold">Women Empowerment</h2>
        <p>Skill development, small business training, and support groups.</p>
      </section>
    </div>
  );
}
