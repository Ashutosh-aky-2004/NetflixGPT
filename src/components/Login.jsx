import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { userSignIn } from "../utils/userSlice";
import { BG_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
    setErrorMessage(null);
  };

  const handleButtonClick = () => {
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
    if (message) return;

    if (!isSignInForm) {
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then(async () => {
          await updateProfile(auth.currentUser, {
            displayName: name.current.value,
            photoURL: "https://avatars.githubusercontent.com/u/151706966" ,
          });
          await auth.currentUser.reload();
          const user = auth.currentUser;

          dispatch(userSignIn({
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
          }));

          navigate("/browse");
        })
        .catch((error) => {
          setErrorMessage(error.code + " - " + error.message);
        });
    } else {
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then(async () => {
          await auth.currentUser.reload();
          const user = auth.currentUser;

          dispatch(userSignIn({
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
          }));

          navigate("/browse");
        })
        .catch((error) => {
          setErrorMessage(error.code + " - " + error.message);
        });
    }
  };

  return (
    <div className="relative h-screen w-screen">
      <Header />
      <div className="absolute inset-0 z-0">
        <img src={BG_URL} alt="background" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black opacity-60" />
      </div>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-black bg-opacity-80 p-10 rounded-lg text-white"
      >
        <h1 className="text-3xl font-bold mb-6">{isSignInForm ? "Sign In" : "Sign Up"}</h1>

        {!isSignInForm && (
          <input
            type="text"
            ref={name}
            placeholder="Full Name"
            className="w-full p-3 mb-4 rounded-md bg-gray-800 focus:outline-none"
          />
        )}

        <input
          type="email"
          ref={email}
          placeholder="Email"
          className="w-full p-3 mb-4 rounded-md bg-gray-800 focus:outline-none"
        />

        <input
          type="password"
          ref={password}
          placeholder="Password"
          className="w-full p-3 mb-4 rounded-md bg-gray-800 focus:outline-none"
        />

        {errorMessage && (
          <p className="text-red-500 font-bold text-sm mb-4">{errorMessage}</p>
        )}

        <button
          onClick={handleButtonClick}
          className="w-full bg-red-600 hover:bg-red-700 p-3 rounded-md font-semibold"
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>

        <p
          className="mt-4 text-sm text-gray-300 hover:underline cursor-pointer"
          onClick={toggleSignInForm}
        >
          {isSignInForm
            ? "New to Netflix? Sign up now"
            : "Already a user? Sign in here"}
        </p>
      </form>
    </div>
  );
};

export default Login;
