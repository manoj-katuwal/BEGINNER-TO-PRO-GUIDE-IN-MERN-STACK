import hero from "../../assets/images.png";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-yellow-200 shadow-md">
      <div className="flex items-center">
        <img src={hero} alt="Logo" className="h-10 w-auto object-contain" />
      </div>

        <ul className="flex space-x-8 text-gray-700 font-medium">
          <li className="text-purple-40">Home</li>
          <li className="text-purple-40">About</li>
          <li className="text-purple-40">Gallery</li>
          <li className="text-purple-40">Services</li>
        </ul>

      <div className="flex items-center">
        <button className="bg-blue-600 text-white font-semibold px-5 py-2 rounded-lg transition duration-250">
          Register
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
