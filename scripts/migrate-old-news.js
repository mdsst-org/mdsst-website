/**
 * Migration script to transfer old hardcoded news to Supabase database
 * Run this once to migrate existing news articles
 * 
 * Usage: node scripts/migrate-old-news.js
 */

const oldNewsData = [
  {
    title: "Nasha Mukti Jagrukta Abhiyaan",
    summary: "Organized a comprehensive anti-drug awareness campaign to educate youth and communities about the dangers of substance abuse.",
    content: `On July 12, 2025, Maa Durga Seva Sansthan Trust launched a powerful Nasha Mukti Jagrukta Abhiyaan (Anti-Drug Awareness Campaign) across multiple villages in Dhanbad district. This comprehensive initiative aimed to educate youth and community members about the devastating effects of drug abuse and substance addiction, reaching over 500 participants.

The campaign featured interactive sessions led by medical professionals, counselors, and reformed individuals who shared their personal stories of struggle and recovery. These powerful testimonials had a profound impact on the audience, particularly young people who are most vulnerable to peer pressure and substance experimentation.

Our team organized awareness rallies, street plays, and educational workshops in schools and community centers. We distributed informational pamphlets in local languages, highlighting the physical, mental, and social consequences of drug addiction. The campaign also emphasized the importance of family support and community vigilance in preventing substance abuse.

Medical experts conducted sessions on recognizing early signs of addiction, understanding the science behind substance dependency, and available treatment options. We established helpline numbers and counseling support for individuals and families affected by addiction, ensuring they have access to professional help and rehabilitation resources.

The response from the community was overwhelming, with parents, teachers, and local leaders pledging their support to create a drug-free environment. Many youth took an oath to stay away from drugs and to help their peers make positive life choices. The campaign concluded with the formation of youth vigilance committees in each village to continue the awareness efforts.

This initiative represents our commitment to addressing one of the most pressing social issues affecting our communities. We believe that through education, awareness, and community support, we can protect our youth from the dangers of substance abuse and build a healthier, more prosperous society for future generations.`,
    image_url: "/images/nashamukti1.jpg",
    author: "MDSST Team",
    published: true,
    featured: true,
    published_at: "2025-07-12T00:00:00Z"
  },
  {
    title: "Health Camp in Baliapur",
    summary: "Successfully conducted a free health check-up camp serving over 200 community members.",
    content: `On November 16, 2025, Maa Durga Seva Sansthan Trust organized a comprehensive health camp in Baliapur village, bringing essential medical services to the doorstep of the community. The camp was a resounding success, with over 200 community members benefiting from free health check-ups and consultations.

The health camp featured a team of qualified medical professionals including general physicians, pediatricians, and specialists who provided thorough health screenings. Services included blood pressure monitoring, blood sugar testing, general health consultations, and distribution of free medicines to those in need.

Many elderly residents and children received much-needed medical attention. The camp also focused on health awareness, with our team educating attendees about preventive healthcare, nutrition, and hygiene practices. Several cases requiring further medical attention were identified and referred to appropriate healthcare facilities.

The overwhelming response from the community reinforces our commitment to making healthcare accessible to all. We distributed health education materials and provided guidance on maintaining a healthy lifestyle. The camp concluded with a promise to conduct more such initiatives in the future.

We extend our heartfelt gratitude to all the medical professionals who volunteered their time and expertise, and to the local community leaders who helped organize this event. Together, we are making a difference in the lives of those who need it most.`,
    image_url: "/images/initiative4.jpg",
    author: "MDSST Team",
    published: true,
    featured: false,
    published_at: "2025-11-16T00:00:00Z"
  },
  {
    title: "Women Empowerment Workshop",
    summary: "Organized skill development and awareness sessions for 80 women in rural areas.",
    content: `On September 28, 2025, Maa Durga Seva Sansthan Trust conducted a transformative Women Empowerment Workshop in rural areas of Jharkhand. The workshop brought together 80 women from various villages, providing them with valuable skills, knowledge, and confidence to become self-reliant and contribute to their families and communities.

The day-long workshop covered multiple aspects of women's empowerment including skill development, financial literacy, health awareness, and legal rights. Expert trainers and social workers conducted interactive sessions on topics such as starting small businesses, savings and banking, nutrition and hygiene, and women's rights and safety.

Participants were introduced to various income-generating activities such as tailoring, handicrafts, food processing, and organic farming. Many women showed keen interest in learning these skills, seeing them as opportunities to contribute to their household income and gain financial independence.

The workshop also addressed important social issues including gender equality, domestic violence prevention, and the importance of education for girls. Women were encouraged to support each other and form self-help groups to continue their learning and growth journey together.

The response was overwhelming, with participants expressing their desire for more such workshops. Many women shared their aspirations and challenges, and we committed to providing ongoing support through follow-up sessions and resource connections. This workshop marks the beginning of a long-term commitment to women's empowerment in rural Jharkhand.`,
    image_url: "/images/initiative3.jpg",
    author: "MDSST Team",
    published: true,
    featured: false,
    published_at: "2025-09-28T00:00:00Z"
  }
];

async function migrateNews() {
  console.log('🚀 Starting news migration...\n');
  console.log('⚠️  Make sure your dev server is running on http://localhost:3000\n');

  let successCount = 0;
  let failCount = 0;

  for (const news of oldNewsData) {
    try {
      console.log(`📝 Migrating: "${news.title}"...`);
      
      const response = await fetch('http://localhost:3000/api/news', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(news),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error(`❌ Failed to migrate "${news.title}":`, error);
        failCount++;
      } else {
        const result = await response.json();
        console.log(`✅ Successfully migrated: "${news.title}"`);
        successCount++;
      }
    } catch (error) {
      console.error(`❌ Error migrating "${news.title}":`, error.message);
      failCount++;
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log('✨ Migration completed!');
  console.log(`✅ Success: ${successCount} articles`);
  console.log(`❌ Failed: ${failCount} articles`);
  console.log('='.repeat(50));
  console.log('\n📊 Check your admin panel at http://localhost:3000/admin/news');
  console.log('🏠 View on homepage at http://localhost:3000/#news\n');
}

// Run migration
migrateNews().catch((error) => {
  console.error('\n❌ Migration failed:', error.message);
  console.error('\n💡 Make sure:');
  console.error('   1. Your dev server is running (npm run dev)');
  console.error('   2. Supabase is configured correctly');
  console.error('   3. The news table exists in Supabase\n');
  process.exit(1);
});
