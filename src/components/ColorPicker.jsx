import React from "react";
import axios from 'axios';

function ColorPicker({setColor, note, setLoadingfn, setPageUpdatedfn}){

  const handleColorChange = (selectedColor) => {
    setColor(selectedColor);

    const updatedNote = {
      ...note,
      color: selectedColor,
    };

    setLoadingfn(true);
    axios
      .put(`https://21d6-103-191-90-42.ngrok-free.app/api/v1/googleNotes/${note.id}`, updatedNote,{
        headers: {
          'ngrok-skip-browser-warning': '69420'
        }
      })
      .then(() => {
        console.log('Color updated successfully');
      })
      .catch((error) => {
        console.error('Error updating note color:', error);
      })
      .finally(() => {
        setLoadingfn(false);
        setPageUpdatedfn((current) => !current);
      });
  }

return( 
        <div className="color-picker">
          <div
            className="dot1"
            onClick={() => handleColorChange('#FCD9C8')}> </div>
          <div
            className="dot2"
            onClick={() => handleColorChange('#C8F2FC')}> </div>
          <div
            className="dot3"
            onClick={() => handleColorChange('#E0FCC8')} ></div>
          <div
            className="dot4"
            onClick={() => handleColorChange('#FAFCC8')}> </div>
          <div
            className="dot5"
            onClick={() => handleColorChange('#E4C8FC')} ></div>
        </div>);
}

export default ColorPicker;