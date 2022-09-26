import { useState } from 'react';

const useInput = <T> (initial: T) => {
  const [value, setValue] = useState<T>(initial);

  const onChange = ({ target }) => {
    setValue(target.value);
  };

  return { value, onChange };
};

export default useInput;
