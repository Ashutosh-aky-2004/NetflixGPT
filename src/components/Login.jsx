import { useRef, useState } from "react";
import { BG_URL } from "../utils/constants";
import Header from "./Header";
import { checkValidatData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../utils/firebase";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState();
  const email = useRef(null);
  const name = useRef(null);
  const password = useRef(null);

  const toogleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const handleButtonClick = () => {
    // form validation
    const message = checkValidatData(
      email.current.value,
      password.current.value
    );
    setErrorMessage(message);

    // Sign In/sign up
    if (errorMessage) return;

    if (!isSignInForm) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " - " + errorMessage);
        });
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log("Sign In Complete", user);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " - " + errorMessage);

        });
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <Header />

      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={BG_URL}
          alt="background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-50" />
      </div>

      {/* Overlay Form */}
      <div className="absolute inset-0 flex justify-center items-center z-10">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="bg-black bg-opacity-50 p-10 md:p-12 w-80 md:w-96 rounded-lg text-white"
        >
          <h1 className="font-bold text-3xl mb-6">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h1>

          {!isSignInForm && (
            <input
              type="text"
              ref={name}
              placeholder="Full Name"
              className="p-3 mb-4 w-full bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          )}

          <input
            type="text"
            ref={email}
            placeholder="Email or mobile number"
            className="p-3 mb-4 w-full bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />

          <input
            type="password"
            ref={password}
            placeholder="Password"
            className="p-3 mb-4 w-full bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <p className="text-red-500 font-bold text-lg pb-2">{errorMessage}</p>

          <button
            type="submit"
            className="p-3 mb-4 w-full bg-red-600 hover:bg-red-700 rounded-md font-semibold"
            onClick={handleButtonClick}
          >
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>

          <p
            className="text-sm text-gray-400 cursor-pointer"
            onClick={toogleSignInForm}
          >
            {isSignInForm
              ? " New to Netflix? Sign up Now"
              : "Already registered? sign Up Now..."}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
