'use client'

import { useEffect, useState, useMemo } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { News } from '@/lib/supabase'
import { Calendar, ArrowLeft, User, X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

export default function NewsDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [news, setNews] = useState<News | null>(null)
  const [loading, setLoading] = useState(true)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [zoom, setZoom] = useState(1)

  // Combine main image with additional images for gallery
  const allImages = useMemo(() => {
    if (!news) return []
    const images = []
    if (news.image_url) images.push(news.image_url)
    if (news.additional_images) images.push(...news.additional_images)
    return images
  }, [news])

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index)
    setLightboxOpen(true)
    setZoom(1)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    setZoom(1)
  }

  const goToPrevious = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1))
    setZoom(1)
  }

  const goToNext = () => {
    setCurrentImageIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1))
    setZoom(1)
  }

  const zoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.25, 3))
  }

  const zoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.25, 0.5))
  }

  const resetZoom = () => {
    setZoom(1)
  }

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(`/api/news/${params.id}`)
        const result = await response.json()
        
        if (result.data) {
          setNews(result.data)
        } else {
          router.push('/404')
        }
      } catch (error) {
        console.error('Error fetching news:', error)
        router.push('/404')
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchNews()
    }
  }, [params.id, router])

  // Handle keyboard controls for lightbox
  useEffect(() => {
    if (!lightboxOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') goToPrevious()
      if (e.key === 'ArrowRight') goToNext()
      if (e.key === '+' || e.key === '=') zoomIn()
      if (e.key === '-' || e.key === '_') zoomOut()
      if (e.key === '0') resetZoom()
    }

    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey) {
        e.preventDefault()
        if (e.deltaY < 0) zoomIn()
        else zoomOut()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('wheel', handleWheel, { passive: false })
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('wheel', handleWheel)
    }
  }, [lightboxOpen, allImages.length])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-pureWhite">
        <div className="text-xl text-charcoal">Loading...</div>
      </div>
    )
  }

  if (!news) {
    return null
  }

  return (
    <div className="min-h-screen bg-pureWhite">
      {/* Header */}
      <div className="bg-offWhite py-8">
        <div className="max-w-4xl mx-auto px-6">
          <Link
            href="/#news"
            className="inline-flex items-center gap-2 text-silkRed hover:gap-3 transition-all mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to News
          </Link>
        </div>
      </div>

      {/* Content */}
      <article className="max-w-4xl mx-auto px-6 py-12">
        {/* Featured Image */}
        {news.image_url && (
          <div className="relative w-full h-96 rounded-2xl overflow-hidden mb-8">
            <Image
              src={news.image_url}
              alt={news.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-charcoal mb-6">
          {news.title}
        </h1>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-6 text-charcoal/60 mb-8 pb-8 border-b border-charcoal/10">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            <span>
              {new Date(news.published_at || news.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </div>
          {news.author && (
            <div className="flex items-center gap-2">
              <User className="w-5 h-5" />
              <span>{news.author}</span>
            </div>
          )}
        </div>

        {/* Summary */}
        <div className="text-xl text-charcoal/80 leading-relaxed mb-8 font-medium">
          {news.summary}
        </div>

        {/* Content */}
        {news.content && (
          <div className="prose prose-lg max-w-none">
            <div className="text-charcoal/70 leading-relaxed whitespace-pre-wrap">
              {news.content}
            </div>
          </div>
        )}

        {/* Additional Images Gallery */}
        {news.additional_images && news.additional_images.length > 0 && (
          <div className="mt-12">
            <h3 className="text-2xl font-semibold text-charcoal mb-6">Event Gallery</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {news.additional_images.map((image, idx) => (
                <div 
                  key={idx} 
                  className="relative h-80 md:h-96 rounded-2xl overflow-hidden bg-offWhite cursor-pointer group"
                  onClick={() => openLightbox(idx + 1)}
                >
                  <Image
                    src={image}
                    alt={`${news.title} - Image ${idx + 2}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                    <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm font-medium">
                      Click to enlarge
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Support Our Mission Section */}
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

        {/* Back Button */}
        <div className="mt-12 pt-8 border-t border-charcoal/10">
          <Link
            href="/#news"
            className="inline-flex items-center gap-2 text-silkRed hover:gap-3 transition-all font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to all news
          </Link>
        </div>
      </article>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-[110] p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Close"
            >
              <X className="w-8 h-8 text-white" />
            </button>

            {/* Zoom Controls */}
            <div className="absolute top-4 left-4 z-[110] flex flex-col gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  zoomIn()
                }}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Zoom in"
              >
                <ZoomIn className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  zoomOut()
                }}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Zoom out"
              >
                <ZoomOut className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  resetZoom()
                }}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Reset zoom"
                title="Reset zoom"
              >
                <Maximize2 className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Previous Button */}
            {allImages.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  goToPrevious()
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-[110] p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-8 h-8 text-white" />
              </button>
            )}

            {/* Next Button */}
            {allImages.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  goToNext()
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-[110] p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Next image"
              >
                <ChevronRight className="w-8 h-8 text-white" />
              </button>
            )}

            {/* Image Container */}
            <div className="relative w-full h-full flex items-center justify-center overflow-auto">
              <div 
                className="relative max-w-[90vw] max-h-[85vh] w-auto h-auto transition-transform duration-200"
                onClick={(e) => e.stopPropagation()}
                style={{ 
                  transform: `scale(${zoom})`,
                  cursor: zoom > 1 ? 'move' : 'default'
                }}
              >
                <Image
                  src={allImages[currentImageIndex]}
                  alt={`${news.title} - Image ${currentImageIndex + 1}`}
                  width={1920}
                  height={1080}
                  className="object-contain max-w-full max-h-[85vh] w-auto h-auto"
                  priority
                />
              </div>
            </div>

            {/* Image Counter and Zoom Level */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-3 z-[110]">
              <div className="bg-white/10 px-4 py-2 rounded-full">
                <span className="text-white text-sm font-medium">
                  {currentImageIndex + 1} / {allImages.length}
                </span>
              </div>
              <div className="bg-white/10 px-4 py-2 rounded-full">
                <span className="text-white text-sm font-medium">
                  {Math.round(zoom * 100)}%
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
