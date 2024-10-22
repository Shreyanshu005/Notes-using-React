import React, { useState, useEffect } from 'react';
import NoteList from './List';
import NoteDetail from './NoteDetail';
import { useNavigate } from 'react-router-dom';
import NewNote from './NewNote';

import '../App.css';

const Home = () => {
    const navigate=useNavigate();
  const [notes, setNotes] = useState(() => {
  
    const savedNotes = localStorage.getItem('notes');
    return savedNotes ? JSON.parse(savedNotes) : [];
  });
  const [selectedNote, setSelectedNote] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const sessionId = localStorage.getItem('sessionid');
    console.log('Session ID:', sessionId);
    if (!sessionId) {
      navigate('/login');
    }
  }, [navigate]);

  
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = (newNote) => {
    const timestamp = new Date().toLocaleString();
    const updatedNotes = [{ ...newNote, lastEdited: timestamp }, ...notes];
    setNotes(updatedNotes);
    setSelectedNote({ ...newNote, lastEdited: timestamp });
    setIsCreating(false);
  };

  const editNote = (updatedNote) => {
    const timestamp = new Date().toLocaleString();
    const updatedNotes = notes.map(note =>
      note === selectedNote ? { ...updatedNote, lastEdited: timestamp } : note
    );
    setNotes(updatedNotes);
    setSelectedNote({ ...updatedNote, lastEdited: timestamp });
  };

  const pinNote = (noteToPin) => {
    const updatedNotes = notes.map(note => {
      if (note === noteToPin) {
        return { ...note, pinned: !note.pinned };
      }
      return note;
    });
    setNotes(updatedNotes);
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
    const updatedNotes = notes.filter(note => note !== noteToDelete);
    setNotes(updatedNotes);
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

  const hideRightPane = () => {
    setSelectedNote(null);
  };

  const filteredNotes = notes
    .filter(note =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (a.pinned === b.pinned) {
        return 0;
      } else if (a.pinned) {
        return -1;
      } else {
        return 1;
      }
    });

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
      {isCreating ? (
          <NewNote addNote={addNote} />
        ) : (
          selectedNote && (
            <NoteDetail
              note={selectedNote}
              editNote={addNote}
              onSave={() => setIsCreating(false)}
            />
          )
        )}
      </div>
    </div>
   
  );
};

export default Home;
