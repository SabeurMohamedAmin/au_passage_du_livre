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
  hero: {
    title: string
    subtitle: string
    tagline: string
    description: string
    slug: string
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
  const { t } = useI18n() // Access the translation function
  /**
   * Hero background image
   * - Keep as absolute path (Nuxt public/)
   * - SSR & production safe
   */
  const HERO_IMAGE_URL = {
    desktop: '/img/home/foire-europeenne-desk.jpg',
    laptop: '/img/home/foire-europeenne-laptop.jpg',
    tablet: '/img/home/foire-europeenne-tablet.jpg',
    mobile: '/img/home/foire-europeenne-mobile.jpg'
  }

  /**
   * Page content
   * Acts as a mini CMS
   */
  const content: EventHeroContent = {
    hero: {
      title: t('fe_2026_title'),
      subtitle: t('fe_2026_subtitle'),
      tagline: t('fe_2026_tagline'),
      description: t('fe_2026_description'),
      slug: 'foire-europeenne-2026',
      cta: t('learn_more'),
    },
    logistics: {
      when: {
        title: t('event_when_label'),
        desc: t('event_when_date'),
        sub: t('event_when_time'),
      },
      where: {
        title: t('event_where_label'),
        desc: t('event_where_address'),
        sub: t('event_where_hall'),
      },
      what: {
        title: t('event_what_label'),
        desc: t('event_what_line_1'),
        sub: t('event_what_line_2'),
      },
    },
    authors: [
      {
        id: 1,
        name: 'Pascal Badre',
        slug: 'pascal-badre',
        role: 'Auteur',
        image: '/img/events/autors/pascal_badre.png',
        facebook: 'https://www.facebook.com/profile.php?id=100002835634820',
        x: 'https://x.com/bigbohomme',
        website: 'https://dessin-badre.over-blog.com',
      },
      {
        id: 2,
        name: 'Anne Siegel',
        slug: 'anne-siegel',
        role: 'Atelier',
        image: '/img/events/autors/anne_siegel.jpg',
        facebook: 'https://www.facebook.com/reliuresetcreations/',
        website: 'https://reliures-creations.fr',
      },
      {
        id: 3,
        name: 'Christian Peultier',
        slug: 'christian-peultier',
        role: 'Artiste',
        image: '/img/events/autors/christian_peultier.jpg',
        facebook: 'https://www.facebook.com/reliuresetcreations/',
        website: 'https://reliures-creations.fr',
      },
      {
        id: 3,
        name: 'Pascal Graffica',
        slug: 'pascal-graffica',
        role: 'Auteur',
        image: '/img/events/autors/pascal_graffica.png',
        facebook: 'https://www.facebook.com/pascal.graffica',
        website: 'https://pascalgraffica.blogspot.com'
      },
      {
        id: 4,
        name: 'Amin Sab',
        slug: 'amin-sab',
        role: 'Artiste',
        image: '/img/events/autors/pascal_graffica.png',
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