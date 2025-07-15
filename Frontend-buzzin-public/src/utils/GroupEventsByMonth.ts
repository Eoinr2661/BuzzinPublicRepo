import type { EventPost } from "../../types/post.types";

export function groupEventsByMonth(events: EventPost[]) {
  return events.reduce((acc, event) => {
    const rawDate = event.startDate;
    if (!rawDate) return acc;

    const dateObj = new Date(rawDate);
    const month = dateObj.toLocaleString('en-GB', { month: 'long', year: 'numeric' });

    if (!acc[month]) acc[month] = [];
    acc[month].push(event);

    return acc;
  }, {} as Record<string, EventPost[]>);
}