import React, { useState } from 'react';
import Select from 'react-select';
import axios from 'axios';

//labelList is list of all labels
//note is the current note rendering this LabelPicker
const EditLabel = ({ labelList, note }) => {
  const [selectedLabels, setSelectedLabels] = useState(note.labels.map((label)=>({
    value: label.id,
    label: label.name
  }))); //array of selected labels

  const handleLabelChange = (selectedOptions) => {
    setSelectedLabels(selectedOptions);
  };

  //all options
  const options = labelList.map((label) => ({
    value: label.id,
    label: label.name
  }));

  function handleLabelSave(){
  //setting object list to send
  console.log(selectedLabels);
  //const FinalLabelList = labelList.filter((l) => {console.log(l); return l.id != selectedLabels.value});
  var FinalLabelList = labelList.filter((label) => {
    return selectedLabels.some((selectedLabel) => selectedLabel.value === label.id);
  });
  
  var FinalLabelListobj = {"labels" : FinalLabelList};
  console.log(FinalLabelList);
  axios.put(`https://21d6-103-191-90-42.ngrok-free.app/api/v1/google-notes/labels/${note.id}`, FinalLabelListobj, {
        headers: {
          'ngrok-skip-browser-warning': '69420'
        }
      }) 
          .then((response) => {
          console.log('Labels saved successfully');
    })
    .catch((error) => {
      console.error('Error adding label:', error);
    })
    .finally(() => {
      //setPageUpdatedfn((current) => !current);
    });
}
  return (
    <div>
      <Select
        isMulti
        options={options}
        value={selectedLabels}
        onChange={handleLabelChange}
      />
      <div id="selected-labels">
        {note.labels.map((label) => (
          <div key={label.id} className="label-tag"> 
            <span
              className="close-btn"
              onClick={() => {
                setSelectedLabels((prevLabels) =>
                  prevLabels.filter((l) => l.value !== label.value));
              }}>
            </span>
            
          </div>
        ))}
      </div>
      <button onClick={handleLabelSave}>Save Label</button>
    </div>
  );
};

export default EditLabel;