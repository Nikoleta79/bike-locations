export const parks = [
  { name: 'Vondelpark', coords: [52.357, 4.868] },
  { name: 'Westerpark', coords: [52.386, 4.874] },
  { name: 'Oosterpark', coords: [52.36, 4.925] },
];

export function getNearestPark(userCoords) {
  let minDistance = Infinity;
  let nearest = null;

  for (const park of parks) {
    const distance = getDistance(userCoords, park.coords);
    if (distance < minDistance) {
      minDistance = distance;
      nearest = park;
    }
  }

  return nearest;
}

function getDistance(coord1, coord2) {
  const toRad = (x) => (x * Math.PI) / 180;

  const [lat1, lon1] = coord1;
  const [lat2, lon2] = coord2;

  const R = 6371; // Earth radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}
