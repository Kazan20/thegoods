import { useState, useEffect } from 'react';
import './App.css';
import { CreateNote, GetNotes, UpdateNote, DeleteNote } from "../wailsjs/go/main/App";

function App() {
    const [notes, setNotes] = useState([]);
    const [selectedNote, setSelectedNote] = useState(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        loadNotes();
    }, []);

    const loadNotes = async () => {
        const notesList = await GetNotes();
        setNotes(notesList);
    };

    const handleCreateNote = async () => {
        if (title.trim() && content.trim()) {
            await CreateNote(title, content);
            setTitle('');
            setContent('');
            loadNotes();
        }
    };

    const handleUpdateNote = async () => {
        if (selectedNote && title.trim() && content.trim()) {
            await UpdateNote(selectedNote.id, title, content);
            setSelectedNote(null);
            setTitle('');
            setContent('');
            loadNotes();
        }
    };

    const handleDeleteNote = async (id) => {
        await DeleteNote(id);
        setSelectedNote(null);
        setTitle('');
        setContent('');
        loadNotes();
    };

    const selectNote = (note) => {
        setSelectedNote(note);
        setTitle(note.title);
        setContent(note.content);
    };

    return (
        <div className="app-container">
            <div className="notes-sidebar">
                <h2>My Notes</h2>
                <div className="notes-list">
                    {notes.map((note) => (
                        <div
                            key={note.id}
                            className={`note-item ${selectedNote?.id === note.id ? 'selected' : ''}`}
                            onClick={() => selectNote(note)}
                        >
                            <h3>{note.title}</h3>
                            <p>{new Date(note.updatedAt).toLocaleDateString()}</p>
                            <button
                                className="delete-btn"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteNote(note.id);
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <div className="note-editor">
                <input
                    type="text"
                    placeholder="Note Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    placeholder="Note Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <button
                    onClick={selectedNote ? handleUpdateNote : handleCreateNote}
                >
                    {selectedNote ? 'Update Note' : 'Create Note'}
                </button>
            </div>
        </div>
    )
}

export default App
