import React, {useEffect} from 'react';
import axios from 'axios';
import SingleNote from './SingleNote';

//receiving set of states that's set by Input component
function Notes({notes, onDelete, setNotefn, setLoadingfn, pageupdatedstate, setPageUpdatedfn}) {
  console.log(notes);
  useEffect(() => {
    setLoadingfn(true);
    axios.get('https://21d6-103-191-90-42.ngrok-free.app/api/v1/googleNotes',{
      headers: {
        'ngrok-skip-browser-warning': '69420'
      }
    })
      .then((response) => {
        setNotefn(response.data);
      })
      .catch((error) => {
        console.error('Error fetching notes:', error);
      })
      .finally(() => {
        setLoadingfn(false);
        //setPageUpdatedfn((current) => !current);
        });
  }, [pageupdatedstate]);

  return (
    <div id="itemlist">
      <ul>
        {notes.map((singleNote, index) => (
            <SingleNote note={singleNote} keyval={index} onDelete={onDelete} setLoadingfn={setLoadingfn} setPageUpdatedfn={setPageUpdatedfn}/>
        ))}
      </ul>
    </div>
  );
}

export default Notes;