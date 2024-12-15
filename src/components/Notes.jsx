import React, { useEffect } from 'react';
import axios from 'axios';
import SingleNote from './SingleNote';

function Notes({ notes, labels, onDelete, setNotefn, setLabelfn, setLoadingfn, pageUpdated, setPageUpdatedfn }) {
  useEffect(() => {
    setLoadingfn(true);

    axios
      .get('https://21d6-103-191-90-42.ngrok-free.app/api/v1/google-notes', {
        headers: {
          'ngrok-skip-browser-warning': '69420',
        },
      })
      .then((response) => {
        setNotefn(response.data);
      })
      .catch((error) => {
        console.error('Error fetching notes:', error);
      })
      .finally(() => {
        setLoadingfn(false);
      });

    axios
      .get('https://21d6-103-191-90-42.ngrok-free.app/api/v1/labels', {
        headers: {
          'ngrok-skip-browser-warning': '69420',
        },
      })
      .then((response) => {
        setLabelfn(response.data);
      })
      .catch((error) => {
        console.error('Error fetching labels:', error);
      })
      .finally(() => {
        setLoadingfn(false);
      });
  }, [pageUpdated]);

  const pinnedNotes = notes.filter((note) => note.pinned);
  const unpinnedNotes = notes.filter((note) => !note.pinned);

  return (
    <div id="itemlist">
      {pinnedNotes.length === 0 && unpinnedNotes.length === 0 ? (
        <div className="no-notes">No notes to display</div>
      ) : (
        <>
      {pinnedNotes.length > 0 && (
        <div className="grid-section">
          <span style={{ color: 'grey', left: '0' }}>Pinned Notes</span>
          <ul>
            {pinnedNotes.map((singleNote) => (
              <SingleNote
                key={singleNote.id}
                note={singleNote}
                labels={labels}
                onDelete={onDelete}
                setLoadingfn={setLoadingfn}
                setPageUpdatedfn={setPageUpdatedfn}
              />
            ))}
          </ul>
        </div>
      )}

      {unpinnedNotes.length > 0 && (
        <div className="grid-section">
          <span style={{ color: 'grey', left: '0' }}>Unpinned Notes</span>
          <ul>
            {unpinnedNotes.map((singleNote) => (
              <SingleNote
                key={singleNote.id}
                note={singleNote}
                labels={labels}
                onDelete={onDelete}
                setLoadingfn={setLoadingfn}
                setPageUpdatedfn={setPageUpdatedfn}
              />
            ))}
          </ul>
        </div>
      
      )}
      </>)}
    </div>
  );
}

export default Notes;
