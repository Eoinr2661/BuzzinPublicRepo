import { useState } from 'react';

const Hero = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  return (
    <div className="relative overflow-hidden bg-gray-100">

      <section className="relative z-20 flex flex-col md:flex-row w-full min-h-[400px] md:h-[90vh] p-10">

        <div className="relative w-full md:w-1/2 flex justify-center items-start">

          <img
            src="/images/hero1.webp"
            alt="HeroImage"
            onLoad={() => setImageLoaded(true)}
            className={`hidden md:block aspect-square w-full md:max-h-3/4 rounded-lg object-cover transition-opacity duration-700 ease-in-out ${imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
          />
        </div>

        <div className="w-full md:w-1/2 flex md:flex-col flex-col-reverse items-start relative justify-around">
          <div>
            <img
              src="/images/buzzinLogoOrange.png"
              alt="Bolt"
              className="hidden md:block absolute top-0 right-0 w-10 h-auto opacity-70 rotate-[20deg] z-0"
            />
            <div className="relative z-10 w-full text-gray-800 font-Montserrat-VariableFont font-medium p-4 text-xl mx-2">
              <p className="text-left">
                At <strong>Are You Buzzin</strong>, we provide a stage for culture in Dublin and throughout Ireland.
                Whether you're after concerts, art exhibitions, film screenings, or local festivals, our curated events calendar and cultural
                coverage keep you in the loop and inspired by the best of Irish creativity.
              </p>
            </div>
          </div>

          <video
            src="/videos/buzzinherovid.mp4"
            muted
            autoPlay
            loop
            playsInline
            onLoadedData={() => setVideoLoaded(true)}
            className={`md:h-[35vh] w-auto rounded-lg z-10 md:-translate-x-20 transition-opacity duration-700 ease-in-out ${videoLoaded ? 'opacity-100' : 'opacity-0'
              }`}
          />

        </div>

      </section>

      <section className="hidden md:block absolute bottom-0 left-0 w-full text-buzzin-purple-500 z-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="w-full h-75"
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
            fillOpacity="1"
            d="M0,32L60,58.7C120,85,240,139,360,154.7C480,171,600,149,720,128C840,107,960,85,1080,85.3C1200,85,1320,107,1380,117.3L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          ></path>
        </svg>
      </section>

    </div>
  );
};

export default Hero;
