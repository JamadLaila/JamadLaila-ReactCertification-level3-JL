import { useState, useEffect } from "react";

const storageObservers = new Map();

const triggerObservers = (key) => {
    if (storageObservers.has(key)) {
      storageObservers.get(key).forEach((callbackFn) => callbackFn());
    }
  };

window.addEventListener('storage', (event) => {
  if (event.key && storageObservers.has(event.key)) {
    triggerObservers(event.key);
  }
});

const useLocalStorage = (key, primaryValue) => {
  const [currentStoredValue, setCurrentStoredValue] = useState(() => {
    try {
      const storedItem = window.localStorage.getItem(key);
      return storedItem ? JSON.parse(storedItem) : primaryValue;
    } catch (error) {
      console.error('an Error occured: ', key, error);
      return primaryValue;
    }
  });

  useEffect(() => {
    const updateValue = () => {
      try {
        const updatedStoredItem = window.localStorage.getItem(key);
        setCurrentStoredValue(updatedStoredItem ? JSON.parse(updatedStoredItem) : primaryValue);
      } catch (error) {
        console.error('an error occured: ', error);
      }
    };


    storageObservers.set(key, [...(storageObservers.get(key) || []), updateValue]);


    return () => {
      const remainingObservers = storageObservers.get(key) || [];
      storageObservers.set(key, remainingObservers.filter((observer) => observer !== updateValue));
    };
  }, [key, primaryValue]);


  const updateStorage = (newValue) => {
    try {
      const valueToStore = typeof newValue === 'function' ? newValue(currentStoredValue) : newValue;
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
      setCurrentStoredValue(valueToStore);
      triggerObservers(key);
    } catch (error) {
      console.error('Error updating storage key: ', key, error);
    }
  };

  return [currentStoredValue, updateStorage];
};



export default useLocalStorage;
