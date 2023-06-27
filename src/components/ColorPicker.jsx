import React from "react";

function ColorPicker({setColor}){

  const handleColorChange = (selectedColor) => {
    setColor(selectedColor);
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