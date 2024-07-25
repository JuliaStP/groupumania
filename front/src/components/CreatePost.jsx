import React, { useState } from "react";
import { createPost } from "../api";
import "../styles/Blog.css";
import "../styles/SignIn.css";
import "../styles/Profile.css";
import FormLabel from "@material-ui/core/FormLabel";
import Input from "@material-ui/core/Input";

function CreatePost({ username }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [img, setImg] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Form submitted with:", { title, author, content, img });

    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("content", content);

    if (img) {
      formData.append("image", img);
    }

    try {
      const success = await createPost(formData);
      if (success) {
        console.log("Post created successfully!");
        setTitle("");
        setAuthor("");
        setContent("");
        setImg(null);
      } else {
        console.error("Failed to create post");
      }
    } catch (error) {
      console.error("Error during post creation:", error);
    }
  };

  return (
    <div className="container">
      <h1>Create a New Post</h1>
      <form onSubmit={handleSubmit}>
        <FormLabel className="label" htmlFor="title">
          Title:
          <Input
            className="input"
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </FormLabel>

        <FormLabel className="label" htmlFor="author">
          Author:
          <Input
            className="input"
            type="text"
            id="author"
            name="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </FormLabel>

        <FormLabel className="label" htmlFor="content">
          Content:
          <textarea
            className="input"
            id="content"
            name="content"
            rows="8"
            cols="50"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </FormLabel>

        <FormLabel className="label" htmlFor="img">
          Picture:
          <Input
            className="input"
            type="file"
            id="img"
            onChange={(e) => setImg(e.target.files[0])}
            name="img"
          />
        </FormLabel>

        <div className="btn-container btn-main">
          <button className="button btn" type="submit">
            Post
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreatePost;

