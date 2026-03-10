'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Upload, X, ImageIcon, Video, Eye, Save } from 'lucide-react';
import { type Category } from '@/types';
import { createClient } from '@/lib/supabase/client';
import { slugify } from '@/lib/utils';

interface PostEditorProps {
  initialData?: {
    id: string;
    title: string;
    content: string;
    category: Category;
    published: boolean;
    media_urls: string[];
  };
}

export default function PostEditor({ initialData }: PostEditorProps) {
  const isEdit = !!initialData;
  const router = useRouter();

  const [title, setTitle] = useState(initialData?.title ?? '');
  const [content, setContent] = useState(initialData?.content ?? '');
  const [category, setCategory] = useState<Category>(initialData?.category ?? 'padya');
  const [published, setPublished] = useState(initialData?.published ?? false);
  const [mediaUrls, setMediaUrls] = useState<string[]>(initialData?.media_urls ?? []);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    const supabase = createClient();

    for (const file of Array.from(files)) {
      const ext = file.name.split('.').pop();
      const path = `posts/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error: uploadError, data } = await supabase.storage
        .from('media')
        .upload(path, file, { cacheControl: '3600', upsert: false });

      if (!uploadError && data) {
        const { data: urlData } = supabase.storage.from('media').getPublicUrl(data.path);
        setMediaUrls((prev) => [...prev, urlData.publicUrl]);
      }
    }
    setUploading(false);
  };

  const removeMedia = (url: string) => {
    setMediaUrls((prev) => prev.filter((u) => u !== url));
  };

  const handleSave = async (publish: boolean) => {
    if (!title.trim() || !content.trim()) {
      setError('शीर्षक और सामग्री दोनों आवश्यक हैं।');
      return;
    }
    setSaving(true);
    setError('');

    const payload = {
      title: title.trim(),
      // On edit keep existing slug; only generate for new posts
      ...(!isEdit && { slug: slugify(title.trim()) + '-' + Date.now().toString(36) }),
      content: content.trim(),
      category,
      published: publish,
      media_urls: mediaUrls,
    };

    const url = isEdit ? `/api/admin/posts/${initialData.id}` : '/api/admin/posts';
    const method = isEdit ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      router.push('/admin');
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error ?? 'कुछ गलत हो गया।');
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <label className="font-serif text-xs uppercase tracking-widest text-gold-500/60 mb-2 block">
          शीर्षक — Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="रचना का शीर्षक..."
          className="admin-input text-xl font-hindi"
        />
      </div>

      {/* Category toggle */}
      <div>
        <label className="font-serif text-xs uppercase tracking-widest text-gold-500/60 mb-3 block">
          श्रेणी — Category
        </label>
        <div className="flex gap-3">
          {([
            { value: 'padya', label: 'पद्य', sub: 'Padya / Poetry' },
            { value: 'gadya', label: 'गद्य', sub: 'Gadya / Prose' },
          ] as const).map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setCategory(opt.value)}
              className={`relative px-6 py-3 rounded-full border transition-all duration-200 ${
                category === opt.value
                  ? 'border-gold-500/60 bg-gold-600/20 text-gold-200'
                  : 'border-gold-700/20 text-ivory-200/40 hover:text-ivory-200/70'
              }`}
            >
              <span className="font-hindi text-base block">{opt.label}</span>
              <span className="font-serif text-[10px] uppercase tracking-widest opacity-60 block">{opt.sub}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content textarea */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="font-serif text-xs uppercase tracking-widest text-gold-500/60">
            रचना — Content
          </label>
          <button
            type="button"
            onClick={() => setPreview(!preview)}
            className="flex items-center gap-1.5 font-serif text-xs text-ivory-200/40 hover:text-gold-400 transition-colors"
          >
            <Eye size={13} />
            {preview ? 'Edit' : 'Preview'}
          </button>
        </div>

        {preview ? (
          <div className="glass-card rounded-xl p-8 min-h-[400px]">
            <div className="font-hindi text-lg text-ivory-100/90 leading-[1.95] whitespace-pre-line">
              {content || <span className="text-ivory-200/30">रचना यहाँ दिखेगी...</span>}
            </div>
          </div>
        ) : (
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="यहाँ कविता या गद्य लिखें...&#10;&#10;Each line break will be preserved."
            rows={18}
            className="admin-input resize-y min-h-[400px] leading-relaxed"
          />
        )}
        <p className="font-serif text-xs text-ivory-200/25 mt-2">
          {content.split('\n').length} lines · {content.length} characters
        </p>
      </div>

      {/* Media upload */}
      <div>
        <label className="font-serif text-xs uppercase tracking-widest text-gold-500/60 mb-3 block">
          मीडिया — Photos / Videos
        </label>

        {/* Existing media */}
        {mediaUrls.length > 0 && (
          <div className="flex flex-wrap gap-3 mb-4">
            {mediaUrls.map((url, i) => {
              const isVideo = /\.(mp4|mov|webm|ogg)$/i.test(url);
              return (
                <div key={i} className="relative group w-24 h-24">
                  {isVideo ? (
                    <div className="w-full h-full rounded-lg bg-forest-800/60 flex items-center justify-center border border-gold-700/20">
                      <Video size={24} className="text-gold-500/50" />
                    </div>
                  ) : (
                    <img src={url} alt="" className="w-full h-full object-cover rounded-lg" />
                  )}
                  <button
                    type="button"
                    onClick={() => removeMedia(url)}
                    className="absolute -top-2 -right-2 bg-rose-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={12} />
                  </button>
                </div>
              );
            })}
          </div>
        )}

        <input
          ref={fileRef}
          type="file"
          accept="image/*,video/*"
          multiple
          onChange={(e) => handleFileUpload(e.target.files)}
          className="hidden"
        />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="flex items-center gap-2 px-5 py-3 rounded-xl border border-dashed border-gold-700/30 text-ivory-200/40 hover:text-gold-400 hover:border-gold-500/40 transition-all duration-200 font-serif text-sm"
        >
          {uploading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            >
              <Upload size={16} />
            </motion.div>
          ) : (
            <ImageIcon size={16} />
          )}
          {uploading ? 'अपलोड हो रहा है...' : 'फ़ोटो / वीडियो जोड़ें'}
        </button>
      </div>

      {error && <p className="font-hindi text-rose-400/80 text-sm">{error}</p>}

      {/* Save buttons */}
      <div className="flex items-center gap-4 pt-4 border-t border-gold-700/15">
        <motion.button
          type="button"
          whileTap={{ scale: 0.97 }}
          onClick={() => handleSave(true)}
          disabled={saving}
          className="flex items-center gap-2 px-7 py-3 rounded-full bg-gold-600/25 border border-gold-500/50 text-gold-200 font-hindi text-base hover:bg-gold-600/35 transition-all duration-200 disabled:opacity-40"
        >
          <Save size={15} />
          {saving ? 'सहेजा जा रहा है...' : 'प्रकाशित करें'}
        </motion.button>

        <motion.button
          type="button"
          whileTap={{ scale: 0.97 }}
          onClick={() => handleSave(false)}
          disabled={saving}
          className="px-7 py-3 rounded-full border border-ivory-200/15 text-ivory-200/40 font-serif text-sm hover:text-ivory-200/70 hover:border-ivory-200/25 transition-all duration-200 disabled:opacity-40"
        >
          Save as Draft
        </motion.button>
      </div>
    </div>
  );
}
