import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';

function Search({ labels, setNotefn }) {
  const [selectedLabel, setSelectedLabel] = useState(null);

  useEffect(() => {
    // Fetch all notes when the component mounts
    fetchNotes();
  }, []);

  const fetchNotes = (labelId) => {
    if (labelId) {
      const url = `https://21d6-103-191-90-42.ngrok-free.app/api/v1/labels/google-notes/${labelId}`;
      axios
        .get(url, {
          headers: {
            'ngrok-skip-browser-warning': '69420',
          },
        })
        .then((response) => {
          const notesData = response.data;
          setNotefn(notesData);
          console.log(notesData);
        })
        .catch((error) => {
          console.error('Error fetching notes:', error);
        });
    } else {
      const url = 'https://21d6-103-191-90-42.ngrok-free.app/api/v1/google-notes';
      axios
        .get(url, {
          headers: {
            'ngrok-skip-browser-warning': '69420',
          },
        })
        .then((response) => {
          const notesData = response.data;
          setNotefn(notesData);
          console.log(notesData);
        })
        .catch((error) => {
          console.error('Error fetching notes:', error);
        });
    }
  };

  const handleLabelSelect = (selectedOption) => {
    setSelectedLabel(selectedOption);
    if (selectedOption === null || selectedOption.value === null) {
      // "All Notes" option selected
      fetchNotes();
    } else {
      fetchNotes(selectedOption.value.id);
    }
  };

  const dropdownOptions = [
    { value: null, label: 'All Notes' },
    ...labels.map((label) => ({
      value: label,
      label: label.name,
    })),
  ];

  return (
    <div className="search">
      <Select
        value={selectedLabel}
        onChange={handleLabelSelect}
        options={dropdownOptions}
        placeholder="Select Label"
      />
    </div>
  );
}

export default Search;
