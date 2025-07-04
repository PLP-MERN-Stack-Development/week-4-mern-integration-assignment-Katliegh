import React, { useState } from 'react';
import axios from 'axios';

function CreateBlog() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/blogs', { title, content });
    setTitle('');
    setContent('');
    alert('Blog posted!');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Blog</h2>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" required />
      <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Content" required />
      <button type="submit">Post</button>
    </form>
  );
}

export default CreateBlog;
