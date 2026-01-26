<script setup lang="ts">
  import { useDisplay } from 'vuetify'
  const { mdAndUp } = useDisplay()

  // --- MOCK DATA (In real app, use your composable) ---
  const selectedDay = ref(0)
  const scheduleDays = ref([
    { title: 'Day 01', day: '20', month: 'Nov', schedules: [
        { startTime: '09:00', endTime: '10:00', title: 'Registration & Coffee', author: 'Front Desk', description: 'Pick up your badge and grab a coffee.', location: 'Lobby', speakers: [1] },
        { startTime: '10:00', endTime: '11:30', title: 'The Future of Vue.js', author: 'Evan You', description: 'Deep dive into the new reactivity system.', location: 'Main Hall', speakers: [2, 3] },
      ] 
    },
    { title: 'Day 02', day: '21', month: 'Nov', schedules: [
        { startTime: '09:00', endTime: '10:30', title: 'State of CSS 2026', author: 'Adam Argyle', description: 'What is new in the CSS world?', location: 'Room A', speakers: [4] },
      ] 
    },
    { title: 'Day 03', day: '22', month: 'Nov', schedules: [
        { startTime: '11:00', endTime: '12:00', title: 'Closing Ceremony', author: 'Organizers', description: 'Final remarks and networking.', location: 'Main Hall', speakers: [1, 2, 3, 4] },
      ] 
    },
  ])

  const stats = [
    { value: '35', label: 'Speakers', icon: 'mdi-microphone' },
    { value: '12', label: 'Workshops', icon: 'mdi-laptop' },
    { value: '5k', label: 'Attendees', icon: 'mdi-account-group' },
  ]



  const tickets = [
    { type: 'Standard', price: '$150', features: ['Access to all talks', 'Lunch included', 'Conference Swag'], color: 'grey-lighten-4', btnColor: 'grey-darken-3', dark: false },
    { type: 'Premium', price: '$299', features: ['Everything in Standard', 'VIP Dinner', 'Front Row Seats'], color: 'primary', btnColor: 'white', dark: true },
    { type: 'Virtual', price: '$49', features: ['Live Stream Access', 'Recorded Sessions', 'Digital Swag'], color: 'grey-lighten-4', btnColor: 'grey-darken-3', dark: false },
  ]

  const drawer = ref(false);


  const blogPosts = [
    {
      title: 'La littérature comme espace de dialogue',
      excerpt: 'Rencontres, lectures et échanges autour des mots et des idées.',
      image: 'https://picsum.photos/800/600?random=11',
      slug: 'litterature-espace-dialogue',
    },
    {
      title: 'Soutenir les artistes locaux',
      excerpt: 'Un engagement fort pour la création indépendante.',
      image: 'https://picsum.photos/800/600?random=12',
      slug: 'soutenir-artistes',
    },
    {
      title: 'Transmettre la culture aux nouvelles générations',
      excerpt: 'Actions culturelles, ateliers et médiation artistique.',
      image: 'https://picsum.photos/800/600?random=13',
      slug: 'transmettre-culture',
    },
  ]

  // Utilisation du composable
  // const { downloadFile } = useDownload()

</script>

<template>          
      <!-- 2. HERO SECTION: Split Layout -->
      <section class="position-relative mb-5 mb-md-10 pt-2 pt-md-4 pb-md-24 overflow-hidden">
        <!-- Abstract Bg Shape -->
        <div
          style="border-bottom-left-radius: 50% !important;"
          class="position-absolute top-0 right-0 w-50 h-100 bg-primary opacity-70 rounded-l-circle d-none d-md-block" 
        >
        </div>
        
        <v-container id="first" class="scroll-mt-5">
          <v-row align="start" justify="space-between">
            <v-col cols="12" md="5">
              <v-fade-transition appear>
                <section>                  
                  <h1 class="d-flex flex-column gap-5 text-lg-h4 text-md-h5 text-sm-h3 text-h4 font-weight-black text-transparent-4 lh-1 mb-6">
                    <span>
                      Évènements culturels
                    </span><br>
                    <span>
                      Soutien aux artistes
                    </span><br>
                    <span class="text-primary">Transmettre la culture</span>
                  </h1>
                  
                  <p class="text-h6 text-medium-emphasis font-weight-regular mb-10 line-height-lg">
                    The world's most influential creative conference. 
                    Join 5,000+ designers and developers for 3 days of inspiration.
                  </p>
                  
                  <div class="d-flex gap-2 align-center">
                  <!-- TODO this will link to see our upcomming events -->
                    <v-btn 
                      size="large" 
                      color="primary" 
                      rounded="pill" 
                      class="font-weight-bold elevation-6 h-auto py-4 text-body-2 md-text-body-1"
                      :to="$localePath('/evenements')"
                    >
                      See our events
                    </v-btn>
                    <v-btn 
                      size="large" 
                      color="primary" 
                      rounded="pill" 
                      class="font-weight-bold elevation-6 h-auto py-4 text-body-2 md-text-body-1"
                      :to="$localePath('/about-us')"
                    >
                      Decovrer l'association
                    </v-btn>
                  </div>
                </section>
              </v-fade-transition>
            </v-col>

            <v-col 
              cols="12" md="6" lg="6"
              class="event-img-reight-section position-relative pa-5 mt-12 mt-md-0 rounded-lg"
            >
               <!-- Image Composition -->
               <v-row dense justify="space-between">
                 <v-col cols="6" class="mt-2 mt-md-12">
                  <nuxt-img
                    src="/img/home/des-dedicaces.png"
                    class="hero-img-top-left w-100 rounded-xl mb-4 elevation-5 hover-up transition-swing"
                    fit="cover"
                  /> 
                   <nuxt-img 
                    src="/img/home/diffrents-directions.png"
                    class="hero-img-bottom-left w-100 rounded-xl mb-4 elevation-5 hover-up transition-swing"
                    fit="cover"
                  />
                 </v-col>
                 <v-col cols="6">
                   <nuxt-img 
                     src="/img/home/assemblage-de-livre.png" 
                     class="hero-img-top-right w-100 rounded-xl mb-4 elevation-5 hover-up transition-swing"
                   />
                  <nuxt-img
                    src="/img/home/comic.png"
                    class="hero-img-bottom-right w-100 rounded-xl mb-4 elevation-5 hover-up transition-swing"
                  />
                 </v-col>
               </v-row>
            </v-col>
          </v-row>
        </v-container>
      </section>
      
      <!-- 2. Our Missions and what we do -->
      <section class="my-5 my-md-10 scroll-mt-6 bg_surface_variant">
        <we-do-best id="we_doo_best"/>
      </section>

      <!-- 3. INTERVENANTS ET ARTISTES -->
      <section class="my-5 my-md-10 scroll-mt-6">
        <speakers-grid/>
      </section>

      <!-- 5. ARTICLES et ACTUALITIES -->
      <section class="my-5 my-md-10 scroll-mt-6 bg_surface_variant">
        <articles-slider :blogPosts="blogPosts"/>
      </section>
      
      <!-- 6. SCHEDULE SECTION -->
      <section id="schedule" class="my-5 my-md-10 scroll-mt-6 ">
        <v-container>
          <v-row class="mb-12 align-start">
            <v-col cols="12" md="8">
              <h2 class="mb-4 text-h5 text-sm-h4 font-weight-black opacity-70">
                Event Schedule
              </h2>
              <p>
                To download the full events catalog please click on download PDF.
              </p>
            </v-col>
            <v-col cols="12" md="4" class="text-md-right">
              <nuxt-link
                to="/documents/events/event-2025.pdf"
                target="_blank"
                download="Programme-event-2025.pdf"
              >
                <v-btn
                  append-icon="mdi-download" 
                  variant="outlined" rounded="pill" 
                  class="font-weight-bold px-6 border-opacity-25"
                >
                  Download PDF
                </v-btn>
              </nuxt-link>
            </v-col>
          </v-row>

          <v-col cols="12" class="px-0">
             <!-- TABBED COMPONENT -->
             <v-card class="elevation-0 rounded-xl border bg-white">
             </v-card>
          </v-col>
        </v-container>
      </section>

      <!-- 5. ARTICLES et ACTUALITIES -->
       <!--
        <section class="my-5 my-md-10 scroll-mt-6 bg_surface_variant">
          <small-slider/>
        </section>
      -->
</template>

<style scoped>
  .bg_surface_variant{
    backdrop-filter: contrast(90%);
  }
/* UTILITIES */
.bg-white-glass {
  background: rgba(255, 255, 255, 0.9) !important;
  backdrop-filter: blur(10px);
}
.lh-1 { line-height: 1.1; }
.gap-1 { gap: 4px; }
.gap-2 { gap: 8px; }
.gap-4 { gap: 16px; }
.gap-8 { gap: 32px; }
.tracking-tighter { letter-spacing: -1px; }
.tracking-widest { letter-spacing: 2px; }
.rounded-l-circle { border-radius: 50% 0 0 50%; }

/* ANIMATIONS */
.hover-up { transition: transform 0.3s ease; }
.hover-up:hover { transform: translateY(-10px); }

.hover-bg-light:hover { background-color: #f9fafb; }

.scale-110 { transform: scale(1.1); }

.transform-up { transform: translateY(-20px); }

.bg-gradient-to-t {
  background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
}
.grayscale {
  filter: grayscale(100%);
}

.event-img-reight-section{
  backdrop-filter: blur(12px);
  border: 1px solid #46444420;
}
.text-transparent-4{
  opacity: 80%;
  letter-spacing: -0.02em;
  text-shadow:
    0 1px 2px rgba(0, 0, 0, 0.08),
    0 4px 12px rgba(0, 0, 0, 0.12);   
}
.hero-img-top-right, .hero-img-bottom-left {
  aspect-ratio: 1/1;   /* width / height */
  object-fit: fill;
}
.hero-img-bottom-right, .hero-img-top-left{
  aspect-ratio: 2/3;
  object-fit: fill;

}

</style>