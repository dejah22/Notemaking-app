import React,{useState} from 'react';
import ColorPicker from './ColorPicker';
import axios from 'axios';

function SingleNote({note,keyval, onDelete, setLoadingfn, setPageUpdatedfn}) {
    const [color, setColor] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(note.notecontent);
    const [editedTitle, setEditedTitle] = useState(note.titleName);

    const handleEdit = () => {
      setEditedContent(note.notecontent);
      setEditedTitle(note.titleName);
      setIsEditing(true);
    };
  
    const handleSave = () => {
      if(editedContent!==''|| editedTitle!=='')
      {
        const updatedNote = {
        ...note,
        notecontent: editedContent,
        titleName: editedTitle
      };
        setLoadingfn(true);
        axios.put(`https://21d6-103-191-90-42.ngrok-free.app/api/v1/googleNotes/${note.id}`, updatedNote,{
          headers: {
            'ngrok-skip-browser-warning': '69420'
          }
        })
        .then(() => { 
        setIsEditing(false);
      })
      .catch((error) => {
        console.error('Error updating note:', error);
      })
      .finally(() => {
        setLoadingfn(false);
        setPageUpdatedfn((current) => !current);
      });
    }
      else
      {
        handleDelete(); //deletes the note itself if the note is empty!! :)
      }
    };

    const handleDelete = () => {
      setLoadingfn(true);
      axios.delete(`https://21d6-103-191-90-42.ngrok-free.app/api/v1/googleNotes/${note.id}`,{
        headers: {
          'ngrok-skip-browser-warning': '69420'
        }
      })
      .then(() => {  
      onDelete(keyval); // Invoke the onDelete callback with the note's id
    })
    .catch((error) => {
      console.error('Error deleting note:', error);
    })
    .finally(() => {
      setLoadingfn(false);
      setPageUpdatedfn((current) => !current);
    });
    };

  return (
    <div className="flex-container">
    <div id='singlenoteitem' style={{ backgroundColor: note.color }}>
      <h2 style={{textAlign:'left'}}>{note.titleName}</h2>  
      <li key={keyval}>{note.notecontent}</li>
      <br></br> <br></br>
      <ColorPicker setColor={setColor} note={note} setLoadingfn={setLoadingfn} setPageUpdatedfn={setPageUpdatedfn}/>
      <div className="button-container">
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
      </div>
    </div>

    {isEditing && (
        <div className="modal">
          <div className="modal-content">
          <input
              className="edit-title"
              type="text"
              placeholder='Title'
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
            <br></br>
            <br></br>
            <textarea
              className="edit-textarea"
              value={editedContent}
              placeholder='Take a Note'
              onChange={(e) => setEditedContent(e.target.value)}
            />
            <div className="modal-buttons">
              <button onClick={handleSave}> Save </button>
              <button onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default SingleNote;
