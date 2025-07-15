import { FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import type { EventCardProps } from '../../../types/post.types';

const EventsCardListView = ({ event }: EventCardProps) => {
  const imageUrl = event.featuredImageUrl || "/imagesbuzzinTitle.png";
  const altText = event.featuredImageAlt || '';
  const dateObj = event.startDate ? new Date(event.startDate) : null;
  const dayAbbr = dateObj ? dateObj.toLocaleDateString('en-GB', { weekday: 'short' }) : '';
  const dayOfMonth = dateObj ? dateObj.getDate() : '';
  const fullDate = dateObj ? dateObj.toLocaleDateString('en-GB', { dateStyle: 'full' }) : 'Date TBD';
  const venueName = event.venue || 'Location TBD';

  return (
    <Link
      to={`/events/${event.id}`}
      rel="noopener noreferrer"
      className="grid grid-cols-12 gap-4 items-center p-4 rounded hover:shadow-lg transition"
    >

      <div className="col-span-2 text-center">
        <div className="text-lg font-bold text-indigo-600">{dayAbbr}</div>
        <div className="text-3xl font-extrabold">{dayOfMonth}</div>
      </div>

      <div className="col-span-10 md:col-span-6 flex flex-col gap-2 text-left">
        <h2 className="text-xl font-semibold">{event.eventTitle}</h2>

        <div className="flex items-center text-sm text-gray-600">
          <FaCalendarAlt className="mr-2" />
          <span>{fullDate}</span>
        </div>

        <div className="flex items-center text-sm text-gray-600">
          <FaMapMarkerAlt className="mr-2" />
          <span>{venueName}</span>
        </div>

        <div className="text-sm text-gray-700 line-clamp-2" dangerouslySetInnerHTML={{ __html: event.description }} />
      </div>

      <div className="hidden md:block md:col-span-4">
        <img
          src={imageUrl}
          alt={altText}
          className="block mx-auto w-auto h-48 object-cover rounded"
        />
      </div>
    </Link>
  );
};

export default EventsCardListView;
