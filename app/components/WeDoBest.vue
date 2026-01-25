<script setup lang="ts">
 const {features} = useEventSchedule();
</script>

<template>
  <v-container class="py-10 scroll-mt-3">
    <!-- SECTION HEADER -->
    <v-row class="mb-12">
      <v-col cols="12" md="9" lg="8">
        <h2 class="mb-4 text-h5 text-sm-h4 font-weight-black opacity-70">
          Notre mission – Actions principales
        </h2>

        <p class="text-h6 text-medium-emphasis mt-2 font-weight-regular">
          Découvrez ce qui rend notre festival unique :
          des rencontres, des créations et des expériences culturelles
          accessibles à tous.
        </p>
      </v-col>

      <!-- Button -->
      <v-col
        cols="12"
        md="3"
        class="d-flex ms-auto justify-md-end align-start mt-4 mt-md-0"
      >
        <v-btn
          color="primary"
          variant="outlined"
          class="font-weight-bold text-body-1 rounded-xl"
          :to="$localePath('/about-us/our-history')"
        >
          Voir tous Notre Missions
          <v-icon end icon="mdi-arrow-right"/>
        </v-btn>
      </v-col>
    </v-row>
    <!-- RESPONSIVE CARDS GRID -->
    <notre-mission/>
  </v-container>
</template>

<style lang="css" scoped>

</style>