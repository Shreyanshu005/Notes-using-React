import React, { useState, useEffect } from 'react';
import NoteList from './List';
import NoteDetail from './NoteDetail';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
        import 'react-toastify/dist/ReactToastify.css';
import NewNote from './NewNote';
import axios from 'axios';


import './css/NewNote.css'
import '../App.css';

const Home = () => {
    const navigate=useNavigate();
  const [notes, setNotes] = useState([]);

  const [selectedNote, setSelectedNote] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const sessionId = localStorage.getItem('sessionid');
    if (!sessionId) {
      navigate('/login');
    }
    const fetchNotes = async () => {
      try {
        const token = localStorage.getItem('sessionid');
        const headers = {
          'Content-Type': 'application',
          'Authorization': `Bearer ${token}`
        };
        const response = await axios.get("https://notes-backend-ts.onrender.com/api/notes", { headers });
       
        setNotes(response.data.data.notes);
      }
      catch (error) {
        if(error.response.data.error !== "No notes found!"){
          toast.error(error.response.data.error);

        }
      }
    }
    fetchNotes();
  }, [navigate]);

  

  const addNote = (newNote) => {
    const timestamp = new Date().toLocaleString();
    const updatedNotes = [{ ...newNote, lastEdited: timestamp }, ...notes];
    setNotes(updatedNotes);
    setSelectedNote({ ...newNote, lastEdited: timestamp });
    setIsCreating(false);
  };

  const editNote = async (updatedNote) => {
    try {
      const token = localStorage.getItem('sessionid');
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      };
  
    
      if (!updatedNote._id) {
        throw new Error('Note ID is missing');
      }
  
      const response = await axios.put(

        `https://notes-backend-ts.onrender.com/api/notes/${updatedNote._id}`, 
        {
          title: updatedNote.title,
          content: updatedNote.content,
        },
        { headers }
      );
  
  
      if (response.data.success) {
        const timestamp = new Date().toLocaleString();
        const updatedNotes = notes.map(note =>
          note._id === updatedNote._id ? { ...updatedNote, lastEdited: timestamp } : note
        );
        setNotes(updatedNotes);
        setSelectedNote({ ...updatedNote, lastEdited: timestamp });
      }
    }  catch (error) {
      toast.error(error.response.data.error);
    }
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

  const deleteNote = async (noteToDelete) => {
    try {
      const token = localStorage.getItem('sessionid');
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      };
  
      if (!noteToDelete._id) {
        throw new Error('Note ID is missing');
      }
      console.log('Deleting note:', noteToDelete);
  
      const response = await axios.delete(
        `https://notes-backend-ts.onrender.com/api/notes/${noteToDelete._id}`, 
        { headers }
      );
  
      if (response.data.success) {
        const updatedNotes = notes.filter(note => note._id !== noteToDelete._id);
        setNotes(updatedNotes);
        if (selectedNote === noteToDelete) {
          setSelectedNote(null);
        }
      }
    }  catch (error) {
      toast.error(error.response.data.error);
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
    const logout = () => {
      localStorage.removeItem('sessionid');
      navigate('/login');
    };

  return (
    <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
      <div className="left-pane">
        <div className="header">
          <button onClick={toggleDarkMode}>
          

            {darkMode ? 'Light Mode' : 'Dark Mode'}

          </button>
          <button onClick={logout}className='logoutB'>Logout Now</button>
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
              editNote={editNote}
              onSave={() => setIsCreating(false)}
            />
          )
        )}
      </div>
      <ToastContainer />
    </div>
   
  );
};

export default Home;
