import type { NavLinkProps } from '../../../types/post.types';

const NavLink: React.FC<NavLinkProps> = ({
  href,
  onClick,
  children,
  className = '',
  mobile = false
}) => {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`
        relative 
        text-buzzin-purple-500 
        hover:text-buzzin-purple-700
        transition-colors 
        py-1
        group
        ${mobile ? 'text-2xl' : ''}
        ${className}
      `}
    >
      {children}
      <span className="hidden md:block absolute -bottom-1 left-1/2 transform -translate-x-1/2 h-1 w-1 bg-buzzin-purple-700 rounded-full opacity-0 group-hover:opacity-100
        transition-opacity duration-500 ease-in-out
      "></span>
    </a>
  );
};

export default NavLink;