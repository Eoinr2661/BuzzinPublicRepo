import { FaInstagram, FaTiktok } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className=" flex flex-col py-4 items-center justify-center w-full  bg-gradient-to-r from-buzzin-lime-300  to-buzzin-lime-200">
      <div className="flex gap-6">
        <a
          href="https://www.instagram.com/areyoubuzzin?igsh=MXNscXB3NmQ5c2ZtOA=="
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-900 hover:text-indigo-400 transition-colors py-2"
          aria-label="Instagram"
        >
          <FaInstagram />
        </a>
        <a
          href="https://www.tiktok.com/@are.you.buzzin?_t=ZN-8xUyBcx9hGY&_r=1"
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-900 hover:text-indigo-400 transition-colors py-2"
          aria-label="TikTok"
        >
          <FaTiktok />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
