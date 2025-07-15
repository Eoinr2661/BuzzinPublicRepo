import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchEventById } from '../../api/fetchEventById';
import LoaderScreenHeight from '../ui/LoaderScreenHeight';

import type { EventPost } from '../../../types/post.types';

const EventDisplay = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<EventPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    fetchEventById(id)
      .then(setEvent)
      .catch(() => setEvent(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <LoaderScreenHeight text="Loading Event..." />;
  }
  if (!event) return <p>Event not found.</p>;

  return (
    <main className="min-h-screen flex flex-col text-center items-start mx-10 md:mx-16 lg:mx-28 mt-10">
      <div className='my-4 md:my-10 mx-5 sm:mx-10 md:mx-15 lg:mx-30'>
        <div className='flex flex-col md:flex-row mb-6 gap-6 items-start w-full'>
          <div className='w-full h-auto md:w-1/2'>
            <img
              src={event.featuredImageUrl}
              alt={event.featuredImageAlt || 'Event image'}
              className="w-full max-h-[50vh] object-cover rounded-xl"
            />
          </div>

          <div className="text-left w-full md:w-1/2">
            <h1 className="text-5xl font-bold mb-4">{event.eventTitle}</h1>

            <div className="text-base md:text-lg text-gray-800 mb-2">
              <p>
                <span className="font-bold">When:</span>{' '}
                {new Date(event.startDate).toLocaleDateString('en-UK', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>

            <div className="text-base md:text-lg text-gray-800 mb-2">
              <p>
                <span className="font-bold">Where:</span> {event.venue}
              </p>
            </div>

            <div className="text-base md:text-lg text-gray-800 mb-2">
              <p>
                <span className="font-bold">Categories:</span>{' '}
                {event.categories.map((c) => c.name).join(', ')}
              </p>
            </div>

            {event.eventURL && event.eventURL.trim() !== '' && (
              <a
                href={event.eventURL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-buzzin-purple-500 text-white text-sm md:text-base font-semibold px-4 py-2 rounded-md hover:bg-buzzin-purple-600 hover:shadow-2xl transition md:ml-0 md:self-start mt-4"
              >
                🔗 Get Tickets 🔗
              </a>
            )}

          </div>
        </div>

        <div
          className="flex flex-col gap-2 text-gray-600 my-4 leading-snug text-left justify-center"
          dangerouslySetInnerHTML={{ __html: event.description }}
        />
      </div>
    </main>
  );
};

export default EventDisplay;
