import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { supabaseAdmin } from '@/lib/supabase-admin'

// GET - Fetch all news (public: only published, admin: all)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const isAdmin = searchParams.get('admin') === 'true'
    
    // Use admin client for admin requests to bypass RLS
    const client = isAdmin ? supabaseAdmin : supabase
    
    let query = client
      .from('news')
      .select('*')
      .order('featured', { ascending: false })
      .order('published_at', { ascending: false, nullsFirst: false })
      .order('created_at', { ascending: false })

    // If not admin, only show published news
    if (!isAdmin) {
      query = query.eq('published', true)
    }

    const { data, error } = await query

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch news' },
        { status: 500 }
      )
    }

    return NextResponse.json({ data }, { status: 200 })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST - Create new news (admin only)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, summary, content, image_url, additional_images, author, published, featured } = body

    if (!title || !summary) {
      return NextResponse.json(
        { error: 'Title and summary are required' },
        { status: 400 }
      )
    }

    const newsData: any = {
      title,
      summary,
      content,
      image_url,
      additional_images: additional_images || [],
      author,
      published: published || false,
      featured: featured || false,
    }

    // Set published_at if publishing
    if (published) {
      newsData.published_at = new Date().toISOString()
    }

    const { data, error } = await supabaseAdmin
      .from('news')
      .insert([newsData])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to create news' },
        { status: 500 }
      )
    }

    return NextResponse.json({ data: data[0] }, { status: 201 })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}