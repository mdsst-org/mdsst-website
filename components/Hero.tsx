import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-red-50 via-white to-orange-50 py-20 md:py-32">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center">
          <h1 className="text-4xl font-display font-bold text-slate-900 sm:text-5xl lg:text-6xl">
            Maa Durga Seva Sansthan Trust:
            <br />
            <span className="text-mdssRed">Where Compassion Meets Action</span>
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-base text-slate-700 sm:text-lg md:text-xl">
            Step into the heart of compassion at Maa Durga Seva Sansthan Trust, where every effort is
            a testament to humanity's inherent goodness. As a charitable trust in Jharkhand, we work
            towards a multifaceted approach to social upliftment. From supporting education and health
            to empowering women and serving communities, we leave no one behind.
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-slate-600 md:text-base">
            Let's work together to spread kindness, hope, and strength to every life we touch.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="#contact"
              className="rounded-full bg-mdssRed px-8 py-3 text-base font-semibold text-white shadow-lg transition hover:bg-mdssRed/90"
            >
              Enquire Now
            </Link>
            <Link
              href="#about"
              className="rounded-full border-2 border-mdssRed bg-white px-8 py-3 text-base font-semibold text-mdssRed transition hover:bg-mdssRed hover:text-white"
            >
              Learn More
            </Link>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-mdssRed">
            Maa Durga Seva Sansthan Trust Is Involved In Several Humanitarian Endeavours
          </p>
          <p className="mt-2 text-base text-slate-700">
            To Develop Sustainable Solutions And Bring Smiles To People's Faces
          </p>
        </div>
      </div>
    </section>
  );
}
