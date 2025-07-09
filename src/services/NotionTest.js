import { useEffect } from 'react';
import { getDatabase } from '../services/notion';

export default function NotionTest() {
  useEffect(() => {
    const testConnection = async () => {
      try {
        const posts = await getDatabase();
        console.log('Notion posts:', posts);
        
        if(posts.length > 0) {
          alert(`Success! Found ${posts.length} posts. First post: ${posts[0].title}`);
        } else {
          alert('Database connected but no posts found. Make sure you have published posts.');
        }
      } catch (error) {
        alert(`Error: ${error.message}`);
        console.error(error);
      }
    };
    
    testConnection();
  }, []);

  return (
    <div className="p-8 text-center">
      <h1 className="text-2xl font-bold mb-4">Testing Notion Connection</h1>
      <p>Check browser console and alert for results...</p>
    </div>
  );
}