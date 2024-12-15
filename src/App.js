import { useState } from 'react';
import './App.css';
import Input from './components/Input';
import Search from './components/Search';
import Notes from './components/Notes';

function App() {
  const [notes,setNotes] = useState([]); // an array of notes
  const [labels,setLabels] = useState([]); // an array of all labels
  const [loading, setLoading] = useState(false); //set true when user has to wait
  const [pageUpdated, setPageUpdated] = useState(false);
  const handleDeleteNote = (index) => {
    setNotes((prevNotes) => prevNotes.filter((_, i) => i !== index));
  };

 //input is for adding a new note and label
 //search is for getting notes
 //notes is for displaying the notes
  return (
    <div className="App">
      {loading && <div className="loader"></div>}
      {<div className={`content ${loading ? 'blur-background' : ''}`}>
      <h1>Notes App</h1>
      <Input
        labels={labels}
        setNotefn={setNotes}
        setLoadingfn={setLoading}
        pageUpdated={pageUpdated}
        setPageUpdatedfn={setPageUpdated}/>

      <Search labels={labels} setNotefn={setNotes}/>
      <Notes 
          notes={notes}
          labels={labels}
          setNotefn={setNotes}
          setLabelfn={setLabels}
          onDelete={handleDeleteNote}
          setLoadingfn={setLoading}
          pageUpdated={pageUpdated}
          setPageUpdatedfn={setPageUpdated}
          />

      </div>}
    </div>
  );
}

export default App;
