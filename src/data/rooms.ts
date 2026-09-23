import type { ImageMetadata } from 'astro';

// Every photo under assets/photos/rooms is picked up here, so dropping a new
// file named <key>-<n>.jpg into that folder adds it to the carousel.
const gallery = import.meta.glob<{ default: ImageMetadata }>('../assets/photos/rooms/*.jpg', { eager: true });

function photosFor(key: string): ImageMetadata[] {
  return Object.entries(gallery)
    .filter(([path]) => {
      const file = path.split('/').pop() ?? '';
      return new RegExp(`^${key}-\\d+\\.jpg$`).test(file);
    })
    .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
    .map(([, mod]) => mod.default);
}

export interface Room {
  /** i18n key stem: room.<key>.name / .desc */
  key: string;
  /** URL segment of the room's own page, identical in every locale so the
      language switcher and hreflang can swap only the locale prefix. */
  slug: string;
  /** UAH per night, from hotel-helikon.com (checked 2026-08-01). */
  price: number;
  capacity: 'cap2' | 'cap3' | 'cap4';
  /** Carousel photos, in display order. */
  photos: ImageMetadata[];
  /** i18n key stems under `am.` */
  amenities: string[];
}

/** Maximum number of guests for each capacity label. */
export const GUESTS: Record<Room['capacity'], number> = { cap2: 2, cap3: 3, cap4: 4 };

const BASE = ['ac', 'bath', 'tv', 'wifi', 'sound'];

export const ROOMS: Room[] = [
  { key: 'mansard', slug: 'mansard', price: 1800, capacity: 'cap2', amenities: [...BASE, 'patio'], photos: photosFor('mansard') },
  { key: 'standard', slug: 'standard-double', price: 2200, capacity: 'cap2', amenities: [...BASE, 'balcony'], photos: photosFor('standard') },
  { key: 'standard3', slug: 'standard-triple', price: 3000, capacity: 'cap3', amenities: [...BASE, 'patio'], photos: photosFor('standard3') },
  { key: 'half_lux', slug: 'junior-suite', price: 2800, capacity: 'cap2', amenities: [...BASE, 'patio'], photos: photosFor('half_lux') },
  { key: 'lux', slug: 'suite', price: 4200, capacity: 'cap4', amenities: [...BASE, 'patio', 'fridge'], photos: photosFor('lux') },
  { key: 'family', slug: 'family-suite', price: 4200, capacity: 'cap4', amenities: [...BASE, 'patio', 'fridge'], photos: photosFor('family') },
];
