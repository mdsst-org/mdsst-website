'use client'

import { useEffect, useState } from 'react'
import { supabase, Volunteer } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { Download, LogOut, Search, Newspaper } from 'lucide-react'

export default function AdminDashboard() {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const router = useRouter()

  useEffect(() => {
    checkAuth()
    fetchVolunteers()
  }, [])

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      router.push('/admin/login')
    }
  }

  const fetchVolunteers = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('volunteers')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching volunteers:', error)
    } else {
      setVolunteers(data || [])
    }
    setLoading(false)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from('volunteers')
      .update({ status })
      .eq('id', id)

    if (!error) {
      fetchVolunteers()
    }
  }

  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Area of Interest', 'Message', 'Status', 'Date']
    const rows = filteredVolunteers.map(v => [
      v.name,
      v.email,
      v.phone,
      v.area_of_interest || '',
      v.message || '',
      v.status,
      new Date(v.created_at).toLocaleDateString()
    ])

    const csv = [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `volunteers-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
  }

  const filteredVolunteers = volunteers.filter(v => {
    const matchesSearch = v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         v.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || v.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-silkRed/5 to-pureWhite">
      {/* Header */}
      <div className="bg-pureWhite shadow-sm border-b border-charcoal/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-charcoal">Volunteer Management</h1>
            <div className="flex gap-4">
              <button
                onClick={() => router.push('/admin/news')}
                className="flex items-center gap-2 px-4 py-2 text-charcoal/70 hover:text-blue-600 transition-colors"
              >
                <Newspaper size={20} />
                Manage News
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-charcoal/70 hover:text-silkRed transition-colors"
              >
                <LogOut size={20} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-pureWhite rounded-xl p-6 shadow-sm">
            <p className="text-charcoal/60 text-sm">Total Volunteers</p>
            <p className="text-3xl font-bold text-charcoal mt-2">{volunteers.length}</p>
          </div>
          <div className="bg-pureWhite rounded-xl p-6 shadow-sm">
            <p className="text-charcoal/60 text-sm">Pending</p>
            <p className="text-3xl font-bold text-yellow-600 mt-2">
              {volunteers.filter(v => v.status === 'pending').length}
            </p>
          </div>
          <div className="bg-pureWhite rounded-xl p-6 shadow-sm">
            <p className="text-charcoal/60 text-sm">Approved</p>
            <p className="text-3xl font-bold text-green-600 mt-2">
              {volunteers.filter(v => v.status === 'approved').length}
            </p>
          </div>
          <div className="bg-pureWhite rounded-xl p-6 shadow-sm">
            <p className="text-charcoal/60 text-sm">Contacted</p>
            <p className="text-3xl font-bold text-blue-600 mt-2">
              {volunteers.filter(v => v.status === 'contacted').length}
            </p>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-pureWhite rounded-xl p-6 shadow-sm mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/40" size={20} />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-charcoal/20 focus:border-silkRed focus:outline-none focus:ring-2 focus:ring-silkRed/20"
              />
            </div>
            <div className="flex gap-4">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 rounded-xl border border-charcoal/20 focus:border-silkRed focus:outline-none focus:ring-2 focus:ring-silkRed/20"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="contacted">Contacted</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
              <button
                onClick={exportToCSV}
                className="flex items-center gap-2 px-6 py-3 bg-silkRed text-pureWhite rounded-xl hover:bg-silkRedDark transition-all"
              >
                <Download size={20} />
                Export CSV
              </button>
            </div>
          </div>
        </div>

        {/* Volunteers Table */}
        <div className="bg-pureWhite rounded-xl shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-charcoal/60">Loading...</div>
          ) : filteredVolunteers.length === 0 ? (
            <div className="p-12 text-center text-charcoal/60">No volunteers found</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-charcoal/5">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-charcoal">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-charcoal">Email</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-charcoal">Phone</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-charcoal">Interest</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-charcoal">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-charcoal">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-charcoal">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-charcoal/10">
                  {filteredVolunteers.map((volunteer) => (
                    <tr key={volunteer.id} className="hover:bg-charcoal/5 transition-colors">
                      <td className="px-6 py-4 text-sm text-charcoal">{volunteer.name}</td>
                      <td className="px-6 py-4 text-sm text-charcoal">{volunteer.email}</td>
                      <td className="px-6 py-4 text-sm text-charcoal">{volunteer.phone}</td>
                      <td className="px-6 py-4 text-sm text-charcoal/70">
                        {volunteer.area_of_interest || '-'}
                      </td>
                      <td className="px-6 py-4 text-sm text-charcoal/70">
                        {new Date(volunteer.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={volunteer.status}
                          onChange={(e) => updateStatus(volunteer.id, e.target.value)}
                          className={`px-3 py-1 rounded-lg text-sm font-medium border-0 focus:ring-2 focus:ring-silkRed/20 ${
                            volunteer.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            volunteer.status === 'contacted' ? 'bg-blue-100 text-blue-800' :
                            volunteer.status === 'approved' ? 'bg-green-100 text-green-800' :
                            'bg-red-100 text-red-800'
                          }`}
                        >
                          <option value="pending">Pending</option>
                          <option value="contacted">Contacted</option>
                          <option value="approved">Approved</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => {
                            alert(`Name: ${volunteer.name}\nEmail: ${volunteer.email}\nPhone: ${volunteer.phone}\nInterest: ${volunteer.area_of_interest || 'N/A'}\nMessage: ${volunteer.message || 'N/A'}`)
                          }}
                          className="text-silkRed hover:text-silkRedDark text-sm font-medium"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}