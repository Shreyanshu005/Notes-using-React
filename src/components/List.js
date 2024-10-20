import React from 'react';
import NoteItem from './Item';

const NoteList = ({ notes, onSelectNote, pinNote, deleteNote, selectedNote }) => {
  return (
    <ul className="note-list">
      {notes.map((note, index) => (
        <NoteItem 
          key={index} 
          note={note} 
          onSelectNote={() => onSelectNote(note)} 
          pinNote={() => pinNote(note)} 
          deleteNote={() => deleteNote(note)} 
          isSelected={selectedNote === note} 
        />
      ))}
    </ul>
  );
};

export default NoteList;
