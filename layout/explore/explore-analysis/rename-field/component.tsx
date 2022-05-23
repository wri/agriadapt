import useInput from 'hooks/form/useInput';
import { useCallback, useEffect, useRef } from 'react';

const RenameField = ({ handleRename, defaultVal }) => {
  const renameRef = useRef(null);
  const nameInput = useInput(defaultVal);

  const handleClickAway = useCallback(
    (e) => {
      if (renameRef.current && renameRef.current !== e.target) {
        handleRename(nameInput.value, e);
      }
    },
    [renameRef, handleRename, nameInput]
  );

  useEffect(() => {
    if (renameRef.current) renameRef.current.select();
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickAway, true);
    return () =>
      document.removeEventListener('mousedown', handleClickAway, true);
  }, [handleClickAway]);

  const handleSubmit = (e) => {
    handleRename(nameInput.value, e);
    e.preventDefault();
  };

  return (
    <form className="c-rename" onSubmit={handleSubmit}>
      <input {...nameInput} ref={renameRef} />
    </form>
  );
};

export default RenameField;
