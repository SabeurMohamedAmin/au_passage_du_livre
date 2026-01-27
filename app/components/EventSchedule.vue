<script setup lang="ts">
import { p } from 'vue-router/dist/router-CWoNjPRp.mjs';

  // Local state (was in page)
  const selectedDay = ref(0)

  // Uses your existing composable (unchanged)
  const { scheduleDays } = useEventSchedule();
</script>

<template>
  <!-- ============================================== -->
  <!-- ORIGINAL SECTION: SCHEDULE (EXTRACTED)         -->
  <!-- ============================================== -->
  <!-- events Upcoming -->
  <v-row  justify="start" class="mb-15" >
    <v-col cols="12" lg="11" xl="10" id="future_events">
      <h3 class="w-100 text-h5 font-weight-black opacity-70">
        {{ $t("upcoming events heading") }}
      </h3>
    </v-col>

    <v-col cols="12" lg="11" xl="10">
      <p class="text-h6">
        {{ $t("upcoming events description") }}
      </p>
    </v-col>

    <v-col  cols="12" lg="12" xl="10" class="mt-2 pa-0">
      <v-card class="elevation-8 rounded-lg overflow-hidden border-thin">
        <!-- STICKY DAY SELECTOR -->
        <div class="sticky-header border-b bg-surface">
          <v-tabs
            class="ma-1"
            v-model="selectedDay"
            height="72"
            show-arrows
            center-active
            fixed-tabs
            color="primary"
          >
            <v-tab
              v-for="(day, index) in scheduleDays"
              :key="index"
              :value="index"
              class="tab-size rounded-t-lg border mx-1 text-none px-1 "
              :class="selectedDay === index
                ? 'text-primary bg-primary-lighten-5'
                : 'text-medium-emphasis'"
              :ripple="false"
            >
              <div class="d-flex flex-column align-center line-height-1">
                <span class="text-caption font-weight-bold text-uppercase opacity-70">
                  {{ day.month }}
                </span>
                <span class="text-h6 font-weight-black">
                  {{ day.day }}
                </span>
              </div>
            </v-tab>
          </v-tabs>
        </div>

        <!-- CONTENT -->
        <v-window v-model="selectedDay" disabled>
          <v-window-item
            v-for="(day, dayIndex) in scheduleDays"
            :key="dayIndex"
            :value="dayIndex"
          >
            <v-container class="pa-4 pa-md-6">
              <!-- DAY HEADER -->
              <div class="mb-6">
                <h3 class="text-h5 font-weight-bold text-primary mb-1">
                  {{ day.title }} Day
                </h3>
                <p class="text-body-2 text-medium-emphasis">
                  {{ day.schedules.length }} sessions scheduled , de 10h jusque 20h (fermeture des stands à 20h)
                </p>
              </div>

              <!-- EVENTS -->
              <v-expansion-panels variant="accordion" elevation="0" class="rounded-xl">
                <v-expansion-panel
                  v-for="(schedule, i) in day.schedules"
                  :key="i"
                  class="border-b-thin"
                >
                  <!-- HEADER -->
                  <v-expansion-panel-title class="pa-4 border">
                    <v-row no-gutters align="center" class="w-75">
                      <!-- TIME -->
                      <v-col
                        cols="12" sm="3" md="2" 
                        class="mb-1 d-flex flex-row align-baseline flex-sm-column"
                      >
                        <div class="text-caption text-medium-emphasis me-2 mb-md-1">
                          will be available:
                        </div>
                        <div class="text-primary font-weight-bold">
                          {{ schedule.startTime }} – {{ schedule.endTime }}
                        </div>
                      </v-col>

                      <!-- TITLE -->
                      <v-col cols="12" sm="9" md="10" class="ps-sm-4">
                        <div class="text-subtitle-1 font-weight-bold text-truncate">
                          {{ schedule.title }}
                        </div>
                        <div class="d-flex align-center mt-1">
                          <span class="text-caption text-medium-emphasis text-truncate">
                            {{ schedule.author }} • {{ schedule.company }}
                          </span>
                        </div>
                      </v-col>

                    </v-row>
                  </v-expansion-panel-title>

                  <!-- BODY -->
                  <v-expansion-panel-text class="pt-4">
                    <p 
                      class="text-body-2 mb-6" 
                      style="line-height:1.7"
                    >
                      {{ schedule.description }}
                    </p>

                    <div class="d-flex flex-wrap gap-4 ">
                      <div class="d-flex align-baseline mb-1">
                        <p class="text-medium-emphasis align-self-center me-2 mb-md-1">
                          {{ $t("guests") }}:
                        </p>
                        <v-menu
                          v-for="(person, index) in schedule.guests"
                          :key="index"
                          open-on-hover
                          open-on-click
                          location="top start"
                          origin="bottom start"
                          transition="scale-transition"
                          :close-on-content-click="false"
                        >
                          <template v-slot:activator="{ props }">
                            <v-avatar
                              v-bind="props"
                              size="38" 
                              class="border ms-1 cursor-pointer elevation-1 transition-swing"
                              style="transition: transform 0.2s"
                            >
                              <v-img :src="person?.image" cover />
                            </v-avatar>
                          </template>
                          <GuestProfileCard :guest="person" />
                        </v-menu>
                      </div>
                      <v-spacer />
                      <v-chip
                        color="primary"
                        variant="tonal"
                        size="large"
                        prepend-icon="mdi-map-marker"
                      >
                        {{ schedule.location }}
                      </v-chip>
                    </div>
                  </v-expansion-panel-text>
                </v-expansion-panel>
              </v-expansion-panels>

            </v-container>
          </v-window-item>
        </v-window>

      </v-card>
    </v-col>
  </v-row>
</template>

<style scoped>
  .sticky-header {
    position: sticky;
    top: 0;
    z-index: 10;
    background-color: rgb(var(--v-theme-surface));
  }

  .line-height-1 {
    line-height: 1.2;
  }

  .bg-primary-lighten-5 {
    background-color: rgb(var(--v-theme-primary), 0.05);
  }
</style>

<style>
  .tab-size {
    min-width: 72px !important;
  }
</style>  