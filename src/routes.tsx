import { createBrowserRouter } from "react-router-dom";
import Navbar from "./layout/Navbar";
import TodoContextProvider from "./module/Todo/context/TodoContextProvider";
import Todo from "./module/Todo/Todo";
import Post from "./module/Post/Post";
import Home from "./layout/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "todos",
        element: (
          <TodoContextProvider>
            <Todo />
          </TodoContextProvider>
        ),
      },
      {
        path: "posts",
        element: <Post />,
      },
    ],
  },
]);
