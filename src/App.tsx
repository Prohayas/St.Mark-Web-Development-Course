
import useArrayHook from "./hooks/useArrayHook";

function App () {
 
  const {remove, state, set, filter, replace, clear, pushOnFirst, pushOnLast} = useArrayHook([1,3, 9, 4,5,6]);

  
  return (
<>
    <div className="flex flex-col h-screen justify-center items-center">
      <h2 className="text-1xl mb-20 font-semibold">Applying Custom Hook</h2>

      <p className="font-sm text-2xl text-gray-800 mb-10">Array: [ {state.join(', ')} ]</p>


    <button onClick={() => set([2, 4, 5, 6, 7])} className="py-2 rounded-md mt-2 px-3 bg-gray-500 text-white font-semibold"  type="button">Set to {`[2, 4, 5, 6, 7]`}</button>
    <button onClick={remove} className="py-2 rounded-md mt-2 px-3 bg-gray-500 text-white font-semibold"  type="button">Remove Last Index</button>
    
    <button onClick={() => filter(val => val > 2)} className="py-2 rounded-md mt-2 px-3 bg-gray-500 text-white font-semibold"  type="button">Filter Array {`>`} 2</button>
    
    <button onClick={clear} className="py-2 rounded-md mt-2 px-3 bg-gray-500 text-white font-semibold"  type="button">Clear</button>
    <button onClick={() => replace(2, 4)} className="py-2 rounded-md mt-2 px-3 bg-gray-500 text-white font-semibold"  type="button">Replace Index: 2 with 4</button>
    <button onClick={pushOnFirst} className="py-2 rounded-md mt-2 px-3 bg-gray-500 text-white font-semibold"  type="button">Push Random Value on First Index</button>
    <button onClick={pushOnLast} className="py-2 rounded-md mt-2 px-3 bg-gray-500 text-white font-semibold"  type="button">Push Random Value on Last Index</button>
    
  </div> 
      
  </> 
  )   
}

export default App;