import { useState } from 'react';
import './App.css';
import Input from './components/Input';
import Notes from './components/Notes';

function App() {
  const [notes,setNotes] = useState([]); // an array of notes
  const [loading, setLoading] = useState(false); // Added loading state variable
  const [pageupdated, setPageUpdated] = useState(false);

  const handleDeleteNote = (index) => {
    setNotes((prevNotes) => prevNotes.filter((_, i) => i !== index));
  };
  //justt deleting based on keyval(index). have only things which dont match the index

  return (
    <div className="App">
      <h1>Notes App</h1>
      <Input setNotefn={setNotes} setLoadingfn={setLoading} setPageUpdatedfn={setPageUpdated} />
      <Notes 
          notes={notes}
          onDelete={handleDeleteNote}
          setNotefn={setNotes}
          setLoadingfn={setLoading}
          pageupdatedstate={pageupdated}
          setPageUpdatedfn={setPageUpdated}
          />

      {loading && <p id="status">Loading...</p>} {/* Render "Loading..." if loading state is true */}
    </div>
  );
}

export default App;
