import React, { useState } from 'react';
import axios from 'axios';
import CreateBlog from './components/createblogreateBlog';

function App() {
  return (
    <div>
      <h1>Kat’s Dev Blog</h1>
      <CreateBlog />
    </div>
  );
}


function CreateBlog({ onBlogCreated }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      setMessage('Both fields are required.');
      return;
    }

    try {
      setLoading(true);
      await axios.post('http://localhost:5000/api/blogs', { title, content });

      setTitle('');
      setContent('');
      setMessage('Blog posted successfully!');
      onBlogCreated?.(); // call a callback to refresh blog list if needed
    } catch (err) {
      setMessage('Something went wrong. Try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h2>What's on your mind </h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={inputStyle}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={5}
        style={textareaStyle}
      />
      <button type="submit" disabled={loading} style={buttonStyle}>
        {loading ? 'Posting...' : 'Post Blog'}
      </button>
      {message && <p style={msgStyle}>{message}</p>}
    </form>
  );
}

// 🔹 Inline styles (you can replace with CSS file if preferred)
const formStyle = {
  maxWidth: '500px',
  margin: '20px auto',
  padding: '20px',
  border: '1px solid #ccc',
  borderRadius: '8px',
  background: '#f9f9f9'
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  marginBottom: '10px',
  fontSize: '16px'
};

const textareaStyle = {
  width: '100%',
  padding: '10px',
  marginBottom: '10px',
  fontSize: '16px',
  resize: 'vertical'
};

const buttonStyle = {
  padding: '10px 20px',
  fontSize: '16px',
  cursor: 'pointer'
};

const msgStyle = {
  marginTop: '10px',
  color: '#333'
};

export default CreateBlog;

