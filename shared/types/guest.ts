/* ==========================================================================
   GUEST TYPES
   ========================================================================== */

export type GuestRole = 'Auteur' | 'Artiste' | 'Conférencier' | 'Historien' | 'Artisan';

export interface Guest {
  id: number;
  name: string;
  slug: string;
  excerpt: string;
  bio: string;
  image: string;
  role: GuestRole;
  specialty?: string;
  featured?: boolean;
  socialLinks?: {
    website?: string;
    instagram?: string;
    facebook?: string;
    x?: string;
  };
}

// export interface Guest {
//   id: number
//   name: string
//   role: string
//   image: string
//   slug : string
//   bio: string
//   excerpt: string
//   specialty?: string
//   socialLinks?: {
//     website?: string
//     facebook?: string
//     youtube?: string
//     x?: string
//     instagram?: string
//   }
// }

export interface Schedule {
  guests: Guest[]
  startTime: string
  startPeriod: 'Am' | 'Pm'
  endTime: string
  endPeriod: 'Am' | 'Pm'
  title: string
  author: string
  company: string
  description: string
  location: string
}

export interface ScheduleDay {
  title: string
  day: string
  month: string
  year: string
  schedules: Schedule[]
}