import { Link } from 'react-router-dom';
import type { EventCardProps } from '../../../types/post.types';

const EventCardGridView = ({ event }: EventCardProps) => {
  const eventDate = event.startDate
    ? new Date(event.startDate).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : 'Date TBD';

  return (
    <Link
      to={`/events/${event.id}`}
      rel="noopener noreferrer"
      className="block rounded-2xl transition max-w-[350px] group"
    >
      <img
        src={event.featuredImageUrl || "/images/buzzinTitle.png"}
        alt={event.featuredImageAlt || ''}
        className="mb-4 w-full h-48 object-cover rounded-2xl group-hover:shadow-xl"
      />
      <h2
        className="relative text-xl text-buzzin-purple-500 
          font-semibold mb-2 font-Montserrat-VariableFont text-left 
          line-clamp-2 after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-buzzin-purple-500 after:w-0 
          after:transition-[width] after:duration-300 after:ease-in-out group-hover:after:w-full"
      >
        {event.eventTitle}
      </h2>
      <div className="text-sm text-gray-900 text-left">Date: {eventDate}</div>
      <div className="text-sm text-gray-900 text-left">Venue: {event.venue}</div>
    </Link>
  );
};

export default EventCardGridView;
