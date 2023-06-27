import React,{useState} from 'react';
import ColorPicker from './ColorPicker';

function SingleNote({note,keyval, onDelete}) {
    const [color, setColor] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(note.notecontent);
    const [editedTitle, setEditedTitle] = useState(note.titleName);

    const handleEdit = () => {
      setIsEditing(true);
    };
  
    const handleSave = () => {
      if(editedContent!==''|| editedTitle!=='')
      {
        note.notecontent = editedContent;
        note.titleName = editedTitle;
        setIsEditing(false);
      }
      else
      {
        handleDelete(); //deletes the note itself if the note is empty!! :)
      }
    };

    const handleDelete = () => {
        onDelete(keyval); // Invoke the onDelete callback with the note's id
      };

  return (
    <div className="flex-container">
    <div id='singlenoteitem' style={{ backgroundColor: color }}>
      <h2 style={{textAlign:'left'}}>{note.titleName}</h2>  
      <li key={keyval}>{note.notecontent}</li>
      <br></br> <br></br>
      <ColorPicker setColor={setColor}/>
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
