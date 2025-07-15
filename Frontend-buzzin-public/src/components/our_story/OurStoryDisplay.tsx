import { type SyntheticEvent } from 'react';
import PageTitle from '../ui/PageTitle';

const OurStoryDisplay = () => {

  const handleImageLoad = (e: SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.style.opacity = '1';
  };
  return (
    <main className="min-h-screen flex flex-col text-center items-start mx-10 md:mx-16 lg:mx-28 my-10">


      <section className="w-full flex flex-col md:flex-row justify-center min-h-[500px] rounded-t-xl ">

        <div className="w-full md:w-1/2 text-left flex flex-col justify-start pb-5 pr-4 bg-gray-100">
          <PageTitle title='Our Story' />
          <div className='flex flex-col text-base md:text-lg gap-y-2 pl-2'>
            <p>
              Welcome to Are You Buzzin — your new go-to for Ireland's creative pulse!
            </p>
            <p>
              We're a growing community celebrating the best of music, art, and culture in Dublin and beyond. From independent artists and local events to festivals, backstage moments, and everything in between — we spotlight what makes Ireland buzz.
            </p>
            <p>
              We were constantly hearing about amazing gigs, art shows, and cultural events AFTER they happened - and we kept thinking “why did no one know about this” or “why is this not promoted more?”
            </p>
            <p>
              We felt like there was so much happening in Dublin's creative scene, but it wasn't getting the visibility it deserved. So we decided to do something about it.
            </p>
            <p>
              That's how @areyoubuzzin was born — a platform to spotlight the best of Dublin/Ireland's cultural life, from underground events to big festivals. It's for the artists, the partygoers, the curious minds and anyone who loves discovering cool stuff happening in Dublin.
            </p>
          </div>

        </div>


        <div className="w-full md:w-1/2 overflow-hidden flex items-start">
          <img
            src={'/images/festivaltents.webp'}
            alt="Festival Tents"
            className="w-full h-auto object-cover transition-opacity duration-600 ease-in-out opacity-0 rounded-xl"
            onLoad={handleImageLoad}
          />
        </div>

      </section>


      <section className="w-full flex flex-col justify-center bg-gray-100">

        <div className='bg-buzzin-purple-500 rounded-xl pb-4 my-2'>
          <div className="w-full text-left py-8 px-2 md:px-4 ">
            <h2 className="text-2xl md:text-3xl font-Montserrat-VariableFont font-semibold text-buzzin-lime-300 text-center md:text-left">
              Who's behind Are You Buzzin?
            </h2>
          </div>

          <div className="flex flex-col items-center lg:flex-row lg:items-start">

            <div className="w-full md:w-1/2 flex flex-col lg:flex-row items-center justify-center px-2 md:px-4 mb-8 md:mb-0">
              <img
                src={'/images/Catarina.png'}
                alt="Catarina"
                className="w-28 h-28 md:w-36 md:h-36 rounded-full object-cover shadow-md mb-4 md:mb-0 md:mr-6 transition-opacity duration-600 ease-in-out opacity-0"
                onLoad={handleImageLoad}
              />
              <div className="text-left">
                <p className="text-sm md:text-base text-white font-Montserrat-VariableFont pb-2 leading-relaxed">
                  Meet Catarina - The creative force blending
                  Millennial drive with Gen Z edge. With a
                  background that spans digital marketing, cultural
                  production, and event management, Catarina lives
                  and breathes all things culture. Whether she's
                  crafting digital strategies, producing unforgettable
                  event experiences, or championing local creatives,
                  her passion lies in making culture more visible,
                  more accessible, and more celebrated.
                </p>
              </div>
            </div>

            <div className="w-full md:w-1/2 flex flex-col lg:flex-row items-center justify-center px-2 md:px-4">
              <img
                src={'/images/Clara.png'}
                alt="Clara"
                className="w-28 h-28 md:w-36 md:h-36 rounded-full object-cover shadow-md mb-4 md:mb-0 md:mr-6 transition-opacity duration-600 ease-in-out opacity-0"
                onLoad={handleImageLoad}
              />
              <div className="text-left">
                <p className="text-sm md:text-base text-white font-Montserrat-VariableFont pb-2 leading-relaxed">
                  Meet Clara - a cultural producer and event manager
                  with a passion for creating meaningful, joyful
                  experiences that bring people together. She thrives in
                  dynamic environments where ideas come to life—and
                  where culture and community meet.

                  With a background rooted in producing events that
                  celebrate creativity, diversity, and shared experience,
                  she brings vision, energy, and heart to every project
                  she touches.
                </p>
              </div>
            </div>

          </div>
        </div>


      </section>
    </main>
  );
};

export default OurStoryDisplay;
