import { useNavigate } from "react-router-dom";
import logo from "../assets/Netflix-Logo-Streaming-Platform-765.png";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { userSignIn, userSignOut } from "../utils/userSlice";

const Header = () => {
  const navigate = useNavigate();
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
        navigate("/browse");
      } else {
        dispatch(userSignOut());
        navigate("/");
      }
    });
      //unsubscribe when the component unmount
    return () => unsubscribe();
  }, []);
  
  return (
    <div className="absolute top-0 left-0 w-full px-8 py-2 z-20 bg-gradient-to-b from-black">
      <img className="w-40" src={logo} alt="Netflix Logo" />
    </div>
  );
};

export default Header;
