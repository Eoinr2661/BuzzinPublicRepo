import { useState, useEffect } from "react";
import type { EventsSubSectionProps } from '../../../types/post.types'

const EventsSubSection = ({ events }: EventsSubSectionProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const displayedEvents = isMobile ? events.slice(0, 2) : events;

  return (
    <div className="py-4 pt-8 mx-auto flex flex-col justify-start">
      <h1 className="text-buzzin-purple-500 font-Montserrat-VariableFont font-bold text-3xl md:text-4xl mb-6 text-left px-4 md:px-0">
        What's on
      </h1>

      <div className="posts-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-4 gap-6">
        {displayedEvents.map((event) => {
          const eventDate = new Date(event.startDate).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          });

          return (
            <a
              key={event.id}
              href={`/events/${event.id}`}
              rel="noopener noreferrer"
              className="block rounded-2xl transition max-w-[350px] group"
            >
              <img
                src={event.featuredImageUrl || "/images/buzzinTitle.png"}
                alt={event.featuredImageAlt}
                className="mb-4 w-full h-48 object-cover rounded-2xl group-hover:shadow-xl"
              />
              <h2
                className="relative text-xl text-buzzin-purple-500 
                font-semibold mb-2 font-Montserrat-VariableFont text-left 
                line-clamp-2 after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-buzzin-purple-500 after:w-0 
                after:transition-[width] after:duration-300 after:ease-in-out group-hover:after:w-full">
                {event.eventTitle}
              </h2>
              <div className="text-sm text-gray-900 text-left">Date: {eventDate}</div>
              <div className="text-sm text-gray-900 text-left">Venue: {event.venue}</div>
            </a>
          );
        })}
      </div>
    </div>


  );
};

export default EventsSubSection;
