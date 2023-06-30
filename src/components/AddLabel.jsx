import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';

function AddLabel({ labels, selectedLabels, onSelect, setPageUpdatedfn }) {
  const [customLabel, setCustomLabel] = useState('');

  const handleLabelSelect = (selectedOptions) => {
    const selectedLabels = selectedOptions.map((option) => option.value);
    onSelect(selectedLabels);
  };

  const handleCreateCustomLabel = () => {
    if (customLabel.trim() !== '') {
      axios
        .post('https://21d6-103-191-90-42.ngrok-free.app/api/v1/labels', { name: customLabel })
        .then((response) => {
          const newLabel = response.data;
          // Add the newly created label to the labels list
          onSelect([...selectedLabels, newLabel]);
          setCustomLabel('');
        })
        .catch((error) => {
          console.error('Error creating label:', error);
        })
        .finally(() => {
          setPageUpdatedfn((current) => !current);
        });
    }
  };

  const availableLabels = labels.filter((label) => !selectedLabels.some((selectedLabel) => selectedLabel.id === label.id));

  const options = availableLabels.map((label) => ({
    value: label,
    label: label.name,
  }));

  const selectedOptions = selectedLabels.map((label) => ({
    value: label,
    label: label.name,
  }));

  return (
  <div className="label-picker">
      <div><center><Select
        id='add-label'
        isMulti
        options={options}
        value={selectedOptions}
        onChange={handleLabelSelect}
        placeholder="Select Labels"
      /></center></div>
      <div className='create-label'>
        <input
          id='createlabel'
          type="text"
          placeholder="Custom Label"
          value={customLabel}
          onChange={(e) => setCustomLabel(e.target.value)}
        />
        <button id='createlabelbutton'onClick={handleCreateCustomLabel}>Create</button>
      </div>
    </div>
  );
}

export default AddLabel;