import React, { useState } from 'react';
import axios from 'axios';

function Input({setNotefn }) {
  const [variable, setVar] = useState('');
  const [title, setTitle] = useState('');

  function addNote() {
    if(variable!==''||title!=='')
    {
      const newNote = { notecontent: variable, titleName: title };

      axios.post('https://21d6-103-191-90-42.ngrok-free.app/api/v1/googleNotes', newNote)
      .then((response) => {
      console.log('HI');
      setNotefn(prevNotes => [...prevNotes, response.data]);
      setVar('');
      setTitle('');
    })
    .catch((error) => {
      console.error('Error adding note:', error);
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
        type="text"
        id="addnotes"
        value={variable}//value in the input field is the item (todo)
        //will get unset when state var is unset
        onChange={(e) => setVar(e.target.value)}
        placeholder="Take a note"
      />
      <br></br>
      <br></br>
      <button onClick={addNote}>Add Note</button>
    </div>
  );
}

export default Input;


/*import React, { useState } from 'react';

function Input({setNotefn }) {
  const [variable, setVar] = useState('');
  const [title, setTitle] = useState('');

  function addNote() {
    if(variable!==''||title!=='')
    {
      console.log('HI');
      setNotefn(prevNotes => [...prevNotes, { notecontent: variable, titleName:title }]);
      setVar('');
      setTitle('');
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
        type="text"
        id="addnotes"
        value={variable}//value in the input field is the item (todo)
        //will get unset when state var is unset
        onChange={(e) => setVar(e.target.value)}
        placeholder="Take a note"
      />
      <br></br>
      <br></br>
      <button onClick={addNote}>Add Note</button>
    </div>
  );
}

export default Input;
*/