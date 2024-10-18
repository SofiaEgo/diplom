import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTelegramPlane, FaInstagram, FaVk } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="w-full bg-white bg-opacity-90 shadow-lg px-8 py-6">
      <div className="container mx-auto flex justify-between items-center flex-wrap">
        <div className="flex space-x-6 items-center mb-4 lg:mb-0">
          <Link to="/about" className="text-gray-700 hover:text-gray-900 font-medium">
            О компании
          </Link>
          <Link to="/team" className="text-gray-700 hover:text-gray-900 font-medium">
            Наша команда
          </Link>
          <Link to="/contacts" className="text-gray-700 hover:text-gray-900 font-medium">
            Контакты
          </Link>
        </div>
        <span className="hidden lg:inline-block border-l border-gray-300 h-6"></span>
        <div className="flex space-x-6 items-center mb-4 lg:mb-0">
          <Link to="/courses" className="text-gray-700 hover:text-gray-900 font-medium">
            Онлайн курсы
          </Link>
          <Link to="/mentorship" className="text-gray-700 hover:text-gray-900 font-medium">
            Наставничество
          </Link>
          <Link to="/projects" className="text-gray-700 hover:text-gray-900 font-medium">
            Проекты
          </Link>
        </div>
        <span className="hidden lg:inline-block border-l border-gray-300 h-6"></span>
        <div className="flex space-x-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 transition duration-300"
          >
            <FaFacebookF size={20} />
          </a>
          <a
            href="https://telegram.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 transition duration-300"
          >
            <FaTelegramPlane size={20} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-600 hover:text-pink-800 transition duration-300"
          >
            <FaInstagram size={20} />
          </a>
          <a
            href="https://vk.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 hover:text-blue-900 transition duration-300"
          >
            <FaVk size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
