import { useState } from 'react';

const useRadio = (initial) => {
  const [value, setValue] = useState(initial);

  const onChange = ({ target }) => {
    setValue(target.value);
  };

  return { value, onChange };
};

export default useRadio;
