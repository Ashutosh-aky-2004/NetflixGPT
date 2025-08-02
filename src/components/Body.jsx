import Login from "./Login";
import Browse from "./Browse";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import appStore from "../utils/appStore";
import { Provider } from "react-redux";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/browse",
    element: <Browse />,
  },
]);

const Body = () => {
  return (
    <Provider store={appStore}>
      <RouterProvider router={appRouter} />;
    </Provider>
  );
};

export default Body;
