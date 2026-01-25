'use client';

import { useState } from 'react';
import { BlogPost } from '@/types/blog';

interface BlogPostModalProps {
  post: BlogPost | null;
  onClose: () => void;
  onSave: (post: BlogPost) => void;
}

const BlogPostModal = ({ post, onClose, onSave }: BlogPostModalProps) => {
  const [form, setForm] = useState<BlogPost>(
    post ?? {
      _id: '',
      title: '',
      excerpt: '',
      content: '',
      categories: [],
      author: 'Admin',
      published: false,
      views: 0,
    }
  );

  const handleSubmit = async () => {
    const res = await fetch('/api/blog', {
      method: post ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const saved = await res.json();
    onSave(saved);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-full max-w-xl">
        <h2 className="text-xl font-bold mb-4">
          {post ? 'Edit Post' : 'New Post'}
        </h2>

        <input
          className="input-field mb-3"
          placeholder="Title"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
        />

        <textarea
          className="input-field mb-3"
          placeholder="Excerpt"
          value={form.excerpt}
          onChange={e => setForm({ ...form, excerpt: e.target.value })}
        />

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="btn-secondary">
            Cancel
          </button>
          <button onClick={handleSubmit} className="btn-primary">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogPostModal;
