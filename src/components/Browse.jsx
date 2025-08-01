import Header from "./Header";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, userSignOut } from "../utils/userSlice";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";

const Browse = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(userSignOut());
        navigate("/");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
        alert("Sign-out failed. See console.");
      });
  };

  return (
    <div className="relative h-screen bg-black text-white">
      <Header />
      <div className="absolute top-6 right-8 flex items-center gap-4 bg-transparent px-4 py-2 rounded-lg shadow-md z-100">
        <img
          src={user?.photoURL}
          alt="User"
          className="w-10 h-10 rounded-full border-2 border-red-600 object-cover"
        />
        <p className="text-sm font-medium">Hi, {user?.displayName}</p>
        <button
          onClick={handleSignOut}
          className="bg-red-600 cursor-pointer hover:bg-red-700 text-white text-sm px-3 py-1 rounded-md"
        >
          Sign Out
        </button>
      </div>

      {/* You can add browse content here */}
      <div className="pt-32 text-center">
        <h1 className="text-4xl font-bold">Welcome to Netflix Clone</h1>
      </div>
    </div>
  );
};

export default Browse;
