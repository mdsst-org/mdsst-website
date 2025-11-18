"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Heart, Users, GraduationCap, Stethoscope, ArrowRight, Mail, Phone, MapPin, Calendar, Newspaper, UserPlus } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    "/images/initiative1.jpg",
    "/images/initiative2.jpg",
    "/images/initiative3.jpg",
    "/images/initiative4.jpg",
    "/images/initiative5.jpg",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 3500); // Change image every 3.5 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <>
      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-offWhite via-pureWhite to-offWhite">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(220,20,60,0.05),transparent_50%)]" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 py-32 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-charcoal mb-6">
              Empowering Lives
              <br />
              <span className="text-silkRed">Through Compassion</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg sm:text-xl text-charcoal/70 mb-12">
              Maa Durga Seva Sansthan Trust is dedicated to creating lasting change through health, education, and community welfare programs across Jharkhand.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#donate"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-silkRed px-8 py-4 text-base font-medium text-pureWhite hover:bg-silkRedDark transition-all duration-200 hover:shadow-xl"
              >
                Make a Difference
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="#about"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-charcoal/20 px-8 py-4 text-base font-medium text-charcoal hover:border-silkRed hover:text-silkRed transition-all duration-200"
              >
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-pureWhite">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight text-charcoal mb-4">
              Our Mission
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-charcoal/70">
              Creating sustainable change through dedicated community service
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Stethoscope, title: "Healthcare", desc: "Free medical camps and health awareness programs" },
              { icon: GraduationCap, title: "Education", desc: "Supporting underprivileged children's education" },
              { icon: Users, title: "Community", desc: "Empowering communities through welfare programs" },
              { icon: Heart, title: "Compassion", desc: "Serving with love and dedication" },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group p-8 rounded-3xl bg-offWhite hover:bg-silkRed transition-all duration-300 hover:shadow-xl"
              >
                <item.icon className="w-12 h-12 mb-4 text-silkRed group-hover:text-pureWhite transition-colors" />
                <h3 className="text-xl font-semibold mb-2 text-charcoal group-hover:text-pureWhite transition-colors">
                  {item.title}
                </h3>
                <p className="text-charcoal/70 group-hover:text-pureWhite/90 transition-colors">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Campaigns Section */}
      <section id="campaigns" className="relative py-24 bg-offWhite overflow-hidden">
        {/* Animated Background Images */}
        <div className="absolute inset-0 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 0.80 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full"
            >
              <Image
                src={images[currentImageIndex]}
                alt={`Initiative ${currentImageIndex + 1}`}
                fill
                className="object-cover object-center"
                priority={currentImageIndex === 0}
                sizes="100vw"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight text-charcoal mb-4">
              Our Campaigns
            </h2>
            <p className="mx-auto max-w-2xl text-lg font-bold text-charcoal px-6 py-3 rounded-2xl" style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
              Making a difference through targeted initiatives
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[
              {
                title: "Community Health & Wellness",
                desc: "Regular health camps with trained medical professionals providing check-ups, medicines, and health awareness to underserved communities.",
                gradient: "from-silkRed/10 to-silkRedLight/10",
              },
              {
                title: "Education For Children",
                desc: "Breaking barriers and helping children from poor backgrounds by distributing books, uniforms, bags, and educational materials.",
                gradient: "from-charcoal/10 to-charcoal/5",
              },
            ].map((campaign, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="group relative overflow-hidden rounded-3xl bg-pureWhite p-8 hover:shadow-2xl transition-all duration-300"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${campaign.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                <div className="relative z-10">
                  <h3 className="text-2xl font-semibold mb-4 text-charcoal">
                    {campaign.title}
                  </h3>
                  <p className="text-charcoal/70 mb-6 leading-relaxed">
                    {campaign.desc}
                  </p>
                  <Link
                    href="#donate"
                    className="inline-flex items-center gap-2 text-silkRed font-medium group-hover:gap-3 transition-all"
                  >
                    Support This Campaign
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Donation Section */}
      <section id="donate" className="py-24 bg-pureWhite">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight text-charcoal mb-4">
              Make an Impact
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-charcoal/70">
              Your contribution helps us create lasting change in communities across Jharkhand
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-3xl font-semibold text-charcoal mb-6">
                Every Contribution Matters
              </h3>
              <p className="text-charcoal/70 mb-6 leading-relaxed">
                Your donation directly supports health camps, educational programs, and community welfare initiatives. We ensure complete transparency and responsible use of every rupee.
              </p>
              <div className="space-y-4">
                {[
                  "Free medical camps and health awareness",
                  "Educational support for underprivileged children",
                  "Women empowerment programs",
                  "Community welfare initiatives",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-silkRed" />
                    <span className="text-charcoal/80">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-3xl bg-gradient-to-br from-offWhite to-lightGray p-8"
            >
              <h3 className="text-2xl font-semibold text-charcoal mb-6">
                Bank Transfer Details
              </h3>
              <div className="space-y-4">
                {[
                  { label: "Bank Name", value: "INDIAN BANK" },
                  { label: "Account Name", value: "MAA DURGA SEWA SANSTHAN TRUST" },
                  { label: "Account Number", value: "8123421647" },
                  { label: "IFSC Code", value: "IDIB000P651" },
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row sm:justify-between gap-2 pb-4 border-b border-charcoal/10 last:border-0">
                    <span className="text-sm font-medium text-charcoal/60">{item.label}</span>
                    <span className="text-base font-semibold text-charcoal">{item.value}</span>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-sm text-charcoal/60">
                After donating, please share transaction details at{" "}
                <a href="mailto:info@mdsst.org" className="text-silkRed font-medium hover:underline">
                  info@mdsst.org
                </a>
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Impact/Stats Section */}
      <section id="impact" className="py-24 bg-offWhite">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight text-charcoal mb-4">
              Our Impact
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-charcoal/70">
              Creating measurable change in communities across Jharkhand
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: "1000+", label: "Lives Touched" },
              { number: "50+", label: "Health Camps" },
              { number: "200+", label: "Children Supported" },
              { number: "15+", label: "Villages Reached" },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="text-center p-6 rounded-3xl bg-pureWhite hover:shadow-lg transition-shadow duration-300"
              >
                <div className="text-4xl sm:text-5xl font-semibold text-silkRed mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-charcoal/70">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog/News Section */}
      <section id="news" className="py-24 bg-pureWhite">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight text-charcoal mb-4">
              Latest News & Events
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-charcoal/70">
              Stay updated with our recent activities and upcoming initiatives
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Health Camp in Baliapur",
                date: "March 15, 2024",
                desc: "Successfully conducted a free health check-up camp serving over 200 community members.",
                image: "/images/initiative4.jpg",
              },
              {
                title: "School Supplies Distribution",
                date: "February 28, 2024",
                desc: "Distributed books, bags, and stationery to 150 underprivileged children.",
                image: "/images/initiative2.jpg",
              },
              {
                title: "Women Empowerment Workshop",
                date: "January 20, 2024",
                desc: "Organized skill development and awareness sessions for 80 women in rural areas.",
                image: "/images/initiative3.jpg",
              },
            ].map((news, idx) => (
              <motion.article
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group bg-offWhite rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={news.image}
                    alt={news.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-silkRed mb-3">
                    <Calendar className="w-4 h-4" />
                    <span>{news.date}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-charcoal mb-3 group-hover:text-silkRed transition-colors">
                    {news.title}
                  </h3>
                  <p className="text-charcoal/70 leading-relaxed">
                    {news.desc}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="#news"
              className="inline-flex items-center gap-2 text-silkRed font-medium hover:gap-3 transition-all"
            >
              View All News
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Volunteer Section */}
      <section id="volunteer" className="py-24 bg-offWhite">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-block p-4 rounded-2xl bg-silkRed/10 mb-6">
                <UserPlus className="w-12 h-12 text-silkRed" />
              </div>
              <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight text-charcoal mb-6">
                Become a Volunteer
              </h2>
              <p className="text-charcoal/70 text-lg mb-6 leading-relaxed">
                Join our team of dedicated volunteers and make a real difference in the lives of those who need it most. Whether you can spare a few hours a week or want to be more involved, we welcome your support.
              </p>
              <ul className="space-y-4">
                {[
                  "Help organize health camps and community events",
                  "Assist in educational programs for children",
                  "Support administrative and fundraising activities",
                  "Share your skills and expertise with our team",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-silkRed mt-2" />
                    <span className="text-charcoal/80">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-pureWhite rounded-3xl p-8 shadow-lg"
            >
              <h3 className="text-2xl font-semibold text-charcoal mb-6">Volunteer Registration</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-charcoal/70 mb-2">Full Name *</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-charcoal/20 focus:border-silkRed focus:outline-none focus:ring-2 focus:ring-silkRed/20 transition-all"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal/70 mb-2">Email *</label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-charcoal/20 focus:border-silkRed focus:outline-none focus:ring-2 focus:ring-silkRed/20 transition-all"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal/70 mb-2">Phone *</label>
                  <input
                    type="tel"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-charcoal/20 focus:border-silkRed focus:outline-none focus:ring-2 focus:ring-silkRed/20 transition-all"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal/70 mb-2">Area of Interest</label>
                  <select className="w-full px-4 py-3 rounded-xl border border-charcoal/20 focus:border-silkRed focus:outline-none focus:ring-2 focus:ring-silkRed/20 transition-all">
                    <option>Select an area</option>
                    <option>Healthcare</option>
                    <option>Education</option>
                    <option>Community Development</option>
                    <option>Fundraising</option>
                    <option>Administrative Support</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal/70 mb-2">Message</label>
                  <textarea
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-charcoal/20 focus:border-silkRed focus:outline-none focus:ring-2 focus:ring-silkRed/20 transition-all"
                    placeholder="Tell us about yourself and why you want to volunteer..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-silkRed text-pureWhite px-6 py-3 rounded-xl font-medium hover:bg-silkRedDark transition-all duration-200 hover:shadow-lg"
                >
                  Submit Application
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-charcoal text-pureWhite">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-6">
                Get in Touch
              </h2>
              <p className="text-pureWhite/70 text-lg mb-8">
                Have questions or want to get involved? We'd love to hear from you.
              </p>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-silkRed/10">
                    <MapPin className="w-6 h-6 text-silkRed" />
                  </div>
                  <div>
                    <div className="text-sm text-pureWhite/60 mb-1">Location</div>
                    <div className="text-base">Nayadih, Keliasole, Dhanbad<br />Jharkhand - 828201, India</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-silkRed/10">
                    <Phone className="w-6 h-6 text-silkRed" />
                  </div>
                  <div>
                    <div className="text-sm text-pureWhite/60 mb-1">Phone</div>
                    <a href="tel:+919431390575" className="text-base hover:text-silkRed transition-colors">
                      +91 9431390575
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-silkRed/10">
                    <Mail className="w-6 h-6 text-silkRed" />
                  </div>
                  <div>
                    <div className="text-sm text-pureWhite/60 mb-1">Email</div>
                    <a href="mailto:info@mdsst.org" className="text-base hover:text-silkRed transition-colors">
                      info@mdsst.org
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-pureWhite/5 backdrop-blur-sm rounded-3xl p-8"
            >
              <h3 className="text-2xl font-semibold mb-6">Send us a Message</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-pureWhite/70 mb-2">Name *</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-pureWhite/10 border border-pureWhite/20 text-pureWhite placeholder-pureWhite/40 focus:border-silkRed focus:outline-none focus:ring-2 focus:ring-silkRed/20 transition-all"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-pureWhite/70 mb-2">Email *</label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-pureWhite/10 border border-pureWhite/20 text-pureWhite placeholder-pureWhite/40 focus:border-silkRed focus:outline-none focus:ring-2 focus:ring-silkRed/20 transition-all"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-pureWhite/70 mb-2">Subject *</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-pureWhite/10 border border-pureWhite/20 text-pureWhite placeholder-pureWhite/40 focus:border-silkRed focus:outline-none focus:ring-2 focus:ring-silkRed/20 transition-all"
                    placeholder="What is this regarding?"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-pureWhite/70 mb-2">Message *</label>
                  <textarea
                    rows={4}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-pureWhite/10 border border-pureWhite/20 text-pureWhite placeholder-pureWhite/40 focus:border-silkRed focus:outline-none focus:ring-2 focus:ring-silkRed/20 transition-all"
                    placeholder="Your message..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-silkRed text-pureWhite px-6 py-3 rounded-xl font-medium hover:bg-silkRedDark transition-all duration-200 hover:shadow-lg flex items-center justify-center gap-2"
                >
                  Send Message
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}