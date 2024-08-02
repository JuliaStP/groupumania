import React, { useState, useEffect } from "react";
import { deletePostById } from "../api"; 
import "../styles/Profile.css";
import "../styles/Blog.css";
import "../styles/PostBtn.css";
import "../styles/SignIn.css";

function Blog({ username }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/blogposts");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        const readPosts = JSON.parse(localStorage.getItem("readPosts")) || {};

        const postsWithStatus = data.map((post) => ({
          ...post,
          isUnread: !readPosts[post.id],
        }));

        postsWithStatus.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

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
    const readPosts = JSON.parse(localStorage.getItem("readPosts")) || {};
    readPosts[posts[index].id] = true;
    localStorage.setItem("readPosts", JSON.stringify(readPosts));
  };

// in progress
  const handleDeletePost = async (postId) => {
    try {
      const response = await deletePostById(postId);
      if (response.success) {
        setPosts(posts.filter((post) => post.id !== postId));
      } else {
        console.error("Failed to delete post");
      }
    } catch (error) {
      console.error("Error during post deletion:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container">
      <h1>All Posts</h1>
      <div className="blog">
        {posts.map((post, index) => (
          <div
            className={`post ${post.isUnread ? "unread" : ""}`}
            key={post.id}
            onClick={() => handlePostClick(index)}
          >
            <h2>{post.title}</h2>
            <h1>Author: {post.author}</h1>
            <img src={post.img} alt={post.title} style={{ maxWidth: "100%" }} />
            <p>{post.content}</p>
            {post.author === username && (
              <button 
                className="button btn" 
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeletePost(post.id);
                }}
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Blog;