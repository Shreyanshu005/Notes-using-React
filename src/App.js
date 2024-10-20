import React, { useState } from 'react';
import NoteList from './components/List';
import NoteDetail from './components/NoteDetail';
import './App.css';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [darkMode, setDarkMode] = useState(false);  

  const addNote = (newNote) => {
    const timestamp = new Date().toLocaleString();
    setNotes([{ ...newNote, lastEdited: timestamp }, ...notes]); 
    setSelectedNote({ ...newNote, lastEdited: timestamp });
    setIsCreating(false);
  };

  const editNote = (updatedNote) => {
    const timestamp = new Date().toLocaleString(); 
    setNotes(notes.map(note => 
      (note === selectedNote ? { ...updatedNote, lastEdited: timestamp } : note)
    )); 
    setSelectedNote({ ...updatedNote, lastEdited: timestamp }); 
  };

  const pinNote = (noteToPin) => {
    setNotes(notes.map(note => {
      if (note === noteToPin) {
        return { ...note, pinned: !note.pinned };
      }
      return note;
    }));
  };

  const selectNote = (note) => {
    setSelectedNote(note);
    setIsCreating(false);
  };

  const createNewNote = () => {
    setSelectedNote({ title: '', content: '', pinned: false });
    setIsCreating(true);
  };

  const deleteNote = (noteToDelete) => {
    setNotes(notes.filter(note => note !== noteToDelete));
    if (selectedNote === noteToDelete) {
      setSelectedNote(null); 
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode); 
  };

  const filteredNotes = notes
    .filter(note =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => (a.pinned === b.pinned ? 0 : a.pinned ? -1 : 1)); 

  return (
    <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
     
      <div className="left-pane">
      <div className="header">
        <button onClick={toggleDarkMode}>
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
        <input
          type="text"
          placeholder="Search notes..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-box"
        />
        <button onClick={createNewNote}>Create New Note</button>
        <NoteList 
          notes={filteredNotes} 
          onSelectNote={selectNote} 
          pinNote={pinNote} 
          deleteNote={deleteNote} 
          selectedNote={selectedNote} 
        />
      </div>
      <div className="right-pane">
        {selectedNote ? (
          <NoteDetail
            note={selectedNote}
            editNote={isCreating ? addNote : editNote}
          />
        ) : (
          <p>Select a note or create a new one!</p>
        )}
      </div>
    </div>
  );
};

export default App;
