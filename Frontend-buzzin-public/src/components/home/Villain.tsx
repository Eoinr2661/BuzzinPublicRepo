export const Villain = () => {
  return (
    <div className='relative z-20 w-full'>


<img
  src={'/images/villain2.webp'}
  alt="ImageWithLogo"
  className="relative z-20 mb-20 object-contain max-h-[600px] w-full min-w-[100vw]"
/>
      <section className="hidden md:block absolute bottom-0 left-0 w-full text-buzzin-purple-500 z-0 ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="w-full h-70"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8c52ff" /> {/* buzzin-purple-500 */}
              <stop offset="100%" stopColor="#a885ff" /> {/* buzzin-purple-400 */}
            </linearGradient>
          </defs>
          <path
            fill="url(#purpleGradient)"
            fill-opacity="1"
            d="M0,32L60,58.7C120,85,240,139,360,154.7C480,171,600,149,720,128C840,107,960,85,1080,85.3C1200,85,1320,107,1380,117.3L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
        </svg>
      </section>

    </div>
  );
};
