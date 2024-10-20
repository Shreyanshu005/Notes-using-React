import React from 'react';

const NoteItem = ({ note, onSelectNote, pinNote, deleteNote, isSelected }) => {
  return (
    <li 
      onClick={onSelectNote} 
      className={`note-item ${isSelected ? 'selected' : ''} ${note.pinned ? 'pinned' : ''}`}
    >
      <div className='note-view'>
        <h2>{note.title}</h2>
        <p>{note.content}</p>
      </div>
      <button onClick={(e) => {e.stopPropagation(); pinNote();}} className="pin-button">
        {note.pinned ? 'Unpin' : 'Pin'}
      </button>
      <button onClick={(e) => {e.stopPropagation(); deleteNote();}} className="delete-button">
        Delete
      </button>
    </li>
  );
};

export default NoteItem;
