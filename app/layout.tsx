"use client";

import "./globals.css";
import type { ReactNode } from "react";
import { useState, useEffect, createContext, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, Languages } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Head from "next/head";

// Language Context
const LanguageContext = createContext<{
  language: 'en' | 'hi';
  toggleLanguage: () => void;
}>({ language: 'en', toggleLanguage: () => {} });

export const useLanguage = () => useContext(LanguageContext);

export const translations = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      campaigns: 'Campaigns',
      news: 'News',
      volunteer: 'Volunteer',
      contact: 'Contact',
      donate: 'Donate'
    },
    donateButton: 'Donate',
    donateNow: 'Donate Now',
    trustName: 'Maa Durga Seva Sansthan Trust',
    tagline: 'Serving Humanity with Compassion',
    hero: {
      title: 'Empowering Lives',
      titleSpan: 'Through Compassion',
      subtitle: 'Maa Durga Seva Sansthan Trust is dedicated to creating lasting change through health, education, and community welfare programs across Jharkhand.',
      getInvolved: 'Make a Difference',
      learnMore: 'Learn More'
    },
    about: {
      title: 'Our Mission',
      description: 'Creating sustainable change through dedicated community service',
      healthcare: 'Healthcare',
      healthcareDesc: 'Free medical camps and health awareness programs',
      education: 'Education',
      educationDesc: "Supporting underprivileged children's education",
      community: 'Community',
      communityDesc: 'Empowering communities through welfare programs',
      compassion: 'Compassion',
      compassionDesc: 'Serving with love and dedication',
      vision: 'Our Vision',
      visionText: 'To create a society where every individual has access to basic necessities and opportunities for growth.',
      mission: 'Our Mission',
      missionText: 'To serve humanity with compassion, focusing on health, education, and community development.'
    },
    campaigns: {
      title: 'Our Campaigns',
      subtitle: 'Making a difference through targeted initiatives',
      campaign1: {
        title: 'Community Health & Wellness',
        desc: 'Regular health camps with trained medical professionals providing check-ups, medicines, and health awareness to underserved communities.'
      },
      campaign2: {
        title: 'Education For Children',
        desc: 'Breaking barriers and helping children from poor backgrounds by distributing books, uniforms, bags, and educational materials.'
      },
      supportCampaign: 'Support This Campaign'
    },
    news: {
      title: 'Latest News & Events',
      subtitle: 'Stay updated with our recent activities and upcoming initiatives',
      readMore: 'Read More',
      backToNews: 'Back to News',
      article1: {
        title: 'Nasha Mukti Jagrukta Abhiyaan',
        date: 'November 20, 2024',
        desc: 'Organized a comprehensive anti-drug awareness campaign to educate youth and communities about the dangers of substance abuse.',
        location: 'Multiple Villages, Dhanbad District',
        participants: '500+ youth and community members'
      },
      article2: {
        title: 'Health Camp in Baliapur',
        date: 'March 15, 2024',
        desc: 'Successfully conducted a free health check-up camp serving over 200 community members.',
        location: 'Baliapur Village, Dhanbad',
        participants: '200+ community members'
      },
      article3: {
        title: 'Women Empowerment Workshop',
        date: 'January 20, 2024',
        desc: 'Organized skill development and awareness sessions for 80 women in rural areas.',
        location: 'Rural Areas, Jharkhand',
        participants: '80 women'
      }
    },
    volunteer: {
      title: 'Become a Volunteer',
      subtitle: 'Join our team of dedicated volunteers and make a real difference in the lives of those who need it most. Whether you can spare a few hours a week or want to be more involved, we welcome your support.',
      item1: 'Help organize health camps and community events',
      item2: 'Assist in educational programs for children',
      item3: 'Support administrative and fundraising activities',
      item4: 'Share your skills and expertise with our team',
      formTitle: 'Volunteer Registration',
      fullName: 'Full Name',
      email: 'Email',
      phone: 'Phone',
      areaOfInterest: 'Area of Interest',
      selectArea: 'Select an area',
      healthcare: 'Healthcare',
      education: 'Education',
      communityDev: 'Community Development',
      fundraising: 'Fundraising',
      adminSupport: 'Administrative Support',
      message: 'Message',
      namePlaceholder: 'Your name',
      emailPlaceholder: 'your.email@example.com',
      phonePlaceholder: '+91 XXXXX XXXXX',
      messagePlaceholder: 'Tell us about yourself and why you want to volunteer...',
      submitApp: 'Submit Application',
      joinUs: 'Join Us Today'
    },
    contact: {
      title: 'Get in Touch',
      subtitle: 'Have questions or want to get involved? We\'d love to hear from you.',
      location: 'Location',
      phone: 'Phone',
      email: 'Email',
      formTitle: 'Send us a Message',
      name: 'Name',
      subject: 'Subject',
      message: 'Message',
      namePlaceholder: 'Your name',
      emailPlaceholder: 'your.email@example.com',
      subjectPlaceholder: 'What is this regarding?',
      messagePlaceholder: 'Your message...',
      send: 'Send Message',
      contactUs: 'Contact Us'
    },
    donation: {
      title: 'Make an Impact',
      subtitle: 'Your contribution helps us create lasting change in communities across Jharkhand',
      heading: 'Every Contribution Matters',
      description: 'Your donation directly supports health camps, educational programs, and community welfare initiatives. We ensure complete transparency and responsible use of every rupee.',
      item1: 'Free medical camps and health awareness',
      item2: 'Educational support for underprivileged children',
      item3: 'Women empowerment programs',
      item4: 'Community welfare initiatives',
      bankTransfer: 'Bank Transfer Details',
      afterDonating: 'After donating, please share transaction details at',
      donateNow: 'Donate Now'
    },
    impact: {
      title: 'Our Impact',
      subtitle: 'Creating measurable change in communities across Jharkhand',
      stat1: 'Lives Touched',
      stat2: 'Health Camps',
      stat3: 'Children Supported',
      stat4: 'Villages Reached'
    },
    footer: {
      description: 'Maa Durga Seva Sansthan Trust is dedicated to creating positive change through health, education, and community welfare programs.',
      quickLinks: 'Quick Links',
      contactUs: 'Contact Us',
      allRights: 'All rights reserved.'
    },
    aboutCards: {
      card1: {
        title: 'Healthcare',
        description: 'We provide free medical camps and health awareness programs to underprivileged communities.'
      },
      card2: {
        title: 'Education',
        description: 'We support the education of underprivileged children, providing them with access to quality education.'
      },
      card3: {
        title: 'Community Development',
        description: 'We empower communities through welfare programs, promoting sustainable development and social change.'
      }
    },
    donationSection: {
      title: 'Donate',
      subtitle: 'Your contribution can make a significant difference in the lives of those we serve.',
      donateNow: 'Donate Now'
    },
    impactStats: {
      title: 'Our Impact',
      stat1: {
        value: '1000+',
        description: 'People served through our healthcare programs'
      },
      stat2: {
        value: '500+',
        description: 'Children supported through our education programs'
      },
      stat3: {
        value: '20+',
        description: 'Communities empowered through our community development programs'
      }
    },
    contactSection: {
      title: 'Get in Touch',
      address: 'Maa Durga Seva Sansthan Trust, Jharkhand, India',
      phone: '+91 1234567890',
      email: 'info@mdsst.org'
    }
  },
  hi: {
    nav: {
      home: 'होम',
      about: 'हमारे बारे में',
      campaigns: 'अभियान',
      news: 'समाचार',
      volunteer: 'स्वयंसेवक',
      contact: 'संपर्क',
      donate: 'दान करें'
    },
    donateButton: 'दान करें',
    donateNow: 'अभी दान करें',
    trustName: 'माँ दुर्गा सेवा संस्थान ट्रस्ट',
    tagline: 'करुणा के साथ मानवता की सेवा',
    hero: {
      title: 'जीवन को सशक्त बनाना',
      titleSpan: 'करुणा के माध्यम से',
      subtitle: 'माँ दुर्गा सेवा संस्थान ट्रस्ट झारखंड में स्वास्थ्य, शिक्षा और सामुदायिक कल्याण कार्यक्रमों के माध्यम से स्थायी परिवर्तन लाने के लिए समर्पित है।',
      getInvolved: 'बदलाव लाएं',
      learnMore: 'और जानें'
    },
    about: {
      title: 'हमारा मिशन',
      description: 'समर्पित सामुदायिक सेवा के माध्यम से स्थायी परिवर्तन लाना',
      healthcare: 'स्वास्थ्य सेवा',
      healthcareDesc: 'मुफ्त चिकित्सा शिविर और स्वास्थ्य जागरूकता कार्यक्रम',
      education: 'शिक्षा',
      educationDesc: "वंचित बच्चों की शिक्षा का समर्थन",
      community: 'समुदाय',
      communityDesc: 'कल्याण कार्यक्रमों के माध्यम से समुदायों को सशक्त बनाना',
      compassion: 'करुणा',
      compassionDesc: 'प्रेम और समर्पण के साथ सेवा',
      vision: 'हमारी दृष्टि',
      visionText: 'एक ऐसा समाज बनाना जहां प्रत्येक व्यक्ति को बुनियादी आवश्यकताओं और विकास के अवसरों तक पहुंच हो।',
      mission: 'हमारा मिशन',
      missionText: 'स्वास्थ्य, शिक्षा और सामुदायिक विकास पर ध्यान केंद्रित करते हुए करुणा के साथ मानवता की सेवा करना।'
    },
    campaigns: {
      title: 'हमारे अभियान',
      subtitle: 'केंद्रित पहलों के माध्यम से बदलाव लाना',
      campaign1: {
        title: 'सामुदायिक स्वास्थ्य और कल्याण',
        desc: 'प्रशिक्षित चिकित्सा पेशेवरों के साथ नियमित स्वास्थ्य शिविर जो वंचित समुदायों को जांच, दवाइयां और स्वास्थ्य जागरूकता प्रदान करते हैं।'
      },
      campaign2: {
        title: 'बच्चों के लिए शिक्षा',
        desc: 'गरीब पृष्ठभूमि के बच्चों की मदद करना और पुस्तकें, वर्दी, बैग और शैक्षिक सामग्री वितरित करके बाधाओं को तोड़ना।'
      },
      supportCampaign: 'इस अभियान का समर्थन करें'
    },
    news: {
      title: 'नवीनतम समाचार और कार्यक्रम',
      subtitle: 'हमारी हाल की गतिविधियों से अपडेट रहें',
      readMore: 'और पढ़ें',
      backToNews: 'समाचार पर वापस',
      article1: {
        title: 'नशा मुक्ति जागरूकता अभियान',
        date: '20 नवंबर, 2024',
        desc: 'युवाओं और समुदायों को नशे के दुरुपयोग के खतरों के बारे में शिक्षित करने के लिए एक व्यापक नशा विरोधी जागरूकता अभियान आयोजित किया।',
        location: 'कई गांव, धनबाद जिला',
        participants: '500+ युवा और समुदाय के सदस्य'
      },
      article2: {
        title: 'बलियापुर में स्वास्थ्य शिविर',
        date: '15 मार्च, 2024',
        desc: '200 से अधिक समुदाय के सदस्यों की सेवा करते हुए एक मुफ्त स्वास्थ्य जांच शिविर सफलतापूर्वक आयोजित किया।',
        location: 'बलियापुर गांव, धनबाद',
        participants: '200+ समुदाय के सदस्य'
      },
      article3: {
        title: 'महिला सशक्तिकरण कार्यशाला',
        date: '20 जनवरी, 2024',
        desc: 'ग्रामीण क्षेत्रों में 80 महिलाओं के लिए कौशल विकास और जागरूकता सत्र आयोजित किए।',
        location: 'ग्रामीण क्षेत्र, झारखंड',
        participants: '80 महिलाएं'
      }
    },
    volunteer: {
      title: 'स्वयंसेवक बनें',
      subtitle: 'आपका समय और कौशल वास्तविक बदलाव ला सकता है',
      item1: 'स्वास्थ्य शिविरों और सामुदायिक कार्यक्रमों के आयोजन में मदद करें',
      item2: 'बच्चों के लिए शैक्षिक कार्यक्रमों में सहायता करें',
      item3: 'प्रशासनिक और धन संग्रह गतिविधियों में सहायता करें',
      item4: 'अपने कौशल और विशेषज्ञता हमारी टीम के साथ साझा करें',
      formTitle: 'स्वयंसेवक पंजीकरण',
      fullName: 'पूरा नाम',
      email: 'ईमेल',
      phone: 'फोन',
      areaOfInterest: 'रुचि का क्षेत्र',
      selectArea: 'एक क्षेत्र चुनें',
      healthcare: 'स्वास्थ्य सेवा',
      education: 'शिक्षा',
      communityDev: 'सामुदायिक विकास',
      fundraising: 'धन संग्रह',
      adminSupport: 'प्रशासनिक सहायता',
      message: 'संदेश',
      namePlaceholder: 'आपका नाम',
      emailPlaceholder: 'your.email@example.com',
      phonePlaceholder: '+91 XXXXX XXXXX',
      messagePlaceholder: 'अपने बारे में बताएं और आप स्वयंसेवक क्यों बनना चाहते हैं...',
      submitApp: 'आवेदन जमा करें',
      joinUs: 'आज ही जुड़ें'
    },
    contact: {
      title: 'संपर्क में रहें',
      subtitle: 'कोई प्रश्न हैं या शामिल होना चाहते हैं? हम आपसे सुनना पसंद करेंगे।',
      location: 'स्थान',
      phone: 'फोन',
      email: 'ईमेल',
      formTitle: 'हमें एक संदेश भेजें',
      name: 'नाम',
      subject: 'विषय',
      message: 'संदेश',
      namePlaceholder: 'आपका नाम',
      emailPlaceholder: 'your.email@example.com',
      subjectPlaceholder: 'यह किस बारे में है?',
      messagePlaceholder: 'आपका संदेश...',
      send: 'संदेश भेजें',
      contactUs: 'हमसे संपर्क करें'
    },
    donation: {
      title: 'प्रभाव डालें',
      subtitle: 'आपका योगदान झारखंड भर के समुदायों में स्थायी परिवर्तन लाने में मदद करता है',
      heading: 'हर योगदान मायने रखता है',
      description: 'आपका दान सीधे स्वास्थ्य शिविरों, शैक्षिक कार्यक्रमों और सामुदायिक कल्याण पहलों का समर्थन करता है। हम प्रत्येक रुपये के पूर्ण पारदर्शिता और जिम्मेदार उपयोग सुनिश्चित करते हैं।',
      item1: 'मुफ्त चिकित्सा शिविर और स्वास्थ्य जागरूकता',
      item2: 'वंचित बच्चों के लिए शैक्षिक सहायता',
      item3: 'महिला सशक्तिकरण कार्यक्रम',
      item4: 'सामुदायिक कल्याण पहल',
      bankTransfer: 'बैंक हस्तांतरण विवरण',
      afterDonating: 'दान करने के बाद, कृपया लेन-देन का विवरण इस पर साझा करें',
      donateNow: 'अभी दान करें'
    },
    impact: {
      title: 'हमारा प्रभाव',
      subtitle: 'झारखंड भर के समुदायों में मापनीय परिवर्तन ला रहे हैं',
      stat1: 'जीवन प्रभावित',
      stat2: 'स्वास्थ्य शिविर',
      stat3: 'बच्चों का समर्थन',
      stat4: 'गांव पहुंचे'
    },
    footer: {
      description: 'माँ दुर्गा सेवा संस्थान ट्रस्ट स्वास्थ्य, शिक्षा और सामुदायिक कल्याण कार्यक्रमों के माध्यम से सकारात्मक परिवर्तन लाने के लिए समर्पित है।',
      quickLinks: 'त्वरित लिंक',
      contactUs: 'हमसे संपर्क करें',
      allRights: 'सर्वाधिकार सुरक्षित।'
    }
  }
};

const navItems = [
  { href: "/", key: "home" as const },
  { href: "/#about", key: "about" as const },
  { href: "/#campaigns", key: "campaigns" as const },
  { href: "/#news", key: "news" as const },
  { href: "/#volunteer", key: "volunteer" as const },
  { href: "/#contact", key: "contact" as const },
];

export default function RootLayout({ children }: { children: ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'hi' : 'en';
    setLanguage(newLang);
    localStorage.setItem('preferred-language', newLang);
  };

  useEffect(() => {
    // Load saved language preference
    const savedLang = localStorage.getItem('preferred-language') as 'en' | 'hi' | null;
    if (savedLang) {
      setLanguage(savedLang);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      <html lang={language} className="scroll-smooth">
        <head>
          {/* Primary Meta Tags */}
          <title>Maa Durga Seva Sansthan Trust | NGO for Healthcare, Education & Community Welfare in India</title>
          <meta name="title" content="Maa Durga Seva Sansthan Trust | NGO for Healthcare, Education & Community Welfare in India" />
          <meta
            name="description"
            content="Maa Durga Seva Sansthan Trust (MDSST) is a registered non-profit NGO dedicated to creating positive change through healthcare, education, and community welfare programs across Jharkhand, India. Join us in empowering lives through compassion. Donate, volunteer, and make a difference."
          />
          <meta
            name="keywords"
            content="NGO India, non-profit organization, charity Jharkhand, healthcare NGO, education NGO, community welfare, social service organization, volunteer India, donate to NGO, Maa Durga Seva Sansthan Trust, MDSST, Dhanbad NGO, rural development India, women empowerment NGO, health camps India, child education support, international NGO, humanitarian organization, social impact India, poverty alleviation, NGO Jharkhand, Indian charity, social work India, community development NGO"
          />
          <meta name="author" content="Maa Durga Seva Sansthan Trust" />
          <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
          <meta name="googlebot" content="index, follow" />
          <link rel="canonical" href="https://mdsst.org" />
          
          {/* Open Graph / Facebook */}
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://mdsst.org" />
          <meta property="og:title" content="Maa Durga Seva Sansthan Trust | Empowering Lives Through Compassion" />
          <meta
            property="og:description"
            content="Join MDSST in creating positive change through healthcare, education, and community welfare programs across Jharkhand, India. Volunteer or donate to make a difference."
          />
          <meta property="og:image" content="https://mdsst.org/og-image.jpg" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:site_name" content="Maa Durga Seva Sansthan Trust" />
          <meta property="og:locale" content="en_IN" />
          <meta property="og:locale:alternate" content="hi_IN" />
          
          {/* Twitter */}
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content="https://mdsst.org" />
          <meta property="twitter:title" content="Maa Durga Seva Sansthan Trust | NGO for Healthcare & Education" />
          <meta
            property="twitter:description"
            content="Join MDSST in creating positive change through healthcare, education, and community welfare programs across Jharkhand, India."
          />
          <meta property="twitter:image" content="https://mdsst.org/og-image.jpg" />
          
          {/* Additional SEO Tags */}
          <meta name="geo.region" content="IN-JH" />
          <meta name="geo.placename" content="Dhanbad, Jharkhand" />
          <meta name="geo.position" content="23.7957;86.4304" />
          <meta name="ICBM" content="23.7957, 86.4304" />
          <meta name="language" content="English, Hindi" />
          <meta name="revisit-after" content="7 days" />
          <meta name="rating" content="General" />
          <meta name="distribution" content="global" />
          
          {/* Favicon */}
          <link rel="icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          
          {/* JSON-LD Structured Data */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'NGO',
                name: 'Maa Durga Seva Sansthan Trust',
                alternateName: 'MDSST',
                url: 'https://mdsst.org',
                logo: 'https://mdsst.org/logo.png',
                description: 'Maa Durga Seva Sansthan Trust is a registered non-profit NGO dedicated to creating positive change through healthcare, education, and community welfare programs across Jharkhand, India.',
                foundingDate: '2020',
                email: 'info@mdsst.org',
                telephone: '+919431390575',
                address: {
                  '@type': 'PostalAddress',
                  streetAddress: 'Nayadih, Keliasole',
                  addressLocality: 'Dhanbad',
                  addressRegion: 'Jharkhand',
                  postalCode: '828201',
                  addressCountry: 'IN'
                },
                geo: {
                  '@type': 'GeoCoordinates',
                  latitude: '23.7957',
                  longitude: '86.4304'
                },
                areaServed: {
                  '@type': 'State',
                  name: 'Jharkhand',
                  containedIn: {
                    '@type': 'Country',
                    name: 'India'
                  }
                },
                contactPoint: {
                  '@type': 'ContactPoint',
                  telephone: '+919431390575',
                  email: 'info@mdsst.org',
                  contactType: 'Customer Service',
                  availableLanguage: ['English', 'Hindi']
                },
                knowsAbout: [
                  'Healthcare Services',
                  'Education Support',
                  'Community Development',
                  'Women Empowerment',
                  'Rural Development',
                  'Social Welfare'
                ],
                seeks: {
                  '@type': 'Demand',
                  name: 'Volunteers and Donations',
                  description: 'We seek volunteers and donations to support our healthcare, education, and community welfare programs.'
                }
              })
            }}
          />
        </head>
        <body className="bg-pureWhite text-charcoal">
        {/* Navigation */}
        <motion.header
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="fixed top-0 left-0 right-0 z-50 shadow-lg transition-all duration-300"
          style={{
            background: 'linear-gradient(to right, #1a1a1a, rgba(26, 26, 26, 0.95), #1a1a1a)',
            backgroundImage: 'linear-gradient(to right, #1a1a1a, rgba(26, 26, 26, 0.95), #1a1a1a), url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.03"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            borderBottom: isScrolled ? '1px solid rgba(220, 20, 60, 0.2)' : 'none'
          }}
        >
          <nav className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 xl:px-12">
            <div className="flex h-24 items-center justify-between">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-2 sm:gap-3 group flex-shrink-0">
                <div className="relative h-12 w-12 sm:h-16 sm:w-16 overflow-hidden rounded-full flex-shrink-0">
                  <Image
                    src="/logo.png"
                    alt="MDSST Logo"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="block">
                  <div className="text-xs sm:text-sm lg:text-base font-semibold tracking-tight leading-tight" style={{ color: '#FFFFFF' }}>
                    {translations[language].trustName}
                  </div>
                  <div className="text-[10px] sm:text-xs" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>{translations[language].tagline}</div>
                </div>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-4 lg:gap-6 xl:gap-8">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-sm font-medium transition-colors duration-200"
                    style={{ color: 'rgba(255, 255, 255, 0.9)' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#DC143C'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.9)'}
                  >
                    {translations[language].nav[item.key]}
                  </Link>
                ))}
                <button
                  onClick={toggleLanguage}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-sm font-medium text-white whitespace-nowrap"
                  aria-label="Toggle language"
                >
                  <Languages className="w-4 h-4" />
                  {language === 'en' ? 'हिंदी' : 'English'}
                </button>
                <Link
                  href="/#donate"
                  className="rounded-full bg-silkRed px-6 py-2.5 text-sm font-medium text-pureWhite hover:bg-silkRedDark transition-all duration-200 hover:shadow-lg whitespace-nowrap"
                >
                  {translations[language].donateButton}
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 transition-colors"
                style={{ color: '#FFFFFF' }}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </nav>

          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden bg-pureWhite border-t border-lightGray"
              >
                <div className="px-6 py-4 space-y-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-base font-medium text-charcoal hover:text-silkRed transition-colors"
                    >
                      {translations[language].nav[item.key]}
                    </Link>
                  ))}
                  <Link
                    href="/#donate"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full text-center rounded-full bg-silkRed px-6 py-3 text-base font-medium text-pureWhite"
                  >
                    Donate Now
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>

        {/* Main Content */}
        <main className="pt-20">{children}</main>

        {/* Footer */}
        <footer className="bg-deepBlack text-pureWhite">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* About */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative h-10 w-10 overflow-hidden rounded-full">
                    <Image
                      src="/logo.png"
                      alt="MDSST Logo"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="text-lg font-semibold text-silkRed">{translations[language].trustName}</div>
                </div>
                <p className="text-sm text-pureWhite/70 leading-relaxed">
                  {translations[language].footer.description}
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-sm font-semibold mb-4 text-pureWhite">{translations[language].footer.quickLinks}</h3>
                <ul className="space-y-2">
                  {navItems.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-sm text-pureWhite/70 hover:text-silkRed transition-colors"
                      >
                        {translations[language].nav[item.key]}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h3 className="text-sm font-semibold mb-4 text-pureWhite">{translations[language].footer.contactUs}</h3>
                <div className="space-y-2 text-sm text-pureWhite/70">
                  <p>Nayadih, Keliasole, Dhanbad</p>
                  <p>Jharkhand - 828201, India</p>
                  <p className="pt-2">
                    <a
                      href="tel:+919431390575"
                      className="hover:text-silkRed transition-colors"
                    >
                      +91 9431390575
                    </a>
                  </p>
                  <p>
                    <a
                      href="mailto:info@mdsst.org"
                      className="hover:text-silkRed transition-colors"
                    >
                      info@mdsst.org
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-pureWhite/10 text-center text-sm text-pureWhite/50">
              <p>© {new Date().getFullYear()} Maa Durga Seva Sansthan Trust. All rights reserved.</p>
            </div>
          </div>
        </footer>
        </body>
      </html>
    </LanguageContext.Provider>
  );
}
