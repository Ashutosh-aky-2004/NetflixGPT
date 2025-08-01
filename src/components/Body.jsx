import { useEffect } from "react";
import Login from "./Login";
import Browse from "./Browse";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import appStore from "../utils/appStore";
import { Provider, useDispatch } from "react-redux";
import { userSignIn, userSignOut } from "../utils/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";

// Create the router outside to avoid recreation on every render
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

// Create a component with access to dispatch
const AuthWrapper = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          userSignIn({
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
          })
        );
      } else {
        dispatch(userSignOut());
      }
    });

    return () => unsubscribe(); // cleanup on unmount
  }, [dispatch]);

  return <RouterProvider router={appRouter} />;
};

const Body = () => {
  return (
    <Provider store={appStore}>
      <AuthWrapper />
    </Provider>
  );
};

export default Body;
