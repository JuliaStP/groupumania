import React, { useState, useEffect } from "react";
import "../styles/Profile.css";
import "../styles/Blog.css";
import "../styles/PostBtn.css";
import PostBtn from '../components/PostBtn';
import { FormLabel, Input } from '@mui/material';

function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/blogposts');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        // Check localStorage for read status
        const readPosts = JSON.parse(localStorage.getItem('readPosts')) || {};

        const postsWithStatus = data.map(post => ({
          ...post,
          isUnread: !readPosts[post.id] // Assuming each post has a unique id
        }));

        setPosts(postsWithStatus);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handlePostClick = (index) => {
    const updatedPosts = posts.map((post, i) => 
      i === index ? { ...post, isUnread: false } : post
    );

    setPosts(updatedPosts);

    // Update localStorage
    const readPosts = JSON.parse(localStorage.getItem('readPosts')) || {};
    readPosts[posts[index].id] = true;
    localStorage.setItem('readPosts', JSON.stringify(readPosts));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='container'>
      <h1>All Posts</h1>
      <div className="blog">
        {posts.map((post, index) => (
          <div 
            className={`post ${post.isUnread ? 'unread' : ''}`} 
            key={index} 
            onClick={() => handlePostClick(index)}
          >
            <h2>{post.title}</h2>
            <h1>Author: {post.author}</h1>
            <img src={post.img} alt={post.title} style={{ maxWidth: '100%' }} />
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Blog;


