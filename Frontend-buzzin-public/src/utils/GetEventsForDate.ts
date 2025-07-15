import { isSameDay } from 'date-fns';

import type { EventPost } from '../../types/post.types';

export const getEventsForDate = (date: Date, events: EventPost[]): EventPost[] => {
  return events.filter((event) => {
    if (!event.startDate) return false;
    const eventDate = new Date(event.startDate);
    return isSameDay(date, eventDate);
  });
};