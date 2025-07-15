import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import NavLink from './NavLink';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="top-0 z-50 flex items-center py-6 px-4 font-Montserrat-VariableFont w-full bg-gradient-to-r from-buzzin-lime-300 to-buzzin-lime-200">
      <div className="flex items-center justify-between w-full">
        {/* Logo */}
        <div className="flex items-center ml-4">
          <a href="/" aria-label="Homepage">
            <img src={'/images/buzzinTitle.png'} alt="Logo" className="h-12 mr-8" />
          </a>
        </div>

        {/* Burger */}
        <div className="md:hidden flex items-center z-50">
          <button
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            className="fixed top-6 right-4 md:static md:top-auto md:right-auto"
          >
            {isMenuOpen
              ? <FaTimes className="text-buzzin-purple-500 text-2xl" />
              : <FaBars className="text-buzzin-purple-500 text-2xl" />}
          </button>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex md:items-center md:justify-start text-xl gap-x-8 font-bold mr-4">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/Whatson">What's On</NavLink>
          <NavLink href="/AllThingsCulture">All Things Culture</NavLink>
          <NavLink href="/OurStory">Our Story</NavLink>
        </nav>
      </div>

      {isMenuOpen && (
        <div
          className="fixed inset-0 z-30"
          onClick={closeMenu}/>
      )}

      <nav
        className={`fixed top-0 left-0 w-full flex flex-col space-y-4 p-4 md:hidden transition-transform duration-300 rounded-2xl 
          bg-gradient-to-r from-buzzin-lime-300 to-buzzin-lime-200 font-bold ${
            isMenuOpen ? 'translate-x-0' : '-translate-x-full'
          } z-40`}
      >
        <NavLink href="/" onClick={closeMenu} mobile>
          Home
        </NavLink>
        <NavLink href="/OurStory" onClick={closeMenu} mobile>
          Our Story
        </NavLink>
        <NavLink href="/AllThingsCulture" onClick={closeMenu} mobile>
          All Things Culture
        </NavLink>
        <NavLink href="/Whatson" onClick={closeMenu} mobile>
          What's On
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;