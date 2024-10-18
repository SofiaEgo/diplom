import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import AudioPlayer from './AudioPlayer';
import { FiMenu, FiX } from 'react-icons/fi';

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth); 

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    closeMenu();
  };

  return (
    <nav className="relative">
      <div className="hidden md:flex justify-center items-center mt-4">
        <div className="bg-white bg-opacity-90 rounded-full shadow-lg px-8 py-2 flex space-x-6 items-center">
          <Link to="/" className="text-gray-700 hover:text-gray-900 font-medium">
            Главная
          </Link>
          <Link to="/students" className="text-gray-700 hover:text-gray-900 font-medium">
            Студенты
          </Link>
          <Link to="/tasks" className="text-gray-700 hover:text-gray-900 font-medium">
            Задачи
          </Link>
          <Link to="/solutions" className="text-gray-700 hover:text-gray-900 font-medium">
            Решения
          </Link>
          <span className="border-l border-gray-300 h-6"></span>
          {user ? (
            <>
              <Link to="/profile" className="text-blue-600 hover:text-blue-800 font-medium">
                Мой профиль
              </Link>
              <button onClick={handleLogout} className="text-red-600 hover:text-red-800 font-medium">
                Выйти
              </button>
            </>
          ) : (
            <div className="flex space-x-4">
              <Link to="/login" className="text-blue-600 hover:text-blue-800 font-medium">
                Вход
              </Link>
              <Link to="/register" className="text-blue-600 hover:text-blue-800 font-medium">
                Регистрация
              </Link>
            </div>
          )}
          <span className="border-l border-gray-300 h-6"></span>
          <div className="ml-4">
            <AudioPlayer />
          </div>
        </div>
      </div>

      <div className="md:hidden flex justify-between items-center p-4 bg-white bg-opacity-90 shadow-lg">
        <button onClick={toggleMenu} className="focus:outline-none">
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
        <div className="text-gray-700 font-medium text-lg">
          <Link to="/">Главная</Link>
        </div>
        {isOpen && (
          <div className="absolute top-16 left-0 w-full bg-white shadow-lg z-10">
            <div className="flex flex-col items-center space-y-4 py-4">
              <Link to="/" className="text-gray-700 hover:text-gray-900 font-medium" onClick={closeMenu}>
                Главная
              </Link>
              <Link to="/students" className="text-gray-700 hover:text-gray-900 font-medium" onClick={closeMenu}>
                Студенты
              </Link>
              <Link to="/tasks" className="text-gray-700 hover:text-gray-900 font-medium" onClick={closeMenu}>
                Задачи
              </Link>
              <Link to="/solutions" className="text-gray-700 hover:text-gray-900 font-medium" onClick={closeMenu}>
                Решения
              </Link>
              <span className="border-t border-gray-300 w-full"></span>
              {user ? (
                <>
                  <Link to="/profile" className="text-blue-600 hover:text-blue-800 font-medium" onClick={closeMenu}>
                    Мой профиль
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      closeMenu();
                    }}
                    className="text-red-600 hover:text-red-800 font-medium"
                  >
                    Выйти
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-blue-600 hover:text-blue-800 font-medium" onClick={closeMenu}>
                    Вход
                  </Link>
                  <Link to="/register" className="text-blue-600 hover:text-blue-800 font-medium" onClick={closeMenu}>
                    Регистрация
                  </Link>
                </>
              )}
              <div className="mt-4">
                <AudioPlayer />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Header;
