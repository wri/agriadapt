import { useState } from 'react';

const useInput = (initial) => {
  const [value, setValue] = useState(initial);

  const onChange = ({ target }) => {
    setValue(target.value);
  };

  return { value, onChange };
};

export default useInput;
