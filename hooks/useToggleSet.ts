import { useState } from 'react';

function useToggleSet<T>(initSet?: T[]) {
  const [activeSet, setActiveSet] = useState(initSet || ([] as T[]));

  const toggleElement = (element: T) => {
    if (activeSet.includes(element)) {
      setActiveSet(activeSet.filter((el) => el !== element));
    } else {
      setActiveSet(activeSet.concat(element));
    }
  };

  return [activeSet, toggleElement] as const;
}

export default useToggleSet;
