import logo from "../assets/Netflix-Logo-Streaming-Platform-765.png";

const Header = () => {
  return (
    <div className="absolute top-0 left-0 w-full px-8 py-2 z-20 bg-gradient-to-b from-black">
      <img className="w-40" src={logo} alt="Netflix Logo" />
    </div>
  );
};

export default Header;
