import { createClient } from '@/lib/supabase/server';
import { NextResponse, type NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { post_id, author_name, content } = body;

  if (!post_id || !author_name?.trim() || !content?.trim()) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from('comments')
    .insert({
      post_id,
      author_name: author_name.slice(0, 60),
      content: content.slice(0, 1000),
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
