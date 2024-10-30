import { useState } from 'react'
import Note from './components/Note'

const App = (props) => {  
  const [notes, setNotes] = useState(props.notes);
  const [newNote, setNewNote] = useState("new Note");
  const [showAll, setShowAll] = useState(true);
  
  const addNote = (event) => {
    event.preventDefault();
    const newObject = {
      id: notes.length + 1,
      content: newNote,
      important: Math.random() < 0.5
    }
    setNotes(notes.concat(newObject));
    console.log(notes);
    setNewNote('');
  }

  const handleNoteChange = (e) => {
    console.log(e.target.value);
    setNewNote(e.target.value);
  }

  const filteredNotes = showAll ? 
    notes :
    notes.filter(note => note.important);

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll? "important": "all"}
        </button>
      </div>
      <ul>
        {filteredNotes.map(note => 
          <Note key={note.id} note={note} />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input type="text" value={newNote} onChange={handleNoteChange} />
        <button type="submit">Save</button>
      </form>
    </div>
  )
}

export default App 