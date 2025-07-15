import { useEffect, useState } from 'react';
import { fetchEvents } from '../../api/fetchEventsPaginated';
import EventsCardListView from './EventsCardListView';

import LoaderScreenHeight from '../ui/LoaderScreenHeight';
import EventCardGridView from './EventCardGridView';

import type { EventsGridProps, EventPost } from '../../../types/post.types';

const EventsGrid = ({
  searchTerm,
  selectedCategory,
  viewMode,
  page,
  setPage,
  setTotalPages,
}: EventsGridProps) => {
  const [events, setEvents] = useState<EventPost[]>([]);
  const [loading, setLoading] = useState(true);

  const perPage = 12;

  useEffect(() => {
    setPage(0);
  }, [searchTerm, selectedCategory]);

  useEffect(() => {
    setLoading(true);

    fetchEvents({ page, perPage, searchTerm, selectedCategory })
      .then(({ data, totalPages }) => {
        setEvents(data);
        setTotalPages(totalPages);
      })
      .catch((err) => {
        console.error('Failed to fetch events:', err);
        setEvents([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [searchTerm, selectedCategory, page]);

  if (loading) {
    return <LoaderScreenHeight text='Loading Events...' />;
  }
  if (events.length === 0) return <p className="p-4 text-gray-600">No events found.</p>;

  // Sort events by startDate ascending
  const sortedEvents = [...events].sort((a, b) => {
    const dateA = a.startDate ? new Date(a.startDate).getTime() : 0;
    const dateB = b.startDate ? new Date(b.startDate).getTime() : 0;
    return dateA - dateB;
  });

  return (
    <div className="flex flex-col">
      <div
        className={
          viewMode === 'grid'
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'
            : 'flex flex-col gap-6'
        }
      >
        {sortedEvents.map((event) =>
          viewMode === 'grid' ? (
            <EventCardGridView key={event.id} event={event} />
          ) : (
            <EventsCardListView key={event.id} event={event} />
          )
        )}
      </div>
    </div>
  );
};

export default EventsGrid;
