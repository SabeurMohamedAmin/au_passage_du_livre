<script setup lang="ts">
import { useDisplay } from 'vuetify'

const { mdAndUp } = useDisplay()

// --- DATA: Blog Posts (kept from your original code) ---
const blogPosts = [
  {
    title: 'La littérature comme espace de dialogue',
    excerpt: 'Rencontres, lectures et échanges autour des mots et des idées.',
    image: 'https://picsum.photos/800/600?random=11',
    slug: '/blog/litterature-espace-dialogue',
  },
  {
    title: 'Soutenir les artistes locaux',
    excerpt: 'Un engagement fort pour la création indépendante.',
    image: 'https://picsum.photos/800/600?random=12',
    slug: '/blog/soutenir-artistes',
  },
  {
    title: 'Transmettre la culture aux nouvelles générations',
    excerpt: 'Actions culturelles, ateliers et médiation artistique.',
    image: 'https://picsum.photos/800/600?random=13',
    slug: '/blog/transmettre-culture',
  },
]
</script>

<template>
  <!-- WRAPPER: Warm Beige Background -->
  <div class="page-wrapper bg-paper-warm text-brown-darken-4">
    
    <!-- ============================================= -->
    <!-- 1. HERO SECTION (New Design)                 -->
    <!-- ============================================= -->
    <section class="position-relative pt-10 pb-16 pt-md-24 pb-md-32 overflow-hidden">
      
      <!-- Ambient Glow (Top Right) -->
      <div class="position-absolute top-0 right-0 w-50 h-75 bg-orange-lighten-4 opacity-30 rounded-l-circle blur-3xl d-none d-md-block pointer-events-none"></div>

      <v-container>
        <v-row align="center" justify="space-between">
          
          <!-- LEFT: Text Content -->
          <v-col cols="12" md="6" lg="5" class="z-index-1">
            <v-fade-transition appear>
              <div>
                <h1 class="text-h3 text-sm-h2 text-lg-h1 font-serif font-weight-bold mb-6 text-brown-darken-4 lh-tight">
                  Transmettre la culture, <br>
                  <span class="text-primary">soutenir les artistes</span>
                </h1>
                
                <p class="text-h6 font-weight-regular text-brown-darken-2 mb-10 opacity-90" style="max-width: 480px; line-height: 1.6;">
                  Une association culturelle engagée dans les événements, l'édition et la création artistique en région Grand Est.
                </p>
                
                <div class="d-flex gap-4 flex-wrap">
                  <v-btn 
                    size="x-large" 
                    color="primary" 
                    class="text-none px-8 rounded-pill elevation-6 font-weight-bold"
                    :to="$localePath('/evenements')"
                  >
                    Découvrir nos événements
                  </v-btn>
                  
                  <v-btn 
                    size="x-large" 
                    variant="outlined" 
                    color="brown-darken-3"
                    class="text-none px-8 rounded-pill border-opacity-50 font-weight-bold bg-white"
                    :to="$localePath('/contactez-nous')"
                  >
                    Devenir bénévole
                  </v-btn>
                </div>
              </div>
            </v-fade-transition>
          </v-col>

          <!-- RIGHT: Image Collage -->
          <v-col cols="12" md="6" class="position-relative mt-16 mt-md-0">
            <!-- Main Card (Author Signing) -->
            <v-card class="rounded-xl elevation-10 rotate-n2 mx-auto ms-md-auto" max-width="450" border>
              <v-img 
                src="https://images.unsplash.com/photo-1544928147-79a2dbc1f389?q=80&w=800&auto=format&fit=crop" 
                cover 
                aspect-ratio="0.85"
                class="bg-grey-lighten-2"
              />
            </v-card>
             
            <!-- Floating Card 1 (Bottom Left - Street Signs) -->
            <v-card 
              class="position-absolute rounded-xl elevation-6 rotate-3 d-none d-md-block"
              width="240"
              style="bottom: -30px; left: 0px; border: 4px solid white;"
            >
              <v-img 
                src="https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=400&auto=format&fit=crop" 
                cover 
                aspect-ratio="1" 
              />
            </v-card>
             
            <!-- Floating Card 2 (Top Right - Books) -->
            <v-card 
              class="position-absolute rounded-xl elevation-6 d-none d-lg-block"
              width="180"
              style="top: -20px; right: 380px; border: 4px solid white;"
            >
              <v-img 
                src="https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=400&auto=format&fit=crop" 
                cover 
                aspect-ratio="1" 
              />
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- ============================================= -->
    <!-- 2. MISSION SECTION (New Design)              -->
    <!-- ============================================= -->
    <section class="py-16 py-md-24 bg-white-gradient">
      <v-container>
        <v-row align="center">
          
          <!-- Text Side -->
          <v-col cols="12" md="5" class="pr-md-12">
            <div class="d-inline-flex mb-4">
              <v-icon color="primary" class="mr-2">mdi-feather</v-icon>
              <span class="text-overline font-weight-bold text-brown">Nos Valeurs</span>
            </div>
            
            <h2 class="text-h4 text-md-h3 font-serif font-weight-bold mb-6 text-brown-darken-4">
              Notre mission — <br> Actions principales
            </h2>
            
            <p class="text-body-1 text-brown-darken-1 mb-8 leading-relaxed">
              Découvrez ce qui rend notre association unique : des rencontres humaines, des créations originales et des expériences culturelles accessibles à tous les publics.
            </p>
            
            <v-btn 
              variant="text" 
              color="primary-darken-1" 
              class="px-0 font-weight-bold text-none text-h6"
              append-icon="mdi-arrow-right"
              :to="$localePath('/about-us')"
            >
              En savoir plus sur l'association
            </v-btn>
          </v-col>

          <!-- Card Side (Floating Interactive Card) -->
          <v-col cols="12" md="7" class="pl-md-12">
            <v-card class="mission-card rounded-xl border-0 elevation-10 bg-paper-light overflow-hidden d-flex flex-column flex-sm-row">
              <!-- Image Half -->
              <div class="w-100 w-sm-50 position-relative">
                 <v-img 
                   src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=600&auto=format&fit=crop" 
                   cover 
                   height="100%" 
                   min-height="300"
                 />
              </div>
              
              <!-- Content Half -->
              <div class="pa-8 pa-md-10 w-100 w-sm-50 d-flex flex-column justify-center bg-paper-light">
                <h3 class="text-h4 font-serif font-weight-bold mb-4 text-brown-darken-4">
                  Rencontres avec des auteurs
                </h3>
                <p class="text-body-1 text-brown-darken-2 mb-6 opacity-80">
                  Séances de dédicaces, discussions et rencontres littéraires avec vos auteurs préférés.
                </p>
                <div class="mt-auto">
                   <v-btn 
                    variant="text" 
                    class="px-0 text-none text-primary font-weight-bold"
                    append-icon="mdi-arrow-right"
                    :to="$localePath('/evenements')"
                  >
                    Voir l'agenda
                  </v-btn>
                </div>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- ============================================= -->
    <!-- 3. INTERVENANTS ET ARTISTES (Existing)       -->
    <!-- ============================================= -->
    <section class="py-12 py-md-24">
      <speakers-grid/>
    </section>

    <!-- ============================================= -->
    <!-- 4. ARTICLES (Existing)                       -->
    <!-- ============================================= -->
    <section class="py-12 py-md-24 bg-paper-darker">
      <articles-slider :blogPosts="blogPosts"/>
    </section>
      
    <!-- ============================================= -->
    <!-- 5. FOOTER (Existing)                         -->
    <!-- ============================================= -->
    <v-footer class="pt-0 bg-transparent" style="display: block; padding: 0;">
      <footer-section/>
    </v-footer>
  </div>
</template>

<style scoped>
/* --- COLORS & THEME --- */
.bg-paper-warm {
  background-color: #FDFBF7; /* The warm beige base */
}
.bg-paper-light {
  background-color: #FFFDF9;
}
.bg-paper-darker {
  background-color: #F7F3EB;
}
.bg-white-gradient {
  background: linear-gradient(to bottom, #FDFBF7 0%, #FFFFFF 100%);
}

/* --- TYPOGRAPHY --- */
/* Ensure you load a serif font in nuxt.config */
.font-serif {
  font-family: 'Playfair Display', 'Georgia', serif !important;
}

.lh-tight {
  line-height: 1.15 !important;
}
.leading-relaxed {
  line-height: 1.75;
}

/* --- UTILS --- */
.z-index-1 { z-index: 1; }
.pointer-events-none { pointer-events: none; }
.rotate-n2 { transform: rotate(-2deg); }
.rotate-3 { transform: rotate(3deg); }
.blur-3xl { filter: blur(80px); }

/* --- ANIMATIONS --- */
.mission-card {
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.4s ease;
}
.mission-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px -10px rgba(60, 40, 20, 0.15) !important;
}
</style>