"use client";

import { use } from "react";
import { motion } from "framer-motion";
import { Calendar, ArrowLeft, MapPin, Users } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

const newsData: Record<string, {
  title: string;
  date: string;
  location: string;
  participants: string;
  image: string;
  excerpt: string;
  content: string[];
  additionalImages?: string[];
}> = {
  "nasha-mukti-jagrukta-abhiyaan": {
    title: "Nasha Mukti Jagrukta Abhiyaan",
    date: "November 20, 2024",
    location: "Multiple Villages, Dhanbad District",
    participants: "500+ youth and community members",
    image: "/images/nashamukti1.jpg",
    excerpt: "Organized a comprehensive anti-drug awareness campaign to educate youth and communities about the dangers of substance abuse.",
    additionalImages: ["/images/nashamukti2.jpg", "/images/nashamukti3.jpg"],
    content: [
      "On November 20, 2024, Maa Durga Seva Sansthan Trust launched a powerful Nasha Mukti Jagrukta Abhiyaan (Anti-Drug Awareness Campaign) across multiple villages in Dhanbad district. This comprehensive initiative aimed to educate youth and community members about the devastating effects of drug abuse and substance addiction, reaching over 500 participants.",
      "The campaign featured interactive sessions led by medical professionals, counselors, and reformed individuals who shared their personal stories of struggle and recovery. These powerful testimonials had a profound impact on the audience, particularly young people who are most vulnerable to peer pressure and substance experimentation.",
      "Our team organized awareness rallies, street plays, and educational workshops in schools and community centers. We distributed informational pamphlets in local languages, highlighting the physical, mental, and social consequences of drug addiction. The campaign also emphasized the importance of family support and community vigilance in preventing substance abuse.",
      "Medical experts conducted sessions on recognizing early signs of addiction, understanding the science behind substance dependency, and available treatment options. We established helpline numbers and counseling support for individuals and families affected by addiction, ensuring they have access to professional help and rehabilitation resources.",
      "The response from the community was overwhelming, with parents, teachers, and local leaders pledging their support to create a drug-free environment. Many youth took an oath to stay away from drugs and to help their peers make positive life choices. The campaign concluded with the formation of youth vigilance committees in each village to continue the awareness efforts.",
      "This initiative represents our commitment to addressing one of the most pressing social issues affecting our communities. We believe that through education, awareness, and community support, we can protect our youth from the dangers of substance abuse and build a healthier, more prosperous society for future generations."
    ]
  },
  "health-camp-baliapur": {
    title: "Health Camp in Baliapur",
    date: "March 15, 2024",
    location: "Baliapur Village, Dhanbad",
    participants: "200+ community members",
    image: "/images/initiative4.jpg",
    excerpt: "Successfully conducted a free health check-up camp serving over 200 community members.",
    content: [
      "On March 15, 2024, Maa Durga Seva Sansthan Trust organized a comprehensive health camp in Baliapur village, bringing essential medical services to the doorstep of the community. The camp was a resounding success, with over 200 community members benefiting from free health check-ups and consultations.",
      "The health camp featured a team of qualified medical professionals including general physicians, pediatricians, and specialists who provided thorough health screenings. Services included blood pressure monitoring, blood sugar testing, general health consultations, and distribution of free medicines to those in need.",
      "Many elderly residents and children received much-needed medical attention. The camp also focused on health awareness, with our team educating attendees about preventive healthcare, nutrition, and hygiene practices. Several cases requiring further medical attention were identified and referred to appropriate healthcare facilities.",
      "The overwhelming response from the community reinforces our commitment to making healthcare accessible to all. We distributed health education materials and provided guidance on maintaining a healthy lifestyle. The camp concluded with a promise to conduct more such initiatives in the future.",
      "We extend our heartfelt gratitude to all the medical professionals who volunteered their time and expertise, and to the local community leaders who helped organize this event. Together, we are making a difference in the lives of those who need it most."
    ]
  },
  "school-supplies-distribution": {
    title: "School Supplies Distribution",
    date: "February 28, 2024",
    location: "Multiple Schools, Dhanbad District",
    participants: "150 underprivileged children",
    image: "/images/initiative2.jpg",
    excerpt: "Distributed books, bags, and stationery to 150 underprivileged children.",
    content: [
      "Education is the foundation of a better future, and on February 28, 2024, Maa Durga Seva Sansthan Trust took a significant step towards ensuring that financial constraints don't hinder a child's education. We distributed essential school supplies to 150 underprivileged children across multiple schools in Dhanbad district.",
      "Each child received a complete education kit including a sturdy school bag, notebooks, textbooks, pencils, pens, erasers, sharpeners, and other essential stationery items. The joy and excitement on the children's faces as they received their new supplies was truly heartwarming and reinforced our mission.",
      "The distribution event was organized in coordination with local schools and community leaders. We also took this opportunity to interact with the children and their parents, understanding their educational needs and challenges. Many parents expressed their gratitude, sharing how these supplies would significantly ease their financial burden.",
      "Beyond just providing materials, we emphasized the importance of education and encouraged the children to pursue their studies with dedication. We also distributed educational posters and reading materials to promote a culture of learning in their homes.",
      "This initiative is part of our ongoing commitment to support education for underprivileged children. We believe that every child deserves access to quality education, and we will continue to work towards breaking down barriers that prevent children from reaching their full potential."
    ]
  },
  "women-empowerment-workshop": {
    title: "Women Empowerment Workshop",
    date: "January 20, 2024",
    location: "Rural Areas, Jharkhand",
    participants: "80 women",
    image: "/images/initiative3.jpg",
    excerpt: "Organized skill development and awareness sessions for 80 women in rural areas.",
    content: [
      "On January 20, 2024, Maa Durga Seva Sansthan Trust conducted a transformative Women Empowerment Workshop in rural areas of Jharkhand. The workshop brought together 80 women from various villages, providing them with valuable skills, knowledge, and confidence to become self-reliant and contribute to their families and communities.",
      "The day-long workshop covered multiple aspects of women's empowerment including skill development, financial literacy, health awareness, and legal rights. Expert trainers and social workers conducted interactive sessions on topics such as starting small businesses, savings and banking, nutrition and hygiene, and women's rights and safety.",
      "Participants were introduced to various income-generating activities such as tailoring, handicrafts, food processing, and organic farming. Many women showed keen interest in learning these skills, seeing them as opportunities to contribute to their household income and gain financial independence.",
      "The workshop also addressed important social issues including gender equality, domestic violence prevention, and the importance of education for girls. Women were encouraged to support each other and form self-help groups to continue their learning and growth journey together.",
      "The response was overwhelming, with participants expressing their desire for more such workshops. Many women shared their aspirations and challenges, and we committed to providing ongoing support through follow-up sessions and resource connections. This workshop marks the beginning of a long-term commitment to women's empowerment in rural Jharkhand."
    ]
  }
};

export default function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const news = newsData[slug];

  if (!news) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-pureWhite">
      <section className="relative h-[60vh] overflow-hidden">
        <Image
          src={news.image}
          alt={news.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto max-w-4xl px-6 pb-16 lg:px-8 w-full">
            <Link
              href="/#news"
              className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to News
            </Link>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4"
              style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}
            >
              {news.title}
            </motion.h1>
            <div className="flex flex-wrap gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{news.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>{news.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>{news.participants}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-xl text-charcoal/80 mb-8 leading-relaxed font-medium">
              {news.excerpt}
            </p>
            
            <div className="space-y-6">
              {news.content.map((paragraph, idx) => (
                <p key={idx} className="text-lg text-charcoal/70 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Additional Images Gallery */}
            {news.additionalImages && news.additionalImages.length > 0 && (
              <div className="mt-12">
                <h3 className="text-2xl font-semibold text-charcoal mb-6">Event Gallery</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {news.additionalImages.map((image, idx) => (
                    <div key={idx} className="relative h-64 md:h-80 rounded-2xl overflow-hidden">
                      <Image
                        src={image}
                        alt={`${news.title} - Image ${idx + 2}`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-12 p-8 bg-offWhite rounded-3xl">
              <h3 className="text-2xl font-semibold text-charcoal mb-4">
                Support Our Mission
              </h3>
              <p className="text-charcoal/70 mb-6">
                Your contribution helps us continue organizing such impactful initiatives. Join us in making a difference in the lives of those who need it most.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/#donate"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-silkRed px-8 py-3 text-base font-medium text-pureWhite hover:bg-silkRedDark transition-all duration-200"
                >
                  Donate Now
                </Link>
                <Link
                  href="/#volunteer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-silkRed px-8 py-3 text-base font-medium text-silkRed hover:bg-silkRed hover:text-pureWhite transition-all duration-200"
                >
                  Become a Volunteer
                </Link>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/#news"
                className="inline-flex items-center gap-2 text-silkRed font-medium hover:gap-3 transition-all"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to All News
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}