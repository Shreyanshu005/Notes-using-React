import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const NewNote = ({ addNote }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title && content) {
      try {
        const sessionId = localStorage.getItem('sessionid');
        if (!sessionId) {
          console.error('Session ID not found');
          return;
        }

        document.cookie = `sessionid=${sessionId}; Path=/; SameSite=None; Secure`;

        console.log('Session ID:', sessionId);

        const response = await axios.post(
          'https://notes-backend-ts.onrender.com/api/notes',
          {
            title,
            content,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${sessionId}`,

            },
            withCredentials: true, 
          }
        );

        console.log('Note created:', response.data);
        if (response.data.success) {
          addNote(response.data.data.note);
          setTitle('');
          setContent('');
        } 
      } catch (error) {
        toast.error(error.response.data.error);
      }
    } else {
      console.error('Title and content are required');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="note-input">
        <h2>New Note</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter note title (max 50 characters)"
        maxLength="50"
        className="note-title"
      />
              <span className="title-char-counter">{`${title.length}/50`}</span>

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Enter note content"
        className="note-content"
      />
            <span className="char-counter">{`Characters: ${content.length}`}</span>

      <button type="submit">Add Note</button>
      <ToastContainer />
    </form>
  );
};

export default NewNote;