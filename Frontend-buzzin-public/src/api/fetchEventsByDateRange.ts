import type {EventPost} from '../../types/post.types'

export async function fetchEventsByDateRange(
  startDate: string, // format: 'YYYY-MM-DD'
  endDate: string    // format: 'YYYY-MM-DD'
): Promise<EventPost[]> {
  const url = `${__BACKEND_URL__}/api/v1/events/byDate?start=${encodeURIComponent(startDate)}&end=${encodeURIComponent(endDate)}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch events: ${response.statusText}`);
  }

  const data: EventPost[] = await response.json();
  return data;
}
