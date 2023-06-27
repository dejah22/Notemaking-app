import { useState } from 'react';
import './App.css';
import Input from './components/Input';
import Notes from './components/Notes';

function App() {
  const [notes,setNotes] = useState([]); // an array of notes

  const handleDeleteNote = (index) => {
    setNotes((prevNotes) => prevNotes.filter((_, i) => i !== index));
  };
  //justt deleting based on keyval(index). have only things which dont match the index

  return (
    <div className="App">
      <h1>Notes App</h1>
      <Input setNotefn={setNotes}/>
      <Notes notes={notes} onDelete={handleDeleteNote}/>
    </div>
  );
}

export default App;
