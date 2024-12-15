import React, { useState } from 'react';
import axios from 'axios';
import ColorPicker from './ColorPicker';
import EditLabel from './EditLabel';
import PinIcon from '../icons/pin-26.svg';
import UnpinIcon from '../icons/unpin-svgrepo-com.svg'

function SingleNote({ note, keyval, labels, onDelete, setLoadingfn, setPageUpdatedfn }) {
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
    if (editedContent !== '' || editedTitle !== '') {
      const updatedNote = {
        ...note,
        notecontent: editedContent,
        titleName: editedTitle,
      };
      setLoadingfn(true);
      axios
        .put(`https://21d6-103-191-90-42.ngrok-free.app/api/v1/google-notes/${note.id}`, updatedNote, {
          headers: {
            'ngrok-skip-browser-warning': '69420',
          },
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
    } else {
      handleDelete(); // Deletes the note itself if the note is empty
    }
  };

  const handleDelete = () => {
    setLoadingfn(true);
    axios
      .delete(`https://21d6-103-191-90-42.ngrok-free.app/api/v1/google-notes/${note.id}`, {
        headers: {
          'ngrok-skip-browser-warning': '69420',
        },
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

  const handlePin = (isPin) => {
    const updatedNote = {
      ...note,
      pinned: isPin,
    };
    setLoadingfn(true);
    axios
      .put(`https://21d6-103-191-90-42.ngrok-free.app/api/v1/google-notes/${note.id}`, updatedNote, {
        headers: {
          'ngrok-skip-browser-warning': '69420',
        },
      })
      .then(() => {
        setPageUpdatedfn((current) => !current);
      })
      .catch((error) => {
        console.error('Error updating pin on note:', error);
      })
      .finally(() => {
        setLoadingfn(false);
      });
  };  
  

  return (
    <div className="flex-container">
      
      <div id="singlenoteitem" style={{ backgroundColor: note.color }}>
      {!note.pinned ? (
  <img className="pinicon" src={PinIcon} alt="Pin" onClick={()=>handlePin(true)} />
) : (
  <img className="pinicon" src={UnpinIcon} alt="Unpin" onClick={()=>handlePin(false)} />
)}
        <h2 style={{ textAlign: 'left' }}>{note.titleName}</h2>
        
        <li key={keyval}>{note.notecontent}</li>
        <br></br> <br></br>
        

        <ColorPicker setColor={setColor} note={note} setLoadingfn={setLoadingfn} setPageUpdatedfn={setPageUpdatedfn}/>
        <EditLabel labelList={labels} note={note} />
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
              placeholder="Title"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
            <br></br>
            <br></br>
            <textarea
              className="edit-textarea"
              value={editedContent}
              placeholder="Take a Note"
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
}

export default SingleNote;
