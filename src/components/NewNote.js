import React, { useState } from 'react';
import axios from 'axios';


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
        } else {
          console.error('API response error:', response.data.message);
        }
      } catch (error) {
        console.error('Error creating note:', error);
      }
    } else {
      console.error('Title and content are required');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="note-input">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter note title"
        className="note-title"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Enter note content"
        className="note-content"
      />
      <button type="submit">Add Note</button>
    </form>
  );
};

export default NewNote;