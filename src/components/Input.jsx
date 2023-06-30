import React, { useState } from 'react';
import axios from 'axios';
import AddLabel from './AddLabel';

//chooses label from labels to selectedLabels, and updates it to db
function Input({labels,setNotefn,setLoadingfn,setPageUpdatedfn}) {
  const [inputfield, setInputField] = useState('');
  const [title, setTitle] = useState('');
  const [selectedLabels, setSelectedLabels] = useState([]); //set by Input, accessed by Notes

  const handleLabelSelect = (selectedOptions) => {
    setSelectedLabels(selectedOptions);
  };
  
  function addNote() {
    if (inputfield !== '' || title !== '') {
      const newNote = {
        notecontent: inputfield,
        titleName: title,
        labels: selectedLabels,
      };

      setLoadingfn(true);
      axios
        .post('https://21d6-103-191-90-42.ngrok-free.app/api/v1/google-notes', newNote, {
          headers: {
            'ngrok-skip-browser-warning': '69420',
          },
        })
        .then((response) => {
          setNotefn(prevNotes => [response.data, ...prevNotes]);
          setInputField('');
          setTitle('');
          setSelectedLabels([]);
        })
        .catch((error) => {
          console.error('Error adding note:', error);
        })
        .finally(() => {
          setLoadingfn(false);
        });
    }
  }

  return (
    <div id="input">
      <input
      type="text"
      id="addtitle"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      placeholder="Enter Title">
      </input>

      <br></br>
      <br></br>

      <input
        type="textarea"
        style={{resize:'none'}}
        id="addnotes"
        value={inputfield}
        onChange={(e) => setInputField(e.target.value)}
        placeholder="Take a note"
      />
      <br></br>
      <br></br>
      <AddLabel
        labels={labels}
        selectedLabels={selectedLabels}
        onSelect={handleLabelSelect}
        setPageUpdatedfn={setPageUpdatedfn}
      />

      <button onClick={addNote}>Add Note</button>
      
    </div>
  );
}

export default Input;
