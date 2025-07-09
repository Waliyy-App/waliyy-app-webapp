import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getDatabase } from '../../services/notion';
import { FaCalendarAlt } from 'react-icons/fa';

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await getDatabase();
        setPosts(posts);
      } catch (err) {
        setError('Failed to load blog posts');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-500">
        {error}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No blog posts available yet
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map(post => (
        <Link 
          to={`/blog/${post.slug}`} 
          key={post.id}
          className="block group"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-all duration-300 transform group-hover:-translate-y-1 group-hover:shadow-lg h-full">
            {post.cover && (
              <div className="h-48 overflow-hidden">
                <img 
                  src={post.cover} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            )}
            <div className="p-6">
              <span className="inline-block px-3 py-1 bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300 rounded-full text-sm font-medium mb-3">
                {post.category}
              </span>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {post.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                {post.excerpt}
              </p>
              <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                <FaCalendarAlt className="mr-2" />
                <span>{post.date}</span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default BlogList;