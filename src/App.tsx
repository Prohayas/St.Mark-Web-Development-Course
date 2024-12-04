import TodoContextProvider from "./module/Todo/context/TodoContextProvider";
import Todo from "./module/Todo/Todo";

function App() {
  return (
    <>
      <section className="container py-10 flex justify-center  items-center mx-auto">
        <TodoContextProvider>
          <Todo />
        </TodoContextProvider>
      </section>
    </>
  );
}

export default App;
