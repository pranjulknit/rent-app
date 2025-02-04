import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from './UserContext.jsx';

const Header = () => {
  const { user } = useContext(UserContext);

  return (
    <header className="flex justify-between items-center p-4 bg-gradient-to-r from-pink-700 to-blue-700 shadow-md">
      {/* Logo Section */}
      <Link to="/" className="flex items-center gap-2 text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-8 w-8 rotate-90"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
          />
        </svg>
        <span className="font-bold text-xl">Rentify</span>
      </Link>

      {/* Search Section */}
      <div className="flex items-center border border-white rounded-full py-2 px-4 gap-2 shadow-lg bg-white/60">
        <div>Anywhere</div>
        <div className="border-l border-gray-200"></div>
        <div>Any week</div>
        <div className="border-l border-gray-200"></div>
        <div>Add guests</div>
        <button className="bg-blue-600 text-white p-1 rounded-full hover:bg-blue-700 transition-all">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </button>
      </div>

      {/* User Profile / Login */}
      <Link
        to={user ? '/account' : '/login'}
        className="flex items-center gap-2 py-2 px-4 rounded-full border border-gray-300 shadow-sm bg-white text-black hover:bg-gray-100 transition-all"
      >
        {/* Menu Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>

        {/* Avatar/Initials */}
        <div className="bg-gray-500 text-white rounded-full p-2 overflow-hidden flex items-center justify-center">
          {user ? (
            <span>{user.name[0]}</span>
          ) : (
            <span>?</span>
          )}
        </div>

        {/* User Name */}
        {user && (
          <div className="text-sm font-medium">
            {user.name}
          </div>
        )}
      </Link>
    </header>
  );
};

export default Header;
