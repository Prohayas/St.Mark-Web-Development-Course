const useLocalStorage = () => {
  function getLocalStorage(key: string) {
    const item = JSON.parse(localStorage.getItem(key) || "null");

    return item;
  }

  function setLocalStorage<T>(key: string, data: T): boolean {
    try {
      localStorage.setItem(key, JSON.stringify(data) || "null");
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  return { getLocalStorage, setLocalStorage };
};

export default useLocalStorage;
