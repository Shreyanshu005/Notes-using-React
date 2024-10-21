import React, { useState } from 'react';
import axios from 'axios';

const NoteInput = ({ addNote }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (title && content) {
      try {
        const response = await axios.post("https://notes-backend-ts.onrender.com/api/notes", {
          title,
          content,
        });
        console.log('Note created:', response.data);
        if(response.data.success){
           
          
        addNote(response.data.data.note);
        setTitle('');
        setContent('');

      
      }
       
      } catch (error) {
        console.error('Error creating note:', error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="note-input">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter note title"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Enter note content"
      />
      <button type="submit">Add Note</button>
    </form>
  );
};

export default NoteInput;
