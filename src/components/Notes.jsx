import React from 'react';
import SingleNote from './SingleNote';

//receiving set of states that's set by Input component
function Notes({notes, onDelete}) {

  return (
    <div id="itemlist">
      <ul>
        {notes.map((singleNote, index) => (
            <SingleNote note={singleNote} keyval={index} onDelete={onDelete}/>
        ))}
      </ul>
    </div>
  );
}

export default Notes;