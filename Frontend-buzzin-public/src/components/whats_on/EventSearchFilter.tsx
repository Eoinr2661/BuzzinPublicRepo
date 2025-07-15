import { useEffect, useState, useRef } from 'react';
import { FaSearch, FaChevronDown, FaChevronLeft } from 'react-icons/fa';
import { fetchEventCategories } from '../../api/fetchEventCategories';
import type { Category, EventSearchProps } from '../../../types/post.types';

const EventSearchFilter = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
}: EventSearchProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchEventCategories()
      .then((data) => setCategories(data))
      .catch((err) => console.error('Error fetching categories:', err));
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setDropdownOpen(false);
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 mt-6">
      <div
        className="w-full md:w-[300px] relative"
        ref={dropdownRef}
      >
        <button
          type="button"
          onClick={toggleDropdown}
          className={`w-full pl-5 pr-4 py-3 rounded-xl border border-buzzin-purple-500 bg-white text-gray-500 font-Montserrat-VariableFont text-base md:text-lg flex items-center justify-between focus:outline-none ${dropdownOpen ? 'shadow-md' : ''
            }`}
        >
          <span
            className=
            'font-Montserrat-VariableFont text-gray-500 text-base'>
            {selectedCategory || 'Browse by category'}
          </span>
          {dropdownOpen ? <FaChevronDown size={16} /> : <FaChevronLeft size={16} />}
        </button>

        {dropdownOpen && (
          <ul
            className="absolute z-10 bg-white border rounded-xl mt-1 max-h-60 overflow-auto shadow-lg text-left"
            style={{
              width: 'calc(100% - 20px)',
              left: '20px',
            }}
          >
            <li
              className="px-4 py-2 cursor-pointer hover:bg-gray-200"
              onClick={() => handleCategorySelect('')}
            >
              All
            </li>
            {categories.map((cat) => (
              <li
                key={cat.id}
                className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                onClick={() => handleCategorySelect(cat.name)}
              >
                {cat.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="w-full md:w-[300px] relative">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search events..."
          className="w-full pl-4 pr-10 py-3 rounded-xl border border-buzzin-purple-500 bg-white font-Montserrat-VariableFont text-gray-800 text-base focus:outline-none focus:shadow-md"
        />
        <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
      </div>
    </div>
  );
};

export default EventSearchFilter;
