const saveItem = (key: string, value: string) => {
  try {
    localStorage.setItem(key, value);
  } catch (error) {}
};

const removeItem = (key: string) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {}
};

const getItem = (key: string) => {
  try {
    localStorage.getItem(key);
  } catch (error) {}
};

const clear = () => {
  try {
    localStorage.clear();
  } catch (error) {}
};

export const storage = {
  getItem,
  saveItem,
  removeItem,
  clear,
};
