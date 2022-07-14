import { useState } from 'react';

const useSelect = (initial) => {
  const [value, setValue] = useState(initial);

  const onChange = (value) => {
    setValue(value);
  };

  return { value, onChange };
};

export default useSelect;
