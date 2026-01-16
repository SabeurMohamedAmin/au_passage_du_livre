<script setup lang="ts">
import { ref } from 'vue'

const selectedDay = ref(0)

const {scheduleDays} = useEventSchedule();
</script>

<template>
  <v-container fluid class="bg-gradient-primary">
    
    <v-divider :thickness="9" class="border-opacity-0 my-15"/>
    <!-- Page heading and description -->
    <v-row class="mt-15" justify="center">
      <v-col cols="12" lg="11" xl="10" class="mb--2">
        <h2 class="text-h4 font-weight-bold">
          {{$t("events heading")}}
        </h2>
      </v-col>
      <v-col cols="12" lg="11" xl="10" class="mb-8">
        <p class="text-h6 opacity-90 ">
          {{ $t("events description") }}
        </p>
      </v-col>
    </v-row>

    <!-- events Upcoming -->
    <v-row justify="center">
      <v-col cols="12" lg="11" xl="10" >
        <h3 class="text-h5 font-weight-bold mb--2">
          {{$t("upcoming events heading")}}
        </h3>
      </v-col>
      <v-col cols="12" lg="11" xl="10">
        <p class="text-h6">
          {{ $t("upcoming events description") }}
        </p>
      </v-col>

      
 <v-col cols="12" lg="11" xl="10" class="mt-10 mx-auto">
  <v-card class="elevation-8 rounded-xl overflow-hidden border-thin">

    <!-- STICKY DAY SELECTOR -->
    <div class="sticky-header z-index-10 border-b">
      <v-tabs
        v-model="selectedDay"
        show-arrows
        center-active
        height="72"
        aria-label="Select event day"
        class="ma-2"
        slider-transition="grow"
         fixed-tabs
      >
        <v-tab
          v-for="(day, index) in scheduleDays"
          :key="index"
          :value="index"
          class="rounded-lg mx-1 text-none px-5"
          :class="selectedDay === index
            ? 'text-primary border border-primary'
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
    <div >
      <v-window v-model="selectedDay" disabled>
        <v-window-item
          v-for="(day, dayIndex) in scheduleDays"
          :key="dayIndex"
          :value="dayIndex"
          transition="fade-transition"
        >
          <v-container class="pa-6 pa-md-8">

            <!-- DAY HEADER -->
            <div class="mb-6">
              <h3 class="text-h5 font-weight-bold text-primary mb-1">
                {{ day.title }} Day
              </h3>
              <p class="text-body-2 text-medium-emphasis">
                {{ day.schedules.length }} sessions scheduled
              </p>
            </div>

            <!-- EVENTS -->
            <v-expansion-panels
              variant="accordion"
              elevation="0"
              class="rounded-xl"
            >
              <v-expansion-panel
                v-for="(schedule, i) in day.schedules"
                :key="i"
                class="border-b-thin"
              >
                <!-- HEADER -->
                <v-expansion-panel-title class="py-5 px-6">
                  <v-row no-gutters align="center" class="w-100">

                    <!-- TIME -->
                    <v-col cols="12" sm="3" md="2" class="mb-2 mb-sm-0">
                      <div class="text-primary font-weight-bold">
                        {{ schedule.startTime }} – {{ schedule.endTime }}
                      </div>
                      <div class="text-caption text-medium-emphasis">
                        {{ schedule.startPeriod }} / {{ schedule.endPeriod }}
                      </div>
                    </v-col>

                    <!-- TITLE -->
                    <v-col cols="12" sm="9" md="10" class="ps-sm-4">
                      <div class="text-subtitle-1 font-weight-bold text-high-emphasis text-truncate">
                        {{ schedule.title }}
                      </div>
                      <div class="d-flex align-center mt-1">
                        <v-avatar size="24" class="me-2">
                          <v-img :src="schedule.speakers[0]" cover />
                        </v-avatar>
                        <span class="text-caption text-medium-emphasis text-truncate">
                          {{ schedule.author }} • {{ schedule.company }}
                        </span>
                      </div>
                    </v-col>

                  </v-row>
                </v-expansion-panel-title>

                <!-- BODY -->
                <v-expansion-panel-text class="pt-4">
                  <div class="ps-sm-16 ms-sm-2">

                    <p class="text-body-2 text-grey-darken-2 mb-6" style="line-height:1.7">
                      {{ schedule.description }}
                    </p>

                    <div class="d-flex flex-wrap gap-4 align-center">

                      <!-- LOCATION -->
                      <v-chip
                        color="primary"
                        variant="tonal"
                        size="small"
                        prepend-icon="mdi-map-marker"
                      >
                        {{ schedule.location }}
                      </v-chip>

                      <!-- SPEAKERS -->
                      <div class="d-flex gap-2">
                        <v-avatar
                          v-for="(speaker, j) in schedule.speakers"
                          :key="j"
                          size="40"
                          class="border border-opacity-25"
                        >
                          <v-img :src="speaker" cover />
                        </v-avatar>
                      </div>

                    </div>
                  </div>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>

          </v-container>
        </v-window-item>
      </v-window>
    </div>
  </v-card>
</v-col>


      
    </v-row>
     
    
    <!-- events Past -->
     <v-divider class="my-8 py-5"/>
     <h1 class="mt-10">
      Archives events
     </h1>
  </v-container>
</template>

<style scoped>
.bg-gradient-primary {
  margin-top: -60px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.line-height-lg {
  line-height: 1.8;
}

.opacity-90 {
  opacity: 0.9;
}
.rounded-insider{
  border-radius: 16px;
}
.hello{
  background-color: rgba(98, 98, 98, 0.100);
 }



</style>
