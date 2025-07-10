import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/landingPage/Navbar';
import Footer from '../components/landingPage/Footer';
import { getDatabase, getPageContent } from '../services/notion';
import NotionRenderer from '../components/blog/NotionRenderer';
import { FaCalendarAlt, FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const BlogPostPage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        // Find post by slug
        const posts = await getDatabase();
        const foundPost = posts.find(p => p.slug === slug);
        
        if (!foundPost) {
          throw new Error('Post not found');
        }
        
        // Get content
        const content = await getPageContent(foundPost.id);
        
        setPost(foundPost);
        setContent(content);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-[#f8f9fa] dark:from-gray-900 dark:to-gray-800 pt-12">
        <Navbar />
        <div className="flex justify-center py-32">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-[#f8f9fa] dark:from-gray-900 dark:to-gray-800 pt-12">
        <Navbar />
        <div className="w-11/12 max-w-6xl mx-auto px-4 py-24 text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Post Not Found</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            The requested blog post could not be found.
          </p>
          <Link 
            to="/blog" 
            className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            Back to Blog
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#f8f9fa] dark:from-gray-900 dark:to-gray-800 pt-12">
      <Navbar />
      
      <div className="w-11/12 max-w-4xl mx-auto px-4 py-12">
        <Link 
          to="/blog" 
          className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 mb-8"
        >
          <FaArrowLeft className="mr-2" />
          Back to Blog
        </Link>
        
        <article className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          {post.cover && (
            <div className="h-80 md:h-96 overflow-hidden">
              <img 
                src={post.cover} 
                alt={post.title} 
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <div className="p-6 md:p-10">
            <div className="flex flex-wrap items-center mb-6">
              <span className="px-4 py-2 bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300 rounded-full text-sm font-medium mr-4 mb-2">
                {post.category}
              </span>
              <div className="flex items-center text-gray-500 dark:text-gray-400 mb-2">
                <FaCalendarAlt className="mr-2" />
                <span>{post.date}</span>
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              {post.title}
            </h1>
            
            <div className="prose max-w-none dark:prose-invert prose-lg">
              <NotionRenderer blocks={content} />
            </div>
          </div>
        </article>
      </div>
      
      <Footer />
    </div>
  );
};

export default BlogPostPage;