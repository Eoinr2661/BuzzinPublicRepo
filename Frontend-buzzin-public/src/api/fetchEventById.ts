export const fetchEventById = async (id: string) => {
  try {
    const response = await fetch(`${__BACKEND_URL__}/api/v1/events/id/${id}`);
    if (!response.ok) {
      throw new Error('Event not found');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching event by ID:', error);
    throw error;
  }
};
