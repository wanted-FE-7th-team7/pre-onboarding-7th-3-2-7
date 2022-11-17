import React, { useState } from "react";

const useInput = <T>(type: T) => {
  const [value, setValue] = useState(type);

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value as T);
  };

  return [value, inputHandler] as const;
};

export default useInput;
