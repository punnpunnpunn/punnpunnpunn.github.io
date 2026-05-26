import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const links: Record<string, string> = {
  github: 'https://github.com/punnpunnpunn',
  linkedin: 'https://www.linkedin.com/in/punnawit/',
  email: 'mailto:punpunp@hotmail.com',
  instagram: 'https://www.instagram.com/punpun_thetrainer/',
  'special-link': 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params

  const destination = links[slug]

  if (!destination) {
    return new NextResponse('Link not found', {
      status: 404,
    })
  }

  const headers = request.headers

  const ip =
    headers.get('x-forwarded-for')?.split(',')[0] || 'unknown'

  const userAgent = headers.get('user-agent')
  const referer = headers.get('referer')

  await supabase.from('link_clicks').insert({
    link_name: slug,
    ip,
    user_agent: userAgent,
    referer,
  })

  return NextResponse.redirect(destination)
}