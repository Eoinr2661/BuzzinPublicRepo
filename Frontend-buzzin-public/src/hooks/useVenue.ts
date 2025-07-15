// import { useEffect, useState } from 'react';

// // I might not need this with my new Spring backend thing. 

// export const useVenue = (venueId?: number) => {
//   const [venueName, setVenueName] = useState<string | null>(null);

//   useEffect(() => {
//     if (!venueId) return;

//     fetch(`https:////////wp-json/wp/v2/tribe_venue/${venueId}`)
//       .then((res) => res.json())
//       .then((data) => {
//         setVenueName(data.title?.rendered || 'Location TBD');
//       })
//       .catch((err) => {
//         console.error('Failed to fetch venue:', err);
//         setVenueName('Location TBD');
//       });
//   }, [venueId]);

//   return venueName;
// };



/// note, not using this because I've changed things so that the venu is stored on my backend. 
/// keeping here in case we switch back to wordpress.