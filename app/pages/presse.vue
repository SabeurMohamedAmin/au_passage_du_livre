<script setup lang="ts">
  /* ============================================================
    PRESSE & ACTUALITÉS - FINAL MERGE
    - Clean Editorial Hero
    - Rich Data Cards (Chips, Logos)
    - Stats & Contact sections included
    ============================================================ */
  // Press articles data definition
  interface PressArticle {
    id: number
    title: string
    excerpt: string
    publisher: string
    publisherLogo: string // Using placeholder text for logos
    date: string
    category: 'Article' | 'Interview' | 'Review' | 'Culture'
    image: string
    alt?: string
    url: string
  }


  // Content Configuration
  const content = {
    hero: {
      title: 'Presse & Actualités',
      subtitle: 'Articles, interviews et mentions médiatiques consacrés à Au Passage du Livre et à ses actions culturelles.'
    },
    featured: <PressArticle>{
      id: 0,
      title: 'Livres, jeux et figurines pour un vrai "Village culturel"',
      excerpt: 'Après une première en 2024, le livre revient à la Foire européenne de Strasbourg. Cette fois entouré de jeux de société et de figurines… ',
      publisher: 'DNA',
      publisherLogo: 'https://ui-avatars.com/api/?name=DNA&background=e60000&color=fff&size=64',
      date: '07 Sept 2025',
      category: 'Culture',
      image: 'https://cdn-s-www.dna.fr/images/125FCFE5-9691-406A-BAD5-0085D74BCED6/NW_raw/pour-que-le-salon-du-livre-devienne-village-culturel-des-figurines-sont-exposees-le-collectionneur-tintinophile-remy-waeldin-transporte-en-syldavie-photo-thomas-toussaint-1757270458.jpg',
      alt: 'Livres, jeux et figurines pour un vrai "Village culturel"',
      localUrl: 'livres-jeux-et-figurines-pour-un-vrai-village-culturel',
      url: 'https://www.dna.fr/culture-loisirs/2025/09/07/livres-jeux-et-figurines-pour-un-vrai-village-culturel'
    },
    stats: [
      { value: '50+', label: 'Mentions dans la presse' },
      { value: '15+', label: 'Publications partenaires' },
      { value: '200k+', label: 'Lecteurs touchés' }
    ]
  }


  // Sample Data
  const pressArticles: PressArticle[] = [
    {
      id: 1,
      title: 'Livres, jeux et figurines pour un vrai "Village culturel"',
      excerpt: 'Après une première en 2024, le livre revient à la Foire européenne de Strasbourg. Cette fois entouré de jeux de société et de figurines… ',
      publisher: 'DNA',
      publisherLogo: 'https://ui-avatars.com/api/?name=DNA&background=e60000&color=fff&size=64',
      date: '15 Jan 2026',
      category: 'Culture',
      image: 'https://cdn-s-www.dna.fr/images/125FCFE5-9691-406A-BAD5-0085D74BCED6/NW_raw/pour-que-le-salon-du-livre-devienne-village-culturel-des-figurines-sont-exposees-le-collectionneur-tintinophile-remy-waeldin-transporte-en-syldavie-photo-thomas-toussaint-1757270458.jpg',
      alt: 'Livres, jeux et figurines pour un vrai "Village culturel"',
      url: 'https://www.dna.fr/culture-loisirs/2025/09/07/livres-jeux-et-figurines-pour-un-vrai-village-culturel'
    },
    {
      id: 2,
      title: 'Quand la littérature crée du lien social : Interview',
      excerpt: 'Rencontre avec Michel Amiet qui nous explique la vision solidaire de l\'association.',
      publisher: 'France Bleu',
      publisherLogo: 'https://ui-avatars.com/api/?name=FB&background=0055ff&color=fff&size=64',
      date: '28 Déc 2025',
      category: 'Interview',
      image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=600&auto=format&fit=crop',
      url: '#'
    },
    {
      id: 3,
      title: 'Une vision moderne de l’engagement culturel',
      excerpt: 'Analyse des nouvelles méthodes de promotion de la lecture en région Grand Est.',
      publisher: 'Culture Mag',
      publisherLogo: 'https://ui-avatars.com/api/?name=CM&background=143c28&color=fff&size=64',
      date: '10 Nov 2025',
      category: 'Article',
      image: 'https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?q=80&w=600&auto=format&fit=crop',
      url: '#'
    },
    {
      id: 4,
      title: 'Les bienfaits de la lecture pour les jeunes',
      excerpt: 'L\'association intervient dans les écoles pour sensibiliser les plus petits.',
      publisher: 'Le Figaro',
      publisherLogo: 'https://ui-avatars.com/api/?name=LF&background=000&color=fff&size=64',
      date: '05 Oct 2025',
      category: 'Article',
      image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=600&auto=format&fit=crop',
      url: '#'
    },
    {
      id: 5,
      title: 'L\'association lance son nouveau site web',
      excerpt: 'Une plateforme numérique repensée pour mieux servir les adhérents et le public.',
      publisher: 'Web News',
      publisherLogo: 'https://ui-avatars.com/api/?name=WN&background=666&color=fff&size=64',
      date: '28 Sep 2025',
      category: 'Review',
      image: 'https://images.unsplash.com/photo-1507842217159-a28f26809398?q=80&w=600&auto=format&fit=crop',
      url: '#'
    },
    {
      id: 6,
      title: 'Agenda : Les sorties culturelles de la rentrée',
      excerpt: 'Ne manquez pas les prochains marchés aux livres organisés par l\'équipe.',
      publisher: 'Strasbourg.eu',
      publisherLogo: 'https://ui-avatars.com/api/?name=SX&background=9c27b0&color=fff&size=64',
      date: '01 Sep 2025',
      category: 'Culture',
      image: 'https://images.unsplash.com/photo-1544928147-79a2af1f3a94?q=80&w=600&auto=format&fit=crop',
      url: '#'
    }
  ]


  // Helper for chip colors
  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'Article': return 'blue-darken-1'
      case 'Interview': return 'orange-darken-1'
      case 'Review': return 'green-darken-1'
      case 'Event Coverage': return 'purple-darken-1'
      default: return 'grey'
    }
  }
</script>

<template>
  <v-container class="py-6">
    <!-- Sharp Modern Header -->
    <div class="mb-10">
      <div class="d-flex mb-4">
        <h2 class="w-100 text-h5 text-sm-h4 font-weight-black opacity-70">
          {{ content.hero.title }}
        </h2>
      </div>
      <p class="text-subtitle-1 text-medium-emphasis max-w-lg mx-auto">
        {{ content.hero.subtitle }}
      </p>
    </div>
    
    <!-- FEATURED PRESS ARTICLE -->
    <section class="mb-14">
      <press-hero-section/>
    </section>


    <!-- PRESS GRID -->
    <v-row>
      <v-col
        v-for="article in pressArticles"
        :key="article.id"
        cols="12"
        sm="6"
        md="4"
      >
        <!-- Replaced .hover-lift with 'hover' prop -->
        <v-card
          hover
          class="rounded-xl overflow-hidden h-100 d-flex flex-column border-0"
          elevation="2"
        >
          <!-- Card Image -->
          <v-img
            :src="article.image"
            height="220"
            cover
            class="align-end"
            gradient="to top, rgba(0,0,0,0.05), transparent"
          ></v-img>
 
          <div class="d-flex flex-column flex-grow-1">
            <!-- Title & Category Area -->
            <v-card-title class="pt-5 pb-2" style="line-height: 1.5rem;">
              <div class="mb-3">
                <v-chip
                  :color="getCategoryColor(article.category)"
                  size="x-small"
                  label
                  class="font-weight-bold text-uppercase"
                >
                  {{ article.category }}
                </v-chip>
              </div>
              <div class="text-h6 font-weight-bold text-wrap" style="line-height: 1.3;">
                {{ article.title }}
              </div>
            </v-card-title>
 
            <!-- Publisher & Date Row -->
            <v-card-subtitle class="pb-3 pt-1">
              <div class="d-flex align-center">
                <v-avatar size="24" class="mr-2 border">
                  <v-img :src="article.publisherLogo" :alt="article.publisher"></v-img>
                </v-avatar>
                <span class="font-weight-medium text-grey-darken-2">{{ article.publisher }}</span>
                <v-spacer></v-spacer>
                <span class="text-caption text-medium-emphasis font-weight-medium">{{ article.date }}</span>
              </div>
            </v-card-subtitle>
 
            <!-- Excerpt: Replaced .line-clamp-3 with inline style -->
            <v-card-text class="pt-0 pb-2">
              <p
                class="text-body-2 text-medium-emphasis mb-0"
                style="display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;"
              >
                {{ article.excerpt }}
              </p>
            </v-card-text>
 
            <v-spacer/>
 
            <!-- Action Button -->
            <v-card-actions class="px-4 pb-4 pt-2">
                <v-btn
                  :href="article.url"
                  target="_blank"
                  variant="tonal"
                  color="#143c28"
                  size="small"
                  class="font-weight-bold px-4"
                  rounded="pill"
                  block
                >
                  Lire la suite
                  <v-icon end icon="mdi-open-in-new" size="small" class="ml-2"></v-icon>
                </v-btn>
            </v-card-actions>
          </div>
        </v-card>
      </v-col>
    </v-row>
 
    <!-- BOTTOM ACTIONS -->
    <v-row class="mt-16">
    </v-row>
  </v-container>
</template>