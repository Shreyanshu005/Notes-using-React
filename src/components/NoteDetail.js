import React, { useEffect, useState } from 'react';

const NoteDetail = ({ note, editNote, onSave }) => {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  

  useEffect(() => {
    setTitle(note.title);
    setContent(note.content);
    
  }, [note]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
    
  };

  const handleSave = () => {
    editNote({ ...note, title, content });
    
    onSave();  
  };

  return (
    <div className="note-detail">
      <h2>{note.title ? "Edit Note" : "New Note"}</h2>
      <div className="title-wrapper">
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="Enter note title (max 50 characters)"
          maxLength="50"
        />
        <span className="title-char-counter">{`${title.length}/50`}</span>
      </div>
      <textarea
        value={content}
        onChange={handleContentChange}
        placeholder="Enter your note"
      />
      <span className="char-counter">{`Characters: ${content.length}`}</span>
      { <button onClick={handleSave}>Save Changes</button>}
      
      {note.lastEdited && <p className="last-edited">Last Edited: {note.lastEdited}</p>}
    </div>
  );
};

export default NoteDetail;
