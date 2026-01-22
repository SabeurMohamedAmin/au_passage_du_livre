// composables/useEventHeroContent.ts

/* ============================================================
   EVENT HERO CONTENT COMPOSABLE
   - Centralizes static / CMS-like content
   - Reusable across pages & components
   - Easy to localize later (i18n-ready)
   ============================================================ */

export interface GuestAuthor {
  id: number
  name: string
  role: string
  image: string
  slug : string
  facebook?: string
  youtube?: string
  x?: string
  website?: string
}

export interface EventHeroContent {
  header: {
    title: string
    subtitle: string
  }
  hero: {
    badge: string
    title: string
    subtitle: string
    description: string
    cta: string
  }
  logistics: {
    when: { title: string; desc: string; sub: string }
    where: { title: string; desc: string; sub: string }
    what: { title: string; desc: string; sub: string }
  }
  authors: GuestAuthor[]
}

/* ------------------------------------
   Composable
------------------------------------ */
export function useEventHeroContent() {
  /**
   * Hero background image
   * - Keep as absolute path (Nuxt public/)
   * - SSR & production safe
   */
  const HERO_IMAGE_URL = '/img/home/foire-europeenne-2.png'

  /**
   * Page content
   * Acts as a mini CMS
   */
  const content: EventHeroContent = {
    header: {
      title: 'Our Next Event',
      subtitle: 'We invite you all to visit us on our next event — if you are interested please check for more details.',
    },

    hero: {
      badge: 'Foire Européenne 2026',
      title: 'Au Passage du Livre',
      subtitle: 'Goes European',
      description: 'Join our association for three unforgettable days of literature, culture, and exchange at the heart of Europe.',
      cta: 'Learn More',
    },
    logistics: {
      when: {
        title: 'When ?',
        desc: 'September 4–14, 2026',
        sub: '10:00  – 20:00',
      },
      where: {
        title: 'Where ?',
        desc: 'Avenue Herrenschmidt, Strasbourg',
        sub: 'Hall 5',
      },
      what: {
        title: 'What ?',
        desc: 'Book Signings, Panels &',
        sub: 'Exclusive Workshops',
      },
    },
    authors: [
      {
        id: 1,
        name: 'Pascal Badre',
        slug: 'pascal-badre',
        role: 'Comic',
        image: './img/events/autors/pascal_badre.png',
        facebook: 'https://www.facebook.com/profile.php?id=100002835634820',
        x: 'https://x.com/bigbohomme',
        website: 'https://dessin-badre.over-blog.com',
      },
      {
        id: 2,
        name: 'Anne Siegel',
        slug: 'anne-siegel',
        role: 'Atelier',
        image: './img/events/autors/anne_siegel.jpg',
        facebook: 'https://www.facebook.com/reliuresetcreations/',
        website: 'https://reliures-creations.fr',
      },
      {
        id: 3,
        name: 'Christian Peultier',
        slug: 'christian-peultier',
        role: 'Comic',
        image: './img/events/autors/christian_peultier.jpg',
        facebook: 'https://www.facebook.com/reliuresetcreations/',
        website: 'https://reliures-creations.fr',
      },
      {
        id: 3,
        name: 'Pascal Graffica',
        slug: 'pascal-graffica',
        role: 'Comic',
        image: './img/events/autors/pascal_graffica.png',
        facebook: 'https://www.facebook.com/pascal.graffica',
        website: 'https://pascalgraffica.blogspot.com',
      }
    ],
  }

  return {
    HERO_IMAGE_URL,
    content,
  }
}