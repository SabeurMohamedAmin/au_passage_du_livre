<script setup lang="ts">
import { ref } from 'vue'
import { useDisplay } from 'vuetify'

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

const drawer = ref(false)
</script>

<template>          
      <!-- 2. HERO SECTION: Split Layout -->
      <section class="position-relative mb-10 pt-2 pt-md-4 pb-md-24 overflow-hidden">
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
                  <div class="d-inline-flex align-center rounded-pill bg-primary-lighten-5 py-2 mb-6">
                    <span class="text-primary font-weight-bold text-caption text-uppercase tracking-widest">
                      <v-icon icon="mdi-fire" size="small" class="me-1"/> 20-22 Nov, 2026
                    </span>
                  </div>
                  
                  <h1 class="text-h4 text-sm-h3 text-lg-h2 font-weight-black text-grey-darken-4 lh-1 mb-6">
                    Unite. <br> Create. <br>
                    <span class="text-primary">Innovate.</span>
                  </h1>
                  
                  <p class="text-h6 text-medium-emphasis font-weight-regular mb-10 line-height-lg">
                    The world's most influential creative conference. 
                    Join 5,000+ designers and developers for 3 days of inspiration.
                  </p>
                  
                  <div class="d-flex flex-wrap gap-4 align-center">
                  <!-- TODO this will link to see our upcomming events -->
                    <v-btn 
                      append-icon="mdi-link" 
                      size="x-large" 
                      color="primary" 
                      rounded="pill" 
                      class="px-8 font-weight-bold elevation-6 h-auto py-4 text-body-1"
                      :to="$localePath('/evenements')"
                    >
                      See our events
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
                   <v-img 
                    src="https://picsum.photos/200/300/?blur=2&random=1" 
                    class="rounded-xl mb-4 elevation-5 hover-up transition-swing"
                    aspect-ratio="0.8" 
                    cover
                   />
                   <v-img 
                    src="https://picsum.photos/200/300/?blur=2&random=5" 
                    class="rounded-xl mb-4 elevation-5 hover-up transition-swing"
                    aspect-ratio="1" 
                    cover
                  />
                 </v-col>
                 <v-col cols="6">
                   <v-img 
                     src="https://picsum.photos/200/300/?blur=2&random=2" 
                     class="rounded-xl mb-4 elevation-5 hover-up transition-swing"
                     aspect-ratio="0.8" 
                     cover
                   />
                   <v-img 
                     src="https://picsum.photos/200/300/?blur=2&random=3" 
                     class="rounded-xl elevation-5 hover-up transition-swing"
                     aspect-ratio=".9" 
                     cover
                   />
                 </v-col>
               </v-row>
            </v-col>
          </v-row>
        </v-container>
      </section>

      <v-divider opacity=".1" thickness="1" gradient/>

      <!-- 2. Our Missions and what we do -->
      <section class="my-5 my-md-10 scroll-mt-6 bg_surface_variant">
        <we-do-best id="we_doo_best"/>
      </section>
      <!-- 4. SPEAKERS GRID -->
      <section class="my-5 my-md-10 scroll-mt-6">
        <speakers-grid/>
      </section>

      <!-- 5. PRICING -->
      <section class="my-5 my-md-10 scroll-mt-6 bg_surface_variant">
        <v-container class="my-5 my-md-10 bg_surface_variant">
          <v-row justify="center" class="mb-12">
            <v-col cols="12" md="8" class="text-center">
                <h2 class="text-h3 font-weight-black mb-4">Choose Your Ticket</h2>
                <p class="text-body-1 text-medium-emphasis">Fair pricing for everyone. No hidden fees.</p>
            </v-col>
          </v-row>
          <v-row align="end">
            <v-col v-for="(ticket, i) in tickets" :key="i" cols="12" md="4">
              <v-card 
                class="rounded-xl pa-8 border" 
                :color="ticket.color" 
                :elevation="ticket.dark ? 12 : 0" 
                :theme="ticket.dark ? 'dark' : 'light'"
                :class="{'transform-up': ticket.dark}"
              >
                  <div class="text-overline font-weight-bold mb-2 opacity-70">{{ ticket.type }}</div>
                  <div class="text-h2 font-weight-black mb-6">{{ ticket.price }}</div>
                  <v-btn 
                    block 
                    size="x-large" 
                    :color="ticket.btnColor" 
                    class="mb-8 font-weight-bold rounded-pill" 
                    flat
                  >
                    Buy Now
                  </v-btn>
                  
                  <v-list bg-color="transparent" density="compact">
                    <v-list-item v-for="feat in ticket.features" :key="feat" class="px-0">
                        <template v-slot:prepend>
                          <v-icon icon="mdi-check-circle" color="success" class="me-3" size="small"></v-icon>
                        </template>
                        <v-list-item-title class="font-weight-medium text-body-2">{{ feat }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </section>
      <!-- 6. SCHEDULE SECTION -->
      <section id="schedule" class="my-5 my-md-10 scroll-mt-6 bg_surface_variant">
        <v-container>
          <v-row class="mb-12 align-end">
            <v-col cols="12" md="8">
              <span class="text-primary font-weight-bold text-overline text-h6">Time Table</span>
              <h2 class="text-h3 font-weight-black mt-2 text-grey-darken-3">Event Schedule</h2>
            </v-col>
            <v-col cols="12" md="4" class="text-md-right">
              <v-btn variant="outlined" rounded="pill" class="font-weight-bold px-6 border-opacity-25">Download PDF</v-btn>
            </v-col>
          </v-row>

          <v-col cols="12" class="px-0">
             <!-- TABBED COMPONENT -->
             <v-card class="elevation-0 rounded-xl border bg-white">
                <div class="sticky-top bg-white z-10 px-4 pt-4 border-b">
                  <v-tabs v-model="selectedDay" color="primary" align-tabs="start" height="60" slider-color="primary">
                    <v-tab v-for="(day, i) in scheduleDays" :key="i" :value="i" class="text-none px-6 rounded-t-lg" :ripple="false">
                       <span class="text-h6 font-weight-bold me-2">{{ day.day }}</span> 
                       <span class="text-body-2 text-medium-emphasis">{{ day.month }}</span>
                    </v-tab>
                  </v-tabs>
                </div>

                <v-window v-model="selectedDay" class="pa-0">
                  <v-window-item v-for="(day, i) in scheduleDays" :key="i" :value="i">
                    <div v-for="(event, j) in day.schedules" :key="j" class="d-flex flex-column flex-md-row pa-6 pa-md-8 border-b hover-bg-light transition-fast">
                       <!-- Time -->
                       <div class="me-md-8 mb-4 mb-md-0 d-flex flex-md-column align-center align-md-start" style="min-width: 120px">
                          <span class="text-h6 font-weight-bold text-grey-darken-3">{{ event.startTime }}</span>
                          <span class="d-none d-md-block h-25 w-0 border-s my-2 ms-4 border-dashed bg-grey-lighten-2"></span>
                          <span class="text-body-2 text-medium-emphasis ms-3 ms-md-0">{{ event.endTime }}</span>
                       </div>
                       
                       <!-- Content -->
                       <div class="flex-grow-1">
                          <h3 class="text-h5 font-weight-bold text-grey-darken-3 mb-2">{{ event.title }}</h3>
                          <p class="text-body-1 text-medium-emphasis mb-4 mw-800">{{ event.description }}</p>
                          <div class="d-flex align-center gap-4">
                             <v-chip size="small" variant="tonal" color="primary" class="font-weight-bold">
                                <v-icon start icon="mdi-map-marker" size="x-small"></v-icon> {{ event.location }}
                             </v-chip>
                             <div class="d-flex ms-auto">
                                <v-avatar v-for="spk in event.speakers" :key="spk" size="32" class="border border-white ms-n2">
                                  <v-img :src="`https://picsum.photos/200/300/?blur=2&random=${spk}`" cover></v-img>
                                </v-avatar>
                             </div>
                          </div>
                       </div>
                    </div>
                  </v-window-item>
                </v-window>
             </v-card>
          </v-col>
        </v-container>
      </section>

      <!-- 7. FOOTER -->
      <v-footer class="pt-16 text-center text-md-left">
        <footer-section/>
      </v-footer>
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
.grayscale { filter: grayscale(100%); }

.event-img-reight-section{
  backdrop-filter: blur(12px);
  border: 1px solid #46444420;
}
</style>