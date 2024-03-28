import {useState, useEffect} from 'react'

export const usePersistedState = (key, defaultValue) => {
  // Retrieve the value from the cookie storage or use the default value
  const storedValue = JSON.parse(localStorage.getItem(key)) || defaultValue;
  const [value, setValue] = useState(storedValue);

  useEffect(() => {
    // Save the value to the cookie storage whenever it changes
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export const isFormCompleted = () => {
  const formStatus = localStorage.getItem('formCompleted');
  return formStatus === 'true';
};

export const setFormCompleted = () => {
  localStorage.setItem('formCompleted', 'true');
};