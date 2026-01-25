'use client';

import { useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaSearch } from 'react-icons/fa';
import { formatDate } from '@/lib/utils';
import toast from 'react-hot-toast';
import BlogPostModal from './BlogPostModal';
import { BlogPost } from '@/types/blog';

type FilterStatus = 'all' | 'published' | 'draft';

interface BlogPostsListProps {
  initialPosts: BlogPost[];
}

const BlogPostsList = ({ initialPosts }: BlogPostsListProps) => {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, ] = useState<FilterStatus>('all');

  const handleAddNew = () => {
    setSelectedPost(null);
    setIsModalOpen(true);
  };

  const handleEdit = (post: BlogPost) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const handleDelete = async (postId: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;

    try {
      const res = await fetch(`/api/blog/${postId}`, { method: 'DELETE' });

      if (!res.ok) throw new Error();

      setPosts(prev => prev.filter(p => p._id !== postId));
      toast.success('Blog post deleted');
    } catch {
      toast.error('Failed to delete post');
    }
  };

  const handleSave = (savedPost: BlogPost) => {
    setPosts(prev =>
      selectedPost
        ? prev.map(p => (p._id === savedPost._id ? savedPost : p))
        : [savedPost, ...prev]
    );

    setIsModalOpen(false);
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === 'all'
        ? true
        : filterStatus === 'published'
        ? post.published
        : !post.published;

    return matchesSearch && matchesStatus;
  });

  return (
    <>
      {/* Toolbar */}
      <div className="bg-white rounded-xl shadow p-6 mb-6 flex justify-between gap-4">
        <div className="relative w-full max-w-md">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            className="input-field pl-10"
            placeholder="Search..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>

        <button onClick={handleAddNew} className="btn-primary flex items-center gap-2">
          <FaPlus /> New Post
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              {['Title', 'Author', 'Status', 'Views', 'Date', 'Actions'].map(h => (
                <th key={h} className="p-4 text-left text-sm">
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {filteredPosts.map(post => (
              <tr key={post._id} className="border-t">
                <td className="p-4 font-semibold">{post.title}</td>
                <td className="p-4">{post.author}</td>
                <td className="p-4">
                  {post.published ? 'Published' : 'Draft'}
                </td>
                <td className="p-4">{post.views}</td>
                <td className="p-4">
                 {formatDate(post.publishedAt || post.createdAt || new Date())}
                </td>
                <td className="p-4 flex gap-2">
                  <button onClick={() => handleEdit(post)}>
                    <FaEdit />
                  </button>
                  <button onClick={() => handleDelete(post._id)}>
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <BlogPostModal
          post={selectedPost}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </>
  );
};

export default BlogPostsList;
