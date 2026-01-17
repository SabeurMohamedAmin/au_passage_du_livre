<script setup lang="ts">
 const {features} = useEventSchedule();
</script>

<template>
  <v-container class="py-10 scroll-mt-3">
    <!-- SECTION HEADER -->
    <v-row class="mb-12">
      <v-col cols="12">
        <h2 class="mb-4 text-h5 text-sm-h4 font-weight-black opacity-70">
          Notre mission – Actions principales
        </h2>
      </v-col>
      <v-col cols="12" md="9" lg="6">
        <p class="text-h6 text-medium-emphasis mt-2 font-weight-regular">
          Découvrez ce qui rend notre festival unique :
          des rencontres, des créations et des expériences culturelles
          accessibles à tous.
        </p>
      </v-col>
    </v-row>

    <!-- RESPONSIVE CARDS GRID -->
    <v-row justify="center">
      <v-col
        v-for="(feature, index) in features"
        :key="index"
        cols="12"
        sm="6"
        lg="3"
      >
        <v-card
          class="h-100 rounded-xl overflow-hidden"
          elevation="3"
          hover
        >
          <!-- IMAGE -->
          <v-img
            :src="feature.image"
            cover
            aspect-ratio="3 / 2"
          />

          <!-- CONTENT -->
          <v-card-text class="pa-5 pa-lg-6">
            <h3 class="text-h6 font-weight-bold mb-3">
              {{ feature.title }}
            </h3>

            <p
              class="text-body-2 text-medium-emphasis"
              style="line-height: 1.7"
            >
              {{ feature.description }}
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="css" scoped>

</style>