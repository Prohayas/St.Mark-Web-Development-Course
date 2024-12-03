import TodoContextProvider from "./module/Todo/context/TodoContextProvider";
import Todo from "./module/Todo/Todo";

function App() {
  return (
    <>
      <section className="h-screen flex justify-center  items-center w-screen mx-auto">
        <TodoContextProvider>

        <Todo />

        </TodoContextProvider>
      </section>
    </>
  );
}

export default App;
