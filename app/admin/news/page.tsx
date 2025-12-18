'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { News } from '@/lib/supabase'
import { Newspaper, Plus, Edit, Trash2, Eye, EyeOff, LogOut } from 'lucide-react'

export default function AdminNewsPage() {
  const router = useRouter()
  const [news, setNews] = useState<News[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingNews, setEditingNews] = useState<News | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    content: '',
    image_url: '',
    additional_images: [] as string[],
    author: '',
    published: false,
    featured: false,
  })
  const [uploading, setUploading] = useState(false)
  const [uploadingAdditional, setUploadingAdditional] = useState(false)
  const [showUnpublished, setShowUnpublished] = useState(true)

  useEffect(() => {
    checkAuth()
    fetchNews()
  }, [])

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      router.push('/admin/login')
    }
  }

  const fetchNews = async () => {
    try {
      const response = await fetch('/api/news?admin=true')
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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB')
      return
    }

    setUploading(true)
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`
      const filePath = `${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('news-images')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('news-images')
        .getPublicUrl(filePath)

      setFormData({ ...formData, image_url: publicUrl })
      alert('Image uploaded successfully!')
    } catch (error) {
      console.error('Error uploading image:', error)
      alert('Failed to upload image')
    } finally {
      setUploading(false)
    }
  }

  const handleAdditionalImagesUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setUploadingAdditional(true)
    try {
      const uploadedUrls: string[] = []

      for (let i = 0; i < files.length; i++) {
        const file = files[i]

        // Validate file type
        if (!file.type.startsWith('image/')) {
          alert(`File ${file.name} is not an image`)
          continue
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          alert(`File ${file.name} is too large (max 5MB)`)
          continue
        }

        const fileExt = file.name.split('.').pop()
        const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`
        const filePath = `${fileName}`

        const { error: uploadError } = await supabase.storage
          .from('news-images')
          .upload(filePath, file)

        if (uploadError) {
          console.error(`Error uploading ${file.name}:`, uploadError)
          continue
        }

        const { data: { publicUrl } } = supabase.storage
          .from('news-images')
          .getPublicUrl(filePath)

        uploadedUrls.push(publicUrl)
      }

      if (uploadedUrls.length > 0) {
        setFormData({ 
          ...formData, 
          additional_images: [...formData.additional_images, ...uploadedUrls] 
        })
        alert(`${uploadedUrls.length} image(s) uploaded successfully!`)
      }
    } catch (error) {
      console.error('Error uploading additional images:', error)
      alert('Failed to upload some images')
    } finally {
      setUploadingAdditional(false)
    }
  }

  const removeAdditionalImage = (index: number) => {
    const newImages = formData.additional_images.filter((_, i) => i !== index)
    setFormData({ ...formData, additional_images: newImages })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      if (editingNews) {
        // Update existing news
        const response = await fetch(`/api/news/${editingNews.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })

        if (!response.ok) throw new Error('Failed to update news')
        alert('News updated successfully!')
      } else {
        // Create new news
        const response = await fetch('/api/news', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })

        if (!response.ok) throw new Error('Failed to create news')
        alert('News created successfully!')
      }

      // Reset form and refresh list
      setFormData({
        title: '',
        summary: '',
        content: '',
        image_url: '',
        additional_images: [],
        author: '',
        published: false,
        featured: false,
      })
      setShowForm(false)
      setEditingNews(null)
      fetchNews()
    } catch (error) {
      console.error('Error saving news:', error)
      alert('Failed to save news')
    }
  }

  const handleEdit = (newsItem: News) => {
    setEditingNews(newsItem)
    setFormData({
      title: newsItem.title,
      summary: newsItem.summary,
      content: newsItem.content || '',
      image_url: newsItem.image_url || '',
      additional_images: newsItem.additional_images || [],
      author: newsItem.author || '',
      published: newsItem.published,
      featured: newsItem.featured,
    })
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this news item?')) return

    try {
      const response = await fetch(`/api/news/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Failed to delete news')
      
      alert('News deleted successfully!')
      fetchNews()
    } catch (error) {
      console.error('Error deleting news:', error)
      alert('Failed to delete news')
    }
  }

  const togglePublish = async (newsItem: News) => {
    try {
      const response = await fetch(`/api/news/${newsItem.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newsItem,
          published: !newsItem.published,
        }),
      })

      if (!response.ok) throw new Error('Failed to update news')
      
      fetchNews()
    } catch (error) {
      console.error('Error toggling publish:', error)
      alert('Failed to update news')
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  const cancelEdit = () => {
    setShowForm(false)
    setEditingNews(null)
    setFormData({
      title: '',
      summary: '',
      content: '',
      image_url: '',
      additional_images: [],
      author: '',
      published: false,
      featured: false,
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Newspaper className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">News Management</h1>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => router.push('/admin/dashboard')}
                className="px-4 py-2 text-gray-700 hover:text-gray-900"
              >
                Volunteers
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-red-600 hover:text-red-700"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Add News Button */}
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="mb-6 flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add New News
          </button>
        )}

        {/* News Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">
              {editingNews ? 'Edit News' : 'Create New News'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter news title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Summary *
                </label>
                <textarea
                  required
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Brief summary (shown on homepage)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Content
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Full news content (optional)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Author
                </label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Author name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Main Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploading}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {uploading && <p className="text-sm text-gray-500 mt-1">Uploading...</p>}
                {formData.image_url && (
                  <div className="mt-2">
                    <img
                      src={formData.image_url}
                      alt="Preview"
                      className="w-32 h-32 object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Additional Images (Gallery)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleAdditionalImagesUpload}
                  disabled={uploadingAdditional}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {uploadingAdditional && <p className="text-sm text-gray-500 mt-1">Uploading...</p>}
                {formData.additional_images.length > 0 && (
                  <div className="mt-2 grid grid-cols-4 gap-2">
                    {formData.additional_images.map((url, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={url}
                          alt={`Gallery ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeAdditionalImage(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  Upload multiple images for the event gallery (shown on detail page)
                </p>
              </div>

              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.published}
                    onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Publish immediately</span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Featured</span>
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingNews ? 'Update News' : 'Create News'}
                </button>
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* News List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">All News ({news.length})</h2>
                <p className="text-sm text-gray-500 mt-1">
                  {news.filter(n => n.published).length} Published • {news.filter(n => !n.published).length} Unpublished
                </p>
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showUnpublished}
                  onChange={(e) => setShowUnpublished(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Show Unpublished</span>
              </label>
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {news.length === 0 ? (
              <div className="px-6 py-12 text-center text-gray-500">
                No news items yet. Create your first one!
              </div>
            ) : news.filter(item => showUnpublished || item.published).length === 0 ? (
              <div className="px-6 py-12 text-center text-gray-500">
                No published news. Check "Show Unpublished" to see draft items.
              </div>
            ) : (
              news
                .filter(item => showUnpublished || item.published)
                .map((item) => (
                <div 
                  key={item.id} 
                  className={`px-6 py-4 hover:bg-gray-50 ${!item.published ? 'bg-gray-50/50 border-l-4 border-gray-400' : ''}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className={`text-lg font-semibold ${item.published ? 'text-gray-900' : 'text-gray-500'}`}>
                          {item.title}
                        </h3>
                        {item.featured && (
                          <span className="px-2 py-1 text-xs font-semibold text-yellow-800 bg-yellow-100 rounded">
                            Featured
                          </span>
                        )}
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded ${
                            item.published
                              ? 'text-green-800 bg-green-100'
                              : 'text-red-800 bg-red-100'
                          }`}
                        >
                          {item.published ? 'Published' : 'Unpublished'}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{item.summary}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        {item.author && <span>By {item.author}</span>}
                        <span>
                          {new Date(item.published_at || item.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    {item.image_url && (
                      <img
                        src={item.image_url}
                        alt={item.title}
                        className="w-24 h-24 object-cover rounded-lg ml-4"
                      />
                    )}
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => handleEdit(item)}
                      className="flex items-center gap-1 px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded"
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => togglePublish(item)}
                      className="flex items-center gap-1 px-3 py-1 text-sm text-green-600 hover:bg-green-50 rounded"
                    >
                      {item.published ? (
                        <>
                          <EyeOff className="w-4 h-4" />
                          Unpublish
                        </>
                      ) : (
                        <>
                          <Eye className="w-4 h-4" />
                          Publish
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="flex items-center gap-1 px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}