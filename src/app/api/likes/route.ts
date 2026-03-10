import { createClient } from '@/lib/supabase/server';
import { NextResponse, type NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { post_id, session_id, action } = body; // action: 'like' | 'unlike'

  if (!post_id || !session_id) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  const supabase = await createClient();

  if (action === 'unlike') {
    await supabase
      .from('likes')
      .delete()
      .eq('post_id', post_id)
      .eq('session_id', session_id);

    await supabase.rpc('decrement_likes', { post_id_param: post_id });
  } else {
    const { error: likeError } = await supabase
      .from('likes')
      .insert({ post_id, session_id });

    if (!likeError) {
      await supabase.rpc('increment_likes', { post_id_param: post_id });
    }
  }

  const { data: post } = await supabase
    .from('posts')
    .select('likes_count')
    .eq('id', post_id)
    .single();

  return NextResponse.json({ likes_count: post?.likes_count ?? 0 });
}
