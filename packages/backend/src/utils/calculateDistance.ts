import { Location } from "../validationSchemas/locationSchema";

export function calculateDistance(
  location1: Location,
  location2: Location
): number {
  const earthRadius = 6371; // Earth's radius in kilometers

  const lat1 = (Math.PI * location1.latitude) / 180;
  const lon1 = (Math.PI * location1.longitude) / 180;
  const lat2 = (Math.PI * location2.latitude) / 180;
  const lon2 = (Math.PI * location2.longitude) / 180;

  const dLat = lat2 - lat1;
  const dLon = lon2 - lon1;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = earthRadius * c;
  return distance;
}
