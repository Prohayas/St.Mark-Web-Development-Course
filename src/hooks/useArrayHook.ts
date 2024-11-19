import { useState } from 'react'

const useArrayHook = (array:  number[]) => {
  const [state, setState] = useState(array);

  function set(arr: number[]) {

   setState(arr)
  }

  function remove() {
    setState(state.slice(0, -1))
  }
  function filter(callback: (val: number) => boolean ) {
    setState((curr) => curr.filter(callback));
  }

  function clear() {
    setState([])
  }

  function replace(key: number, value: number) {
    setState([
        ...state.slice(0, key),
        value,
        ...state.slice(key + 1)
    ]);
  }

  function pushOnFirst() {
    const val = Math.floor(Math.random() * 10);

    setState([val, ...state])
  }

  function pushOnLast() {
    const val = Math.floor(Math.random() * 10);

    setState([...state, val])
  }
   
  return { state, remove, replace, clear, set , filter, pushOnFirst, pushOnLast}
}

export default useArrayHook