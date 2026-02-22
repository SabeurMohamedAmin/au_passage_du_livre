// types/guest.ts
export interface GuestProfile {
  id: string;
  slug: string;
  meta: {
    type: 'guest_profile';
    generatedAt: string;
  };
  profile: {
    firstName: string;
    lastName: string;
    domains: string[];
    origin: {
      country: string;
      countryCode: string;
      city: string;
    };
    languages: string[];
    images: {
      avatar: string;
      cover: string;
    };
    socials: Record<string, string>;
  };
  biography: {
    short: string;
    long: string;
  };
  featuredWorks: Array<{
    title: string;
    year: number;
    type: string;
    coverUrl: string;
    purchaseLink?: string;
  }>;
  agenda: Array<{
    id: string;
    title: string;
    type: 'conference' | 'signing' | 'workshop' | 'panel';
    date: string;
    time: { start: string; end: string };
    location: { name: string; hall: string };
    status: 'open' | 'full' | 'cancelled';
  }>;
}