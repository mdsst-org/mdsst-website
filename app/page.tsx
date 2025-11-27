"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Heart, Users, GraduationCap, Stethoscope, ArrowRight, Mail, Phone, MapPin, Calendar, Newspaper, UserPlus } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useLanguage, translations } from "./layout";

export default function Home() {
  const { language } = useLanguage();
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
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.70 }}
        >
          <source src="/videos/vid2.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay for better text visibility */}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(220,20,60,0.05),transparent_50%)]" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 py-32 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
              {translations[language].hero.title}
              <br />
              <span className="text-silkRed" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}>{translations[language].hero.titleSpan}</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg sm:text-xl text-white mb-12" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.5)' }}>
              {translations[language].hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#donate"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-silkRed px-8 py-4 text-base font-medium text-pureWhite hover:bg-silkRedDark transition-all duration-200 hover:shadow-xl"
              >
                {translations[language].hero.getInvolved}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="#about"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/80 bg-white/10 backdrop-blur-sm px-8 py-4 text-base font-medium text-white hover:bg-silkRed hover:border-silkRed transition-all duration-200"
              >
                {translations[language].hero.learnMore}
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
              {translations[language].about.title}
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-charcoal/70">
              {translations[language].about.description}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Stethoscope, titleKey: 'healthcare', descKey: 'healthcareDesc' },
              { icon: GraduationCap, titleKey: 'education', descKey: 'educationDesc' },
              { icon: Users, titleKey: 'community', descKey: 'communityDesc' },
              { icon: Heart, titleKey: 'compassion', descKey: 'compassionDesc' },
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
                  {translations[language].about[item.titleKey as keyof typeof translations.en.about]}
                </h3>
                <p className="text-charcoal/70 group-hover:text-pureWhite/90 transition-colors">
                  {translations[language].about[item.descKey as keyof typeof translations.en.about]}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Comic Presentation Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-20"
          >
            <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/images/comicPresentation.jpg"
                alt="MDSST Comic Presentation - Our Journey and Impact"
                width={1200}
                height={675}
                className="w-full h-auto"
                priority
              />
            </div>
          </motion.div>
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
              {translations[language].campaigns.title}
            </h2>
            <p className="mx-auto max-w-2xl text-lg font-bold text-charcoal px-6 py-3 rounded-2xl" style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
              {translations[language].campaigns.subtitle}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[
              {
                title: translations[language].campaigns.campaign1?.title || 'Community Health & Wellness',
                desc: translations[language].campaigns.campaign1?.desc || 'Regular health camps with trained medical professionals providing check-ups, medicines, and health awareness to underserved communities.',
                gradient: "from-silkRed/10 to-silkRedLight/10",
              },
              {
                title: translations[language].campaigns.campaign2?.title || 'Education For Children',
                desc: translations[language].campaigns.campaign2?.desc || 'Breaking barriers and helping children from poor backgrounds by distributing books, uniforms, bags, and educational materials.',
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
                    {translations[language].campaigns.supportCampaign}
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
              {translations[language].donation.title}
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-charcoal/70">
              {translations[language].donation.subtitle}
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
                {translations[language].donation.heading}
              </h3>
              <p className="text-charcoal/70 mb-6 leading-relaxed">
                {translations[language].donation.description}
              </p>
              <div className="space-y-4">
                {[
                  translations[language].donation?.item1 || 'Free medical camps and health awareness',
                  translations[language].donation?.item2 || 'Educational support for underprivileged children',
                  translations[language].donation?.item3 || 'Women empowerment programs',
                  translations[language].donation?.item4 || 'Community welfare initiatives',
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
                {translations[language].donation.bankTransfer}
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
                {translations[language].donation.afterDonating}{" "}
                <a href="mailto:info@mdsst.org" className="text-silkRed font-medium hover:underline">
                  info@mdsst.org
                </a>
              </p>
            </motion.div>
          </div>

          {/* UPI Payment QR Code */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-16 max-w-xl mx-auto"
          >
            <div className="rounded-3xl bg-gradient-to-br from-silkRed/5 to-silkRed/10 p-8 text-center border-2 border-silkRed/20">
              <h3 className="text-2xl font-semibold text-charcoal mb-3">
                {language === 'en' ? 'Quick Donate via UPI' : 'UPI से त्वरित दान करें'}
              </h3>
              <p className="text-base text-charcoal/70 mb-6">
                {language === 'en' ? 'Scan the QR code with any UPI app' : 'किसी भी UPI ऐप से QR कोड स्कैन करें'}
              </p>
              <div className="relative w-full max-w-sm mx-auto mb-5 bg-white rounded-2xl p-5 shadow-lg">
                <Image
                  src="/paymentQR.jpg"
                  alt="UPI Payment QR Code for MDSST Donations"
                  width={400}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
              <div className="flex flex-wrap justify-center gap-2 text-sm text-charcoal/60">
                <span className="px-3 py-1 bg-white rounded-full">Google Pay</span>
                <span className="px-3 py-1 bg-white rounded-full">PhonePe</span>
                <span className="px-3 py-1 bg-white rounded-full">Paytm</span>
                <span className="px-3 py-1 bg-white rounded-full">{language === 'en' ? 'Any UPI App' : 'कोई भी UPI ऐप'}</span>
              </div>
            </div>
          </motion.div>
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
              {translations[language].impact.title}
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-charcoal/70">
              {translations[language].impact.subtitle}
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: "1000+", labelKey: "stat1" },
              { number: "50+", labelKey: "stat2" },
              { number: "200+", labelKey: "stat3" },
              { number: "15+", labelKey: "stat4" },
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
                <div className="text-sm text-charcoal/70">{translations[language].impact[stat.labelKey as keyof typeof translations.en.impact]}</div>
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
              {translations[language].news.title}
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-charcoal/70">
              {translations[language].news.subtitle}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                articleKey: "article1",
                image: "/images/nashamukti1.jpg",
                slug: "nasha-mukti-jagrukta-abhiyaan",
              },
              {
                articleKey: "article2",
                image: "/images/initiative4.jpg",
                slug: "health-camp-baliapur",
              },
              {
                articleKey: "article3",
                image: "/images/initiative3.jpg",
                slug: "women-empowerment-workshop",
              },
            ].map((news, idx) => (
              <motion.article
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <Link
                  href={`/news/${news.slug}`}
                  className="block group bg-offWhite rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={news.image}
                      alt={(translations[language].news[news.articleKey as keyof typeof translations.en.news] as any).title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-sm text-silkRed mb-3">
                      <Calendar className="w-4 h-4" />
                      <span>{(translations[language].news[news.articleKey as keyof typeof translations.en.news] as any).date}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-charcoal mb-3 group-hover:text-silkRed transition-colors">
                      {(translations[language].news[news.articleKey as keyof typeof translations.en.news] as any).title}
                    </h3>
                    <p className="text-charcoal/70 leading-relaxed mb-4">
                      {(translations[language].news[news.articleKey as keyof typeof translations.en.news] as any).desc}
                    </p>
                    <span className="inline-flex items-center gap-2 text-silkRed font-medium group-hover:gap-3 transition-all">
                      {translations[language].news.readMore}
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
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
                {translations[language].volunteer.title}
              </h2>
              <p className="text-charcoal/70 text-lg mb-6 leading-relaxed">
                {translations[language].volunteer.subtitle}
              </p>
              <ul className="space-y-4">
                {[
                  translations[language].volunteer.item1,
                  translations[language].volunteer.item2,
                  translations[language].volunteer.item3,
                  translations[language].volunteer.item4,
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
              <h3 className="text-2xl font-semibold text-charcoal mb-6">{translations[language].volunteer.formTitle}</h3>
              <form action="https://formspree.io/f/xnnlqepd" method="POST" className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-charcoal/70 mb-2">{translations[language].volunteer.fullName} *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-charcoal/20 focus:border-silkRed focus:outline-none focus:ring-2 focus:ring-silkRed/20 transition-all"
                    placeholder={translations[language].volunteer.namePlaceholder}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal/70 mb-2">{translations[language].volunteer.email} *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-charcoal/20 focus:border-silkRed focus:outline-none focus:ring-2 focus:ring-silkRed/20 transition-all"
                    placeholder={translations[language].volunteer.emailPlaceholder}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal/70 mb-2">{translations[language].volunteer.phone} *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-charcoal/20 focus:border-silkRed focus:outline-none focus:ring-2 focus:ring-silkRed/20 transition-all"
                    placeholder={translations[language].volunteer.phonePlaceholder}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal/70 mb-2">{translations[language].volunteer.areaOfInterest}</label>
                  <select name="area-of-interest" className="w-full px-4 py-3 rounded-xl border border-charcoal/20 focus:border-silkRed focus:outline-none focus:ring-2 focus:ring-silkRed/20 transition-all">
                    <option value="">{translations[language].volunteer.selectArea}</option>
                    <option value="healthcare">{translations[language].volunteer.healthcare}</option>
                    <option value="education">{translations[language].volunteer.education}</option>
                    <option value="community-development">{translations[language].volunteer.communityDev}</option>
                    <option value="fundraising">{translations[language].volunteer.fundraising}</option>
                    <option value="administrative-support">{translations[language].volunteer.adminSupport}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal/70 mb-2">{translations[language].volunteer.message}</label>
                  <textarea
                    name="message"
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-charcoal/20 focus:border-silkRed focus:outline-none focus:ring-2 focus:ring-silkRed/20 transition-all"
                    placeholder={translations[language].volunteer.messagePlaceholder}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-silkRed text-pureWhite px-6 py-3 rounded-xl font-medium hover:bg-silkRedDark transition-all duration-200 hover:shadow-lg"
                >
                  {translations[language].volunteer.submitApp}
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
                {translations[language].contact.title}
              </h2>
              <p className="text-pureWhite/70 text-lg mb-8">
                {translations[language].contact.subtitle}
              </p>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-silkRed/10">
                    <MapPin className="w-6 h-6 text-silkRed" />
                  </div>
                  <div>
                    <div className="text-sm text-pureWhite/60 mb-1">{translations[language].contact.location}</div>
                    <div className="text-base">Nayadih, Keliasole, Dhanbad<br />Jharkhand - 828201, India</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-silkRed/10">
                    <Phone className="w-6 h-6 text-silkRed" />
                  </div>
                  <div>
                    <div className="text-sm text-pureWhite/60 mb-1">{translations[language].contact.phone}</div>
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
                    <div className="text-sm text-pureWhite/60 mb-1">{translations[language].contact.email}</div>
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
              <h3 className="text-2xl font-semibold mb-6">{translations[language].contact.formTitle}</h3>
              <form action="https://formspree.io/f/xjkdkqlb" method="POST" className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-pureWhite/70 mb-2">{translations[language].contact.name} *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-pureWhite/10 border border-pureWhite/20 text-pureWhite placeholder-pureWhite/40 focus:border-silkRed focus:outline-none focus:ring-2 focus:ring-silkRed/20 transition-all"
                    placeholder={translations[language].contact.namePlaceholder}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-pureWhite/70 mb-2">{translations[language].contact.email} *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-pureWhite/10 border border-pureWhite/20 text-pureWhite placeholder-pureWhite/40 focus:border-silkRed focus:outline-none focus:ring-2 focus:ring-silkRed/20 transition-all"
                    placeholder={translations[language].contact.emailPlaceholder}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-pureWhite/70 mb-2">{translations[language].contact.subject} *</label>
                  <input
                    type="text"
                    name="subject"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-pureWhite/10 border border-pureWhite/20 text-pureWhite placeholder-pureWhite/40 focus:border-silkRed focus:outline-none focus:ring-2 focus:ring-silkRed/20 transition-all"
                    placeholder={translations[language].contact.subjectPlaceholder}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-pureWhite/70 mb-2">{translations[language].contact.message} *</label>
                  <textarea
                    name="message"
                    rows={4}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-pureWhite/10 border border-pureWhite/20 text-pureWhite placeholder-pureWhite/40 focus:border-silkRed focus:outline-none focus:ring-2 focus:ring-silkRed/20 transition-all"
                    placeholder={translations[language].contact.messagePlaceholder}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-silkRed text-pureWhite px-6 py-3 rounded-xl font-medium hover:bg-silkRedDark transition-all duration-200 hover:shadow-lg flex items-center justify-center gap-2"
                >
                  {translations[language].contact.send}
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