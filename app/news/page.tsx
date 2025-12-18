'use client'

import { useEffect, useState } from 'react'
import { News } from '@/lib/supabase'
import { Calendar, ArrowLeft, Newspaper } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function AllNewsPage() {
  const [news, setNews] = useState<News[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('/api/news')
        const result = await response.json()
        if (result.data) {
          setNews(result.data)
        }
      } catch (error) {
        console.error('Error fetching news:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  return (
    <div className="min-h-screen bg-pureWhite">
      {/* Header */}
      <div className="bg-offWhite py-16">
        <div className="max-w-7xl mx-auto px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-silkRed hover:gap-3 transition-all mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-charcoal">
            Latest News & Events
          </h1>
          <p className="text-lg text-charcoal/70 mt-4">
            Stay updated with our latest initiatives and community activities
          </p>
        </div>
      </div>

      {/* News Grid */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {loading ? (
          <div className="text-center py-12">
            <p className="text-charcoal/60">Loading news...</p>
          </div>
        ) : news.length === 0 ? (
          <div className="text-center py-12">
            <Newspaper className="w-16 h-16 text-charcoal/30 mx-auto mb-4" />
            <p className="text-charcoal/60">No news available yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((item, idx) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.05 }}
              >
                <Link
                  href={`/news/${item.id}`}
                  className="block group bg-offWhite rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative h-48 overflow-hidden">
                    {item.image_url ? (
                      <Image
                        src={item.image_url}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-silkRed/20 to-charcoal/20 flex items-center justify-center">
                        <Newspaper className="w-16 h-16 text-charcoal/30" />
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-sm text-silkRed mb-3">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {new Date(item.published_at || item.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-charcoal mb-3 group-hover:text-silkRed transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-charcoal/70 leading-relaxed mb-4 line-clamp-3">
                      {item.summary}
                    </p>
                    {item.author && (
                      <p className="text-sm text-charcoal/50">By {item.author}</p>
                    )}
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
