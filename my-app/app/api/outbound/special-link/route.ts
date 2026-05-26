import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(request: Request) {
  const headers = request.headers

  const ip =
    headers.get('x-forwarded-for')?.split(',')[0] || 'unknown'

  const userAgent = headers.get('user-agent')
  const referer = headers.get('referer')

  await supabase.from('link_clicks').insert({
    link_name: 'special-link',
    ip,
    user_agent: userAgent,
    referer,
  })

  return NextResponse.redirect('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
}